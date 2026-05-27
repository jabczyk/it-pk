import React, { useEffect, useState } from 'react';
import scheduleData from '../data/schedule.json';
import { ScheduleGrid, DayData } from '../components/ScheduleGrid';
import { EventData } from '../components/ScheduleEvent';
import { ChevronLeft, ChevronRight, Download } from '../components/Icons';

type AcademicScheduleItem = EventData & {
  label?: string;
};

type ScheduleEntry = AcademicScheduleItem & {
  classType: string;
  groups: string[];
  note: string;
  yearSemester: string;
};

const ACADEMIC_YEAR = '2025/2026';
const SEMESTER_LABEL = 'Summer Semester';
const DEFAULT_GROUP = 'CY2';
const SEMESTER_START = new Date(2026, 1, 23);
const SEMESTER_MIDPOINT = new Date(2026, 3, 20);
const SEMESTER_END = new Date(2026, 5, 15);
const EVENT_THEMES = ['blue', 'green', 'amber', 'rose', 'teal', 'violet'] as const;

function parseLabel(label?: string) {
  const parts = label?.split(' | ').map(part => part.trim()).filter(Boolean) ?? [];

  return {
    yearSemester: parts[0] ?? '',
    groups: parts[1]?.split(',').map(group => group.trim()).filter(Boolean) ?? [],
    classType: parts[2] ?? '',
    note: parts.slice(3).join(' | '),
  };
}

const scheduleEntries: ScheduleEntry[] = (scheduleData as AcademicScheduleItem[]).map(item => {
  const parsed = parseLabel(item.label);

  return {
    ...item,
    classType: parsed.classType,
    groups: parsed.groups,
    note: parsed.note,
    yearSemester: parsed.yearSemester,
  };
});

const yearOptions = Array.from(
  new Set(scheduleEntries.map(entry => entry.yearSemester).filter(Boolean))
);

function getWeekStart(date: Date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);

  const day = normalized.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  normalized.setDate(normalized.getDate() + diff);

  return normalized;
}

