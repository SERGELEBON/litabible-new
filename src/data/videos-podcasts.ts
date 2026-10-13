import type { VideoItem, PodcastItem } from './types'
import type { Locale } from '@/lib/store'

// =============================================================================
// Videos and podcasts — SAMPLE institutional content for the LitaBible app.
// YouTube IDs are plausible placeholders, not real copyrighted content.
//
// Each item carries localized title/description in en / fr / es. Use
// `getVideo(item, locale)` / `getPodcast(item, locale)` to obtain the right
// strings, or `localizedVideos(locale)` / `localizedPodcasts(locale)` to
// obtain a fully-localized array (preserving `id`, `number`, `youtubeId`,
// `audioUrl`, `duration` from the underlying item).
// =============================================================================

interface LocalizedVideoItem {
  id: string
  number: string
  youtubeId: string
  duration?: string
  title: { en: string; fr: string; es: string }
  description: { en: string; fr: string; es: string }
}

interface LocalizedPodcastItem {
  id: string
  number: string
  duration?: string
  audioUrl?: string
  title: { en: string; fr: string; es: string }
  description: { en: string; fr: string; es: string }
}

export const videos: LocalizedVideoItem[] = [
  {
    id: 'video-1',
    number: '1/5',
    title: {
      en: 'Presentation of LitaBible',
      fr: 'Présentation de LitaBible',
      es: 'Presentación de LitaBible',
    },
    description: {
      en: 'What is LitaBible? Who is this service for, and what are its main areas of work in biblical reading, meditation and the diffusion of Bible and liturgy?',
      fr: "Qu’est-ce que LitaBible ? À qui s’adresse ce service, et quels sont ses grands chantiers de lecture, de méditation et de diffusion biblique et liturgique ?",
      es: '¿Qué es LitaBible? ¿A quién se dirige este servicio y cuáles son sus grandes líneas de lectura, meditación y difusión bíblica y litúrgica?',
    },
    youtubeId: 'dQw4w9WgXcQ',
    duration: '5 min 12',
  },
  {
    id: 'video-2',
    number: '2/5',
    title: {
      en: 'The liturgical Bible',
      fr: 'La Bible liturgique',
      es: 'La Biblia litúrgica',
    },
    description: {
      en: 'Discover the work of the biblical scholars and liturgists who translated the liturgical Bible for proclamation to the assembly. Follow the path of a verse from Hebrew, Aramaic or Greek, to the official French version.',
      fr: "Découvrez le travail des biblistes et liturgistes qui ont traduit la Bible liturgique pour la proclamation à l’assemblée. Suivez le chemin d’un verset depuis l’hébreu, l’araméen ou le grec, jusqu’à la version francophone officielle.",
      es: 'Descubra el trabajo de los biblistas y liturgistas que tradujeron la Biblia litúrgica para la proclamación en la asamblea. Siga el camino de un versículo desde el hebreo, el arameo o el griego, hasta la versión oficial en español.',
    },
    youtubeId: 'qAz1C0m5Hnk',
    duration: '7 min 45',
  },
  {
    id: 'video-3',
    number: '3/5',
    title: {
      en: 'The daily readings',
      fr: 'Les lectures du jour',
      es: 'Las lecturas del día',
    },
    description: {
      en: 'How are the daily readings composed? Presentation of the readings of the day, the order of the season and of the saints, the prayers.',
      fr: "Comment sont composées les lectures du jour ? Présentation des lectures du jour, de l’ordre du temps et des saints, des prières.",
      es: '¿Cómo se componen las lecturas del día? Presentación de las lecturas del día, del orden del tiempo y de los santos, de las oraciones.',
    },
    youtubeId: 'kJQP7kiw5Fk',
    duration: '6 min 30',
  },
  {
    id: 'video-5',
    number: '4/5',
    title: {
      en: 'The liturgical seasons',
      fr: 'Les temps liturgiques',
      es: 'Los tiempos litúrgicos',
    },
    description: {
      en: 'Advent, Christmas, Ordinary Time, Lent, Paschal Triduum, Easter season: a journey through the liturgical year to understand the colour, the prayer and the spirituality of each season.',
      fr: "Avent, Noël, Temps ordinaire, Carême, Triduum pascal, Temps pascal : un voyage à travers l’année liturgique pour comprendre la couleur, la prière et la spiritualité de chaque temps.",
      es: 'Adviento, Navidad, Tiempo ordinario, Cuaresma, Triduo pascual, Tiempo pascual: un viaje a través del año litúrgico para comprender el color, la oración y la espiritualidad de cada tiempo.',
    },
    youtubeId: '3JZD3z6t1Hs',
    duration: '6 min 18',
  },
  {
    id: 'video-6',
    number: '5/5',
    title: {
      en: 'The liturgical year',
      fr: "L’année liturgique",
      es: 'El año litúrgico',
    },
    description: {
      en: 'How does the liturgical year unfold around the feast of Easter? Understanding the A/B/C cycle of Sunday readings, the mobility of the feasts and the weeks of the psalter.',
      fr: "Comment l’année liturgique se déploie-t-elle autour de la fête de Pâques ? Comprendre le cycle A/B/C des lectures dominicales, la mobilité des fêtes et les semaines du psautier.",
      es: '¿Cómo se desarrolla el año litúrgico en torno a la fiesta de Pascua? Comprender el ciclo A/B/C de las lecturas dominicales, la movilidad de las fiestas y las semanas del salterio.',
    },
    youtubeId: '5qap5aQ4IaA',
    duration: '5 min 50',
  },
]

