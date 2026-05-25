import React from 'react';
import { ScheduleEvent, EventData } from './ScheduleEvent';

export interface DayData {
  id: number;
  name: string;
  date: string;
  fullDate: string;
}

interface ScheduleGridProps {
  events: EventData[];
  days: DayData[];
}

const START_HOUR = 5.5; // 05:30 (provides 0.5hr top padding before 06:00)
const END_HOUR = 22.5; // 22:30 (provides 0.5hr bottom padding after 22:00)
const HOUR_HEIGHT_REM = 6; 

export function ScheduleGrid({ events, days }: ScheduleGridProps) {
  // Generate hour markers from 6 to 22
  const hours = Array.from({ length: 17 }, (_, i) => 6 + i);
  const totalHeightRem = (END_HOUR - START_HOUR) * HOUR_HEIGHT_REM;

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm flex flex-col min-h-[500px] relative">
      {/* Header - Sticky */}
      <div className="flex border-b border-slate-200 bg-white sticky top-0 z-30 shrink-0">
        <div className="w-20 md:w-24 shrink-0 flex items-center justify-center border-r border-slate-200 bg-[#f8fafc]">
          <span className="text-[12px] font-bold text-slate-400 tracking-widest uppercase">Time</span>
        </div>
        {days.map(day => (
          <div key={day.id} className="flex-1 flex flex-col items-center justify-center py-4 border-r last:border-r-0 border-slate-200 min-w-[120px] bg-white">
            <span className="text-[14px] font-bold text-[#0f172a] tracking-wide">{day.name}</span>
            <span className="text-[13px] text-slate-400 mt-0.5">{day.date}</span>
          </div>
        ))}
      </div>

      {/* Body - Contains absolute elements so needs explicit height */}
      <div className="flex relative bg-white shrink-0" style={{ height: `${totalHeightRem}rem` }}>
        
        {/* Vertical Lines */}
        <div className="absolute inset-0 pointer-events-none z-10 flex">
          {/* Label Column Background */}
          <div className="w-20 md:w-24 shrink-0 border-r border-slate-200 bg-white sticky left-0" />
          {/* Day Columns Lines */}
          {days.map(day => (
            <div key={day.id} className="flex-1 border-r last:border-r-0 border-slate-200 min-w-[120px]" />
          ))}
        </div>

        {/* Hour Markers (6:00 to 22:00) */}
        {hours.map(hour => {
          const topPos = (hour - START_HOUR) * HOUR_HEIGHT_REM;
          return (
            <div 
              key={hour} 
              className="absolute left-0 right-0 z-10 pointer-events-none flex"
              style={{ top: `${topPos}rem` }}
            >
              <div className="w-20 md:w-24 shrink-0 sticky left-0 flex justify-center -mt-2.5">
                <span className="text-[13px] font-medium text-slate-400">
                  {hour.toString().padStart(2, '0')}:00
                </span>
              </div>
              <div className="flex-1 border-t border-slate-200" />
            </div>
          );
        })}



        {/* Events Layer */}
        <div className="absolute inset-0 z-20 flex">
          {/* Empty spacer for Time Column */}
          <div className="w-20 md:w-24 shrink-0 sticky left-0 pointer-events-none" />
          
          {/* Day Event Columns */}
          {days.map(day => {
            const dayEvents = events.filter(e => {
              if (e.date) return e.date === day.fullDate;
              return e.dayOfWeek === day.id;
            });
            return (
              <div key={day.id} className="flex-1 relative min-w-[120px] pointer-events-none">
                <div className="relative w-full h-full pointer-events-auto">
                  {dayEvents.map(event => (
                    <ScheduleEvent 
                      key={event.id} 
                      event={event} 
                      startHour={START_HOUR} 
                      hourHeightRem={HOUR_HEIGHT_REM} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
