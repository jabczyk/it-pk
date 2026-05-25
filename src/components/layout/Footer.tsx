import React from 'react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#f8fafc] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-slate-500 tracking-wider uppercase shrink-0 w-full">
      <p>© 2024 Krakow University of Technology. Faculty of Computer Science and Mathematics.</p>
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-slate-800 transition-colors">Contact</a>
        <a href="#" className="hover:text-slate-800 transition-colors">BIP</a>
        <a href="#" className="hover:text-slate-800 transition-colors">Staff Directory</a>
      </div>
    </footer>
  );
}
