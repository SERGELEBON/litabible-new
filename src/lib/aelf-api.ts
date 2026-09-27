/**
 * AELF daily readings API client.
 *
 * Base: https://api.aelf.fr/v1
 *   GET /messes/{YYYY-MM-DD}     — mass of the day
 *   GET /office/{hour}/{YYYY-MM-DD} — office of the hours
 *
 * `hour` must be one of: lectures | laudes | tierce | sext | none | vepres | complies
 *
 * The AELF API is occasionally flaky and may return 5xx during high-traffic
 * liturgical seasons. Callers must be ready to fall back to local cached
 * readings. Every public function returns `null` on failure rather than
 * throwing, so route handlers can serve a graceful local-fallback response.
 */

const AELF_BASE = "https://api.aelf.fr/v1";
const DEFAULT_TIMEOUT_MS = 12_000;

export type AelfOfficeHour =
  | "lectures"
  | "laudes"
  | "tierce"
  | "sext"
  | "none"
  | "vepres"
  | "complies";

export const AELF_OFFICE_HOURS: AelfOfficeHour[] = [
  "lectures",
  "laudes",
  "tierce",
  "sext",
  "none",
  "vepres",
  "complies",
];

export function isAelfOfficeHour(s: string): s is AelfOfficeHour {
  return (AELF_OFFICE_HOURS as string[]).includes(s);
}

export interface AelfLecture {
  type: string;
  titre: string;
  ref?: string;
  ref_ln?: string;
  contenu: string[];
  ref_base?: string;
  ael?: string[];
  intro?: string;
  refrain?: string;
  titre_louange?: string;
}

export interface AelfMesse {
  id: string;
  nom: string;
  couleur: string;
  source: string;
  lectures: AelfLecture[];
}

export interface AelfMesseResponse {
  messes: AelfMesse[];
}

export type AelfOfficeResponse = Record<string, unknown>;

/** Validate ISO date `YYYY-MM-DD`. Returns true only if exactly 4-2-2 digits and parseable. */
export function isValidIsoDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;
  // Re-emit to reject "2024-13-40" via Date round-trip.
  const dt = new Date(`${s}T00:00:00Z`);
  return (
    Number.isFinite(dt.getTime()) &&
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

async function fetchWithTimeout(url: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: ctrl.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
  } finally {
    clearTimeout(timer);
  }
}

/** Fetch the mass for the given ISO date. Returns null on any failure. */
export async function fetchMesse(date: string): Promise<AelfMesseResponse | null> {
  if (!isValidIsoDate(date)) return null;
  const url = `${AELF_BASE}/messes/${date}`;
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;
    const data = (await res.json()) as AelfMesseResponse;
    if (!data || !Array.isArray(data.messes)) return null;
    // Defensive: ensure each messe has an `lectures` array.
    for (const m of data.messes) {
      if (!Array.isArray(m.lectures)) m.lectures = [];
    }
    return data;
  } catch {
    return null;
  }
}

/** Fetch the office of `hour` for the given ISO date. Returns null on any failure. */
export async function fetchOffice(
  hour: AelfOfficeHour,
  date: string
): Promise<AelfOfficeResponse | null> {
  if (!isAelfOfficeHour(hour)) return null;
  if (!isValidIsoDate(date)) return null;
  const url = `${AELF_BASE}/office/${hour}/${date}`;
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;
    const data = (await res.json()) as AelfOfficeResponse;
    if (!data || typeof data !== "object") return null;
    return data;
  } catch {
    return null;
  }
}
