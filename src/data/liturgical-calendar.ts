import type { DayInfo, LiturgicalColor } from './types'
import type { Locale } from '@/lib/store'

// =============================================================================
// Liturgical calendar — heuristic, deterministic computation of DayInfo.
// All fixed-date feasts follow the shared calendar; movable feasts are
// computed via the Computus (Meeus/Jones/Butcher algorithm).
// =============================================================================

function easterDate(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

function daysBetween(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime()
  return Math.round(ms / (24 * 60 * 60 * 1000))
}

function ashWednesday(year: number): Date {
  return addDays(easterDate(year), -46)
}

function palmSunday(year: number): Date {
  return addDays(easterDate(year), -7)
}

function pentecostDate(year: number): Date {
  return addDays(easterDate(year), 49)
}

function trinitySunday(year: number): Date {
  return addDays(pentecostDate(year), 7)
}

function firstSundayOfAdvent(year: number): Date {
  // 4th Sunday before Christmas (Dec 25). Find the Sunday on or before Dec 25
  // and subtract 3 weeks (21 days).
  const christmas = new Date(year, 11, 25)
  const dow = christmas.getDay()
  const sundayOnOrBefore = addDays(christmas, -dow)
  return addDays(sundayOnOrBefore, -21)
}

function epiphanySunday(year: number): Date {
  // In France, Epiphany is the Sunday between Jan 2 and Jan 8.
  const jan1 = new Date(year, 0, 1)
  const dow = jan1.getDay()
  const offset = dow === 0 ? 7 : 7 - dow
  return addDays(jan1, offset)
}

function baptismOfLord(year: number): Date {
  // Sunday after Epiphany Sunday.
  return addDays(epiphanySunday(year), 7)
}

function liturgicalYearLabel(date: Date): 'A' | 'B' | 'C' {
  // Year A starts First Sunday of Advent of years 2016, 2019, 2022, 2025, ...
  // i.e. (year_of_Advent % 3) === 0 -> A, === 1 -> B, === 2 -> C.
  let Y = date.getFullYear()
  let adv = firstSundayOfAdvent(Y)
  if (date.getTime() < adv.getTime()) Y -= 1
  const mod = ((Y % 3) + 3) % 3
  return mod === 0 ? 'A' : mod === 1 ? 'B' : 'C'
}

// ---------------------------------------------------------------------------
// Fixed-date feasts (subset of the shared calendar, in French).
// ---------------------------------------------------------------------------
type FeastRank = 'solemnite' | 'fete' | 'memoire' | 'memoire_facultative'

interface FixedFeast {
  month: number
  day: number
  name: string
  color: LiturgicalColor
  rank: FeastRank
}

const fixedFeasts: FixedFeast[] = [
  { month: 1, day: 1, name: 'Sainte Marie, Mère de Dieu — solennité', color: 'white', rank: 'solemnite' },
  { month: 1, day: 25, name: 'Conversion de saint Paul, apôtre — fête', color: 'white', rank: 'fete' },
  { month: 1, day: 26, name: 'Saints Timothée et Tite — mémoire', color: 'white', rank: 'memoire' },
  { month: 2, day: 2, name: 'Présentation du Seigneur — fête', color: 'white', rank: 'fete' },
  { month: 2, day: 14, name: 'Saints Cyrille et Méthode — commémoration', color: 'white', rank: 'memoire' },
  { month: 2, day: 22, name: 'Chaire de saint Pierre, apôtre — fête', color: 'white', rank: 'fete' },
  { month: 3, day: 7, name: 'Saintes Perpétue et Félicité, martyres — mémoire', color: 'red', rank: 'memoire' },
  { month: 3, day: 17, name: 'Saint Patrice — commémoration', color: 'white', rank: 'memoire_facultative' },
  { month: 3, day: 19, name: 'Saint Joseph, époux de la Vierge Marie — solennité', color: 'white', rank: 'solemnite' },
  { month: 3, day: 25, name: 'Annonciation du Seigneur — solennité', color: 'white', rank: 'solemnite' },
  { month: 4, day: 25, name: 'Saint Marc, évangéliste — fête', color: 'red', rank: 'fete' },
  { month: 4, day: 29, name: 'Sainte Catherine de Sienne, vierge et docteur — mémoire', color: 'white', rank: 'memoire' },
  { month: 5, day: 1, name: 'Saint Joseph artisan — mémoire', color: 'white', rank: 'memoire_facultative' },
  { month: 5, day: 2, name: 'Saint Athanase, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 5, day: 3, name: 'Saints Philippe et Jacques, apôtres — fête', color: 'red', rank: 'fete' },
  { month: 5, day: 14, name: 'Saint Matthias, apôtre — fête', color: 'red', rank: 'fete' },
  { month: 5, day: 31, name: 'Visitation de la Vierge Marie — fête', color: 'white', rank: 'fete' },
  { month: 6, day: 1, name: 'Saint Justin, martyr — mémoire', color: 'red', rank: 'memoire' },
  { month: 6, day: 5, name: 'Saint Boniface, martyr — commémoration', color: 'red', rank: 'memoire' },
  { month: 6, day: 9, name: 'Saint Éphrem, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 6, day: 13, name: 'Saint Antoine de Padoue, docteur — mémoire', color: 'white', rank: 'memoire' },
  { month: 6, day: 21, name: 'Saint Louis de Gonzague — commémoration', color: 'white', rank: 'memoire' },
  { month: 6, day: 24, name: 'Nativité de saint Jean Baptiste — solennité', color: 'white', rank: 'solemnite' },
  { month: 6, day: 27, name: 'Saint Cyrille d\'Alexandrie, docteur — commémoration', color: 'white', rank: 'memoire_facultative' },
  { month: 6, day: 28, name: 'Saint Irénée, martyr — commémoration', color: 'red', rank: 'memoire' },
  { month: 6, day: 29, name: 'Saints Pierre et Paul, apôtres — solennité', color: 'red', rank: 'solemnite' },
  { month: 6, day: 30, name: 'Premiers témoins — commémoration', color: 'red', rank: 'memoire_facultative' },
  { month: 7, day: 3, name: 'Saint Thomas, apôtre — fête', color: 'red', rank: 'fete' },
  { month: 7, day: 11, name: 'Saint Benoît — commémoration', color: 'white', rank: 'memoire' },
  { month: 7, day: 14, name: 'Saint Camille de Lellis — commémoration', color: 'white', rank: 'memoire_facultative' },
  { month: 7, day: 15, name: 'Saint Bonaventure, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 7, day: 22, name: 'Sainte Marie Madeleine — fête', color: 'white', rank: 'fete' },
  { month: 7, day: 25, name: 'Saint Jacques, apôtre — fête', color: 'red', rank: 'fete' },
  { month: 7, day: 26, name: 'Saints Anne et Joachim, parents de la Vierge Marie — mémoire', color: 'white', rank: 'memoire' },
  { month: 7, day: 29, name: 'Sainte Marthe — mémoire', color: 'white', rank: 'memoire' },
  { month: 7, day: 31, name: 'Saint Ignace de Loyola — commémoration', color: 'white', rank: 'memoire' },
  { month: 8, day: 1, name: 'Saint Alphonse de Liguori, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 8, day: 4, name: 'Saint Jean-Marie Vianney — commémoration', color: 'white', rank: 'memoire' },
  { month: 8, day: 8, name: 'Saint Dominique — commémoration', color: 'white', rank: 'memoire' },
  { month: 8, day: 9, name: 'Sainte Thérèse-Bénédicte de la Croix, vierge et martyre — fête', color: 'white', rank: 'fete' },
  { month: 8, day: 10, name: 'Saint Laurent, martyr — fête', color: 'red', rank: 'fete' },
  { month: 8, day: 11, name: 'Sainte Claire, vierge — mémoire', color: 'white', rank: 'memoire' },
  { month: 8, day: 14, name: 'Saint Maximilien-Marie Kolbe, martyr — commémoration', color: 'red', rank: 'memoire' },
  { month: 8, day: 15, name: 'Assomption de la Vierge Marie — solennité', color: 'white', rank: 'solemnite' },
  { month: 8, day: 20, name: 'Saint Bernard, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 8, day: 21, name: 'Saint Pie X — commémoration', color: 'white', rank: 'memoire' },
  { month: 8, day: 22, name: 'Vierge Marie, Reine — mémoire', color: 'white', rank: 'memoire' },
  { month: 8, day: 24, name: 'Saint Barthélemy, apôtre — fête', color: 'red', rank: 'fete' },
  { month: 8, day: 25, name: 'Saint Louis, roi — mémoire', color: 'white', rank: 'memoire' },
  { month: 8, day: 27, name: 'Sainte Monique — mémoire', color: 'white', rank: 'memoire' },
  { month: 8, day: 28, name: 'Saint Augustin, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 8, day: 29, name: 'Martyre de saint Jean Baptiste — mémoire', color: 'red', rank: 'memoire' },
  { month: 9, day: 3, name: 'Saint Grégoire le Grand, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 9, day: 8, name: 'Nativité de la Vierge Marie — fête', color: 'white', rank: 'fete' },
  { month: 9, day: 13, name: 'Saint Jean Chrysostome, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 9, day: 14, name: 'Exaltation de la Sainte Croix — fête', color: 'red', rank: 'fete' },
  { month: 9, day: 15, name: 'Notre-Dame des Douleurs — mémoire', color: 'white', rank: 'memoire' },
  { month: 9, day: 16, name: 'Saints Corneille et Cyprien, martyrs — commémoration', color: 'red', rank: 'memoire' },
  { month: 9, day: 20, name: 'Saints André Kim Tægon, Paul Chong Hasang et ses compagnons, martyrs — commémoration', color: 'red', rank: 'memoire' },
  { month: 9, day: 21, name: 'Saint Matthieu, apôtre et évangéliste — fête', color: 'red', rank: 'fete' },
  { month: 9, day: 23, name: 'Saint Padre Pio — commémoration', color: 'white', rank: 'memoire_facultative' },
  { month: 9, day: 26, name: 'Saints Côme et Damien, martyrs — mémoire', color: 'red', rank: 'memoire_facultative' },
  { month: 9, day: 27, name: 'Saint Vincent de Paul — commémoration', color: 'white', rank: 'memoire' },
  { month: 9, day: 29, name: 'Saints Michel, Gabriel et Raphaël, archanges — fête', color: 'red', rank: 'fete' },
  { month: 9, day: 30, name: 'Saint Jérôme, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 10, day: 1, name: 'Sainte Thérèse de l\'Enfant-Jésus, vierge et docteur — fête', color: 'white', rank: 'fete' },
  { month: 10, day: 2, name: 'Saints Anges gardiens — mémoire', color: 'white', rank: 'memoire' },
  { month: 10, day: 4, name: 'Saint François d\'Assise — mémoire', color: 'white', rank: 'memoire' },
  { month: 10, day: 7, name: 'Notre-Dame du Rosaire — mémoire', color: 'white', rank: 'memoire' },
  { month: 10, day: 9, name: 'Saint Denis et ses compagnons, martyrs — fête', color: 'red', rank: 'fete' },
  { month: 10, day: 15, name: 'Sainte Thérèse d\'Avila, vierge et docteur — mémoire', color: 'white', rank: 'memoire' },
  { month: 10, day: 17, name: 'Saint Ignace d\'Antioche, martyr — commémoration', color: 'red', rank: 'memoire' },
  { month: 10, day: 18, name: 'Saint Luc, évangéliste — fête', color: 'red', rank: 'fete' },
  { month: 10, day: 19, name: 'Saints Jean de Brébeuf et Isaac Jogues et leurs compagnons, martyrs — commémoration', color: 'red', rank: 'memoire' },
  { month: 10, day: 22, name: 'Saint Jean-Paul II — commémoration', color: 'white', rank: 'memoire_facultative' },
  { month: 10, day: 28, name: 'Saints Simon et Jude, apôtres — fête', color: 'red', rank: 'fete' },
  { month: 11, day: 1, name: 'Tous les saints — solennité', color: 'white', rank: 'solemnite' },
  { month: 11, day: 2, name: 'Commémoraison de tous les fidèles défunts', color: 'violet', rank: 'fete' },
  { month: 11, day: 3, name: 'Saint Martin de Tours — commémoration', color: 'white', rank: 'memoire' },
  { month: 11, day: 4, name: 'Saint Charles Borromée — commémoration', color: 'white', rank: 'memoire' },
  { month: 11, day: 9, name: 'Dédicace de la basilique du Latran — fête', color: 'white', rank: 'fete' },
  { month: 11, day: 10, name: 'Saint Léon le Grand, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 11, day: 11, name: 'Saint Martin de Tours — commémoration', color: 'white', rank: 'memoire_facultative' },
  { month: 11, day: 12, name: 'Saint Josaphat, martyr — commémoration', color: 'red', rank: 'memoire' },
  { month: 11, day: 17, name: 'Sainte Élisabeth de Hongrie — commémoration', color: 'white', rank: 'memoire' },
  { month: 11, day: 22, name: 'Sainte Cécile, vierge et martyre — mémoire', color: 'red', rank: 'memoire' },
  { month: 11, day: 24, name: 'Saint André Dũng-Lạc et ses compagnons, martyrs — fête', color: 'red', rank: 'fete' },
  { month: 11, day: 30, name: 'Saint André, apôtre — fête', color: 'red', rank: 'fete' },
  { month: 12, day: 3, name: 'Saint François-Xavier — commémoration', color: 'white', rank: 'memoire' },
  { month: 12, day: 6, name: 'Saint Nicolas — commémoration', color: 'white', rank: 'memoire_facultative' },
  { month: 12, day: 7, name: 'Saint Ambroise, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 12, day: 8, name: 'Immaculée Conception de la Vierge Marie — solennité', color: 'white', rank: 'solemnite' },
  { month: 12, day: 12, name: 'Notre-Dame de Guadalupe — mémoire', color: 'white', rank: 'memoire_facultative' },
  { month: 12, day: 13, name: 'Sainte Lucie, vierge et martyre — mémoire', color: 'red', rank: 'memoire' },
  { month: 12, day: 14, name: 'Saint Jean de la Croix, docteur — commémoration', color: 'white', rank: 'memoire' },
  { month: 12, day: 25, name: 'Nativité de notre Seigneur Jésus Christ — solennité', color: 'white', rank: 'solemnite' },
  { month: 12, day: 26, name: 'Saint Étienne, premier martyr — fête', color: 'red', rank: 'fete' },
  { month: 12, day: 27, name: 'Saint Jean, apôtre et évangéliste — fête', color: 'white', rank: 'fete' },
  { month: 12, day: 28, name: 'Saints Innocents, martyrs — fête', color: 'red', rank: 'fete' },
  { month: 12, day: 31, name: 'Saint Sylvestre Ier — commémoration', color: 'white', rank: 'memoire_facultative' },
]

function findFixedFeast(date: Date): FixedFeast | undefined {
  const m = date.getMonth() + 1
  const d = date.getDate()
  return fixedFeasts.find((f) => f.month === m && f.day === d)
}

const WEEKDAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

function ordinal(n: number): string {
  if (n === 1) return '1er'
  return `${n}e`
}

function psalterWeekFor(date: Date): string {
  // Deterministic 4-week cycle based on the day of year.
  const startOfYear = new Date(date.getFullYear(), 0, 1)
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000))
  const idx = (Math.floor(dayOfYear / 7) + 3) % 4
  const labels = ['I', 'II', 'III', 'IV']
  return `Semaine ${labels[idx]} du Psautier`
}

interface SeasonInfo {
  time: string
  color: LiturgicalColor
  /** Number of the week within this season (for Sunday numbering), 0 if N/A. */
  weekNumber: number
  /** Special override for the day name. */
  dayName?: string
}

function determineSeason(date: Date): SeasonInfo {
  const year = date.getFullYear()
  const easter = easterDate(year)
  const ashWed = ashWednesday(year)
  const holyThu = addDays(easter, -3)
  const goodFri = addDays(easter, -2)
  const holySat = addDays(easter, -1)
  const pentecost = pentecostDate(year)
  const trinity = trinitySunday(year)
  const advent = firstSundayOfAdvent(year)
  const baptism = baptismOfLord(year)
  const christmas = new Date(year, 11, 25)
  const prevChristmas = new Date(year - 1, 11, 25)
  const prevBaptism = baptismOfLord(year - 1)

  // 1. Christmas season: Dec 25 (prev year) -> Baptism of Lord (this year),
  //    and Dec 25 (this year) -> Baptism of Lord (next year).
  const baptismThisYear = baptism
  const baptismNextYear = baptismOfLord(year + 1)
  if ((date >= prevChristmas && date <= baptismThisYear) || (date >= christmas && date <= baptismNextYear)) {
    // Determine day name within Christmas season.
    if (sameDay(date, christmas)) return { time: 'Temps de Noël', color: 'white', weekNumber: 0, dayName: 'Nativité du Seigneur' }
    if (sameDay(date, prevChristmas)) return { time: 'Temps de Noël', color: 'white', weekNumber: 0, dayName: 'Nativité du Seigneur' }
    if (sameDay(date, baptism) || sameDay(date, prevBaptism) || sameDay(date, baptismThisYear) || sameDay(date, baptismNextYear)) return { time: 'Temps de Noël', color: 'white', weekNumber: 0, dayName: 'Baptême du Seigneur' }
    // Sunday within Octave of Christmas (Holy Family in modern French calendar = Sunday between Dec 25 and Jan 1 inclusive, otherwise Dec 30)
    return { time: 'Temps de Noël', color: 'white', weekNumber: 0, dayName: christmasNameFor(date) }
  }

  // 2. Ordinary Time, first part: Monday after Baptism -> day before Ash Wednesday.
  if (date > baptism && date < ashWed) {
    const weeksAfterBaptism = Math.floor(daysBetween(baptism, date) / 7)
    const isSunday = date.getDay() === 0
    const n = weeksAfterBaptism // baptism = 0; 1st Sunday = 1
    if (isSunday) {
      return { time: 'Temps ordinaire', color: 'green', weekNumber: n, dayName: `${ordinal(n)} dimanche du Temps ordinaire` }
    }
    return { time: 'Temps ordinaire', color: 'green', weekNumber: n, dayName: weekdayName(date, `${ordinal(n)} semaine du Temps ordinaire`) }
  }

  // 3. Lent: Ash Wednesday -> Holy Saturday (Easter eve).
  if (date >= ashWed && date < easter) {
    if (sameDay(date, ashWed)) return { time: 'Temps du Carême', color: 'violet', weekNumber: 0, dayName: 'Mercredi des Cendres' }
    if (sameDay(date, palmSunday(year))) return { time: 'Temps du Carême', color: 'red', weekNumber: 6, dayName: 'Dimanche des Rameaux et de la Passion du Seigneur' }
    if (sameDay(date, holyThu)) return { time: 'Triduum pascal', color: 'white', weekNumber: 0, dayName: 'Jeudi Saint' }
    if (sameDay(date, goodFri)) return { time: 'Triduum pascal', color: 'red', weekNumber: 0, dayName: 'Vendredi Saint' }
    if (sameDay(date, holySat)) return { time: 'Triduum pascal', color: 'violet', weekNumber: 0, dayName: 'Samedi Saint' }

    // Within Lent proper.
    const firstSunOfLent = addDays(ashWed, 7 - ashWed.getDay() + (ashWed.getDay() === 0 ? 0 : 0))
    // Recompute: 1st Sunday of Lent is the Sunday following Ash Wednesday.
    const sun1 = addDays(ashWed, 7 - ashWed.getDay())
    if (date < sun1) {
      // Days after Ash Wed but before 1st Sunday of Lent.
      const isSunday = date.getDay() === 0
      if (isSunday) return { time: 'Temps du Carême', color: 'violet', weekNumber: 1, dayName: '1er dimanche de Carême' }
      return { time: 'Temps du Carême', color: 'violet', weekNumber: 0, dayName: weekdayName(date, 'semaine des Cendres') }
    }
    // Otherwise count Sundays since the 1st Sunday of Lent.
    const weeksAfterSun1 = Math.floor(daysBetween(sun1, date) / 7)
    const n = weeksAfterSun1 + 1
    const isSunday = date.getDay() === 0
    if (isSunday) {
      const color: LiturgicalColor = n === 4 ? 'rose' : 'violet'
      const name = n === 4 ? `4e dimanche de Carême (Laetare)` : `${ordinal(n)} dimanche de Carême`
      return { time: 'Temps du Carême', color, weekNumber: n, dayName: name }
    }
    // Weekdays of Lent — use the week number based on which Sunday’s week we’re in.
    const weekN = n // n is the upcoming Sunday’s number
    return { time: 'Temps du Carême', color: 'violet', weekNumber: weekN, dayName: weekdayName(date, `${ordinal(weekN)} semaine de Carême`) }
  }

  // 4. Easter season: Easter Sunday -> Pentecost.
  if (date >= easter && date <= pentecost) {
    if (sameDay(date, easter)) return { time: 'Temps pascal', color: 'white', weekNumber: 0, dayName: 'Dimanche de Pâques' }
    if (sameDay(date, addDays(easter, 39))) return { time: 'Temps pascal', color: 'white', weekNumber: 0, dayName: 'Ascension du Seigneur' }
    if (sameDay(date, pentecost)) return { time: 'Temps pascal', color: 'red', weekNumber: 0, dayName: 'Dimanche de la Pentecôte' }
    // Determine week of Easter.
    const daysAfterEaster = daysBetween(easter, date)
    const weekN = Math.floor(daysAfterEaster / 7) + 1
    const isSunday = date.getDay() === 0
    if (isSunday) {
      return { time: 'Temps pascal', color: 'white', weekNumber: weekN, dayName: `${ordinal(weekN)} dimanche de Pâques` }
    }
    // Within the Octave of Easter (first 7 days after Easter).
    if (daysAfterEaster < 7) {
      return { time: 'Temps pascal', color: 'white', weekNumber: 1, dayName: weekdayName(date, "l’Octave de Pâques") }
    }
    return { time: 'Temps pascal', color: 'white', weekNumber: weekN, dayName: weekdayName(date, `${ordinal(weekN)} semaine de Pâques`) }
  }

  // 5. Trinity Sunday (Sunday after Pentecost).
  if (sameDay(date, trinity)) {
    return { time: 'Temps ordinaire', color: 'white', weekNumber: 0, dayName: 'Sainte Trinité' }
  }

  // 6. Ordinary Time, second part: Monday after Trinity -> Saturday before Advent Sunday.
  if (date > trinity && date < advent) {
    // Number of Sundays before Lent this year (for continuous numbering).
    const baptismThisYear = baptismOfLord(year)
    const ashWedThisYear = ashWednesday(year)
    let preLentSundays = 0
    let cursor = addDays(baptismThisYear, 7)
    while (cursor < ashWedThisYear) {
      preLentSundays++
      cursor = addDays(cursor, 7)
    }
    const weeksAfterTrinity = Math.floor(daysBetween(trinity, date) / 7)
    const isSunday = date.getDay() === 0
    // Trinity Sunday is celebrated as a separate solemnity; the Sunday after
    // Trinity is the (preLentSundays + 1)th Sunday of Ordinary Time.
    const n = preLentSundays + weeksAfterTrinity
    if (isSunday) {
      // Christ the King (Sunday before Advent) — solemnity.
      if (sameDay(date, addDays(advent, -7))) {
        return { time: 'Temps ordinaire', color: 'white', weekNumber: n, dayName: 'Christ Roi de l\'univers' }
      }
      return { time: 'Temps ordinaire', color: 'green', weekNumber: n, dayName: `${ordinal(n)} dimanche du Temps ordinaire` }
    }
    return { time: 'Temps ordinaire', color: 'green', weekNumber: n, dayName: weekdayName(date, `${ordinal(n)} semaine du Temps ordinaire`) }
  }

  // 7. Advent: Advent Sunday -> Dec 24.
  if (date >= advent && date < christmas) {
    const weeksAfterAdvent = Math.floor(daysBetween(advent, date) / 7)
    const n = weeksAfterAdvent + 1
    const isSunday = date.getDay() === 0
    if (isSunday) {
      const color: LiturgicalColor = n === 3 ? 'rose' : 'violet'
      const name = n === 3 ? `3e dimanche de l’Avent (Gaudete)` : `${ordinal(n)} dimanche de l’Avent`
      return { time: 'Temps de l\'Avent', color, weekNumber: n, dayName: name }
    }
    return { time: 'Temps de l\'Avent', color: 'violet', weekNumber: n, dayName: weekdayName(date, `${ordinal(n)} semaine de l’Avent`) }
  }

  // Fallback (shouldn’t happen).
  return { time: 'Temps ordinaire', color: 'green', weekNumber: 0 }
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function weekdayName(date: Date, weekLabel: string): string {
  const wd = WEEKDAY_NAMES[date.getDay()]
  return `${wd} de la ${weekLabel}`
}

function christmasNameFor(date: Date): string {
  // Sunday within the Octave of Christmas — Holy Family.
  if (date.getDay() === 0) return 'Sainte Famille de Jésus, Marie et Joseph'
  const d = date.getDate()
  const m = date.getMonth() + 1
  if (m === 12) {
    if (d >= 26 && d <= 31) return `${ordinal(d - 24)} jour de l’octave de Noël`
  }
  if (m === 1) {
    if (d >= 2 && d <= 6) return `${ordinal(d)} jour avant l’Épiphanie`
    if (d === 1) return 'Sainte Marie, Mère de Dieu'
  }
  return 'Temps de Noël'
}

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

function toISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function getDayInfo(dateInput: string): DayInfo {
  const date = parseISO(dateInput)
  const season = determineSeason(date)
  const isSunday = date.getDay() === 0
  const feast = findFixedFeast(date)

  // Determine the "principal celebration" of the day: Sundays and solemnities
  // outrank fixed memorials; memorials are observed on weekdays.
  let color: LiturgicalColor = season.color
  let colorFilled: boolean
  let dayName: string = season.dayName ?? ''
  let feastLabel: string | undefined

  // "Top-rank" days computed by the season — Sundays of Advent/Lent/Easter,
  // Holy Week, Octave of Easter, Christmas octave, Trinity Sunday, Christ the
  // King, Ash Wednesday, Holy Thursday, Good Friday, Holy Saturday, Ascension,
  // Nativité, Baptême du Seigneur, Sainte Famille. These outrank ALL fixed
  // feasts and memorials.
  const seasonDayName = season.dayName ?? ''
  const seasonIsTopRank =
    (isSunday &&
      (season.time === "Temps de l'Avent" ||
        season.time === 'Temps du Carême' ||
        season.time === 'Temps pascal' ||
        season.time === 'Triduum pascal' ||
        season.time === 'Temps de Noël')) ||
    [
      'Sainte Trinité',
      'Christ Roi de l\'univers',
      'Dimanche de Pâques',
      'Dimanche de la Pentecôte',
      'Dimanche des Rameaux et de la Passion du Seigneur',
      'Mercredi des Cendres',
      'Jeudi Saint',
      'Vendredi Saint',
      'Samedi Saint',
      'Ascension du Seigneur',
      'Nativité du Seigneur',
      'Baptême du Seigneur',
      'Sainte Famille',
    ].includes(seasonDayName)

  // Sundays of Ordinary Time are "solemnities of the Lord" (rank 3) — they
  // outrank feasts and memorials, but are replaced by saints' solemnities.
  const seasonIsSundayOT = isSunday && season.time === 'Temps ordinaire'

  if (feast) {
    const isSolemnity = feast.rank === 'solemnite'
    const isFeast = feast.rank === 'fete'
    if (seasonIsTopRank) {
      // Season's top-rank day wins; fixed feast is noted (transferred/suppressed).
      color = season.color
      colorFilled = true
      dayName = seasonDayName
      feastLabel = feast.name
    } else if (isSolemnity) {
      // Fixed solemnity replaces the day (incl. Sunday of OT and weekdays).
      color = feast.color
      colorFilled = true
      dayName = feast.name.replace(/ — solennité$/, '')
      feastLabel = feast.name
    } else if (seasonIsSundayOT) {
      // Sunday of Ordinary Time wins over fixed feasts and memorials.
      color = season.color
      colorFilled = true
      dayName = seasonDayName
      feastLabel = feast.name
    } else if (isFeast) {
      // Feast wins for non-solemn weekdays.
      color = feast.color
      colorFilled = true
      dayName = feast.name.replace(/ — fête$/, '')
      feastLabel = feast.name
    } else {
      // Memorial on a weekday — memorial wins.
      color = feast.color
      colorFilled = feast.rank === 'memoire'
      dayName = feast.name.replace(/ — commémoration facultative$/, '').replace(/ — commémoration$/, '')
      feastLabel = feast.name
    }
  } else {
    // No fixed feast.
    if (isSunday) {
      colorFilled = true // Sundays are always filled.
    } else if (season.weekNumber > 0 && (season.time === 'Temps ordinaire' || season.time === 'Temps de l\'Avent' || season.time === 'Temps du Carême' || season.time === 'Temps pascal')) {
      // Weekday of a liturgical season — outline badge.
      colorFilled = false
    } else {
      colorFilled = false
    }
  }

  // Sundays of Lent/Advent/Easter are filled.
  if (isSunday && (season.time === 'Temps du Carême' || season.time === 'Temps de l\'Avent' || season.time === 'Temps pascal' || season.time === 'Triduum pascal')) {
    colorFilled = true
    color = season.color
  }

  if (!dayName) dayName = 'Férie'

  return {
    date: toISO(date),
    color,
    colorFilled,
    liturgicalTime: season.time,
    psalterWeek: psalterWeekFor(date),
    year: `Année ${liturgicalYearLabel(date)}`,
    dayName,
    feast: feastLabel,
  }
}

export function getMonthCalendar(year: number, month: number): DayInfo[] {
  // month is 1-12.
  const daysInMonth = new Date(year, month, 0).getDate()
  const out: DayInfo[] = []
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    out.push(getDayInfo(iso))
  }
  return out
}

// =============================================================================
// Localization helpers for DayInfo.
//
// The calendar logic above produces French strings (liturgicalTime, dayName,
// psalterWeek, year, feast). These helpers translate the known building
// blocks (season names, weekday names, rank suffixes) into English and
// Spanish. Unknown strings fall back to the French original.
// =============================================================================

// Map: French weekday (capitalised) → EN/ES equivalent.
const WEEKDAY_MAP: Record<string, { en: string; es: string }> = {
  Dimanche: { en: 'Sunday', es: 'Domingo' },
  Lundi: { en: 'Monday', es: 'Lunes' },
  Mardi: { en: 'Tuesday', es: 'Martes' },
  Mercredi: { en: 'Wednesday', es: 'Miércoles' },
  Jeudi: { en: 'Thursday', es: 'Jueves' },
  Vendredi: { en: 'Friday', es: 'Viernes' },
  Samedi: { en: 'Saturday', es: 'Sábado' },
}

// Map: French liturgical season phrase → EN/ES equivalent.
const SEASON_MAP: { fr: string; en: string; es: string }[] = [
  { fr: 'Temps ordinaire', en: 'Ordinary Time', es: 'Tiempo ordinario' },
  { fr: "Temps de l'Avent", en: 'Advent', es: 'Adviento' },
  { fr: 'Temps de l’Avent', en: 'Advent', es: 'Adviento' },
  { fr: 'Temps de Noël', en: 'Christmas Time', es: 'Tiempo de Navidad' },
  { fr: 'Temps du Carême', en: 'Lent', es: 'Cuaresma' },
  { fr: 'Temps pascal', en: 'Easter Time', es: 'Tiempo pascual' },
  { fr: 'Triduum pascal', en: 'Paschal Triduum', es: 'Triduo pascual' },
]

// Map: season-phrase fragment used inside dayName patterns like
// "Lundi de la 2e semaine du Temps ordinaire" / "de Carême" / "de l'Avent".
const SEASON_FRAGMENT_MAP: { fr: string; en: string; es: string }[] = [
  { fr: 'du Temps ordinaire', en: 'of Ordinary Time', es: 'del Tiempo ordinario' },
  { fr: "de l'Avent", en: 'of Advent', es: 'de Adviento' },
  { fr: 'de l’Avent', en: 'of Advent', es: 'de Adviento' },
  { fr: 'de Carême', en: 'of Lent', es: 'de Cuaresma' },
  { fr: 'de Pâques', en: 'of Easter', es: 'de Pascua' },
  { fr: 'de Noël', en: 'of Christmas', es: 'de Navidad' },
  { fr: 'des Cendres', en: 'of Ashes', es: 'de Ceniza' },
]

// Map: specific solemnity / feast dayNames that are not derivable from
// weekday + season fragments.
const DAYNAME_EXACT_MAP: { fr: string; en: string; es: string }[] = [
  { fr: 'Mercredi des Cendres', en: 'Ash Wednesday', es: 'Miércoles de Ceniza' },
  {
    fr: 'Dimanche des Rameaux et de la Passion du Seigneur',
    en: "Palm Sunday of the Lord's Passion",
    es: 'Domingo de Ramos y de la Pasión del Señor',
  },
  { fr: 'Jeudi Saint', en: 'Holy Thursday', es: 'Jueves Santo' },
  { fr: 'Vendredi Saint', en: 'Good Friday', es: 'Viernes Santo' },
  { fr: 'Samedi Saint', en: 'Holy Saturday', es: 'Sábado Santo' },
  { fr: 'Dimanche de Pâques', en: 'Easter Sunday', es: 'Domingo de Pascua' },
  { fr: 'Dimanche de la Pentecôte', en: 'Pentecost Sunday', es: 'Domingo de Pentecostés' },
  { fr: 'Ascension du Seigneur', en: 'Ascension of the Lord', es: 'Ascensión del Señor' },
  { fr: 'Nativité du Seigneur', en: 'Nativity of the Lord', es: 'Natividad del Señor' },
  { fr: 'Baptême du Seigneur', en: 'Baptism of the Lord', es: 'Bautismo del Señor' },
  { fr: 'Sainte Trinité', en: 'Holy Trinity', es: 'Santísima Trinidad' },
  { fr: "Christ Roi de l'univers", en: 'Christ the King of the Universe', es: 'Cristo Rey del universo' },
  { fr: 'Christ Roi de l’univers', en: 'Christ the King of the Universe', es: 'Cristo Rey del universo' },
  {
    fr: 'Sainte Famille de Jésus, Marie et Joseph',
    en: 'Holy Family of Jesus, Mary and Joseph',
    es: 'Sagrada Familia de Jesús, María y José',
  },
  { fr: 'Sainte Famille', en: 'Holy Family', es: 'Sagrada Familia' },
  { fr: 'Sainte Marie, Mère de Dieu', en: 'Holy Mary, Mother of God', es: 'Santa María, Madre de Dios' },
  { fr: 'Férie', en: 'Weekday', es: 'Ferial' },
]

// Map: feast-rank suffix appended by the calendar to feast names.
const RANK_SUFFIX_MAP: { fr: string; en: string; es: string }[] = [
  { fr: ' — solennité', en: ' — solemnity', es: ' — solemnidad' },
  { fr: ' — fête', en: ' — feast', es: ' — fiesta' },
  { fr: ' — commémoration facultative', en: ' — optional commemoration', es: ' — conmemoración facultativa' },
  { fr: ' — commémoration', en: ' — commemoration', es: ' — conmemoración' },
]

// Ordinal map for French ordinals appearing in dayName ("1er", "2e", "3e"...).
// EN: 1st, 2nd, 3rd, 4th... ; ES: 1.º, 2.º, 3.º, 4.º...
function localizeOrdinal(s: string, locale: Locale): string {
  if (locale === 'fr') return s
  return s.replace(/(\d+)er/g, (m, digits: string) => {
    const n = Number(digits)
    if (locale === 'en') return `${n}st`
    return `${n}.º`
  }).replace(/(\d+)e\b/g, (m, digits: string) => {
    const n = Number(digits)
    if (locale === 'en') {
      if (n === 0) return '0th'
      const last = n % 10
      const lastTwo = n % 100
      if (lastTwo >= 11 && lastTwo <= 13) return `${n}th`
      if (last === 1) return `${n}st`
      if (last === 2) return `${n}nd`
      if (last === 3) return `${n}rd`
      return `${n}th`
    }
    return `${n}.º`
  })
}

function replaceAll(input: string, find: string, replace: string): string {
  if (!find) return input
  return input.split(find).join(replace)
}

function localizeSeason(s: string, locale: Locale): string {
  if (locale === 'fr' || !s) return s
  for (const entry of SEASON_MAP) {
    if (s === entry.fr) return entry[locale]
  }
  return s
}

function localizeString(s: string, locale: Locale): string {
  if (locale === 'fr' || !s) return s

  // 1. Exact-match dayName overrides.
  for (const entry of DAYNAME_EXACT_MAP) {
    if (s === entry.fr) return entry[locale]
  }

  let out = s

  // 2. Translate weekday names (capitalized).
  for (const [fr, localeMap] of Object.entries(WEEKDAY_MAP)) {
    out = replaceAll(out, fr, localeMap[locale])
  }

  // 3. Translate season fragments inside dayName patterns.
  for (const entry of SEASON_FRAGMENT_MAP) {
    out = replaceAll(out, entry.fr, entry[locale])
  }

  // 4. Translate ordinals ("1er dimanche" → "1st Sunday").
  out = localizeOrdinal(out, locale)

  // 5. Translate the small connector words used in dayName templates:
  //    "semaine" (within "semaine du Temps ordinaire"), "dimanche", "du", "de la".
  if (locale === 'en') {
    out = replaceAll(out, 'semaine du', 'week of')
    out = replaceAll(out, 'semaine de', 'week of')
    out = replaceAll(out, 'semaine des Cendres', 'week of Ashes')
    out = replaceAll(out, 'semaine', 'week')
    out = replaceAll(out, 'dimanche', 'Sunday')
    out = replaceAll(out, 'octave de Pâques', 'Octave of Easter')
    out = replaceAll(out, 'octave de Noël', 'Octave of Christmas')
    out = replaceAll(out, 'jour avant l’Épiphanie', 'day before the Epiphany')
    out = replaceAll(out, "jour de l'octave de Noël", 'day of the Octave of Christmas')
    out = replaceAll(out, 'jour de l’octave de Noël', 'day of the Octave of Christmas')
  } else if (locale === 'es') {
    out = replaceAll(out, 'semaine du', 'semana del')
    out = replaceAll(out, 'semaine de', 'semana de')
    out = replaceAll(out, 'semaine des Cendres', 'semana de Ceniza')
    out = replaceAll(out, 'semaine', 'semana')
    out = replaceAll(out, 'dimanche', 'domingo')
    out = replaceAll(out, 'octave de Pâques', 'Octava de Pascua')
    out = replaceAll(out, 'octave de Noël', 'Octava de Navidad')
    out = replaceAll(out, 'jour avant l’Épiphanie', 'día antes de la Epifanía')
    out = replaceAll(out, "jour de l'octave de Noël", 'día de la Octava de Navidad')
    out = replaceAll(out, 'jour de l’octave de Noël', 'día de la Octava de Navidad')
  }

  return out
}

function localizePsalterWeek(s: string, locale: Locale): string {
  if (locale === 'fr' || !s) return s
  // "Semaine III du Psautier" → "Week III of the Psalter" / "Semana III del Salterio"
  if (locale === 'en') {
    return s.replace(/^Semaine/, 'Week').replace(/du Psautier$/, 'of the Psalter')
  }
  return s.replace(/^Semaine/, 'Semana').replace(/du Psautier$/, 'del Salterio')
}

function localizeYear(s: string, locale: Locale): string {
  if (locale === 'fr' || !s) return s
  // "Année B" → "Year B" / "Año B"
  if (locale === 'en') return s.replace(/^Année/, 'Year')
  return s.replace(/^Année/, 'Año')
}

function localizeFeast(s: string, locale: Locale): string {
  if (locale === 'fr' || !s) return s
  let out = s
  // 1. Replace rank suffixes (longest first to avoid partial matches).
  for (const entry of RANK_SUFFIX_MAP) {
    out = replaceAll(out, entry.fr, entry[locale])
  }
  // 2. Translate weekday + season fragments within feast names.
  out = localizeString(out, locale)
  return out
}

/**
 * Returns a copy of `day` with localized strings for `liturgicalTime`,
 * `dayName`, `feast`, `psalterWeek`, and `year`. The `date`, `color`, and
 * `colorFilled` fields are preserved unchanged. Unknown strings fall back
 * to the French original.
 */
export function localizeDayInfo(day: DayInfo, locale: Locale): DayInfo {
  if (locale === 'fr') return day
  return {
    ...day,
    liturgicalTime: localizeSeason(day.liturgicalTime, locale),
    dayName: localizeString(day.dayName, locale),
    feast: day.feast ? localizeFeast(day.feast, locale) : day.feast,
    psalterWeek: localizePsalterWeek(day.psalterWeek, locale),
    year: localizeYear(day.year, locale),
  }
}

// Convenience for callers that want a fully-localized month calendar.
export function getMonthCalendarLocalized(year: number, month: number, locale: Locale): DayInfo[] {
  return getMonthCalendar(year, month).map((d) => localizeDayInfo(d, locale))
}
