import React, { useState } from 'react';
import { api } from '../src/services/api';

interface ReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReleaseModal: React.FC<ReleaseModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('T-Shirts');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('请先登录');
      setIsLoading(false);
      return;
    }

    try {
      await api.products.create({
        name,
        category,
        price: Number(price),
        description,
        imageUrl: imageUrl || 'https://picsum.photos/500/600', // Default image if none provided
      }, token);
      
      onClose();
      // Reset form
      setName('');
      setCategory('T-Shirts');
      setPrice('');
      setDescription('');
      setImageUrl('');
      alert('发布成功！');
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">发布藏品</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">藏品名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
              placeholder="例如：Vintage 90s Nike Tee"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">分类</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
            >
              <option value="T-Shirts">T-Shirts</option>
              <option value="Jackets">Jackets</option>
              <option value="Footwear">Footwear</option>
              <option value="Dresses">Dresses</option>
              <option value="Accessories">Accessories</option>
              <option value="Outerwear">Outerwear</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">价格 (USD)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
              placeholder="100"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">图片链接</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-slate-500 mt-1">留空将使用默认占位图</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">描述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all h-24 resize-none"
              placeholder="描述藏品的成色、来源等细节..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? '发布中...' : '确认发布'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReleaseModal;
