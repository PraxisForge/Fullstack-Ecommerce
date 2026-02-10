import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { showToast } from '../store/uiSlice';
import axiosClient from '../api/axiosClient';
import type { Product } from '../types';
import type { RootState } from '../store/store';
import { Loader2, ArrowLeft, ShoppingCart, Check, Star, ShieldCheck, User as UserIcon, Send } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(0); 
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);

  // 1. Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosClient.get(`products/${slug}/`);
        setProduct(response.data);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchProduct();
  }, [slug]);

  // 2. Generate Initial Random Reviews (Memoized)
  const initialReviews = useMemo(() => {
    if (!product) return [];
    const names = ["Ankit R.", "Suresh M.", "Deepika P.", "Vikram T.", "Sneha J."];
    const texts = ["Excellent quality!", "Value for money.", "Good product.", "Highly recommend.", "Perfect fit."];
    const productNumId = parseInt(String(product.id));
    return Array.from({ length: 2 }, (_, i) => ({
        id: i,
        user: names[(productNumId + i) % names.length],
        text: texts[(productNumId + i) % texts.length],
        rating: 4 + (i % 2)
    }));
  }, [product]);

  // 3. Load Reviews from LocalStorage
  useEffect(() => {
    if (!product) return;
    const storageKey = `reviews_${product.id}`;
    const saved = localStorage.getItem(storageKey);

    if (saved) {
        setReviews(JSON.parse(saved));
    } else {
        setReviews(initialReviews);
        localStorage.setItem(storageKey, JSON.stringify(initialReviews));
    }
  }, [product, initialReviews]);

  // 4. DYNAMIC RATING CALCULATION (The Fix!)
  const calculatedRating = useMemo(() => {
    if (reviews.length === 0) return product?.rating || 0;
    const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews, product]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || userRating === 0) {
        dispatch(showToast({ message: "Please select stars and write a comment.", type: "info" }));
        return;
    }

    const newReview = { 
        id: Date.now(), 
        user: userInfo?.email || 'Guest', 
        text: comment, 
        rating: userRating 
    };
    
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    
    if (product) {
        localStorage.setItem(`reviews_${product.id}`, JSON.stringify(updatedReviews));
    }

    setComment('');
    setUserRating(0);
    dispatch(showToast({ message: "Review saved permanently! 💾", type: "success" }));
  };

  if (loading) return <div className="h-screen flex justify-center items-center bg-stone-100"><Loader2 className="animate-spin text-stone-400" /></div>;
  if (!product) return <div className="text-center mt-20 text-stone-500">Product not found</div>;

  const imageUrl = product.image ? `http://127.0.0.1:8000${product.image}` : 'https://via.placeholder.com/600';

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8 font-medium">
          <ArrowLeft size={18} className="mr-2" /> Back to Store
        </Link>

        <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="h-[500px] md:h-[600px] bg-stone-50 relative">
            {product.is_quality_checked && (
                <div className="absolute top-6 left-0 z-10 bg-stone-900 text-white text-xs font-bold pl-4 pr-5 py-2 rounded-r-full flex items-center gap-2 shadow-2xl border-l-4 border-emerald-500">
                    <ShieldCheck size={18} className="text-emerald-400" /> QUALITY ASSURANCE
                </div>
            )}
            <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="p-10 md:p-16 flex flex-col justify-center">
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2">{product.category.name}</span>
            <h1 className="text-4xl font-bold text-stone-900 mb-2">{product.name}</h1>
            
            {/* DYNAMIC RATING DISPLAY (Uses calculatedRating instead of product.rating) */}
            <div className="flex items-center gap-2 mb-6">
                <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                            key={star} 
                            size={18} 
                            className={star <= Math.round(Number(calculatedRating)) ? "fill-current" : "text-stone-200"} 
                        />
                    ))}
                </div>
                <div className="flex flex-col">
                    <span className="text-stone-900 font-bold text-lg leading-none">{calculatedRating}</span>
                    <span className="text-stone-400 text-xs font-medium">{reviews.length} ratings</span>
                </div>
            </div>

            <p className="text-stone-600 text-lg leading-relaxed mb-8">{product.description}</p>
            
            <div className="flex items-center justify-between mb-10 border-y border-stone-100 py-6">
              <span className="text-4xl font-extrabold text-stone-900">₹{product.price}</span>
              <span className="flex items-center text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-full text-sm">
                <Check size={16} className="mr-2" /> IN STOCK
              </span>
            </div>

            <button 
              onClick={() => {
                dispatch(addToCart(product));
                dispatch(showToast({ message: "Added to Cart! 🛒", type: "success" }));
              }}
              className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
            >
              <ShoppingCart size={24} /> Add to Cart
            </button>
          </div>
        </div>

        {/* REVIEW SECTION */}
        <div className="mt-12 bg-white rounded-3xl p-10 border border-stone-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-8 text-stone-900">Customer Reviews</h2>
            
            <div className="bg-stone-50 rounded-2xl p-6 mb-12">
                <h3 className="font-bold text-stone-800 mb-4 text-sm uppercase tracking-widest">Rate this product</h3>
                <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setUserRating(star)}
                            className="transition-transform active:scale-125 focus:outline-none"
                        >
                            <Star 
                                size={32} 
                                className={`${(hoverRating || userRating) >= star ? "text-amber-400 fill-current" : "text-stone-300"}`} 
                            />
                        </button>
                    ))}
                    <span className="ml-4 self-center font-bold text-stone-400">
                        {userRating > 0 ? `${userRating} Stars selected` : "Select stars"}
                    </span>
                </div>

                <form onSubmit={handlePostComment} className="flex flex-col md:flex-row gap-4">
                    <input 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review here..."
                        className="flex-1 p-4 rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-stone-900 focus:outline-none transition-all"
                    />
                    <button type="submit" className="bg-stone-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors">
                        Post <Send size={18} />
                    </button>
                </form>
            </div>

            <div className="space-y-8">
                {reviews.map(r => (
                    <div key={r.id} className="flex gap-4 border-b border-stone-50 pb-8 last:border-0">
                        <div className="bg-stone-100 h-12 w-12 rounded-full flex items-center justify-center text-stone-400 flex-shrink-0">
                            <UserIcon size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-bold text-stone-900">{r.user}</span>
                                <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} className={i < r.rating ? "fill-current" : "text-stone-200"} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-stone-600 leading-relaxed">{r.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;