function formatDateLabel(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatWeekRange(weekStart: Date) {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 4);

  const sameMonth = weekStart.getMonth() === weekEnd.getMonth();
  const start = sameMonth
    ? weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const end = weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return `${start} - ${end}`;
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getWeekIndex(weekStart: Date) {
  const diffMs = getWeekStart(weekStart).getTime() - getWeekStart(SEMESTER_START).getTime();
  return Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
}

function getThemeForTitle(title: string) {
  let hash = 0;

  for (const char of title) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  return EVENT_THEMES[hash % EVENT_THEMES.length];
}

function entryMatchesSelection(entry: ScheduleEntry, yearSemester: string, group: string) {
  return entry.yearSemester === yearSemester && entry.groups.includes(group);
}

function countMatchingEntries(yearSemester: string, group: string) {
  return scheduleEntries.filter(entry => entryMatchesSelection(entry, yearSemester, group)).length;
}

function getPreferredYear(group: string) {
  const yearsForGroup = yearOptions.filter(year =>
    scheduleEntries.some(entry => entryMatchesSelection(entry, year, group))
  );

  return yearsForGroup.sort((left, right) =>
    countMatchingEntries(right, group) - countMatchingEntries(left, group)
  )[0] ?? yearOptions[0] ?? '';
}

function parseIsoDates(note: string) {
  return Array.from(note.matchAll(/\b(\d{4}-\d{2}-\d{2})\b/g)).map(match => match[1]);
}

function parsePolishDate(value: string) {
  const match = value.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (!match) {
    return null;
  }

  const [, day, month, year] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function eventMatchesNoteForDate(entry: ScheduleEntry, date: Date) {
  if (!entry.note) {
    return true;
  }

  const dateKey = formatDateKey(date);
  const isoDates = parseIsoDates(entry.note);
  if (entry.note.includes('Zajęcia odbywają się w dniach:') && isoDates.length > 0) {
    return isoDates.includes(dateKey);
  }

  const rangeMatches = Array.from(entry.note.matchAll(/(\d{2}\.\d{2}\.\d{4})-(\d{2}\.\d{2}\.\d{4})/g));
  if (rangeMatches.length > 0) {
    const time = date.getTime();
    return rangeMatches.some(([, start, end]) => {
      const startDate = parsePolishDate(start);
      const endDate = parsePolishDate(end);

      if (!startDate || !endDate) {
        return false;
      }

      return time >= startDate.getTime() && time <= endDate.getTime();
    });
  }

  const startsFromMatch = entry.note.match(/Zajęcia rozpoczynają się od (\d{2}\.\d{2}\.\d{4})/);
  if (startsFromMatch) {
    const startDate = parsePolishDate(startsFromMatch[1]);
    if (startDate && date.getTime() < startDate.getTime()) {
      return false;
    }
  }

  const weekIndex = getWeekIndex(date);
  if (entry.note.includes('wymiennie co 2 tydzień')) {
    return weekIndex % 2 !== 0;
  }

  if (entry.note.includes('co 2 tydzień')) {
    return weekIndex % 2 === 0;
  }

  if (entry.note.includes('pierwsza połowa semestru')) {
    return date.getTime() < SEMESTER_MIDPOINT.getTime();
  }

  if (entry.note.includes('druga połowa semestru')) {
    return date.getTime() >= SEMESTER_MIDPOINT.getTime();
  }

  return true;
}

function getVisibleEntriesForWeek(yearSemester: string, group: string, weekStart: Date) {
  const days = createDays(weekStart);
  const datesByDay = new Map(days.map(day => [day.id, new Date(`${day.fullDate}T12:00:00`)]));

  return scheduleEntries
    .filter(entry => entryMatchesSelection(entry, yearSemester, group))
    .filter(entry => {
      if (!entry.dayOfWeek) {
        return false;
      }

      const date = datesByDay.get(entry.dayOfWeek);
      return date ? eventMatchesNoteForDate(entry, date) : false;
    });
}

function getPreferredWeekStart(yearSemester: string, group: string, targetDate = new Date()) {
  const currentWeek = getWeekStart(targetDate);
  if (getVisibleEntriesForWeek(yearSemester, group, currentWeek).length > 0) {
    return currentWeek;
  }

  for (
    let cursor = getWeekStart(SEMESTER_START);
    cursor.getTime() <= SEMESTER_END.getTime();
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 7)
  ) {
    if (getVisibleEntriesForWeek(yearSemester, group, cursor).length > 0) {
      return cursor;
    }
  }

  return getWeekStart(SEMESTER_START);
}

function createDays(weekStart: Date): DayData[] {
  return [1, 2, 3, 4, 5].map(offset => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + offset - 1);

    return {
      id: offset,
      name: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      date: formatDateLabel(date),
      fullDate: formatDateKey(date),
    };
  });
}

