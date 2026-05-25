import React, { useState, useEffect } from 'react';
import { ScheduleGrid, DayData } from '../components/ScheduleGrid';
import { EventData } from '../components/ScheduleEvent';
import { Download, ChevronDown, ChevronLeft, ChevronRight } from '../components/Icons';

export function SchedulePage() {
  const [events, setEvents] = useState<EventData[]>([]);
  // Default to a Monday for initial state
  const [weekStart, setWeekStart] = useState<Date>(new Date(2024, 9, 14)); // Oct 14, 2024

  useEffect(() => {
    import('../data/schedule.json').then((module) => {
      setEvents(module.default as EventData[]);
    });
  }, []);

  const handlePrevWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() - 7);
    setWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() + 7);
    setWeekStart(newDate);
  };

  // Generate days based on weekStart
  const days: DayData[] = [1, 2, 3, 4, 5].map(offset => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + offset - 1);
    
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    const dayName = d.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    
    const fullDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    return {
      id: offset,
      name: dayName,
      date: `${month} ${day}`,
      fullDate
    };
  });

  return (
    <div className="w-full font-sans text-slate-900 flex flex-col">
      <div className="max-w-[1100px] w-full mx-auto p-6 md:p-8 flex flex-col">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[13px] text-slate-400 mb-4 font-medium shrink-0">
          <span className="hover:text-slate-600 cursor-pointer transition-colors">Portal</span>
          <span className="text-slate-300">&gt;</span>
          <span className="text-slate-800 font-bold">Student Schedule</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 shrink-0">
          <div>
            <h1 className="text-[26px] md:text-3xl text-slate-800 tracking-tight mb-1 font-normal">
              Weekly Academic Schedule
            </h1>
            <p className="text-slate-500 text-[14px] md:text-base flex items-center gap-2">
              Winter Semester 2024/2025 <span className="text-slate-400">•</span> Group CS-2B
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Week Navigation */}
            <div className="flex items-center bg-white border border-slate-200 rounded text-slate-600 shadow-sm mr-2">
              <button 
                onClick={handlePrevWeek} 
                className="p-2 hover:bg-slate-50 transition-colors border-r border-slate-200"
                aria-label="Previous week"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextWeek} 
                className="p-2 hover:bg-slate-50 transition-colors"
                aria-label="Next week"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dropdowns */}
            <div className="hidden md:flex bg-white border border-slate-200 rounded text-[14px] font-bold text-slate-700 shadow-sm">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition-colors border-r border-slate-200">
                Winter 2024 <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition-colors">
                Group CS <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Export Button */}
            <button className="flex items-center gap-2 bg-[#021124] hover:bg-[#0f172a] text-white px-4 py-2 rounded shadow-sm transition-colors text-[14px] font-medium">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>

        {/* The Grid */}
        <div className="relative">
          <ScheduleGrid events={events} days={days} />
        </div>
      </div>
    </div>
  );
}
