import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { logout } from '../store/userSlice';
import { ShoppingCart, LogOut, Package, Zap, User } from 'lucide-react';

const Navbar = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform duration-300">
             <Zap size={24} className="fill-current" /> 
          </div>
          <span className="text-2xl font-bold text-stone-900 tracking-tight group-hover:text-emerald-600 transition-colors">
            Next Gen
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/orders" className="text-stone-500 hover:text-emerald-600 transition-colors" title="My Orders">
                <Package size={20} />
              </Link>
              
              <Link to="/profile" className="text-stone-500 hover:text-emerald-600 text-sm font-medium hidden md:block">
                {userInfo?.email}
              </Link>
              
              <button onClick={() => dispatch(logout())} className="text-stone-500 hover:text-red-600 transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
               <Link to="/login" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium transition-colors">
                 <User size={20} /> Login
               </Link>
               <Link to="/signup" className="bg-stone-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-200">
                 Sign Up
               </Link>
            </div>
          )}

          <Link to="/cart" className="relative p-2 text-stone-800 hover:text-emerald-600 transition-colors">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;