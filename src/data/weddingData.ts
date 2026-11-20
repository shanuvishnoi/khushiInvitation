export interface WeddingEvent {
  id: string;
  name: string;
  subTitle: string;
  date: string;
  time: string;
  location: string;
  dressCode: string;
  dressColorPalette: string[];
  description: string;
  highlight: string;
  calendarDateStart: string; // ISO format for calendar
  calendarDateEnd: string;
}

export interface WeddingVenues{
  name: string;
  address: string;
  googleMapsUrl: string;
  phone: string;
  email: string;




}

export interface GuestbookWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  hearts: number;
  date: string;
}

export const WEDDING_DETAILS = {
  couple: {
    bride: "Pratha",
    brideFull: "Pratha Vishnoi",
    groom: "Abhinav",
    groomFull: "Abhinav Vishnoi",
    parentsBride: "Mr. Brajesh Vishnoi & Mrs. Neetu Vishnoi",
    parentsGroom: "Mr. Sunil Kumar & Mrs. Rekha Vishnoi",
    hashtag: "#PrathaWedsAbhinav",
    sanskritShlok: "मंगलम् भगवान विष्णुः, मंगलम् गरुड़ध्वजः। मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥",
    quote: "Two souls, one destiny. With the blessings of our families and the grace of the divine, we invite you to celebrate our sacred union.",
  },
  dates: {
    display: "December 11, 2026",
    mainWeddingDay: "Saturday, December 11, 2026",
    countdownTarget: "2026-12-11T17:30:00",
  },
  venue1: {
    name: "Mangal Lipi Farm House",
    address: "Mangal Lipi Farm House, Sahaspur, Moradabad",
    googleMapsUrl: "https://maps.google.com/?cid=13054701892862380923&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF",
    coordinates: { lat: 29.152121422670255, lng: 78.60077728650798 },
    phone: "+91 7300703740",
    email: "mangalLipi@gmail.com",
    transit: [
      {
        title: "Moradabad Bus Stand",
        distance: "24 km (Approx. 40 mins)",
        tip: "Complimentary wedding concierge pickup available for registered outstation guests.",
      },
      {
        title: "Moradabad Junction Railway Station",
        distance: "12 km (Approx. 25 mins)",
        tip: "Direct pre-paid taxis and scheduled guest luxury shuttles available.",
      },
    ],
    stayRecommendations: [
      
    ],
  },
  venue2: {
    name: "Home",
    address: "Home, Panuwala, Moradabad",
    googleMapsUrl: "https://maps.app.goo.gl/ie3npkEW15EvN2fB6",
    coordinates: { lat: 29.190291, lng: 78.640227 },
    phone: "+91 7300703740",
    email: "msfarmhouse@gmail.com",
    transit: [
      {
        title: "Moradabad Bus Stand",
        distance: "24 km (Approx. 40 mins)",
        tip: "Complimentary wedding concierge pickup available for registered outstation guests.",
      },
      {
        title: "Moradabad Junction Railway Station",
        distance: "12 km (Approx. 25 mins)",
        tip: "Direct pre-paid taxis and scheduled guest luxury shuttles available.",
      },
    ],
    stayRecommendations: [
      
    ],
  },
  venue: {
    name: "Home",
    address: "Panuwala, Moradabad",
    googleMapsUrl: "https://maps.app.goo.gl/ie3npkEW15EvN2fB6",
    coordinates: { lat: 29.190291, lng: 78.740601 },
    phone: "+91 7300703740",
    email: "",
    transit: [
      {
        title: "Moradabad Bus Stand",
        distance: "24 km (Approx. 40 mins)",
        tip: "Complimentary wedding concierge pickup available for registered outstation guests.",
      },
      {
        title: "Moradabad Junction Railway Station",
        distance: "12 km (Approx. 25 mins)",
        tip: "Direct pre-paid taxis and scheduled guest luxury shuttles available.",
      },
    ],
    stayRecommendations: [
      
    ],
  },
};

