import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import { clearCart } from '../store/cartSlice';
import axiosClient from '../api/axiosClient';
import { Loader2, CreditCard } from 'lucide-react';
import { showToast } from '../store/uiSlice'; // <--- Import this

const Checkout = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postal_code: '',
  });
  const [loading, setLoading] = useState(false);

  const total = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        full_name: userInfo?.email || 'Guest', // Using email as name for now
        address: formData.address,
        city: formData.city,
        postal_code: formData.postal_code,
        total_price: total,
        items: items, // Sending the Redux cart items
      };

      await axiosClient.post('orders/create/', orderData);
      
      dispatch(clearCart());
      // REPLACE alert WITH THIS:
      dispatch(showToast({ message: "Order Placed Successfully! 🎉", type: "success" }));
      navigate('/');
      
    } catch (error) {
      console.error(error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
               Shipping Details
            </h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-3 border border-slate-200 rounded-xl"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-3 border border-slate-200 rounded-xl"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Postal Code</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-3 border border-slate-200 rounded-xl"
                    placeholder="400001"
                    value={formData.postal_code}
                    onChange={e => setFormData({...formData, postal_code: e.target.value})}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-fit">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-600">{item.quantity} x {item.name}</span>
                  <span className="font-medium">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Pay Now <CreditCard size={20}/></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;