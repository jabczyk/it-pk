import { Link, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  Globe,
  MapPin,
  LogOut,
  Mail
} from 'lucide-react'

export function PublicLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="h-screen bg-white font-sans text-slate-800 antialiased flex flex-col overflow-hidden">
      {/* 1. Header / Top Navigation */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-50 shrink-0">
        <Link to="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
          {/* Krakow University Emblem Representation */}
          <div className="w-8 h-8 rounded-full bg-[#021124] flex items-center justify-center text-white font-bold text-xs tracking-wider">
            PK
          </div>
          <span className="font-bold text-xs sm:text-[13px] tracking-widest text-[#021124] uppercase">
            Faculty of Computer Science and Mathematics
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/recruitment" className="text-[13px] font-semibold text-slate-500 hover:text-[#021124] transition-colors">Recruitment</Link>
            <Link to="/departments-info" className="text-[13px] font-semibold text-slate-500 hover:text-[#021124] transition-colors">Departments</Link>
            <Link to="/research-info" className="text-[13px] font-semibold text-slate-500 hover:text-[#021124] transition-colors">Research</Link>
            <Link to="/news-info" className="text-[13px] font-semibold text-slate-500 hover:text-[#021124] transition-colors">News</Link>
            <Link to="/about" className="text-[13px] font-semibold text-slate-500 hover:text-[#021124] transition-colors">About</Link>
            <Link to="/contact" className="text-[13px] font-semibold text-slate-500 hover:text-[#021124] transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="#"
              className="flex items-center gap-2 bg-[#021124] hover:bg-[#0f172a] text-white px-4 py-2 rounded-sm text-[13px] font-medium transition-all shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-[#84cc16]" />
              <span>Virtual Tour</span>
            </Link>

            {!user
              ? (
                <Link
                  to="/login"
                  className="text-[13px] font-bold text-[#021124] hover:text-white border border-[#021124]/20 hover:bg-[#021124] px-4 py-2 rounded-sm transition-all"
                >
                  Sign In
                </Link>
              )
              : (
                <div className="flex items-center gap-3 pl-3 border-l border-slate-150">
                  <Link
                    to="/dashboard"
                    className="hidden rounded-sm px-2 py-1 transition-colors hover:bg-slate-100 sm:flex sm:flex-col sm:items-end"
                    title="Open dashboard"
                  >
                    <span className="text-[12px] font-bold text-slate-700 leading-none">
                      {user.displayName || 'User'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 leading-none">
                      {user.email}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Log Out"
                    className="text-slate-500 hover:text-red-600 transition-colors p-1.5 hover:bg-slate-100 rounded-full"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
          </div>
        </div>
      </header>

      {/* Scrollable container for Content and Footer */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* 2. Page Content */}
        <main className="flex-1 flex flex-col bg-white">
          <Outlet />
        </main>

        {/* 3. Footer */}
        <footer className="bg-[#f8fafc] border-t border-slate-200/60 py-12 px-6 shrink-0 mt-auto">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200/40">
              {/* Column 1 (University Info) */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <div>
                  <h4 className="text-[13px] font-bold text-[#021124] uppercase tracking-wider">Krakow University of Technology</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    Warszawska 24, 31-155 Krakow, Poland<br />
                    Dean's Office: +48 12 628 20 00
                  </p>
                </div>

                <div className="flex items-center gap-3 text-slate-400 mt-2">
                  <a href="#" className="hover:text-[#021124] transition-colors"><Globe className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-[#021124] transition-colors"><Mail className="w-4 h-4" /></a>
                </div>
              </div>

              {/* Column 2 (Quick Links) */}
              <div className="md:col-span-3">
                <h4 className="text-[13px] font-bold text-[#021124] uppercase tracking-wider">Quick Links</h4>
                <div className="flex flex-col gap-2 mt-4 text-xs">
                  <Link to="#" className="text-slate-500 hover:text-[#021124] transition-colors">Staff Directory</Link>
                  <Link to="#" className="text-slate-500 hover:text-[#021124] transition-colors">Intranet</Link>
                  <Link to="#" className="text-slate-500 hover:text-[#021124] transition-colors">Library</Link>
                </div>
              </div>

              {/* Column 3 (Legal) */}
              <div className="md:col-span-2">
                <h4 className="text-[13px] font-bold text-[#021124] uppercase tracking-wider">Legal</h4>
                <div className="flex flex-col gap-2 mt-4 text-xs">
                  <a href="#" className="text-slate-500 hover:text-[#021124] transition-colors">Privacy Policy</a>
                  <a href="#" className="text-slate-500 hover:text-[#021124] transition-colors">Accessibility Statement</a>
                </div>
              </div>

              {/* Column 4 (Newsletter) */}
              <div className="md:col-span-3">
                <h4 className="text-[13px] font-bold text-[#021124] uppercase tracking-wider">Faculty Newsletter</h4>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Stay updated with our latest research and events.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center mt-3 border border-slate-200 rounded overflow-hidden max-w-xs shadow-sm bg-white">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="flex-1 bg-white px-3 py-2 text-xs focus:outline-none placeholder:text-slate-400 text-slate-800"
                  />
                  <button type="submit" className="bg-[#021124] text-white p-2 hover:bg-[#0f172a] transition-colors" aria-label="Subscribe">
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

            <div className="pt-6 text-center">
              <span className="text-[11px] text-slate-400">
                &copy; {new Date().getFullYear()} Krakow University of Technology, Faculty of Computer Science and Mathematics.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
