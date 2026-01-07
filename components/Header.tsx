import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import LoginModal from './LoginModal';
import ReleaseModal from './ReleaseModal';
import { useAuth } from '../src/context/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReleaseClick = () => {
    if (isAuthenticated) {
      setIsReleaseModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-neutral-200' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="text-3xl font-extrabold tracking-tight text-slate-900">
              NicheQuant
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <a key={link.name} href={link.href} className="text-slate-600 hover:text-slate-900 transition-colors duration-300 text-base font-medium">
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-6">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-slate-900 font-medium">Hi, {user?.name}</span>
                  <button 
                    onClick={logout}
                    className="text-slate-600 hover:text-red-600 transition-colors duration-300 text-sm font-medium"
                  >
                    退出
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 font-semibold text-base"
                >
                  登录
                </button>
              )}
              
              <button 
                onClick={handleReleaseClick}
                className="bg-slate-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                发售
              </button>
            </div>
            <button className="md:hidden text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <ReleaseModal isOpen={isReleaseModalOpen} onClose={() => setIsReleaseModalOpen(false)} />
    </>
  );
};

export default Header;