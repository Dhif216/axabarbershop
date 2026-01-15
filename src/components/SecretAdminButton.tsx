'use client';

import { useState, useRef } from 'react';
import { Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { AdminDashboard } from './AdminDashboard';

export function SecretAdminButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSecretClick = () => {
    clickCountRef.current += 1;

    // Clear previous timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Reset click count after 2 seconds of inactivity
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);

    // Triple-click triggers modal
    if (clickCountRef.current === 3) {
      setIsModalOpen(true);
      clickCountRef.current = 0;
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

      // Login successful
      setAdminToken(password);
      setPassword('');
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed - ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  // If logged in, show the full admin dashboard
  if (adminToken) {
    return (
      <div>
        <AdminDashboard initialToken={adminToken} onLogout={() => setAdminToken(null)} />
      </div>
    );
  }

  return (
    <>
      {/* Secret Icon - positioned in bottom left corner, small and discrete */}
      <button
        onClick={handleSecretClick}
        className="fixed bottom-6 left-6 p-3 text-amber-600 hover:text-amber-700 transition-colors opacity-70 hover:opacity-100 z-40"
        title="Triple-click for admin access"
        aria-label="Secret admin button"
      >
        <Lock className="h-6 w-6" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-8 bg-white shadow-2xl border-0">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-600 bg-clip-text text-transparent mb-2">
                AXA
              </h1>
              <p className="text-slate-600 text-sm font-semibold">Admin Portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
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
                autoFocus
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setPassword('');
                    setError(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white font-semibold"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
