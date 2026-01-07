import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-100/80 backdrop-blur-lg border-t border-neutral-200">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} NicheQuant. 版权所有.</p>
            <div className="flex space-x-6">
                <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">隐私政策</a>
                <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">服务条款</a>
                <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">联系我们</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;