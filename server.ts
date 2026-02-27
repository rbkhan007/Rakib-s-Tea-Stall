import express, { Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("tea_stall.db");

// Initialize SQLite tables
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id)
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_bangla TEXT,
    price INTEGER NOT NULL,
    category TEXT,
    description TEXT,
    image TEXT,
    available INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    items TEXT NOT NULL,
    total INTEGER NOT NULL,
    payment_method TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    text TEXT NOT NULL,
    role TEXT DEFAULT 'Customer',
    avatar TEXT,
    approved INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create default admin if not exists
const adminExists = db.prepare("SELECT COUNT(*) as count FROM admins").get() as { count: number };
if (adminExists.count === 0) {
  // Default admin: username "admin", password "rakib123"
  // In production, use environment variables for credentials
  const defaultUsername = "admin";
  const defaultPassword = process.env.ADMIN_PASSWORD || "rakib123";
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(defaultPassword, salt, 100000, 64, "sha512").toString("hex");
  
  db.prepare("INSERT INTO admins (username, password_hash) VALUES (?, ?)").run(
    defaultUsername,
    salt + ":" + hash
  );
  console.log("Default admin created. CHANGE PASSWORD IN PRODUCTION!");
}

// Helper functions
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
}

function generateToken(): string {
  return crypto.randomBytes(64).toString("hex");
}

// Auth middleware
function authenticateAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const token = authHeader.substring(7);
  
  try {
    const session = db.prepare(`
      SELECT admin_id, expires_at FROM admin_sessions 
      WHERE token = ? AND expires_at > datetime('now')
    `).get(token) as { admin_id: number; expires_at: string } | undefined;
    
    if (!session) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    
    (req as any).adminId = session.admin_id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed" });
  }
}

