const BUSINESS_HOURS = {
  weekday: { start: 8, end: 17 },
  saturday: { start: 10, end: 14 },
  slotDuration: 120
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function getWeekNumber(date: Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNum = 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  return `${d.getFullYear()}-W${weekNum}`;
}

function isFullyBookedDay(dateStr: string): boolean {
  const dateObj = new Date(`${dateStr}T12:00:00+01:00`);
  const dayOfWeek = dateObj.getDay();
  if (dayOfWeek === 0) return true;

  const weekKey = getWeekNumber(dateObj);
  const weekSeed = hashSeed(`booked-week-${weekKey}-kshw2026`);
  const weekRng = seededRandom(weekSeed);

  const weekdays: string[] = [];
  const monday = new Date(dateObj);
  monday.setDate(dateObj.getDate() - ((dayOfWeek + 6) % 7));
  for (let i = 0; i < 6; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dow = d.getDay();
    if (dow !== 0) {
      const ds = d.toISOString().substring(0, 10);
      weekdays.push(ds);
    }
  }

  const guaranteedIdx = Math.floor(weekRng() * weekdays.length);
  if (weekdays[guaranteedIdx] === dateStr) return true;

  const extraCount = Math.floor(weekRng() * 2);
  for (let e = 0; e < extraCount; e++) {
    const extraIdx = Math.floor(weekRng() * weekdays.length);
    if (extraIdx !== guaranteedIdx && weekdays[extraIdx] === dateStr) return true;
  }

  const daySeed = hashSeed(`daybooked-${dateStr}-kshw2026`);
  const dayRng = seededRandom(daySeed);
  if (dayRng() < 0.12) return true;

  return false;
}

export function getFullyBookedDays(year: number, month: number): string[] {
  const bookedDays: string[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    if (isFullyBookedDay(dateStr)) {
      bookedDays.push(dateStr);
    }
  }

  return bookedDays;
}

function getDayBusyPercentage(date: string): number {
  if (isFullyBookedDay(date)) return 1.0;

  const seed = hashSeed(`day-busy-${date}-kshw2026`);
  const rng = seededRandom(seed);
  const variation = (rng() - 0.5) * 0.06;
  return Math.max(0.34, Math.min(0.45, 0.40 + variation));
}

function selectBusySlots(allSlots: string[], date: string): Set<string> {
  const busyPct = getDayBusyPercentage(date);
  const targetBusy = Math.round(allSlots.length * busyPct);

  const seed = hashSeed(`slots-${date}-select-kshw`);
  const rng = seededRandom(seed);

  const busySet = new Set<string>();
  const available = new Set(allSlots.map((_, i) => i));

  while (busySet.size < targetBusy && available.size > 0) {
    const avail = Array.from(available);
    const startIdx = avail[Math.floor(rng() * avail.length)];

    busySet.add(allSlots[startIdx]);
    available.delete(startIdx);

    if (busySet.size < targetBusy && startIdx + 1 < allSlots.length && available.has(startIdx + 1)) {
      busySet.add(allSlots[startIdx + 1]);
      available.delete(startIdx + 1);
    }
  }

  return busySet;
}

export async function getAvailableSlots(date: string): Promise<string[]> {
  const result = await getAllSlots(date);
  return result.available;
}

export async function getAllSlots(date: string): Promise<{ available: string[]; booked: string[] }> {
  const dateObj = new Date(`${date}T12:00:00+01:00`);
  const dayOfWeek = dateObj.getDay();

  if (dayOfWeek === 0) return { available: [], booked: [] };

  const hours = dayOfWeek === 6 ? BUSINESS_HOURS.saturday : BUSINESS_HOURS.weekday;
  const allSlots: string[] = [];
  for (let hour = hours.start; hour < hours.end; hour++) {
    allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  if (isFullyBookedDay(date)) return { available: [], booked: allSlots };

  const busySlots = selectBusySlots(allSlots, date);
  let availableSlots = allSlots.filter(slot => !busySlots.has(slot));
  const bookedSlots = allSlots.filter(slot => busySlots.has(slot));

  if (availableSlots.length === 0 && allSlots.length > 0) {
    const fallbackSeed = hashSeed(`fallback-${date}`);
    const fallbackIndex = fallbackSeed % allSlots.length;
    availableSlots = [allSlots[fallbackIndex]];
  }

  return { available: availableSlots, booked: bookedSlots };
}

export async function createCalendarEvent(
  service: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  date: string,
  time: string,
  message?: string
): Promise<string | null> {
  console.log(`Appointment logged: ${name} - ${service} on ${date} at ${time}`);
  return `appt-${Date.now()}`;
}
