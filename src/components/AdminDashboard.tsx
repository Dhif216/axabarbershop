'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, LogOut, RefreshCw, Bell } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  status: string;
  price: number;
  notes?: string;
  createdAt: string;
}

interface AdminDashboardProps {
  initialToken?: string | null;
  onLogout?: () => void;
}

export function AdminDashboard({ initialToken, onLogout }: AdminDashboardProps = {}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [password, setPassword] = useState('');
  const [adminToken, setAdminToken] = useState<string | null>(initialToken || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [previousBookingCount, setPreviousBookingCount] = useState(0);
  const audioRef = useRef<any>(null);

  // Initialize audio context for bell sound with ringing effect
  useEffect(() => {
    let audioContext: AudioContext | null = null;

    const createRingingBellSound = () => {
      // Create or resume audio context
      if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Resume if suspended (due to autoplay policies)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const now = audioContext.currentTime;
      const ringCount = 4; // Ring 4 times
      const ringDuration = 2; // Each ring lasts 2 seconds
      const pauseBetweenRings = 0.3; // Pause between rings
      
      for (let ring = 0; ring < ringCount; ring++) {
        const ringStartTime = now + (ring * (ringDuration + pauseBetweenRings));
        
        // Create harmonics for a richer bell sound
        const frequencies = [523.25, 659.25, 783.99, 1046.5];
        
        frequencies.forEach((freq, index) => {
          const osc = audioContext!.createOscillator();
          const gain = audioContext!.createGain();
          
          osc.connect(gain);
          gain.connect(audioContext!.destination);
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ringStartTime);
          
          // Quick attack, natural decay for each ring
          gain.gain.setValueAtTime(0, ringStartTime);
          gain.gain.linearRampToValueAtTime(0.25, ringStartTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, ringStartTime + ringDuration);
          
          osc.start(ringStartTime);
          osc.stop(ringStartTime + ringDuration);
        });
      }
      
      // Add bass resonance for the rings
      for (let ring = 0; ring < ringCount; ring++) {
        const ringStartTime = now + (ring * (ringDuration + pauseBetweenRings));
        const bassOsc = audioContext!.createOscillator();
        const bassGain = audioContext!.createGain();
        
        bassOsc.connect(bassGain);
        bassGain.connect(audioContext!.destination);
        
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(220, ringStartTime);
        
        bassGain.gain.setValueAtTime(0.05, ringStartTime);
        bassGain.gain.exponentialRampToValueAtTime(0.01, ringStartTime + ringDuration);
        
        bassOsc.start(ringStartTime);
        bassOsc.stop(ringStartTime + ringDuration);
      }
    };
    
    audioRef.current = { play: createRingingBellSound };

    // Cleanup
    return () => {
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, []);

  // Detect new bookings and show notification
  useEffect(() => {
    if (!isLoggedIn) return; // Don't trigger if not logged in
    
    if (bookings.length > previousBookingCount) {
      // Get the newest booking
      const newestBooking = bookings[0];
      
      // Play bell sound
      try {
        audioRef.current?.play();
      } catch (e) {
        console.error('Bell sound error:', e);
      }
      
      // Show large centered notification with ringing animation
      setTimeout(() => {
        toast.custom(
          () => (
            <div className="flex items-center justify-center w-full">
              <div 
                className="
                  bg-gradient-to-br from-amber-600 to-amber-700 
                  rounded-3xl p-8 shadow-2xl
                  border-4 border-amber-400
                  max-w-lg w-full mx-4
                  animate-bounce
                "
                style={{
                  animation: 'ring 0.5s ease-in-out infinite',
                }}
              >
                <style>{`
                  @keyframes ring {
                    0%, 100% { transform: rotate(0deg) scale(1); }
                    10% { transform: rotate(-8deg) scale(1.05); }
                    20% { transform: rotate(8deg) scale(1.05); }
                    30% { transform: rotate(-8deg) scale(1.05); }
                    40% { transform: rotate(8deg) scale(1.05); }
                    50% { transform: rotate(-4deg) scale(1.02); }
                    60% { transform: rotate(4deg) scale(1.02); }
                    70% { transform: rotate(-2deg) scale(1.01); }
                    80% { transform: rotate(2deg) scale(1.01); }
                    90% { transform: rotate(0deg) scale(1); }
                  }
                `}</style>
                
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Bell className="h-20 w-20 text-yellow-300 animate-bounce mx-auto" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-3">New Booking!</h2>
                  <div className="w-full border-t-2 border-amber-400 my-4"></div>
                  <p className="text-2xl font-semibold text-white mb-2">{newestBooking.name}</p>
                  <p className="text-lg text-amber-100 mb-4 font-medium">{newestBooking.service}</p>
                  <div className="text-base text-amber-50 space-y-2">
                    <p>
                      📅 {new Date(newestBooking.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p>
                      ⏰ {newestBooking.time}
                    </p>
                    {newestBooking.phone && (
                      <p>
                        📞 {newestBooking.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ),
          {
            duration: 7000,
            position: 'top-center',
            id: 'booking-notification',
          }
        );
      }, 100);
      
      setPreviousBookingCount(bookings.length);
    }
  }, [bookings.length, isLoggedIn]);

  // Auto-refresh bookings every 3 seconds when logged in
  useEffect(() => {
    if (!isLoggedIn || !adminToken) return;

    const interval = setInterval(() => {
      fetchBookings();
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoggedIn, adminToken]);

  const fetchBookings = async () => {
    if (!adminToken) return;
    try {
      const response = await fetch('/api/admin/bookings', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/bookings', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${password}`,
        },
      });

      if (!response.ok) {
        setError('Invalid password');
        setLoading(false);
        return;
      }

      const data = await response.json();
      setBookings(data);
      setIsLoggedIn(true);
      setAdminToken(password);
      setPassword('');
      setPreviousBookingCount(data.length); // Initialize previous count
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed - ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    if (!adminToken) return;
    try {
      const response = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setBookings(
          bookings.map((b) =>
            b.id === id ? { ...b, status: newStatus } : b
          )
        );
      }
    } catch (err) {
      setError('Failed to update booking');
    }
  };

  const handleDelete = async (id: string) => {
    if (!adminToken) return;
    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(`/api/admin/bookings?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
          },
        });

        if (response.ok) {
          setBookings(bookings.filter((b) => b.id !== id));
        }
      } catch (err) {
        setError('Failed to delete booking');
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdminToken(null);
    setBookings([]);
    if (onLogout) {
      onLogout();
    }
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-white shadow-2xl border-0">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-700 to-amber-600 bg-clip-text text-transparent mb-2">
              AXA
            </h1>
            <p className="text-slate-600 text-lg font-semibold">Admin Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="h-11 border-slate-300"
            />

            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white font-semibold" 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  const filteredBookings = bookings.filter((b) =>
    filterStatus === 'all' ? true : b.status === filterStatus
  );

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    completedRevenue: bookings
      .filter((b) => b.status === 'completed')
      .reduce((sum, b) => sum + (b.price || 0), 0),
    confirmedRevenue: bookings
      .filter((b) => b.status === 'confirmed')
      .reduce((sum, b) => sum + (b.price || 0), 0),
    cancelledRevenue: bookings
      .filter((b) => b.status === 'cancelled')
      .reduce((sum, b) => sum + (b.price || 0), 0),
  };

  // Service breakdown data
  const serviceData = Object.entries(
    bookings.reduce((acc, booking) => {
      acc[booking.service] = (acc[booking.service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Booking trends by date
  const trendData = Object.entries(
    bookings.reduce((acc, booking) => {
      const date = new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([date, count]) => ({ date, bookings: count }));

  // Peak hours data
  const hoursData = Object.entries(
    bookings.reduce((acc, booking) => {
      const hour = booking.time.split(':')[0];
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([hour, count]) => ({ time: `${hour}:00`, bookings: count }));

  // Status distribution
  const statusData = [
    { name: 'Confirmed', value: stats.confirmed, fill: '#3b82f6' },
    { name: 'Completed', value: stats.completed, fill: '#10b981' },
    { name: 'Cancelled', value: stats.cancelled, fill: '#ef4444' },
  ].filter((item) => item.value > 0);

  // Revenue by month
  const monthlyData = Object.entries(
    bookings.reduce((acc, booking) => {
      const month = new Date(booking.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      acc[month] = (acc[month] || 0) + (booking.price || 0);
      return acc;
    }, {} as Record<string, number>)
  )
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([month, revenue]) => ({ month, revenue: Math.round(revenue * 100) / 100 }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <Toaster 
        theme="dark"
        richColors
        closeButton
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Booking Management</h1>
            <p className="text-slate-400">Manage customer reservations</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-500 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Live indicator */}
        <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-green-400 text-sm font-medium">Live updates enabled - refreshing every 3 seconds</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
            <h3 className="text-slate-400 text-sm font-medium">Total Bookings</h3>
            <p className="text-4xl font-bold text-white mt-2">{stats.total}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-600">
            <h3 className="text-blue-300 text-sm font-medium">Confirmed</h3>
            <p className="text-4xl font-bold text-blue-400 mt-2">{stats.confirmed}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-600">
            <h3 className="text-green-300 text-sm font-medium">Completed</h3>
            <p className="text-4xl font-bold text-green-400 mt-2">{stats.completed}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-red-900/50 to-red-800/50 border-red-600">
            <h3 className="text-red-300 text-sm font-medium">Cancelled</h3>
            <p className="text-4xl font-bold text-red-400 mt-2">{stats.cancelled}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 border-yellow-600">
            <h3 className="text-yellow-300 text-sm font-medium">Completed Revenue</h3>
            <p className="text-4xl font-bold text-yellow-400 mt-2">€{stats.completedRevenue.toFixed(2)}</p>
          </Card>
        </div>

        {/* Revenue Breakdown Row */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-600">
            <h3 className="text-blue-300 text-sm font-medium">Potential Revenue (Confirmed)</h3>
            <p className="text-4xl font-bold text-blue-400 mt-2">€{stats.confirmedRevenue.toFixed(2)}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-red-900/50 to-red-800/50 border-red-600">
            <h3 className="text-red-300 text-sm font-medium">Cancelled Revenue</h3>
            <p className="text-4xl font-bold text-red-400 mt-2">€{stats.cancelledRevenue.toFixed(2)}</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <Card className="p-6 bg-slate-800 border-slate-600">
            <h3 className="text-white font-semibold mb-4">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ color: '#94a3b8' }} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#eab308" 
                  strokeWidth={2}
                  dot={{ fill: '#eab308' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Service Breakdown */}
          <Card className="p-6 bg-slate-800 border-slate-600">
            <h3 className="text-white font-semibold mb-4">Service Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                  <Cell fill="#8b5cf6" />
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Booking Trends */}
          <Card className="p-6 bg-slate-800 border-slate-600">
            <h3 className="text-white font-semibold mb-4">Booking Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="bookings" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Status Distribution */}
          <Card className="p-6 bg-slate-800 border-slate-600">
            <h3 className="text-white font-semibold mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Peak Hours */}
          <Card className="p-6 bg-slate-800 border-slate-600 md:col-span-2">
            <h3 className="text-white font-semibold mb-4">Peak Booking Hours</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="bookings" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {['all', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              onClick={() => setFilterStatus(status)}
              className={`capitalize font-semibold ${
                filterStatus === status
                  ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600'
                  : 'border-slate-600 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Bookings Table */}
        <Card className="overflow-hidden bg-slate-800 border-slate-600">
          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-lg">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900 border-b border-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Notes</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-slate-600 hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-200">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-200">{booking.time}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-slate-100">{booking.name}</p>
                          <p className="text-slate-400">{booking.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-200">{booking.service}</td>
                      <td className="px-6 py-4 text-sm text-slate-200">{booking.phone}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {booking.notes ? (
                          <span className="bg-slate-700/50 px-3 py-1 rounded text-xs max-w-xs truncate block" title={booking.notes}>
                            {booking.notes}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleUpdateStatus(booking.id, e.target.value)
                          }
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${getStatusColor(booking.status)} bg-slate-700 cursor-pointer`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(booking.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
