import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ShieldCheck } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.image 
    ? `http://127.0.0.1:8000${product.image}` 
    : 'https://via.placeholder.com/300';

  // --- NEW LOGIC: Calculate Rating from LocalStorage ---
  const storageKey = `reviews_${product.id}`;
  const savedReviews = localStorage.getItem(storageKey);
  
  let displayRating = Number(product.rating);
  let displayCount = product.num_reviews;

  if (savedReviews) {
    const reviews = JSON.parse(savedReviews);
    if (reviews.length > 0) {
        const total = reviews.reduce((acc: number, curr: any) => acc + curr.rating, 0);
        displayRating = parseFloat((total / reviews.length).toFixed(1));
        displayCount = reviews.length;
    }
  }
  // -----------------------------------------------------

  return (
    <Link 
      to={`/product/${product.slug}`} 
      className="group block bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="h-64 overflow-hidden bg-stone-100 relative">
        {/* QUALITY ASSURANCE BADGE */}
        {product.is_quality_checked && (
          <div className="absolute top-3 left-0 z-20 bg-stone-900 text-white text-[10px] font-bold pl-2 pr-3 py-1 rounded-r-full flex items-center gap-1.5 shadow-md border-l-4 border-emerald-500">
            <ShieldCheck size={12} className="text-emerald-400" /> QUALITY ASSURANCE
          </div>
        )}
        
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute bottom-4 right-4 z-20 bg-white p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-stone-900 hover:text-white">
          <ShoppingCart size={20} />
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
            {product.category.name}
        </p>
        <h3 className="font-bold text-stone-800 mb-1 truncate">{product.name}</h3>

        {/* ALWAYS VISIBLE RATING (Now using calculated 'displayRating') */}
        <div className="flex items-center gap-1 mb-3">
            <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                        key={star} 
                        size={14} 
                        className={star <= Math.round(displayRating) ? "fill-current" : "text-stone-200"} 
                    />
                ))}
            </div>
            <span className="text-xs font-bold text-stone-500 ml-1">{displayRating}</span>
            <span className="text-[10px] text-stone-400">({displayCount})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-stone-900">₹{product.price}</span>
          {product.stock > 0 ? (
             <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase">In Stock</span>
          ) : (
             <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md uppercase">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;