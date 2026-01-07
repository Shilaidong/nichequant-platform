import React from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-neutral-100 relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
              {product.category}
            </span>
            <span className="text-sm text-slate-500">ID: {product._id || product.id}</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h2>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <img 
              src={product.seller.avatarUrl || 'https://picsum.photos/seed/default/40/40'} 
              alt={product.seller.name} 
              className="w-12 h-12 rounded-full border border-slate-200"
            />
            <div>
              <p className="text-sm text-slate-500">卖家</p>
              <p className="font-medium text-slate-900">{product.seller.name}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">商品详情</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {product.description || '卖家暂未提供详细描述。'}
            </p>
          </div>

          <div className="mt-auto bg-slate-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-600">价格</span>
              <span className="text-3xl font-bold text-slate-900">${product.price.toLocaleString()}</span>
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all transform hover:scale-[1.02] shadow-lg">
              立即购买
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">
              所有交易均受 NicheQuant 平台保护
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
