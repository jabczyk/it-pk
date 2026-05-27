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
      className={`absolute left-2 right-2 border-l-4 rounded-r-md p-3.5 flex flex-col overflow-hidden transition-all hover:shadow-md ${bgBorder}`}
      style={{
        top: `${topRem}rem`,
        height: `${heightRem}rem`,
        zIndex: 10
      }}
    >
      {event.label && (
        <div className="mb-2">
          <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded">
            {event.label}
          </span>
        </div>
      )}
      <h3 className={`font-bold text-[12px] tracking-wide uppercase ${titleColor}`}>
        {event.title}
      </h3>
      <p className="text-[12px] text-slate-500 mt-0.5">
        {event.instructor}
      </p>
      <div className={`mt-auto flex items-center gap-1.5 text-[11px] font-bold ${locColor}`}>
        <MapPin className="w-3.5 h-3.5 opacity-80" />
        <span>{event.location}</span>
      </div>
    </div>
  );
}
