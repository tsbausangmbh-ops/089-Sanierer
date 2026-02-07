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

function getDayBusyPercentage(date: string): number {
  const seed = hashSeed(`day-busy-${date}-kshw2026`);
  const rng = seededRandom(seed);
  const dayOfWeek = new Date(`${date}T12:00:00+01:00`).getDay();

  const weekSeed = hashSeed(`week-${date.substring(0, 7)}-${Math.floor(new Date(`${date}T12:00:00+01:00`).getDate() / 7)}-kshw`);
  const weekRng = seededRandom(weekSeed);
  const weekBase = 0.32 + weekRng() * 0.16;

  let dayVariation: number;
  const r = rng();

  if (dayOfWeek === 1 || dayOfWeek === 2) {
    dayVariation = 0.05 + r * 0.18;
  } else if (dayOfWeek === 3 || dayOfWeek === 4) {
    dayVariation = -0.05 + r * 0.15;
  } else if (dayOfWeek === 5) {
    dayVariation = -0.10 + r * 0.12;
  } else {
    dayVariation = -0.08 + r * 0.10;
  }

  const dateSeed = hashSeed(`scatter-${date}`);
  const scatterRng = seededRandom(dateSeed);
  const scatter = (scatterRng() - 0.5) * 0.10;

  const pct = weekBase + dayVariation + scatter;
  return Math.max(0.15, Math.min(0.65, pct));
}

function selectBusySlots(allSlots: string[], date: string): Set<string> {
  const busyPct = getDayBusyPercentage(date);
  const numBusy = Math.round(allSlots.length * busyPct);

  const seed = hashSeed(`slots-${date}-select-kshw`);
  const rng = seededRandom(seed);

  const indices = allSlots.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const busySet = new Set<string>();
  for (let i = 0; i < numBusy; i++) {
    busySet.add(allSlots[indices[i]]);
  }
  return busySet;
}

export async function getAvailableSlots(date: string): Promise<string[]> {
  const dateObj = new Date(`${date}T12:00:00+01:00`);
  const dayOfWeek = dateObj.getDay();

  if (dayOfWeek === 0) return [];

  const hours = dayOfWeek === 6 ? BUSINESS_HOURS.saturday : BUSINESS_HOURS.weekday;
  const allSlots: string[] = [];
  for (let hour = hours.start; hour < hours.end; hour++) {
    allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  const busySlots = selectBusySlots(allSlots, date);
  let availableSlots = allSlots.filter(slot => !busySlots.has(slot));

  if (availableSlots.length === 0 && allSlots.length > 0) {
    const fallbackSeed = hashSeed(`fallback-${date}`);
    const fallbackIndex = fallbackSeed % allSlots.length;
    availableSlots = [allSlots[fallbackIndex]];
  }

  return availableSlots;
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
