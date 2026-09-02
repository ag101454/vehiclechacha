'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronDown, Compass, Zap, MessageCircle } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (!event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchVehicles = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch('/api/search?q=' + encodeURIComponent(searchTerm));
        const data = await response.json();
        if (response.ok) {
          setSearchResults(data.vehicles || []);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(searchVehicles, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleSearchSelect = (vehicle) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    router.push('/new-cars/' + vehicle.brand.slug + '/' + vehicle.slug);
  };

  const navLinks = [
    { label: 'New Cars', href: '/new-cars', dropdown: [
      { label: 'All Cars', href: '/new-cars' },
      { label: 'Sedan', href: '/new-cars?bodyType=Sedan' },
      { label: 'SUV', href: '/new-cars?bodyType=SUV' },
      { label: 'Hatchback', href: '/new-cars?bodyType=Hatchback' },
    ]},
    { label: 'Prices', href: '/car-prices', dropdown: [
      { label: 'All Prices', href: '/car-prices' },
      { label: 'Under 30 Lakh', href: '/best-cars/under-30-lakh' },
      { label: 'Under 50 Lakh', href: '/best-cars/under-50-lakh' },
    ]},
    { label: 'Compare', href: '/compare', dropdown: null },
    { label: 'Guides', href: '/guides', dropdown: null },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6 pt-3">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-500 ${
          scrolled 
            ? 'bg-chacha-black/80 backdrop-blur-2xl border border-chacha-yellow/20 shadow-2xl shadow-chacha-yellow/5'
            : 'bg-chacha-black/40 backdrop-blur-lg border border-white/10'
        }`}
      >
        <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div
              className="relative w-9 h-9 md:w-10 md:h-10 shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/images/logo/vehiclechacha-logo.png"
                alt="VehicleChacha Logo"
                fill
                sizes="(max-width: 768px) 48px, 56px"
                className="object-contain"
                priority
                />
            </motion.div>
            <div className="hidden sm:block leading-tight">
              <span className="text-white font-bold text-lg tracking-tight">
                Vehicle<span className="text-chacha-yellow">Chacha</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div key={link.href} className="relative dropdown-container">
                {link.dropdown ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === link.href ? null : link.href)}
                    onMouseEnter={() => setActiveDropdown(link.href)}
                    className={`group relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'text-chacha-yellow'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={13} className={`transition-transform duration-300 ${activeDropdown === link.href ? 'rotate-180' : ''}`} />
                    {/* Active indicator */}
                    <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-chacha-yellow rounded-full transition-all duration-300 ${
                      pathname === link.href ? 'w-6' : 'w-0 group-hover:w-6'
                    }`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`group relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      pathname === link.href
                        ? 'text-chacha-yellow'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-chacha-yellow rounded-full transition-all duration-300 ${
                      pathname === link.href ? 'w-6' : 'w-0 group-hover:w-6'
                    }`} />
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-chacha-card/95 backdrop-blur-2xl border border-chacha-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between px-5 py-2.5 text-sm text-gray-300 hover:text-chacha-yellow hover:bg-chacha-yellow/5 transition-colors"
                        >
                          {item.label}
                          <span className="text-chacha-yellow opacity-0 group-hover:opacity-100">→</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isSearchOpen 
                    ? 'bg-chacha-yellow text-chacha-black' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Search"
              >
                <Search size={17} />
              </motion.button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-chacha-card/95 backdrop-blur-2xl border border-chacha-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-chacha-border/50">
                      <div className="flex items-center gap-2">
                        <Search size={16} className="text-chacha-muted" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-transparent outline-none text-white placeholder:text-chacha-muted text-sm"
                          placeholder="Search cars..."
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {loading && (
                        <div className="p-4 text-center">
                          <div className="w-5 h-5 border-2 border-chacha-yellow border-t-transparent rounded-full animate-spin mx-auto" />
                        </div>
                      )}
                      {!loading && searchResults.length > 0 && searchResults.map((vehicle) => (
                        <button
                          key={vehicle.id}
                          onClick={() => handleSearchSelect(vehicle)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-chacha-yellow/5 transition-colors text-left"
                        >
                          <div className="w-9 h-9 bg-chacha-black rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                            {vehicle.image ? (
                              <Image src={vehicle.image} alt={vehicle.name} width={36} height={36} className="object-cover" />
                            ) : (
                              <span className="text-base">🚗</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">{vehicle.brand.name} {vehicle.name}</div>
                            <div className="text-chacha-muted text-xs">Rs. {(vehicle.price / 100000).toFixed(1)} Lakh</div>
                          </div>
                        </button>
                      ))}
                      {!loading && searchTerm.length >= 2 && searchResults.length === 0 && (
                        <div className="p-4 text-center text-chacha-muted text-sm">No cars found</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA - Gradient Button */}
            <Link
                href="/group-chat"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-400 text-white hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
                >
                <MessageCircle size={15} />
                Group Chat
            </Link>

            <Link
                href="/find-my-car"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-chacha-yellow to-yellow-400 text-chacha-black hover:shadow-lg hover:shadow-chacha-yellow/30 hover:scale-105 transition-all duration-300"
                >
                <Zap size={15} className="fill-chacha-black" />
                Find My Car
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 mx-auto max-w-7xl bg-chacha-card/95 backdrop-blur-2xl border border-chacha-border rounded-2xl overflow-hidden"
          >
            <div className="p-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/find-my-car"
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-chacha-yellow to-yellow-400 text-chacha-black font-semibold text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <Zap size={16} />
                Find My Car
              </Link>

              <Link
                href="/group-chat"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-400 text-white hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
                >
                <MessageCircle size={15} />
                Group Chat
            </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}