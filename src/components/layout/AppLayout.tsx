import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export function AppLayout() {
  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] font-sans">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto flex flex-col relative bg-slate-50/50">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}
