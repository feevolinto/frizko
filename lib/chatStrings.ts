export type ChatLanguage = "bisaya" | "tagalog" | "english";

export const LANGUAGE_LABELS: Record<ChatLanguage, { native: string; tagline: string }> = {
  bisaya: { native: "Bisaya", tagline: "Pangitaon ang duol nga cold storage" },
  tagalog: { native: "Tagalog", tagline: "Hanapin ang pinakamalapit na cold storage" },
  english: { native: "English", tagline: "Find the nearest cold storage" },
};

export const CHAT_STRINGS: Record<
  ChatLanguage,
  {
    greeting: string;
    inputPlaceholder: string;
    waitingPlaceholder: string;
    typing: string;
    fallbackSpecies: string;
    parsed: (species: string, weightKg: number) => string;
    searching: (weightKg: number) => string;
    selected: (name: string) => string;
    confirmed: (weightKg: number, species: string, name: string, ref: string) => string;
    notified: (name: string) => string;
    closing: string;
    viewTicket: string;
    ticketTitle: string;
    ticketBring: string;
    ticketCatch: string;
    ticketDestination: string;
    ticketStatusNotified: string;
    ticketIssued: string;
    close: string;
  }
> = {
  bisaya: {
    greeting:
      'Maayong adlaw! Ako si Frizko AI 🧊 Aduna ka bag-ong kuha? I-type ra ang klase sa isda ug gibug-aton — pananglitan: "Yellowfin Tuna 500kg".',
    inputPlaceholder: "Isulat ang klase sa isda ug kilo...",
    waitingPlaceholder: "Paghulat sa Frizko AI...",
    typing: "Nag-type...",
    fallbackSpecies: "Isda",
    parsed: (species, weightKg) =>
      `Nadawat nako: ${species}, ${weightKg}kg. Gi-pin na nako imong lokasyon base sa GPS signal 📍`,
    searching: (weightKg) =>
      `Nangita ko ug pinaka-duol nga cold storage nga adunay igo nga kapasidad para sa imong ${weightKg}kg. Ania ang pinaka-suod, pili og usa:`,
    selected: (name) => `Gipili nako ang ${name}.`,
    confirmed: (weightKg, species, name, ref) =>
      `Salamat! Na-book na ang imong ${weightKg}kg ${species} sa ${name}. Dad-a dayon sulod sa 2 ka oras aron malikayan ang pagkadaot. Reference number: ${ref}.`,
    notified: (name) => `✓ Naabisuhan na ang ${name} bahin sa imong pag-abot.`,
    closing: "Bisan unsa pa imong pangutana, ania ra ko permi. Salamat sa pagsalig sa Frizko! 🐟",
    viewTicket: "Tan-awa ang Tiket",
    ticketTitle: "TIKET SA PAGKONSAYN",
    ticketBring: "Dad-a ang imong kuha dinhi:",
    ticketCatch: "Kuha",
    ticketDestination: "Padulngan",
    ticketStatusNotified: "Na-notify na ang cold storage",
    ticketIssued: "Gi-isyu",
    close: "Sirado",
  },
  tagalog: {
    greeting:
      'Kumusta! Ako si Frizko AI 🧊 May bagong huli ka ba? I-type mo lang ang klase ng isda at bigat — hal. "Yellowfin Tuna 500kg".',
    inputPlaceholder: "I-type ang klase ng isda at kilo...",
    waitingPlaceholder: "Hinihintay si Frizko AI...",
    typing: "Nagta-type...",
    fallbackSpecies: "Isda",
    parsed: (species, weightKg) =>
      `Natanggap ko: ${species}, ${weightKg}kg. Na-pin ko na ang lokasyon mo gamit ang GPS signal 📍`,
    searching: (weightKg) =>
      `Naghahanap ako ng pinakamalapit na cold storage na may sapat na kapasidad para sa ${weightKg}kg mo. Eto ang pinakamalapit, pumili ka ng isa:`,
    selected: (name) => `Pipiliin ko ang ${name}.`,
    confirmed: (weightKg, species, name, ref) =>
      `Salamat! Naka-book na ang ${weightKg}kg ${species} mo sa ${name}. Dalhin mo agad sa loob ng 2 oras para hindi masira. Reference number: ${ref}.`,
    notified: (name) => `✓ Na-abisuhan na ang ${name} tungkol sa dadating mong huli.`,
    closing: "May tanong ka pa? Nandito lang ako. Salamat sa tiwala mo sa Frizko! 🐟",
    viewTicket: "Tingnan ang Tiket",
    ticketTitle: "TIKET NG KONSAYNMENT",
    ticketBring: "Dalhin ang huli mo dito:",
    ticketCatch: "Huli",
    ticketDestination: "Patutunguhan",
    ticketStatusNotified: "Na-notify na ang cold storage",
    ticketIssued: "In-isyu",
    close: "Isara",
  },
  english: {
    greeting:
      'Hi there! I\'m Frizko AI 🧊 Got a fresh catch? Just type the fish type and weight — e.g. "Yellowfin Tuna 500kg".',
    inputPlaceholder: "Type fish type and weight...",
    waitingPlaceholder: "Waiting for Frizko AI...",
    typing: "Typing...",
    fallbackSpecies: "Fish",
    parsed: (species, weightKg) =>
      `Got it: ${species}, ${weightKg}kg. I've pinned your location from your GPS signal 📍`,
    searching: (weightKg) =>
      `Looking for the nearest cold storage with enough space for your ${weightKg}kg. Here are the closest options — pick one:`,
    selected: (name) => `I'll go with ${name}.`,
    confirmed: (weightKg, species, name, ref) =>
      `Thanks! Your ${weightKg}kg ${species} is booked at ${name}. Bring it within 2 hours to keep it fresh. Reference number: ${ref}.`,
    notified: (name) => `✓ ${name} has been notified of your delivery.`,
    closing: "Got more questions? I'm always here. Thanks for trusting Frizko! 🐟",
    viewTicket: "View Ticket",
    ticketTitle: "CONSIGNMENT TICKET",
    ticketBring: "Bring your catch here:",
    ticketCatch: "Catch",
    ticketDestination: "Destination",
    ticketStatusNotified: "Cold storage notified",
    ticketIssued: "Issued",
    close: "Close",
  },
};