export function SchedulePage() {
  const [selectedYear, setSelectedYear] = useState(() => getPreferredYear(DEFAULT_GROUP));
  const [selectedGroup, setSelectedGroup] = useState(DEFAULT_GROUP);
  const [weekStart, setWeekStart] = useState(() =>
    getPreferredWeekStart(getPreferredYear(DEFAULT_GROUP), DEFAULT_GROUP)
  );

  const groupOptions = Array.from(
    new Set(
      scheduleEntries
        .filter(entry => entry.yearSemester === selectedYear)
        .flatMap(entry => entry.groups)
    )
  ).sort();

  useEffect(() => {
    if (!groupOptions.includes(selectedGroup)) {
      setSelectedGroup(groupOptions[0] ?? '');
    }
  }, [groupOptions, selectedGroup]);

  useEffect(() => {
    if (groupOptions.length === 0) {
      return;
    }

    const visibleEntries = getVisibleEntriesForWeek(selectedYear, selectedGroup, weekStart);
    if (visibleEntries.length === 0) {
      setWeekStart(getPreferredWeekStart(selectedYear, selectedGroup));
    }
  }, [groupOptions.length, selectedGroup, selectedYear]);

  const days = createDays(weekStart);
  const visibleEntries = getVisibleEntriesForWeek(selectedYear, selectedGroup, weekStart);

  const events: EventData[] = visibleEntries
    .map(entry => ({
      id: entry.id,
      dayOfWeek: entry.dayOfWeek,
      startTime: entry.startTime,
      endTime: entry.endTime,
      title: entry.title,
      instructor: entry.instructor,
      location: entry.location,
      theme: getThemeForTitle(entry.title),
      label: entry.classType || undefined,
    }));

  const handlePrevWeek = () => {
    const previousWeek = new Date(weekStart);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setWeekStart(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(weekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setWeekStart(nextWeek);
  };

  const handleCurrentWeek = () => {
    setWeekStart(getPreferredWeekStart(selectedYear, selectedGroup));
  };

  return (
    <div className="w-full font-sans text-slate-900 flex flex-col">
      <div className="max-w-[1100px] w-full mx-auto p-6 md:p-8 flex flex-col">
        <div className="flex items-center gap-2 text-[13px] text-slate-400 mb-4 font-medium shrink-0">
          <span className="hover:text-slate-600 cursor-pointer transition-colors">Portal</span>
          <span className="text-slate-300">&gt;</span>
          <span className="text-slate-800 font-bold">Student Schedule</span>
        </div>

        <div className="grid gap-6 mb-6 shrink-0 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="min-w-0">
            <h1 className="text-[26px] md:text-3xl text-slate-800 tracking-tight mb-1 font-normal max-w-[12ch]">
              Weekly Academic Schedule
            </h1>
            <p className="text-slate-500 text-[14px] md:text-base flex flex-wrap items-center gap-2">
              {SEMESTER_LABEL} {ACADEMIC_YEAR}
              <span className="text-slate-400">•</span>
              <span>{selectedYear}</span>
              <span className="text-slate-400">•</span>
              <span>Group {selectedGroup}</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:justify-self-end">
            <div className="flex w-fit items-center bg-white border border-slate-200 rounded text-slate-600 shadow-sm">
              <button
                onClick={handlePrevWeek}
                className="px-4 py-3 hover:bg-slate-50 transition-colors border-r border-slate-200"
                aria-label="Previous week"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-6 py-3 text-[14px] font-semibold text-slate-700 border-r border-slate-200 min-w-[260px] text-center">
                {formatWeekRange(weekStart)}
              </div>
              <button
                onClick={handleNextWeek}
                className="px-4 py-3 hover:bg-slate-50 transition-colors"
                aria-label="Next week"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-end gap-3 lg:flex-nowrap">
              <label className="flex flex-col gap-1 text-[12px] font-semibold uppercase tracking-wide text-slate-400">
                <span>Year and Semester</span>
                <select
                  value={selectedYear}
                  onChange={event => setSelectedYear(event.target.value)}
                  className="h-[46px] min-w-[190px] bg-white border border-slate-200 rounded text-[14px] font-bold text-slate-700 shadow-sm px-4"
                >
                  {yearOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1 text-[12px] font-semibold uppercase tracking-wide text-slate-400">
                <span>Group</span>
                <select
                  value={selectedGroup}
                  onChange={event => setSelectedGroup(event.target.value)}
                  className="h-[46px] min-w-[110px] bg-white border border-slate-200 rounded text-[14px] font-bold text-slate-700 shadow-sm px-4"
                >
                  {groupOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <button
                onClick={handleCurrentWeek}
                className="h-[50px] self-end whitespace-nowrap px-6 text-[15px] font-semibold text-slate-700 border border-slate-200 rounded bg-white shadow-sm hover:bg-slate-50 transition-colors"
              >
                Jump to Active Week
              </button>

              <button className="flex h-[50px] self-end items-center gap-2 whitespace-nowrap bg-[#021124] hover:bg-[#0f172a] text-white px-6 rounded shadow-sm transition-colors text-[15px] font-medium">
                <Download className="w-5 h-5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>

        {visibleEntries.length === 0 && (
          <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
            No classes are scheduled for {selectedGroup} in this week.
          </div>
        )}

        <div className="relative">
          <ScheduleGrid events={events} days={days} />
        </div>
      </div>
    </div>
  );
}