export const WEDDING_VENUES: WeddingVenues[] = [
  {
    name: "Home",
    address: "Harthala, Moradabad",
    googleMapsUrl: "https://maps.google.com/?cid=13054701892862380923&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF",
    phone: "+91 141 263 4077",
    email: "mangalLipi@gmail.com"
  },
  {
    name: "MS Farm House",
    address: "MS Farm House, Bhikanpur, Moradabad",
    googleMapsUrl: "https://maps.google.com/?cid=13054701892862380923&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF",
    phone: "+91 141 263 4077",
    email: "msfarmhouse@gmail.com"
  },
  {
    name: "Home",
    address: "Harthala, Moradabad",
    googleMapsUrl: "https://maps.google.com/?cid=13054701892862380923&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF",
    phone: "+91 8923886839",
    email: ""
  },
];

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: "haldi",
    name: "Haldi",
    subTitle: "Fragrant Haldi & Auspicious Beginnings",
    date: "Tuesday, December 9, 2026",
    time: "12:00 PM Onwards",
    location: "Home, Panuwala, Moradabad",
    dressCode: "Festive Pastels & Floral Indo-Western",
    dressColorPalette: ["#F9A8D4"],
    description: "A joyful morning applying fragrant turmeric paste, sandalwood, and celebrating with quintals of fragrant Marigold and Desi Rose petals showered to live nagada beats.",
    highlight: "Phoolon ki Holi (Flower petal shower)",
    calendarDateStart: "20261212T093000Z",
    calendarDateEnd: "20261212T130000Z",
  },
  {
    id: "sangeet",
    name: "Sangeet ",
    subTitle: "A Evening of Rhythm, Sparkles & Dance",
    date: "Tuesday, December 9, 2026",
    time: "3:00 PM Onwards",
    location: "Home, Panuwala, Moradabad",
    dressCode: "Glamorous Evening Formals / Shimmering Lehengas & Tuxedos",
    dressColorPalette: ["#1E293B", "#D97706", "#475569", "#E2E8F0"],
    description: "Turn up the music, bring on the dance moves, and let the celebrations begin! A night of endless laughter, unforgettable performances, and pure joy.",
    highlight: "Family Dance ",
    calendarDateStart: "20261212T140000Z",
    calendarDateEnd: "20261212T200000Z",
  },
  {
    id: "reception",
    name: "Mehandi",
    subTitle: "A Day of Traditions, A Lifetime of Togetherness",
    date: "Thursday, December 10, 2026",
    time: "12:00 PM Onwards",
    location: "Home, Panuwala",
    dressCode: "Royal Formal Attire / Western Black Tie",
    dressColorPalette: ["#0F172A", "#334155", "#CBD5E1", "#D4AF37"],
    description: "A celebration of traditions, a shower of blessings, and the beginning of a beautiful new journey!",
    highlight: "Symphony Orchestra & Royal Feast",
    calendarDateStart: "20261214T133000Z",
    calendarDateEnd: "20261214T193000Z",
  },
  {
    id: "wedding",
    name: "The Royal Baraat & Pheras",
    subTitle: "The Sacred Muhurtham & Vows",
    date: "Friday, December 11, 2026",
    time: "5:00 PM — Baraat | 9:00 PM — Varmala & Pheras",
    location: "Mangal Lipi Farm House",
    dressCode: "Regal Traditional Indian / Banarasi Silks & Sherwanis",
    dressColorPalette: ["#881337", "#B45309", "#9A3412", "#FFFBEB"],
    description: "The groom's royal horse-drawn Baraat procession with ceremonial shehnai, followed by the enchanting Varmala and the sacred seven pheras under the Vedic mandap.",
    highlight: "Lotus Pool Varmala & Vedic Fire Vows",
    calendarDateStart: "20261213T113000Z",
    calendarDateEnd: "20261213T180000Z",
  },
];



export const INITIAL_GUESTBOOK_WISHES: GuestbookWish[] = [
  {
    id: "w1",
    name: "Himanshu and Kakul",
    relation: "Bhaiya bhabhi",
    message: "Dearest Pratha & Abhinav! Seeing you two together warms our hearts. Wishing you a lifetime filled with deep laughter, thrilling travels, and enduring companionship!",
    hearts: 14,
    date: "November 21, 2026",
  },
];
