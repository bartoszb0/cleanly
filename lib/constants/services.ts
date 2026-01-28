export const VALID_SERVICES = [
  "Sprzątanie balkonów",
  "Sprzątanie na wysokościach",
  "Pranie kanap",
  "Pranie dywanów",
  "Eko-sprzątanie",
  "Sprzątanie po remoncie",
  "Mycie okien",
  "Prasowanie",
  "Sprzątanie po eventach",
  "Sprzątanie biur",
  "Mycie lodówki",
  "Czyszczenie piekarnika",
  "Sprzątanie szaf i szafek",
  "Mycie naczyń",
  "Wyrzucanie śmieci i segregacja",
  "Sprzątanie po zwierzętach",
  "Sprzątanie mieszkań pod wynajem",
  "Generalne porządki (Deep Clean)",
  "Czyszczenie fug",
  "Ozonowanie pomieszczeń",
  "Odbiór i dostawa prania",
] as const;

// This turns the array values into a TypeScript Type
export type ServiceTag = (typeof VALID_SERVICES)[number];
