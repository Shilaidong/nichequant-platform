import React, { useEffect, useState } from 'react';
import IconListing from './icons/IconListing';
import { api } from '../src/services/api';
import { Product } from '../types';

const FeaturedItems: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.products.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">最新发售</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">探索来自全球收藏家和商家的精选藏品。</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((item) => (
                <div key={item._id || item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col h-full">
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-900 shadow-sm">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={item.seller?.avatarUrl || `https://ui-avatars.com/api/?name=${item.seller?.name || 'User'}&background=random`}
                        alt={item.seller?.name}
                        className="w-8 h-8 rounded-full border border-neutral-200"
                      />
                      <span className="text-sm text-slate-500 font-medium truncate">{item.seller?.name || 'Anonymous'}</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 flex-grow group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                      <span className="text-xl font-bold text-slate-900">${item.price.toLocaleString()}</span>
                      <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors">
                        查看详情 <IconListing className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500">
                暂无在售商品，快来发布第一个吧！
              </div>
            )}
          </div>
        )}
        
        <div className="text-center mt-16">
          <button className="bg-white border border-neutral-300 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-neutral-50 transition-all duration-300 transform hover:scale-105 shadow-sm inline-flex items-center gap-2">
            查看更多商品 <IconListing className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
