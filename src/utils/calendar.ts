import { WeddingEvent } from '../data/weddingData';

/**
 * Generates a Google Calendar URL for a wedding event
 */
export function getGoogleCalendarUrl(event: WeddingEvent): string {
  const title = encodeURIComponent(`Pratha & Abhinav Wedding: ${event.name}`);
  const details = encodeURIComponent(
    `${event.subTitle}\n\n${event.description}\n\nDress Code: ${event.dressCode}\n\nHashtag: #PrathaWedsAbhinav`
  );
  const location = encodeURIComponent(`${event.location}, Mangal Lipi Farm House, Sahaspur, Moradabad, Uttar Pradesh`);
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${event.calendarDateStart}/${event.calendarDateEnd}&details=${details}&location=${location}`;
}

/**
 * Generates an all-in-one Google Calendar URL for the entire wedding
 */
export function getAllEventsGoogleCalendarUrl(): string {
  const title = encodeURIComponent(`Pratha & Abhinav's Royal Wedding Celebrations`);
  const details = encodeURIComponent(
    `Celebration Itinerary:\n` +
    `• Dec 8: Haldi (12 PM) & Sangeet Cocktail (3 PM)\n` +
    `• Dec 10:  Mehandi (10 AM)\n` +
    `• Dec 11: Wedding Celebrations (6 PM)\n\n` +
    `Venue: Mangal Lipi Farm House, Moradabad\n` +
    `Hashtag: #PrathaWedsAbhinav`
  );
  const location = encodeURIComponent(`Moradabad, Uttar Pradesh`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261208T093000Z/20261211T200000Z&details=${details}&location=${location}`;
}

/**
 * Downloads an .ics calendar file for Apple Calendar / Outlook / Google
 */
export function downloadIcsFile(event?: WeddingEvent): void {
  let icsContent = '';

  if (event) {
    icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Pratha and Abhinav Wedding//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Pratha & Abhinav Wedding - ${event.name}
DESCRIPTION:${event.subTitle}\\n${event.description}\\nDress Code: ${event.dressCode}
LOCATION:${event.location}\\, The Raj Palace\\, Moradabad
DTSTART:${event.calendarDateStart}
DTEND:${event.calendarDateEnd}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
  } else {
    icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Pratha and Abhinav Wedding//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Pratha & Abhinav - Royal Wedding Celebrations
DESCRIPTION:Wedding celebrations of Pratha Vishnoi & Abhinav Vishnoi in Moradabad\\, Uttar Pradesh.
LOCATION:Mangal Lipi Farm House\\, Seohara Road\\, Moradabad\\, Uttar Pradesh
DTSTART:20261212T093000Z
DTEND:20261214T200000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
  }

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', event ? `${event.id}-invitation.ics` : 'Pratha-Abhinav-wedding.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
