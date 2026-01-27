export const POLISH_CITIES = [
  { label: "Warszawa", value: "warszawa" },
  { label: "Kraków", value: "krakow" },
  { label: "Wrocław", value: "wroclaw" },
  { label: "Gdańsk", value: "gdansk" },
  { label: "Poznań", value: "poznan" },
  { label: "Łódź", value: "lodz" },
] as const;

export const VALID_CITIES = POLISH_CITIES.map((c) => c.value);

export type ValidCity = (typeof POLISH_CITIES)[number]["value"];