// Rate limiting (simple in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
function checkRateLimit(key: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

// Seed default menu if empty
const menuCount = db.prepare("SELECT COUNT(*) as count FROM menu_items").get() as { count: number };
if (menuCount.count === 0) {
  const insertMenu = db.prepare(`
    INSERT INTO menu_items (name, name_bangla, price, category, description, image) 
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  const defaultItems = [
    ['Milk Tea', 'দুধ চা', 40, 'Signature', 'Our famous creamy milk tea with secret spices', '/images/tea-1.png'],
    ['Black Tea', 'রং চা', 20, 'Classic', 'Strong and aromatic black tea brewed to perfection', '/images/tea-2.png'],
    ['Lemon Tea', 'লেবু চা', 25, 'Refreshing', 'Zesty and refreshing lemon tea with a hint of ginger', '/images/tea-3.png'],
    ['Green Tea', 'গ্রিন টি', 35, 'Healthy', 'Pure organic green tea leaves for a healthy boost', '/images/tea-4.png'],
    ['Masala Chai', 'মসলা চা', 50, 'Signature', 'Rich milk tea infused with cardamom, cloves, and ginger', '/images/tea-1.png'],
    ['Ginger Tea', 'আদা চা', 25, 'Classic', 'Classic black tea with fresh crushed ginger', '/images/tea-2.png'],
    ['Iced Lemon Tea', 'আইস লেবু চা', 45, 'Refreshing', 'Chilled lemon tea served with fresh mint leaves', '/images/tea-3.png'],
    ['Honey Green Tea', 'মধু গ্রিন টি', 55, 'Healthy', 'Green tea sweetened with pure organic honey', '/images/tea-4.png'],
  ];
  
  defaultItems.forEach(item => insertMenu.run(...item));
}

async function startServer() {
  const app = express();
  const PORT = 8080;

  // Security headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  app.use(express.json({ limit: "10kb" })); // Limit body size

  // File upload handling
  app.use("/uploads", express.static(path.join(__dirname, "public", "images")));

  // Public routes
  app.post("/api/contact", (req, res) => {
    // Rate limit contact submissions
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    if (!checkRateLimit(`contact:${clientIp}`, 5, 60000)) {
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Sanitize inputs
    const sanitizedName = name.toString().trim().substring(0, 100);
    const sanitizedEmail = email.toString().trim().toLowerCase().substring(0, 254);
    const sanitizedMessage = message.toString().trim().substring(0, 2000);

    try {
      const stmt = db.prepare(
        "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)"
      );
      const info = stmt.run(sanitizedName, sanitizedEmail, sanitizedMessage);
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to save message" });
    }
  });

  // Image upload endpoint
  app.post("/api/upload", authenticateAdmin, (req, res) => {
    try {
      // Check if image data is provided
      const { image, filename } = req.body;
      
      if (!image || !filename) {
        return res.status(400).json({ error: "Image data and filename required" });
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const fileType = filename.split('.').pop()?.toLowerCase();
      
      if (!fileType || !['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType)) {
        return res.status(400).json({ error: "Invalid file type. Allowed: jpg, jpeg, png, gif, webp" });
      }

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(__dirname, "public", "images");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileType}`;
      const filePath = path.join(uploadsDir, uniqueFilename);

      // Handle base64 data URL or raw base64
      let base64Data = image;
      if (image.startsWith('data:')) {
        // Extract base64 data from data URL
        base64Data = image.split(',')[1];
      }

      // Write file
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

      const imageUrl = `/images/${uniqueFilename}`;
      res.json({ success: true, url: imageUrl });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });

  // Admin login
  app.post("/api/admin/login", (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    if (!checkRateLimit(`login:${clientIp}`, 5, 60000)) {
      return res.status(429).json({ error: "Too many login attempts. Please try again later." });
    }

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    try {
      const admin = db.prepare("SELECT * FROM admins WHERE username = ?").get(username) as any;
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const [salt, storedHash] = admin.password_hash.split(":");
      const hash = hashPassword(password, salt);
      
      if (hash !== storedHash) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate session token
      const token = generateToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
      
      // Delete old sessions for this admin
      db.prepare("DELETE FROM admin_sessions WHERE admin_id = ?").run(admin.id);
      
      // Create new session
      db.prepare("INSERT INTO admin_sessions (admin_id, token, expires_at) VALUES (?, ?, ?)").run(
        admin.id,
        token,
        expiresAt
      );

      res.json({ 
        success: true, 
        token,
        admin: { id: admin.id, username: admin.username }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", authenticateAdmin, (req, res) => {
    const token = (req.headers.authorization as string)?.substring(7);
    try {
      db.prepare("DELETE FROM admin_sessions WHERE token = ?").run(token);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Logout failed" });
    }
  });

  // Admin change password
  app.post("/api/admin/change-password", authenticateAdmin, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "Current password and new password (min 6 chars) required" });
    }

    const adminId = (req as any).adminId;
    
    try {
      const admin = db.prepare("SELECT password_hash FROM admins WHERE id = ?").get(adminId) as any;
      const [salt, storedHash] = admin.password_hash.split(":");
      const hash = hashPassword(currentPassword, salt);
      
      if (hash !== storedHash) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      const newSalt = crypto.randomBytes(16).toString("hex");
      const newHash = hashPassword(newPassword, newSalt);
      
      db.prepare("UPDATE admins SET password_hash = ? WHERE id = ?").run(
        newSalt + ":" + newHash,
        adminId
      );

      // Invalidate all sessions except current
      const currentToken = (req.headers.authorization as string)?.substring(7);
      db.prepare("DELETE FROM admin_sessions WHERE admin_id = ? AND token != ?").run(adminId, currentToken);

      res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to change password" });
    }
  });

  // Protected admin routes
  app.get("/api/messages", authenticateAdmin, (req, res) => {
    try {
      const messages = db.prepare("SELECT * FROM contact_messages ORDER BY created_at DESC").all();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.get("/api/messages/:id", authenticateAdmin, (req, res) => {
    try {
      const message = db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(req.params.id);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch message" });
    }
  });

  app.delete("/api/messages/:id", authenticateAdmin, (req, res) => {
    try {
      db.prepare("DELETE FROM contact_messages WHERE id = ?").run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  // Public menu route
  app.get("/api/menu", (req, res) => {
    try {
      const menu = db.prepare("SELECT * FROM menu_items WHERE available = 1 ORDER BY category, name").all();
      res.json(menu);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu" });
    }
  });

  // Protected menu routes
  app.get("/api/menu/all", authenticateAdmin, (req, res) => {
    try {
      const menu = db.prepare("SELECT * FROM menu_items ORDER BY category, name").all();
      res.json(menu);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu" });
    }
  });

  app.post("/api/menu", authenticateAdmin, (req, res) => {
    const { name, name_bangla, price, category, description, image, available } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    // Validate price is a positive number
    if (typeof price !== "number" || price < 0 || price > 100000) {
      return res.status(400).json({ error: "Invalid price" });
    }

    try {
      const stmt = db.prepare(`
        INSERT INTO menu_items (name, name_bangla, price, category, description, image, available)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(
        name.toString().trim().substring(0, 100),
        name_bangla?.toString().trim().substring(0, 100) || null,
        price,
        category?.toString().trim().substring(0, 50) || null,
        description?.toString().trim().substring(0, 500) || null,
        image?.toString().trim().substring(0, 500) || null,
        available ? 1 : 0
      );
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to add menu item" });
    }
  });

  app.put("/api/menu/:id", authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { name, name_bangla, price, category, description, image, available } = req.body;

    // Validate price
    if (price !== undefined && (typeof price !== "number" || price < 0 || price > 100000)) {
      return res.status(400).json({ error: "Invalid price" });
    }

    try {
      const stmt = db.prepare(`
        UPDATE menu_items 
        SET name = ?, name_bangla = ?, price = ?, category = ?, description = ?, image = ?, available = ?
        WHERE id = ?
      `);
      stmt.run(
        name?.toString().trim().substring(0, 100),
        name_bangla?.toString().trim().substring(0, 100) || null,
        price,
        category?.toString().trim().substring(0, 50) || null,
        description?.toString().trim().substring(0, 500) || null,
        image?.toString().trim().substring(0, 500) || null,
        available ? 1 : 0,
        id
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update menu item" });
    }
  });

  app.delete("/api/menu/:id", authenticateAdmin, (req, res) => {
    const { id } = req.params;
    
    // Validate ID is a number
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    
    try {
      db.prepare("DELETE FROM menu_items WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete menu item" });
    }
  });

  // Public orders (for customers)
  app.post("/api/orders", (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    if (!checkRateLimit(`order:${clientIp}`, 10, 60000)) {
      return res.status(429).json({ error: "Too many orders. Please try again later." });
    }

    const { customer_name, phone, address, items, total, payment_method } = req.body;
    if (!customer_name || !phone || !items || !total) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    // Validate total
    if (typeof total !== "number" || total < 0 || total > 1000000) {
      return res.status(400).json({ error: "Invalid total amount" });
    }

    try {
      const stmt = db.prepare(`
        INSERT INTO orders (customer_name, phone, address, items, total, payment_method)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(
        customer_name.toString().trim().substring(0, 100),
        phone.toString().trim().substring(0, 20),
        address?.toString().trim().substring(0, 500) || null,
        items.toString().substring(0, 5000),
        total,
        payment_method?.toString().trim().substring(0, 50) || null
      );
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to place order" });
    }
  });

  // Protected orders routes
  app.get("/api/orders", authenticateAdmin, (req, res) => {
    try {
      const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.patch("/api/orders/:id", authenticateAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    
    try {
      db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  // Public reviews endpoints (get approved reviews, submit review)
  app.get("/api/reviews", (req, res) => {
    try {
      const reviews = db.prepare("SELECT * FROM reviews WHERE approved = 1 ORDER BY created_at DESC").all();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    if (!checkRateLimit(`review:${clientIp}`, 3, 60000)) {
      return res.status(429).json({ error: "Too many reviews. Please try again later." });
    }

    const { name, rating, text, role } = req.body;
    if (!name || !rating || !text) {
      return res.status(400).json({ error: "Name, rating, and review text are required" });
    }

    // Validate rating
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Generate avatar URL
    const avatar = `https://picsum.photos/seed/${Date.now()}/100/100`;

    try {
      const stmt = db.prepare(
        "INSERT INTO reviews (name, rating, text, role, avatar, approved) VALUES (?, ?, ?, ?, ?, 1)"
      );
      const info = stmt.run(
        name.toString().trim().substring(0, 100),
        rating,
        text.toString().trim().substring(0, 500),
        role?.toString().trim().substring(0, 50) || 'Customer',
        avatar
      );
      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to submit review" });
    }
  });

  // Admin-only: get all reviews (including unapproved)
  app.get("/api/reviews/all", authenticateAdmin, (req, res) => {
    try {
      const reviews = db.prepare("SELECT * FROM reviews ORDER BY created_at DESC").all();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.delete("/api/reviews/:id", authenticateAdmin, (req, res) => {
    try {
      db.prepare("DELETE FROM reviews WHERE id = ?").run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`SQLite database initialized with tables: admins, admin_sessions, contact_messages, menu_items, orders`);
    console.log(`Default admin credentials: username="admin", password="rakib123"`);
    console.log(`⚠️  CHANGE DEFAULT PASSWORD IN PRODUCTION!`);
  });
}

startServer();
