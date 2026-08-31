'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Car, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  BarChart3, 
  FileText,
  Tag,
  Menu,
  X,
  Star,
  LayoutDashboard
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/verify');
        const data = await response.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    document.cookie = 'admin_token=; path=/; max-age=0';
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-chacha-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-chacha-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: 'Total Vehicles', value: '0', icon: Car, color: 'text-chacha-yellow' },
    { label: 'Brands', value: '0', icon: Tag, color: 'text-blue-500' },
    { label: 'Reviews', value: '0', icon: Star, color: 'text-green-500' },
    { label: 'Guides', value: '0', icon: FileText, color: 'text-purple-500' },
  ];

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Vehicles', href: '/admin/dashboard/vehicles', icon: Car },
    { label: 'Add Vehicle', href: '/admin/dashboard/vehicles/new', icon: Plus },
    { label: 'Reviews', href: '/admin/dashboard/reviews', icon: Star },
    { label: 'Brands', href: '/admin/dashboard/brands', icon: Tag },
    { label: 'Guides', href: '/admin/dashboard/guides', icon: FileText },
    { label: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-chacha-black flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3 }}
        className="bg-chacha-card border-r border-chacha-border fixed h-full z-20"
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-chacha-yellow rounded-full flex items-center justify-center">
              <span className="text-chacha-black font-bold">VC</span>
            </div>
            {sidebarOpen && (
              <span className="text-white font-bold">
                Vehicle<span className="text-chacha-yellow">Chacha</span>
              </span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-chacha-muted hover:text-white transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-chacha-muted hover:text-white hover:bg-chacha-black transition-colors"
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-4 left-4 right-4 flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-chacha-muted mt-1">Welcome back, Admin!</p>
            </div>
            <Link
              href="/admin/dashboard/vehicles/new"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Add Vehicle
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="card-dark p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-chacha-black rounded-lg flex items-center justify-center">
                    <stat.icon className={stat.color} size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-chacha-muted text-sm">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/dashboard/vehicles/new" className="card-dark p-6 hover:border-chacha-yellow transition-all text-center">
              <Plus className="text-chacha-yellow mx-auto mb-2" size={32} />
              <div className="text-white font-semibold">Add Vehicle</div>
            </Link>
            <Link href="/admin/dashboard/vehicles" className="card-dark p-6 hover:border-chacha-yellow transition-all text-center">
              <Car className="text-chacha-yellow mx-auto mb-2" size={32} />
              <div className="text-white font-semibold">Manage Vehicles</div>
            </Link>
            <Link href="/admin/dashboard/reviews" className="card-dark p-6 hover:border-chacha-yellow transition-all text-center">
              <Star className="text-chacha-yellow mx-auto mb-2" size={32} />
              <div className="text-white font-semibold">View Reviews</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}