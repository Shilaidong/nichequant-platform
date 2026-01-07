import React, { useState, useEffect } from 'react';
import { api } from '../src/services/api';
import type { Product } from '../types';
import ProductDetailModal from './ProductDetailModal';

const LatestDrops: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products and reverse to show newest first
        const data = await api.products.getAll();
        setProducts([...data].reverse().slice(0, 8)); // Show latest 8 items
        setError(null);
      } catch (err) {
        setError('Failed to fetch latest drops');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading || error) return null;

  return (
    <section className="py-20 bg-neutral-50/50">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">最新发售</h2>
            <p className="text-slate-600 mt-3 text-lg">来自社区玩家的最新上架好货。</p>
          </div>
          <button className="hidden md:block text-slate-900 font-semibold hover:underline">
            查看更多 &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product._id || product.id}
              onClick={() => setSelectedProduct(product)}
              className="group bg-white rounded-2xl overflow-hidden cursor-pointer border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-slate-900">
                  {product.category}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={product.seller.avatarUrl || 'https://picsum.photos/seed/default/40/40'} 
                      alt={product.seller.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-slate-500 truncate max-w-[80px]">{product.seller.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 text-lg">${product.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button className="bg-white border border-neutral-300 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-neutral-50 transition-colors">
            查看更多
          </button>
        </div>
      </div>

      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
};

export default LatestDrops;
