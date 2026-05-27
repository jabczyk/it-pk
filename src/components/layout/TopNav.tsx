import { Search, Bell, LogOut } from 'lucide-react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function TopNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="h-[68px] border-b border-slate-200 bg-white flex items-center px-6 shrink-0 z-30 relative">
      <div className="flex items-center gap-8 w-full">
        {/* Logo */}
        <Link to="/" className="font-bold text-[19px] tracking-tight text-[#0f172a] min-w-[200px] hover:opacity-85 transition-opacity">
          Faculty of CS & Math
        </Link>

        {/* Main Nav */}
        <nav className="flex items-center gap-6 flex-1">
          <NavLink to="/schedule" className={({isActive}) => `text-[14px] font-semibold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}>Schedule</NavLink>
          <NavLink to="/news-editor" className={({isActive}) => `text-[14px] font-semibold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}>News</NavLink>
          <NavLink to="/research" className={({isActive}) => `text-[14px] transition-colors ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500 font-semibold hover:text-slate-800'}`}>Research</NavLink>
          <NavLink to="/faculty" className={({isActive}) => `text-[14px] transition-colors ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500 font-semibold hover:text-slate-800'}`}>Faculty</NavLink>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Portal..." 
              className="w-full bg-white border border-slate-200 rounded-sm text-[13px] py-1.5 pl-9 pr-3 focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400 text-slate-800"
            />
          </div>
          
          {/* Actions */}
          <button className="text-[#0f172a] hover:opacity-70 transition-opacity">
            <Bell className="w-5 h-5" strokeWidth={2.5} />
          </button>
          
          {/* User Details & Logout */}
          {user && (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <Link
                to="/dashboard"
                className="flex flex-col items-end rounded-sm px-2 py-1 transition-colors hover:bg-slate-100"
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
  );
}
