import { useState, useEffect, useCallback } from 'react'

const API = 'http://localhost:3001/api'

const TYPE_COLORS = {
  security: 'border-l-red-500',
  system: 'border-l-blue-500',
  billing: 'border-l-emerald-500',
  feature: 'border-l-amber-500',
}

function NotificationItem({ item, onMarkRead }) {
  const [marking, setMarking] = useState(false)

  const handleMark = useCallback(async () => {
    setMarking(true)
    try {
      const res = await fetch(`${API}/notifications/${item.id}/read`, { method: 'PATCH' })
      if (!res.ok) {
        alert((await res.json()).error)
        setMarking(false)
        return
      }
      onMarkRead(item.id)
    } catch {
      alert('Failed to mark as read. Check your connection.')
      setMarking(false)
    }
  }, [item.id, onMarkRead])

  return (
    <div className={`border-l-4 ${TYPE_COLORS[item.type] || 'border-l-gray-400'} bg-white rounded-lg p-4 shadow-sm ${item.isRead ? 'opacity-60' : 'bg-blue-50'}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-200">{item.type}</span>
        <span className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleString()}</span>
      </div>
      <p className="text-sm leading-relaxed mb-2">{item.message}</p>
      {!item.isRead && (
        <button
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-xs font-medium px-4 py-1.5 rounded-md transition cursor-pointer disabled:cursor-not-allowed"
          onClick={handleMark}
          disabled={marking}
        >
          {marking ? 'Marking...' : 'Mark as Read'}
        </button>
      )}
    </div>
  )
}

function App() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [unreadOnly, setUnreadOnly] = useState(false)

  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const url = `${API}/notifications${unreadOnly ? '?unreadOnly=true' : ''}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      setNotifications(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [unreadOnly])

  useEffect(() => { fetchNotifications() }, [fetchNotifications])

  const handleMarkRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
  }, [])

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="max-w-xl mx-auto p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">{unreadCount} unread</span>
      </header>

      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={e => setUnreadOnly(e.target.checked)}
            className="accent-blue-500"
          />
          Unread only
        </label>
      </div>

      {loading && <p className="text-center py-8 text-gray-400 text-sm">Loading...</p>}
      {error && <p className="text-center py-8 text-red-500 text-sm">Error: {error}</p>}
      {!loading && !error && notifications.length === 0 && (
        <p className="text-center py-8 text-gray-400 text-sm">No notifications.</p>
      )}

      <div className="space-y-2.5">
        {!loading && !error && notifications.map(n => (
          <NotificationItem key={n.id} item={n} onMarkRead={handleMarkRead} />
        ))}
      </div>
    </div>
  )
}

export default App
