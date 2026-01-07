import React, { useState, useEffect } from 'react';
import { api } from '../src/services/api';
import type { Product } from '../types';
import ProductDetailModal from './ProductDetailModal';

const ProductCard: React.FC<{ product: Product; onClick: (product: Product) => void }> = ({ product, onClick }) => (
  <div onClick={() => onClick(product)} className="group w-80 flex-shrink-0 mr-8 snap-center">
    <div className="overflow-hidden rounded-2xl bg-neutral-100/50 backdrop-blur-lg transition-all duration-500 cursor-pointer flex flex-col h-full border border-neutral-200/80 shadow-lg hover:shadow-xl shadow-neutral-500/10 hover:shadow-neutral-500/20">
      <div className="overflow-hidden rounded-t-2xl">
          <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-slate-500 text-sm mb-1">{product.category}</p>
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex-grow">{product.name}</h3>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-200/80">
          <div>
            <p className="text-xs text-slate-500">当前价格</p>
            <p className="text-xl font-bold text-slate-900">${product.price.toLocaleString()}</p>
          </div>
          <div className="text-right">
              <img src={product.seller.avatarUrl || 'https://picsum.photos/seed/default/40/40'} alt={product.seller.name} className="w-10 h-10 rounded-full ml-auto mb-1 border-2 border-white ring-1 ring-neutral-200/80" />
              <p className="text-sm text-slate-700 font-medium">{product.seller.name}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeaturedItems: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.products.getAll();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-transparent overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg text-slate-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-transparent overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-transparent overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">精选单品</h2>
            <p className="text-slate-600 mt-3 max-w-2xl text-lg">发现来自全球的稀有古着与亚文化珍品。</p>
          </div>
        </div>
        <div className="container mx-auto px-6">
            <div className="flex overflow-x-auto pb-8 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
              {products.map((product) => (
                <ProductCard 
                  key={product._id || product.id} 
                  product={product} 
                  onClick={setSelectedProduct}
                />
              ))}
              <div className="flex-shrink-0 w-1"></div> {/* Spacer at the end */}
            </div>
        </div>
         <div className="container mx-auto px-6 text-center mt-8">
              <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                  查看全部
              </button>
          </div>
      </section>

      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
};

export default FeaturedItems;