import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, clearCart, deleteCartItem } from '../../../utils/Service';
import { getAllAddresses, createOrder } from '../../../utils/Service';
import { getUserInfoFromToken } from '../../../utils/jwtUtils';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  
  // State management
  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // No address selected initially
  const [termsAccepted, setTermsAccepted] = useState(false); // Terms not accepted initially
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [clearingCart, setClearingCart] = useState(false);
  const [error, setError] = useState('');
  
  // Get user info from token
  const user = getUserInfoFromToken();
  const userId = user?.id;
  
  // Also check localStorage as fallback
  const localToken = localStorage.getItem('token');
  const localUser = localToken ? JSON.parse(atob(localToken.split('.')[1])) : null;
  const finalUserId = userId || localUser?.id || localUser?._id;

  // Calculate totals
  const subTotal = cart?.reduce((total, item) => total + (parseFloat(item.Product.price) * item.quantity), 0) || 0;
  const gstAmount = subTotal * 0.18; // 18% GST
  const totalCost = subTotal + gstAmount;

  // Check if order can be placed
  const canPlaceOrder = selectedAddress && termsAccepted && !orderLoading;

  useEffect(() => {
    if (!finalUserId) {
      setError('Please login to continue');
      setLoading(false);
      return;
    }
    
    fetchData();
  }, [finalUserId]);

  // Debug selectedAddress changes
  useEffect(() => {
    console.log('Selected address changed:', selectedAddress);
  }, [selectedAddress]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch cart data
      const cartResponse = await getCart(finalUserId);
      console.log('Cart response:', cartResponse.data);
      if (cartResponse.data.success) {
        setCart(cartResponse.data.data);
      }
      
      // Fetch addresses
      const addressesResponse = await getAllAddresses({ customerId: finalUserId });
      console.log('Addresses response:', addressesResponse.data);
      if (addressesResponse.data.success) {
        console.log('Addresses loaded:', addressesResponse.data.data);
        setAddresses(addressesResponse.data.data);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load checkout data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (address) => {
    console.log('Address selected:', address);
    setSelectedAddress(address);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const clearUserCart = async () => {
    setClearingCart(true);
    try {
      // Try bulk cart clear first
      await clearCart(finalUserId);
      console.log('Cart cleared successfully using bulk clear');
    } catch (bulkError) {
      console.log('Bulk clear failed, trying individual item deletion');
      
      // Fallback: Clear cart items individually
      if (cart && cart.length > 0) {
        try {
          const deletePromises = cart.map(item => deleteCartItem(item.id));
          await Promise.all(deletePromises);
          console.log('Cart cleared successfully using individual deletion');
        } catch (individualError) {
          console.error('Failed to clear cart items individually:', individualError);
        }
      }
    } finally {
      setClearingCart(false);
    }
  };

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      setError('Please select a delivery address');
      return;
    }
    
    if (!termsAccepted) {
      setError('Please accept the terms and conditions');
      return;
    }

    try {
      setOrderLoading(true);
      setError('');

      const orderData = {
        customerId: finalUserId,
        customerInfo: {
          name: user?.name || localUser?.name || 'Customer',
          email: user?.email || localUser?.email || '',
          phone: user?.phone || localUser?.phone || '',
          address: selectedAddress
        },
        productInfo: cart.map(item => ({
          productId: item.Product.id,
          name: item.Product.name,
          price: parseFloat(item.Product.price),
          quantity: item.quantity,
          subTotal: parseFloat(item.Product.price) * item.quantity,
          gst: parseFloat(subTotal) * 0.18,  
          total: parseFloat(subTotal) + parseFloat(gstAmount)
        })),
        subTotal: subTotal,
        gstAmount: gstAmount,
        totalCost: totalCost,
        status: 'pending'
      };

      const response = await createOrder(orderData);
      
      if (response.data.success) {
        // Clear the cart after successful order
        await clearUserCart();
        
        // Navigate to thank you page
        navigate('/ecommerceDashboard/thank-you');
      } else {
        setError('Failed to place order. Please try again.');
      }
      
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="checkout-loading">
        <div className="loading-spinner"></div>
        <h3>Loading checkout details...</h3>
      </div>
    );
  }

  if (!finalUserId) {
    return (
      <div className="checkout-error">
        <div className="error-message">
          <h3>Please login to continue with checkout</h3>
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="checkout-error">
        <div className="error-message">
          <h3>Your cart is empty</h3>
          <button className="btn-primary" onClick={() => navigate('/ecommerceDashboard')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {/* Header */}
      <div className="checkout-header">
        <h1>Checkout</h1>
        
        {/* Progress Steps */}
        <div className="progress-steps">
          <div className="step completed">
            <div className="step-icon">🛒</div>
            <span>Cart</span>
          </div>
          <div className="step active">
            <div className="step-icon">🚚</div>
            <span>Shipping</span>
          </div>
          <div className="step">
            <div className="step-icon">💳</div>
            <span>Payment</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-alert">
          {error}
        </div>
      )}

      <div className="checkout-content">
        {/* Left Column - Address Selection & Payment */}
        <div className="checkout-left">
          {/* Address Selection */}
          <div className="checkout-section">
            <div className="section-header">
              <span className="section-icon">📍</span>
              <h2>Delivery Address</h2>
            </div>
            
            <div className="section-content">
              {addresses.length === 0 ? (
                <div className="empty-addresses">
                  <div className="empty-icon">📍</div>
                  <h3>No addresses found</h3>
                  <p>Please add an address to continue with checkout.</p>
                  <button 
                    className="btn-secondary" 
                    onClick={() => navigate('/ecommerceDashboard/profile')}
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="address-list">
                  {addresses.map((address, index) => (
                    <div 
                      key={address._id || address.id}
                      className={`address-card ${selectedAddress?._id === address._id || selectedAddress?.id === address.id ? 'selected' : ''}`}
                      onClick={() => handleAddressSelect(address)}
                    >
                      <div className="address-radio">
                        <input 
                          type="radio" 
                          name="address" 
                          value={address._id || address.id}
                          checked={selectedAddress?._id === address._id || selectedAddress?.id === address.id}
                          onChange={() => handleAddressSelect(address)}
                        />
                      </div>
                      <div className="address-content">
                        <div className="address-header">
                          <h4>Address {index + 1}</h4>
                          {selectedAddress?._id === address._id || selectedAddress?.id === address.id && (
                            <span className="selected-badge">Selected</span>
                          )}
                        </div>
                        <p className="address-line">{address.address}</p>
                        <p className="address-city">{address.city}, {address.state}</p>
                        <p className="address-country">{address.country} - {address.postalCode}</p>
                      </div>
                      {selectedAddress?._id === address._id || selectedAddress?.id === address.id && (
                        <div className="address-check">✓</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <div className="section-header">
              <span className="section-icon">💳</span>
              <h2>Payment Method</h2>
            </div>
            
            <div className="section-content">
              <div className="payment-option">
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  defaultChecked 
                  readOnly
                />
                <div className="payment-content">
                  <h4>Cash on Delivery</h4>
                  <p>Pay with cash when your order is delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="checkout-right">
          <div className="order-summary">
            <div className="section-header">
              <span className="section-icon">🛒</span>
              <h2>Order Summary</h2>
            </div>
            
            <div className="section-content">
              {/* Cart Items */}
              <div className="cart-items">
                {cart?.map((item, index) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-header">
                      <h4 className="item-name">{item.Product.name}</h4>
                      <span className="item-price">₹{(parseFloat(item.Product.price) * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="item-details">
                      <span className="item-quantity">Qty: {item.quantity}</span>
                      <span className="item-unit-price">₹{parseFloat(item.Product.price).toFixed(2)} each</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal:</span>
                  <span>₹{subTotal.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>GST (18%):</span>
                  <span>₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="price-row total">
                  <span>Total:</span>
                  <span>₹{totalCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="terms-section">
                <label className="terms-checkbox">
                  <input 
                    type="checkbox" 
                    checked={termsAccepted}
                    onChange={handleTermsChange}
                  />
                  <span>I agree to the <a href="#" className="terms-link">terms and conditions</a></span>
                </label>
              </div>

              {/* Place Order Button */}
              <button
                className={`place-order-btn ${canPlaceOrder ? 'enabled' : 'disabled'}`}
                onClick={handleConfirmOrder}
                disabled={!canPlaceOrder || clearingCart}
              >
                              {orderLoading ? (
                <>
                  <div className="loading-spinner-small"></div>
                  <span>Processing Order...</span>
                </>
              ) : clearingCart ? (
                <>
                  <div className="loading-spinner-small"></div>
                  <span>Clearing Cart...</span>
                </>
              ) : (
                `Place Order - ₹${totalCost.toFixed(2)}`
              )}
              </button>
              
              {!canPlaceOrder && (
                <p className="order-hint">
                  {!selectedAddress ? 'Please select a delivery address' : 
                   !termsAccepted ? 'Please accept the terms and conditions' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;