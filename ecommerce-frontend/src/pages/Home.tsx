import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Loader2, Search, Truck, ShieldCheck, RefreshCw, Headset, ChevronDown } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosClient.get('products/');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 1. Filter First
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 2. Then Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'high') return parseFloat(b.price) - parseFloat(a.price);
    if (sortBy === 'popularity') return b.num_reviews - a.num_reviews;
    if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return 0;
  });

  const categories = ['All', ...new Set(products.map(p => p.category.name))];

  if (loading) return (
    <div className="flex justify-center items-center h-screen text-stone-500 bg-stone-100">
      <Loader2 className="animate-spin mr-2" /> Loading awesome stuff...
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-100 pb-20">
      {/* Hero Section */}
      <div className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600" alt="Hero" className="w-full h-full object-cover"/>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Next Gen Store</h1>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-4 text-stone-400" size={20} />
            <input 
                type="text" placeholder="Search products..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-stone-900 shadow-2xl focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Toolbar: Category Chips + Sort */}
      <div className="max-w-7xl mx-auto px-6 mt-12 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map(cat => (
                <button
                    key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat ? 'bg-stone-900 text-white' : 'bg-white text-stone-600 border border-stone-200'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="relative min-w-[200px]">
            <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-white border border-stone-200 p-3 pr-10 rounded-xl text-stone-600 focus:outline-none shadow-sm font-medium cursor-pointer"
            >
                <option value="newest">Newest Arrival</option>
                <option value="popularity">Bestseller / Popularity</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 text-stone-400 pointer-events-none" size={18} />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-stone-500">
            <p className="text-xl">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;