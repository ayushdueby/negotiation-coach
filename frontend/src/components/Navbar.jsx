import { Link, useLocation } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const isNegotiate = location.pathname === '/negotiate'

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Negotiate<span className="text-red-600">AI</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-3">
            {isNegotiate ? (
              <Link to="/" className="btn-secondary text-sm py-2 px-4">
                ← Back
              </Link>
            ) : (
              <Link to="/negotiate" className="btn-primary text-sm py-2 px-5">
                Start Coaching
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
