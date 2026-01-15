'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { Trash2, Eye } from 'lucide-react'

interface AdminUser {
  id: string
  email: string
  created_at: string
}

export default function UserManagementPage() {
  const { user, session, loading: authLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchingUsers, setFetchingUsers] = useState(true)

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login')
    }
  }, [user, authLoading, router])

  // Fetch admin users
  useEffect(() => {
    if (user) {
      fetchAdminUsers()
    }
  }, [user])

  const fetchAdminUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      })

      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setAdminUsers(data)
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch users')
    } finally {
      setFetchingUsers(false)
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create user')
      }

      toast.success('Admin user created successfully!')
      setEmail('')
      setPassword('')
      await fetchAdminUsers()
    } catch (error: any) {
      toast.error(error.message || 'Error creating user')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete user')
      }

      toast.success('User deleted successfully!')
      await fetchAdminUsers()
    } catch (error: any) {
      toast.error(error.message || 'Error deleting user')
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin User Management</h1>
          <p className="text-slate-400">Manage admin accounts for AXA Barbershop</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New User */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="newadmin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Temporary Password</label>
                <Input
                  type="password"
                  placeholder="Temporary password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Creating...' : 'Create Admin User'}
              </Button>
            </form>

            <p className="text-xs text-slate-400 mt-4">
              Note: The user can change their password after first login
            </p>
          </Card>

          {/* Admin Users List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Current Admins</h2>

              {fetchingUsers ? (
                <p className="text-slate-400">Loading users...</p>
              ) : adminUsers.length === 0 ? (
                <p className="text-slate-400">No admin users yet</p>
              ) : (
                <div className="space-y-3">
                  {adminUsers.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center justify-between p-4 bg-slate-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          {admin.email}
                        </p>
                        <p className="text-sm text-slate-400">
                          Created: {new Date(admin.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteUser(admin.id)}
                        className="p-2 hover:bg-red-600/20 rounded text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
