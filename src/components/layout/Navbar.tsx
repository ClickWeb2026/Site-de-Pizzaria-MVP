import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon, MenuIcon, XIcon, FlameIcon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, lastAddedId } = useCart();
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  const navLinks = [
  {
    to: '/',
    label: 'Início'
  },
  {
    to: '/menu',
    label: 'Menu'
  },
  {
    to: '/carrinho',
    label: 'Carrinho'
  }];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#2D2D2D]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
      role="navigation"
      aria-label="Navegação principal">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="Forno Mágico - Página Inicial">

            <FlameIcon className="w-7 h-7 text-[#D4652F] group-hover:text-[#C41E3A] transition-colors" />
            <span className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#FFF8F0]">
              Forno Mágico
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors relative py-1 ${location.pathname === link.to ? 'text-[#D4652F]' : 'text-[#FFF8F0]/80 hover:text-[#FFF8F0]'}`}>

                {link.label}
                {location.pathname === link.to &&
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4652F] rounded-full" />

              }
              </Link>
            )}

            {/* Cart Icon */}
            <Link
              to="/carrinho"
              className="relative p-2 text-[#FFF8F0]/80 hover:text-[#FFF8F0] transition-colors"
              aria-label={`Carrinho com ${itemCount} itens`}>

              <ShoppingCartIcon className="w-5 h-5" />
              <AnimatePresence>
                {itemCount > 0 &&
                <motion.span
                  key={lastAddedId || 'badge'}
                  initial={{
                    scale: 0
                  }}
                  animate={{
                    scale: 1
                  }}
                  exit={{
                    scale: 0
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 15
                  }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C41E3A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">

                    {itemCount}
                  </motion.span>
                }
              </AnimatePresence>
            </Link>
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/carrinho"
              className="relative p-2 text-[#FFF8F0]/80"
              aria-label={`Carrinho com ${itemCount} itens`}>

              <ShoppingCartIcon className="w-5 h-5" />
              {itemCount > 0 &&
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C41E3A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              }
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#FFF8F0]/80"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}>

              {isOpen ?
              <XIcon className="w-6 h-6" /> :

              <MenuIcon className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          transition={{
            duration: 0.25
          }}
          className="md:hidden bg-[#2D2D2D]/98 backdrop-blur-md border-t border-white/10 overflow-hidden">

            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) =>
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${location.pathname === link.to ? 'bg-[#C41E3A]/20 text-[#D4652F]' : 'text-[#FFF8F0]/80 hover:bg-white/5'}`}>

                  {link.label}
                </Link>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}