import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../store/store';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        <ShoppingBag size={64} className="text-stone-300 mb-4" />
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Your cart is empty</h2>
        <p className="text-stone-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-stone-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          {items.map((item) => (
            <div key={item.id} className="flex items-center p-6 border-b border-stone-100 last:border-0 hover:bg-slate-50 transition-colors">
              {/* Image */}
              <div className="h-20 w-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                   src={item.image ? `http://127.0.0.1:8000${item.image}` : 'https://via.placeholder.com/150'} 
                   alt={item.name} 
                   className="w-full h-full object-cover"
                />
              </div>
              
              {/* Info */}
              <div className="ml-6 flex-1">
                <h3 className="font-semibold text-stone-900">{item.name}</h3>
                <p className="text-stone-500 text-sm">{item.category.name}</p>
              </div>

              {/* Price & Qty */}
              <div className="text-right mr-8">
                <div className="font-bold text-stone-900">₹{item.price}</div>
                <div className="text-xs text-stone-500">Qty: {item.quantity}</div>
              </div>

              {/* Remove */}
              <button 
                onClick={() => dispatch(removeFromCart(item.id))}
                className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer / Checkout */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-stone-500 text-lg">Total Amount</span>
            <span className="text-3xl font-bold text-stone-900">₹{total.toFixed(2)}</span>
          </div>
          
          <div className="flex gap-4">
             <button 
               onClick={() => dispatch(clearCart())}
               className="px-6 py-4 border bborder-stone-200 text-stone-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
             >
               Clear Cart
             </button>
             <Link 
  to="/checkout"
  className="flex-1 bg-stone-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg text-center"
>
  Proceed to Checkout <ArrowRight size={20} />
</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;