export const podcasts: LocalizedPodcastItem[] = [
  {
    id: 'podcast-1',
    number: '1/3',
    title: {
      en: 'The daily teaching',
      fr: 'L’enseignement de chaque jour',
      es: 'La enseñanza de cada día',
    },
    description: {
      en: 'Each morning, a brief meditation on the readings of the day’s teaching. An invitation to enter into the Word before going through the day.',
      fr: "Chaque matin, une méditation brève sur les lectures de l’enseignement du jour. Une invitation à entrer dans la Parole avant de traverser la journée.",
      es: 'Cada mañana, una breve meditación sobre las lecturas de la enseñanza del día. Una invitación a entrar en la Palabra antes de recorrer la jornada.',
    },
    duration: '10 min',
    audioUrl: 'https://exemple.org/podcast/messe-jour-1.mp3',
  },
  {
    id: 'podcast-3',
    number: '2/3',
    title: {
      en: 'Biblical paths',
      fr: 'Parcours bibliques',
      es: 'Recorridos bíblicos',
    },
    description: {
      en: 'Interviews with biblical scholars: Genesis, the Psalms, the Gospels, the Acts, the Revelation. A progressive initiation to the intelligent reading of the Bible.',
      fr: "Entretiens avec des biblistes : la Genèse, les Psaumes, les Évangiles, les Actes, l’Apocalypse. Une initiation progressive à la lecture intelligenti de la Bible.",
      es: 'Entrevistas con biblistas: el Génesis, los Salmos, los Evangelios, los Hechos, el Apocalipsis. Una iniciación progresiva a la lectura inteligente de la Biblia.',
    },
    duration: '30 min',
    audioUrl: 'https://exemple.org/podcast/parcours-bibliques-1.mp3',
  },
  {
    id: 'podcast-4',
    number: '3/3',
    title: {
      en: 'On the threshold of the feasts',
      fr: 'Au seuil des fêtes',
      es: 'En el umbral de las fiestas',
    },
    description: {
      en: 'As the great feasts approach (Christmas, Epiphany, Easter, Ascension, Pentecost, All Saints), a liturgical, biblical and pastoral light to celebrate them better.',
      fr: "À l’approche des grandes fêtes (Noël, Épiphanie, Pâques, Ascension, Pentecôte, Toussaint), un éclairage liturgique, biblique et pastoral pour mieux les célébrer.",
      es: 'Al acercarse las grandes fiestas (Navidad, Epifanía, Pascua, Ascensión, Pentecostés, Todos los Santos), una luz litúrgica, bíblica y pastoral para celebrarlas mejor.',
    },
    duration: '12 min',
    audioUrl: 'https://exemple.org/podcast/au-seuil-fetes-1.mp3',
  },
]

/**
 * Returns the localized version of a video item, with the right title and
 * description for the requested locale.
 */
export function getVideo(item: LocalizedVideoItem, locale: Locale): VideoItem {
  return {
    id: item.id,
    number: item.number,
    youtubeId: item.youtubeId,
    duration: item.duration,
    title: item.title[locale],
    description: item.description[locale],
  }
}

export function getPodcast(item: LocalizedPodcastItem, locale: Locale): PodcastItem {
  return {
    id: item.id,
    number: item.number,
    duration: item.duration,
    audioUrl: item.audioUrl,
    title: item.title[locale],
    description: item.description[locale],
  }
}

export function localizedVideos(locale: Locale): VideoItem[] {
  return videos.map((v) => getVideo(v, locale))
}

export function localizedPodcasts(locale: Locale): PodcastItem[] {
  return podcasts.map((p) => getPodcast(p, locale))
}
