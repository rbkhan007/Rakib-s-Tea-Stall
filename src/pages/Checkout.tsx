import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { useCustomer } from '../context/CustomerContext';
import { CreditCard, Truck, MapPin, CheckCircle2, ArrowRight, ShoppingBag, Gift, Edit, Lock, Banknote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ShippingForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

interface PaymentForm {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { customer, isAuthenticated } = useCustomer();
  const navigate = useNavigate();
  
  const [giftCode, setGiftCode] = useState('');
  const [appliedGiftCode, setAppliedGiftCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingData, setShippingData] = useState<ShippingForm | null>(null);

  const shippingMethods = [
    { id: 'standard', name: 'Standard Delivery', price: 30, time: '2-3 days' },
    { id: 'express', name: 'Express Delivery', price: 60, time: 'Same day' },
    { id: 'pickup', name: 'Pickup', price: 0, time: '1 hour' },
  ];
  
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'nagad'>('card');

  const {
    register: registerShipping,
    handleSubmit: handleShippingSubmit,
    formState: { errors: shippingErrors }
  } = useForm<ShippingForm>({
    defaultValues: {
      name: customer?.name || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      address: customer?.address || '',
      city: '',
      zipCode: ''
    }
  });

  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors }
  } = useForm<PaymentForm>();

  // Calculate totals
  const subtotal = totalPrice;
  const shippingCost = selectedShipping.price;
  const total = subtotal + shippingCost - discount;

  const handleApplyGiftCode = () => {
    if (!giftCode.trim()) {
      toast.error('Please enter a gift code');
      return;
    }
    
    // Placeholder for gift code validation
    if (giftCode.toUpperCase() === 'TEA10') {
      setDiscount(subtotal * 0.1);
      setAppliedGiftCode(giftCode);
      toast.success('Gift code applied! 10% off');
    } else if (giftCode.toUpperCase() === 'FREE50') {
      setDiscount(50);
      setAppliedGiftCode(giftCode);
      toast.success('Gift code applied! 50 BDT off');
    } else {
      toast.error('Invalid gift code');
    }
  };

  const handleRemoveGiftCode = () => {
    setAppliedGiftCode('');
    setDiscount(0);
    setGiftCode('');
  };

  const onShippingSubmit = (data: ShippingForm) => {
    setShippingData(data);
    setStep(2);
  };

  const onPaymentSubmit = async (data: PaymentForm) => {
    setIsProcessing(true);
    
    try {
      // Process payment based on method
      if (paymentMethod === 'card') {
        // Stripe payment simulation
        // In production, you would use Stripe.js to create a payment intent
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else if (paymentMethod === 'bkash') {
        // bKash payment - would integrate with bKash API
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.info('bKash payment request sent to your phone');
      } else if (paymentMethod === 'nagad') {
        // Nagad payment - would integrate with Nagad API
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.info('Nagad payment request sent to your phone');
      }
      
      // Place order via API
      const orderData = {
        customer_name: shippingData?.name || '',
        phone: shippingData?.phone || '',
        address: `${shippingData?.address || ''}, ${shippingData?.city || ''}, ${shippingData?.zipCode || ''}`,
        items: cart.map(item => `${item.name} x${item.quantity}`).join(', '),
        total: total,
        payment_method: paymentMethod
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        clearCart();
        setStep(3);
        toast.success('Order placed successfully!');
      } else {
        throw new Error('Order failed');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="pt-28 pb-20 text-center min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container-luxury">
          <div className="luxury-card rounded-3xl p-12 max-w-md mx-auto">
            <ShoppingBag size={64} className="mx-auto mb-6" style={{ color: 'var(--accent)' }} />
            <h1 className="text-3xl font-medium mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Your cart is empty</h1>
            <Link to="/menu" className="btn-luxury btn-primary-luxury inline-flex">Go to Menu</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-luxury">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Checkout</h1>
          <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
            {isAuthenticated ? `Welcome back, ${customer?.name}` : 'Complete your order'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Forms */}
          <div className="w-full lg:w-[60%] space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => step > 1 && setStep(1)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                  step >= 1 ? 'text-white' : ''
                }`}
                style={{ 
                  background: step >= 1 ? 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' : 'var(--bg-card)',
                  color: step >= 1 ? 'white' : 'var(--text-muted)',
                  border: step >= 1 ? 'none' : '1px solid var(--border-light)'
                }}
              >
                <Truck size={16} />
                Shipping
              </button>
              <div className="flex-1 h-0.5" style={{ backgroundColor: 'var(--border-light)' }} />
              <button
                onClick={() => step > 2 && setStep(2)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                  step >= 2 ? 'text-white' : ''
                }`}
                style={{ 
                  background: step >= 2 ? 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' : 'var(--bg-card)',
                  color: step >= 2 ? 'white' : 'var(--text-muted)',
                  border: step >= 2 ? 'none' : '1px solid var(--border-light)'
                }}
              >
                <CreditCard size={16} />
                Payment
              </button>
            </div>

            {/* Shipping Form */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl p-6 md:p-8"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <MapPin size={22} className="text-orange-500" />
                  Shipping Information
                </h2>
                
                <form onSubmit={handleShippingSubmit(onShippingSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-field form-field-spacing">
                      <label className="form-label">
                        Full Name *
                      </label>
                      <input
                        {...registerShipping('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 rounded-xl"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                        placeholder="John Doe"
                      />
                      {shippingErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{shippingErrors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="form-field form-field-spacing">
                      <label className="form-label">
                        Email *
                      </label>
                      <input
                        {...registerShipping('email', { 
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                        })}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                        placeholder="john@example.com"
                      />
                      {shippingErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{shippingErrors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-field form-field-spacing">
                      <label className="form-label">
                        Phone *
                      </label>
                      <input
                        {...registerShipping('phone', { required: 'Phone is required' })}
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                        placeholder="+880 1XXXXXXXXX"
                      />
                      {shippingErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{shippingErrors.phone.message}</p>
                      )}
                    </div>
                    
                    <div className="form-field form-field-spacing">
                      <label className="form-label">
                        City *
                      </label>
                      <input
                        {...registerShipping('city', { required: 'City is required' })}
                        className="w-full px-4 py-3 rounded-xl"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                        placeholder="Dhaka"
                      />
                      {shippingErrors.city && (
                        <p className="text-red-500 text-sm mt-1">{shippingErrors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="form-field form-field-spacing">
                    <label className="form-label">
                      Full Address *
                    </label>
                    <textarea
                      {...registerShipping('address', { required: 'Address is required' })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                      placeholder="House #12, Road #5, Gulshan-2"
                    />
                    {shippingErrors.address && (
                      <p className="text-red-500 text-sm mt-1">{shippingErrors.address.message}</p>
                    )}
                  </div>

                  <div className="form-field form-field-spacing">
                    <label className="form-label">
                      Zip Code
                    </label>
                    <input
                      {...registerShipping('zipCode')}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                      placeholder="1212"
                    />
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {/* Card Payment */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'card' ? 'border-orange-500' : 'border-transparent'
                        }`}
                        style={{ 
                          backgroundColor: paymentMethod === 'card' ? 'rgba(249, 115, 22, 0.1)' : 'var(--bg-hover)' 
                        }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <CreditCard size={24} style={{ color: paymentMethod === 'card' ? 'var(--accent)' : 'var(--text-secondary)' }} />
                          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Card</span>
                        </div>
                      </button>
                      
                      {/* bKash Payment */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'bkash' ? 'border-orange-500' : 'border-transparent'
                        }`}
                        style={{ 
                          backgroundColor: paymentMethod === 'bkash' ? 'rgba(249, 115, 22, 0.1)' : 'var(--bg-hover)' 
                        }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Banknote size={24} style={{ color: paymentMethod === 'bkash' ? 'var(--accent)' : 'var(--text-secondary)' }} />
                          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>bKash</span>
                        </div>
                      </button>
                      
                      {/* Nagad Payment */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('nagad')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'nagad' ? 'border-orange-500' : 'border-transparent'
                        }`}
                        style={{ 
                          backgroundColor: paymentMethod === 'nagad' ? 'rgba(249, 115, 22, 0.1)' : 'var(--bg-hover)' 
                        }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Banknote size={24} style={{ color: paymentMethod === 'nagad' ? 'var(--accent)' : 'var(--text-secondary)' }} />
                          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Nagad</span>
                        </div>
                      </button>
                    </div>
                    
                    {/* Payment Method Icons */}
                    <div className="flex gap-4 items-center mt-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-hover)' }}>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>We accept:</span>
                      <img 
                        src="/images/BKash-Icon-Logo.wine.svg" 
                        alt="bKash" 
                        className="h-8 w-auto" 
                      />
                      <img 
                        src="/images/Nagad-Logo.wine.svg" 
                        alt="Nagad" 
                        className="h-8 w-auto" 
                      />
                      <img 
                        src="/images/Visa_Inc.-Logo.wine.svg" 
                        alt="Visa" 
                        className="h-8 w-auto" 
                      />
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" 
                        alt="Mastercard" 
                        className="h-5 w-auto" 
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold mt-6 flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                  >
                    Continue to Payment
                    <ArrowRight size={20} />
                  </button>
                </form>
              </motion.div>
            )}

            {/* Payment Form */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl p-6 md:p-8"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <CreditCard size={22} className="text-orange-500" />
                  Payment Details
                </h2>
                
                <form onSubmit={handlePaymentSubmit(onPaymentSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Card Number *
                    </label>
                    <div className="relative">
                      <input
                        {...registerPayment('cardNumber', { 
                          required: 'Card number is required',
                          pattern: { 
                            value: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 
                            message: 'Invalid card number (16 digits)' 
                          }
                        })}
                        type="text"
                        className="w-full px-4 py-3 pr-12 rounded-xl"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      <CreditCard size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    </div>
                    {paymentErrors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{paymentErrors.cardNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Cardholder Name *
                    </label>
                    <input
                      {...registerPayment('cardName', { required: 'Cardholder name is required' })}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                      placeholder="JOHN DOE"
                    />
                    {paymentErrors.cardName && (
                      <p className="text-red-500 text-sm mt-1">{paymentErrors.cardName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Expiry Date *
                      </label>
                      <input
                        {...registerPayment('expiry', { 
                          required: 'Expiry is required',
                          pattern: { 
                            value: /^(0[1-9]|1[0-2])\/\d{2}$/, 
                            message: 'Use MM/YY format' 
                          }
                        })}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {paymentErrors.expiry && (
                        <p className="text-red-500 text-sm mt-1">{paymentErrors.expiry.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                        CVV *
                      </label>
                      <input
                        {...registerPayment('cvv', { 
                          required: 'CVV is required',
                          pattern: { 
                            value: /^\d{3,4}$/, 
                            message: 'Invalid CVV' 
                          }
                        })}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl"
                        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                        placeholder="123"
                        maxLength={4}
                      />
                      {paymentErrors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{paymentErrors.cvv.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-green-500/10">
                    <Lock size={16} className="text-green-500" />
                    <span className="text-sm text-green-500">Your payment is secure and encrypted</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl font-bold mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order - ৳{total}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full py-3 mt-2 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                  >
                    ← Back to Shipping
                  </button>
                </form>
              </motion.div>
            )}

            {/* Success Step */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl p-8 text-center"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Order Placed Successfully!</h2>
                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Thank you for your order. You will receive a confirmation email shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/menu"
                    className="px-6 py-3 rounded-xl font-bold"
                    style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to="/"
                    className="px-6 py-3 rounded-xl font-bold"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)' }}
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Order Summary (40%) */}
          <div className="w-full lg:w-[40%]">
            <div 
              className="rounded-3xl p-6 md:p-8 sticky top-24"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Your Order</h2>
                <Link 
                  to="/cart" 
                  className="text-sm font-medium text-orange-500 hover:underline flex items-center gap-1"
                >
                  <Edit size={14} />
                  Edit Bag
                </Link>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div 
                      className="w-16 h-16 rounded-xl overflow-hidden shrink-0"
                      style={{ backgroundColor: 'var(--bg-hover)' }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold" style={{ color: 'var(--text-primary)' }}>৳{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Gift Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <Gift size={16} className="inline mr-1" />
                  Gift Code
                </label>
                {appliedGiftCode ? (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10">
                    <span className="flex-1 font-medium text-green-500">{appliedGiftCode}</span>
                    <button 
                      onClick={handleRemoveGiftCode}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={giftCode}
                      onChange={(e) => setGiftCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 rounded-xl text-sm"
                      style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                    />
                    <button
                      onClick={handleApplyGiftCode}
                      className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                    >
                      Apply
                    </button>
                  </div>
                )}
                <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Try: TEA10 (10% off) or FREE50 (50 BDT off)
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {shippingCost === 0 ? 'Free' : `৳${shippingCost}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount</span>
                    <span className="font-medium">-৳{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold pt-3 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                  <span>Total</span>
                  <span>৳{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
