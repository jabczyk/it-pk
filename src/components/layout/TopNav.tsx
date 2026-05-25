import React from 'react';
import { Search, Bell, UserCircle2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function TopNav() {
  return (
    <header className="h-[68px] border-b border-slate-200 bg-white flex items-center px-6 shrink-0 z-30 relative">
      <div className="flex items-center gap-8 w-full">
        {/* Logo */}
        <div className="font-bold text-[19px] tracking-tight text-[#0f172a] min-w-[200px]">
          Faculty of CS & Math
        </div>

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
          <button className="text-[#0f172a] hover:opacity-70 transition-opacity">
            <UserCircle2 className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
