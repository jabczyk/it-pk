import React from 'react';
import { MapPin } from './Icons';

export type EventData = {
  id: number;
  dayOfWeek?: number;
  date?: string; // Optional: specific date instead of recurring day
  startTime: string;
  endTime: string;
  title: string;
  instructor: string;
  location: string;
  theme: string;
  label?: string;
};

interface ScheduleEventProps {
  event: EventData;
  startHour: number;
  hourHeightRem: number;
}

const themeClasses: Record<string, string> = {
  blue: 'bg-[#f4f7fb] border-[#0f172a]',
  green: 'bg-[#f2fbf5] border-[#65a30d]',
  amber: 'bg-[#fff8eb] border-[#d97706]',
  rose: 'bg-[#fff1f2] border-[#e11d48]',
  teal: 'bg-[#f0fdfa] border-[#0f766e]',
  violet: 'bg-[#f5f3ff] border-[#7c3aed]',
  gray: 'bg-[#f6f8fa] border-[#334155]'
};

const titleColors: Record<string, string> = {
  blue: 'text-[#0f172a]',
  green: 'text-[#3f6212]',
  amber: 'text-[#92400e]',
  rose: 'text-[#9f1239]',
  teal: 'text-[#115e59]',
  violet: 'text-[#5b21b6]',
  gray: 'text-[#0f172a]'
};

const locationColors: Record<string, string> = {
  blue: 'text-[#1e293b]',
  green: 'text-[#4d7c0f]',
  amber: 'text-[#b45309]',
  rose: 'text-[#be123c]',
  teal: 'text-[#0f766e]',
  violet: 'text-[#6d28d9]',
  gray: 'text-[#1e293b]'
};

function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours + minutes / 60;
}

export function ScheduleEvent({ event, startHour, hourHeightRem }: ScheduleEventProps) {
  const start = parseTime(event.startTime);
  const end = parseTime(event.endTime);
  const duration = end - start;
  
  const topRem = (start - startHour) * hourHeightRem;
  const heightRem = duration * hourHeightRem;

  const bgBorder = themeClasses[event.theme] || themeClasses.gray;
  const titleColor = titleColors[event.theme] || titleColors.gray;
  const locColor = locationColors[event.theme] || locationColors.gray;

  return (
    <div
      className={`group absolute left-1 right-1 sm:left-2 sm:right-2 z-10 border-l-4 rounded-r-md p-2 sm:p-2.5 flex flex-col overflow-hidden transition-all hover:shadow-xl hover:!z-50 hover:!h-auto hover:min-h-[var(--event-height)] ${bgBorder}`}
      style={{
        top: `calc(${topRem}rem + 2px)`,
        height: `calc(${heightRem}rem - 4px)`,
        '--event-height': `calc(${heightRem}rem - 4px)`,
      } as React.CSSProperties}
    >
      {event.label && (
        <div className="mb-1.5 shrink-0">
          <span className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded leading-none">
            {event.label}
          </span>
        </div>
      )}
      <h3 className={`font-bold text-[10.5px] sm:text-[11px] leading-[1.3] tracking-wide uppercase break-words ${titleColor}`}>
        {event.title}
      </h3>
      <p className="text-[10.5px] sm:text-[11px] text-slate-500 mt-1 leading-snug break-words">
        {event.instructor}
      </p>
      <div className={`mt-auto pt-2 flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-bold ${locColor}`}>
        <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
        <span className="truncate group-hover:whitespace-normal break-words">{event.location}</span>
      </div>
    </div>
  );
}
