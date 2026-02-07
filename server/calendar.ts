const BUSINESS_HOURS = {
  weekday: { start: 8, end: 17 },
  saturday: { start: 10, end: 14 },
  slotDuration: 120
};

const ARTIFICIAL_BUSY_PERCENTAGE = 0.6;

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getWeekNumber(date: string): number {
  const d = new Date(date);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

function shouldHideSlot(date: string, slot: string): boolean {
  const weekNumber = getWeekNumber(date);
  const seed = hashCode(`${date}-${slot}-week${weekNumber}-kshw`);
  const pseudoRandom = (seed % 100) / 100;
  return pseudoRandom < ARTIFICIAL_BUSY_PERCENTAGE;
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

  let availableSlots = allSlots.filter(slot => !shouldHideSlot(date, slot));

  if (availableSlots.length === 0 && allSlots.length > 0) {
    const fallbackIndex = hashCode(date) % allSlots.length;
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
