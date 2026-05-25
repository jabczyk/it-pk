import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Edit3, GraduationCap, Settings } from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Schedule', icon: CalendarDays, path: '/schedule' },
    { name: 'News Editor', icon: Edit3, path: '/news-editor' },
    { name: 'Student Records', icon: GraduationCap, path: '/records' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-[240px] border-r border-slate-200 bg-[#f8fafc] flex flex-col shrink-0">
      <div className="px-6 py-6 border-b border-transparent">
        <h2 className="text-[14px] font-medium text-slate-800 tracking-tight">Academic Portal</h2>
        <p className="text-[12px] text-slate-500 font-medium mt-0.5">CS & Math Faculty</p>
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `relative flex items-center gap-3 px-6 py-3.5 text-[14px] transition-all
              ${isActive 
                ? 'text-[#0f172a] font-bold bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]' 
                : 'text-slate-500 font-medium hover:text-[#0f172a] hover:bg-slate-50'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#65a30d]" />}
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#0f172a]' : 'text-slate-400'}`} strokeWidth={2.2} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
