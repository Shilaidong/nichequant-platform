import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 text-center py-24">
        <h1 className="text-5xl md:text-8xl font-extrabold text-slate-900 tracking-tighter mb-6">
          定义你的收藏价值
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
          在NicheQuant，发现、交易并追踪独特的古着与亚文化资产。
        </p>
        <div className="max-w-2xl mx-auto">
            <div className="relative">
                <svg
                    className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-500"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="search"
                    placeholder="搜索稀有T恤, 复古牛仔裤, 限量版运动鞋..."
                    className="w-full pl-16 pr-8 py-5 text-lg bg-white/50 backdrop-blur-md rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow shadow-lg shadow-neutral-400/20 text-slate-900 placeholder-slate-500"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;