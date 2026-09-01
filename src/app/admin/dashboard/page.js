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
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Activity,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Award,
  Flame,
  MessageCircle 
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalBrands: 0,
    totalReviews: 0,
    totalGuides: 0,
    popularVehicles: 0,
    availableVehicles: 0,
    pendingReviews: 0,
    approvedReviews: 0,
    averageRating: 0,
  });
  const [recentVehicles, setRecentVehicles] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

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
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', { cache: 'no-store' });
      const data = await response.json();
      if (response.ok) {
        setStats(data.stats);
        setRecentVehicles(data.recentVehicles || []);
        setRecentReviews(data.recentReviews || []);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Mashwara', href: '/admin/dashboard/mashwara', icon: MessageCircle },
    { label: 'Vehicles', href: '/admin/dashboard/vehicles', icon: Car },
    { label: 'Add Vehicle', href: '/admin/dashboard/vehicles/new', icon: Plus },
    { label: 'Reviews', href: '/admin/dashboard/reviews', icon: Star },
    { label: 'Brands', href: '/admin/dashboard/brands', icon: Tag },
    { label: 'Guides', href: '/admin/dashboard/guides', icon: FileText },
    { label: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
  ];

  const statCards = [
    { 
      label: 'Total Vehicles', 
      value: stats.totalVehicles, 
      icon: Car, 
      color: 'text-chacha-yellow', 
      bg: 'bg-chacha-yellow/10',
      href: '/admin/dashboard/vehicles',
      sub: `${stats.availableVehicles} available`,
    },
    { 
      label: 'Total Brands', 
      value: stats.totalBrands, 
      icon: Tag, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10',
      href: '/admin/dashboard/brands',
      sub: 'All brands',
    },
    { 
      label: 'Total Reviews', 
      value: stats.totalReviews, 
      icon: Star, 
      color: 'text-green-500', 
      bg: 'bg-green-500/10',
      href: '/admin/dashboard/reviews',
      sub: `${stats.pendingReviews} pending`,
    },
    { 
      label: 'Avg Rating', 
      value: stats.averageRating, 
      icon: Award, 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10',
      href: '/admin/dashboard/reviews',
      sub: `${stats.approvedReviews} approved reviews`,
    },
    { 
      label: 'Popular Cars', 
      value: stats.popularVehicles, 
      icon: Flame, 
      color: 'text-orange-500', 
      bg: 'bg-orange-500/10',
      href: '/admin/dashboard/vehicles',
      sub: 'Marked as popular',
    },
    { 
      label: 'Guides', 
      value: stats.totalGuides, 
      icon: FileText, 
      color: 'text-pink-500', 
      bg: 'bg-pink-500/10',
      href: '/admin/dashboard/guides',
      sub: 'Total guides',
    },
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
          {menuItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-chacha-yellow/10 text-chacha-yellow border-r-2 border-chacha-yellow'
                    : 'text-chacha-muted hover:text-white hover:bg-chacha-black'
                }`}
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-chacha-muted mt-1">Real-time overview of VehicleChacha</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchStats}
                className="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              <Link
                href="/admin/dashboard/vehicles/new"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Add Vehicle
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={stat.href}
                  className="card-dark p-5 block hover:border-chacha-yellow transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                      <stat.icon className={stat.color} size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-chacha-muted text-sm">{stat.label}</div>
                    </div>
                  </div>
                  <div className="text-chacha-muted text-xs mt-2">{stat.sub}</div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Recent Vehicles & Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Vehicles */}
            <div className="card-dark p-5">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Car className="text-chacha-yellow" size={20} />
                Recently Added Vehicles
              </h3>
              {recentVehicles.length === 0 ? (
                <p className="text-chacha-muted text-sm text-center py-6">No vehicles yet</p>
              ) : (
                <div className="space-y-3">
                  {recentVehicles.map((vehicle) => (
                    <Link
                      key={vehicle.id}
                      href={`/admin/dashboard/vehicles/${vehicle.id}/edit`}
                      className="flex items-center gap-3 p-3 bg-chacha-black rounded-lg hover:border-chacha-yellow border border-transparent transition-all"
                    >
                      <div className="w-10 h-10 bg-chacha-card rounded-lg flex items-center justify-center">
                        <Car size={18} className="text-chacha-yellow" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">
                          {vehicle.brand?.name} {vehicle.name}
                        </div>
                        <div className="text-chacha-muted text-xs">
                          Rs. {(vehicle.price / 100000).toFixed(1)} Lakh
                        </div>
                      </div>
                      {vehicle.isPopular && (
                        <Flame size={16} className="text-orange-500" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Reviews */}
            <div className="card-dark p-5">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Star className="text-chacha-yellow" size={20} />
                Recent Reviews
              </h3>
              {recentReviews.length === 0 ? (
                <p className="text-chacha-muted text-sm text-center py-6">No reviews yet</p>
              ) : (
                <div className="space-y-3">
                  {recentReviews.map((review) => (
                    <Link
                      key={review.id}
                      href="/admin/dashboard/reviews"
                      className="flex items-center gap-3 p-3 bg-chacha-black rounded-lg hover:border-chacha-yellow border border-transparent transition-all"
                    >
                      <div className="w-10 h-10 bg-chacha-card rounded-lg flex items-center justify-center">
                        <Star size={18} className="text-chacha-yellow" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{review.userName}</div>
                        <div className="text-chacha-muted text-xs">
                          {review.vehicle?.brand?.name} {review.vehicle?.name}
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className={i < review.rating ? 'fill-chacha-yellow text-chacha-yellow' : 'text-chacha-border'} />
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}