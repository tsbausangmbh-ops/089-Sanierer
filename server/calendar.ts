import { google, calendar_v3 } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-calendar',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Calendar not connected');
  }
  return accessToken;
}

export async function getGoogleCalendarClient(): Promise<calendar_v3.Calendar> {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

const BUSINESS_HOURS = {
  start: 8,
  end: 17,
  slotDuration: 60
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

function shouldHideSlot(date: string, slot: string): boolean {
  const seed = hashCode(`${date}-${slot}-kshw-munich`);
  const pseudoRandom = (seed % 100) / 100;
  return pseudoRandom < ARTIFICIAL_BUSY_PERCENTAGE;
}

export async function getAvailableSlots(date: string): Promise<string[]> {
  const calendar = await getGoogleCalendarClient();
  
  const startOfDay = new Date(`${date}T00:00:00+01:00`);
  const endOfDay = new Date(`${date}T23:59:59+01:00`);
  
  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        timeZone: 'Europe/Berlin',
        items: [{ id: 'primary' }]
      }
    });

    const busySlots = response.data.calendars?.primary?.busy || [];
    
    const allSlots: string[] = [];
    for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
      allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    
    let availableSlots = allSlots.filter(slot => {
      const slotHour = parseInt(slot.split(':')[0]);
      const slotStart = new Date(`${date}T${slot}:00+01:00`);
      const slotEnd = new Date(slotStart.getTime() + BUSINESS_HOURS.slotDuration * 60 * 1000);
      
      return !busySlots.some(busy => {
        const busyStart = new Date(busy.start!);
        const busyEnd = new Date(busy.end!);
        return (slotStart < busyEnd && slotEnd > busyStart);
      });
    });
    
    availableSlots = availableSlots.filter(slot => !shouldHideSlot(date, slot));
    
    if (availableSlots.length === 0 && allSlots.length > 0) {
      const fallbackIndex = hashCode(date) % allSlots.length;
      availableSlots = [allSlots[fallbackIndex]];
    }
    
    return availableSlots;
  } catch (error) {
    console.error('Error fetching calendar availability:', error);
    return [];
  }
}

export async function createCalendarEvent(
  service: string,
  name: string,
  email: string,
  phone: string,
  date: string,
  time: string,
  message?: string
): Promise<string | null> {
  const calendar = await getGoogleCalendarClient();
  
  const startDateTime = new Date(`${date}T${time}:00+01:00`);
  const endDateTime = new Date(startDateTime.getTime() + BUSINESS_HOURS.slotDuration * 60 * 1000);
  
  const serviceLabels: Record<string, string> = {
    komplettsanierung: "Komplettsanierung",
    badsanierung: "Badsanierung",
    kuechensanierung: "Küchensanierung",
    bodensanierung: "Bodensanierung",
    elektrosanierung: "Elektrosanierung",
    heizungssanierung: "Heizungssanierung",
    "energetische-sanierung": "Energetische Sanierung",
    dachsanierung: "Dachsanierung",
  };
  
  const serviceLabel = serviceLabels[service] || service;
  
  try {
    const event = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: `Beratungstermin: ${serviceLabel} - ${name}`,
        description: `Kunde: ${name}\nTelefon: ${phone}\nE-Mail: ${email}\nService: ${serviceLabel}\n${message ? `Nachricht: ${message}` : ''}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'Europe/Berlin'
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'Europe/Berlin'
        },
        attendees: [
          { email: email }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 }
          ]
        }
      }
    });
    
    console.log(`Calendar event created: ${event.data.id}`);
    return event.data.id || null;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }
}
