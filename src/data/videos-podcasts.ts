import type { VideoItem, PodcastItem } from './types'

// =============================================================================
// Videos and podcasts — SAMPLE institutional content for the AELF clone.
// YouTube IDs are plausible placeholders, not real copyrighted content.
// =============================================================================

export const videos: VideoItem[] = [
  {
    id: 'video-1',
    number: '1/6',
    title: "Présentation de l’AELF",
    description:
      "Qu’est-ce que l’Association Épiscopale Liturgique pour les pays Francophones ? À qui s’adresse-t-elle, et quels sont ses grands chantiers de traduction, de formation et de diffusion liturgique ?",
    youtubeId: 'dQw4w9WgXcQ',
    duration: '5 min 12',
  },
  {
    id: 'video-2',
    number: '2/6',
    title: 'La Bible liturgique',
    description:
      "Découvrez le travail des biblistes et liturgistes qui ont traduit la Bible liturgique pour la proclamation à l’assemblée. Suivez le chemin d’un verset depuis l’hébreu, l’araméen ou le grec, jusqu’à la version francophone officielle.",
    youtubeId: 'qAz1C0m5Hnk',
    duration: '7 min 45',
  },
  {
    id: 'video-3',
    number: '3/6',
    title: 'Le missel',
    description:
      "Comment est composé le missel utilisé chaque dimanche ? Présentation de l’ordinaire de la messe, du propre du temps et des saints, des préfaces et des prières eucharistiques.",
    youtubeId: 'kJQP7kiw5Fk',
    duration: '6 min 30',
  },
  {
    id: 'video-4',
    number: '4/6',
    title: 'Le livre des heures',
    description:
      "La Liturgie des Heures, prière officielle de l’Église : présentation de l’Office des lectures, des Laudes, des Vêpres et des Complies. Comment s’y retrouver dans le psautier sur quatre semaines ?",
    youtubeId: '9bZkp7q19f0',
    duration: '8 min 02',
  },
  {
    id: 'video-5',
    number: '5/6',
    title: 'Les temps liturgiques',
    description:
      "Avent, Noël, Temps ordinaire, Carême, Triduum pascal, Temps pascal : un voyage à travers l’année liturgique pour comprendre la couleur, la prière et la spiritualité de chaque temps.",
    youtubeId: '3JZD3z6t1Hs',
    duration: '6 min 18',
  },
  {
    id: 'video-6',
    number: '6/6',
    title: "L’année liturgique",
    description:
      "Comment l’année liturgique se déploie-t-elle autour de la fête de Pâques ? Comprendre le cycle A/B/C des lectures dominicales, la mobilité des fêtes et les semaines du psautier.",
    youtubeId: '5qap5aQ4IaA',
    duration: '5 min 50',
  },
]

export const podcasts: PodcastItem[] = [
  {
    id: 'podcast-1',
    number: '1/4',
    title: 'La messe de chaque jour',
    description:
      "Chaque matin, une méditation brève sur les lectures de la messe du jour. Une invitation à entrer dans la Parole avant de traverser la journée.",
    duration: '10 min',
    audioUrl: 'https://exemple.org/podcast/messe-jour-1.mp3',
  },
  {
    id: 'podcast-2',
    number: '2/4',
    title: "Sur le seuil de l’Office",
    description:
      "Présentation d’un psaume, d’un cantique ou d’une hymne de l’Office des heures, pour ceux qui veulent mieux connaître la prière quotidienne de l’Église.",
    duration: '15 min',
    audioUrl: 'https://exemple.org/podcast/office-seuil-1.mp3',
  },
  {
    id: 'podcast-3',
    number: '3/4',
    title: 'Parcours bibliques',
    description:
      "Entretiens avec des biblistes : la Genèse, les Psaumes, les Évangiles, les Actes, l’Apocalypse. Une initiation progressive à la lecture intelligenti de la Bible.",
    duration: '30 min',
    audioUrl: 'https://exemple.org/podcast/parcours-bibliques-1.mp3',
  },
  {
    id: 'podcast-4',
    number: '4/4',
    title: 'Au seuil des fêtes',
    description:
      "À l’approche des grandes fêtes (Noël, Épiphanie, Pâques, Ascension, Pentecôte, Toussaint), un éclairage liturgique, biblique et pastoral pour mieux les célébrer.",
    duration: '12 min',
    audioUrl: 'https://exemple.org/podcast/au-seuil-fetes-1.mp3',
  },
]
