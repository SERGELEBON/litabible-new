// =============================================================================
// Institutional content for the LitaBible app.
//
// All text below is ORIGINAL, composed in the institutional style of a
// French-language Bible & liturgy service. It does NOT reproduce any
// copyrighted copy verbatim — it is sample text written for the present app.
// =============================================================================

export interface FaqItem {
  q: string
  a: string
}

export interface TextSection {
  title: string
  paragraphs?: string[]
  intro?: string
  items?: FaqItem[]
}

// ---------------------------------------------------------------------------
// Missions de LitaBible
// ---------------------------------------------------------------------------
export const missions: TextSection = {
  title: "Les missions de LitaBible",
  paragraphs: [
    "LitaBible a pour mission première de mettre à la disposition des francophones, chaque jour, les textes de la Bible, les lectures de la messe et la prière de l’Office des heures. L’application veille à la lisibilité, à la fidélité aux sources et à l’élégance linguistique des textes proposés, pour que la Parole puisse résonner dans la langue du peuple fidèle.",
    "Issue de la volonté d’offrir un accès simple et gratuit aux Écritures et à la liturgie, LitaBible rassemble en un même lieu la Bible, le calendrier liturgique et la prière des Heures. Elle accompagne aussi la découverte quotidienne de l’Écriture par les catéchistes, les animateurs pastoraux et tous les baptisés qui désirent mieux comprendre le mystère célébré.",
    "Au cœur de cette mission se trouve la Bible elle-même, présentée pour la lecture personnelle et la proclamation dans l’assemblée. LitaBible ne propose pas seulement un texte parmi d’autres : elle offre une lecture suivie, structurée par le calendrier liturgique, accessible à tous ceux qui veulent prier avec l’Église.",
    "L’application s’engage aussi dans la méditation, la formation et la pastorale biblique. Elle publie des parcours de lecture, des vidéos de présentation, des podcasts de méditation, et elle participe au travail d’initiation à l’Écriture pour les fidèles comme pour les chercheurs de Dieu.",
    "Enfin, LitaBible met ses travaux au service des fidèles par le biais de son site internet et de ses applications, pour que chacun puisse, chaque jour, accéder aux textes de la messe, de l’Office des heures et de la Bible.",
  ],
}

// ---------------------------------------------------------------------------
// Organisation
// ---------------------------------------------------------------------------
export const organisation: TextSection = {
  title: 'Organisation',
  paragraphs: [
    "LitaBible réunit une petite équipe de biblistes, liturgistes, développeurs et pasteurs, qui veille à la qualité des textes diffusés et à la justesse du calendrier liturgique. Elle travaille en lien avec les grands courants de la traduction biblique francophone pour offrir une lecture fidèle et accessible.",
    "L’équipe éditoriale, réunie régulièrement, définit les grandes orientations du projet : choix des traductions, parcours de lecture, ressources de méditation. Elle élit parmi elle un responsable éditorial et un responsable technique.",
    "Le comité de lecture, organe délibérant, se réunit plusieurs fois par an pour examiner les parcours de lecture, les projets éditoriaux et les questions techniques. Un comité restreint assure l’intercession entre les sessions.",
    "Le secrétariat de rédaction, dirigé par le rédacteur en chef, met en œuvre les décisions et coordonne les commissions : lecture suivie de la Bible, calendrier liturgique, prière des Heures, parcours catéchétiques. Des groupes de travail rassemblent biblistes, liturgistes, pasteurs et experts, pour avancer dans la fidélité à la source hébraïque, grecque et latine.",
    "LitaBible collabore étroitement avec les associations et les éditeurs qui travaillent à la traduction et à la diffusion des textes bibliques et liturgiques en langue française, pour partager savoir-faire et expériences.",
  ],
}

// ---------------------------------------------------------------------------
// Réalisations
// ---------------------------------------------------------------------------
export const realisations: TextSection = {
  title: 'Réalisations',
  paragraphs: [
    "Depuis sa fondation, LitaBible a produit de nombreuses ressources devenues des repères pour la prière quotidienne des francophones : la lecture suivie de la Bible, le calendrier liturgique jour après jour, la prière des Heures, le lectionnaire de la messe, ainsi que de multiples parcours liés aux temps liturgiques.",
    "La lecture suivie de la Bible, fruit d’un long travail d’exégèse et de pastorale, est celle que l’on peut écouter et méditer chaque jour. Elle est présentée en parcours intégrés et en éditions suivies.",
    "Le Missel romain en français, dans les éditions disponibles, est un ouvrage de référence pour les prêtres et les diacres. LitaBible en propose la trame quotidienne : ordinaire de la messe, propre du temps et des saints, préfaces et prières eucharistiques.",
    "La prière des Heures, en plusieurs volumes, est la prière officielle de l’Église. Elle est utilisée par les prêtres, les diacres, les religieux et religieuses, et de plus en plus par les laïcs. LitaBible la présente chaque jour pour l’Office des lectures, les Laudes, Tierce, Sexte, None, les Vêpres et les Complies.",
    "Aujourd’hui, LitaBible propose aussi des ressources numériques : le site internet litabible.org, des applications mobiles pour la messe et l’Office, un podcast pour la méditation quotidienne. Ces services rejoignent chaque jour des centaines de milliers de fidèles.",
  ],
}

// ---------------------------------------------------------------------------
// Vidéos
// ---------------------------------------------------------------------------
export const videos: TextSection = {
  title: 'Vidéos',
  intro:
    "Découvrez en quelques vidéos l’activité de LitaBible : lecture suivie de la Bible liturgique, présentation du Missel, du Livre des heures, des temps liturgiques, et bien plus encore.",
}

// ---------------------------------------------------------------------------
// Podcasts
// ---------------------------------------------------------------------------
export const podcasts: TextSection = {
  title: 'Podcasts',
  intro:
    "Écoutez des méditations, des entretiens et des conférences sur la liturgie, la Bible et les temps de l’année liturgique, en partenariat avec les rédacteurs de LitaBible.",
}

// ---------------------------------------------------------------------------
// Conditions d’utilisation
// ---------------------------------------------------------------------------
export const conditions: TextSection = {
  title: "Conditions d’utilisation",
  paragraphs: [
    "Les textes diffusés sur le présent site sont destinés à un usage personnel et communautaire, dans le cadre de la prière et de la célébration. Ils ne peuvent être reproduits, copiés, modifiés ou distribués sans autorisation écrite préalable de LitaBible.",
    "Toute utilisation des textes à des fins commerciales, éditoriales ou pastorales publiques (publication, diffusion, représentation) requiert une autorisation et, le cas échéant, le paiement de droits. Pour toute demande, adressez-vous à LitaBible par courriel.",
    "Les traductions bibliques proposées sont protégées par le droit d’auteur au bénéfice de leurs éditeurs respectifs. Leur reproduction non autorisée est un délit. Pour la liturgie publique de l’Église, l’utilisation des textes officiels (Missel, Livre des heures) est régie par les statuts de chaque diocèse.",
    "Le présent site peut contenir des liens vers des sites tiers. LitaBible n’est pas responsable du contenu de ces sites, ni des éventuels changements qui peuvent y survenir.",
    "En utilisant ce site, vous reconnaissez accepter les présentes conditions d’utilisation. LitaBible se réserve le droit de les modifier à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.",
  ],
}

// ---------------------------------------------------------------------------
// Questions courantes (FAQ)
// ---------------------------------------------------------------------------
export const questions: TextSection = {
  title: 'Questions courantes',
  items: [
    {
      q: "D’où viennent les textes diffusés sur LitaBible ?",
      a: "Les textes de la messe, de l’Office des heures et de la Bible proposés par LitaBible proviennent de traductions francophones reconnues, présentées pour la prière publique et personnelle de l’Église. Ils sont le fruit d’un long travail de biblistes, liturgistes et pasteurs.",
    },
    {
      q: 'Puis-je utiliser les textes de LitaBible pour mon site, mon blog ou ma paroisse ?',
      a: "Les textes sont protégés par le droit d’auteur. Pour les reproduire dans une publication (papier ou numérique), à but pastoral, catéchétique ou commercial, il faut demander une autorisation écrite à LitaBible. L’usage personnel et la lecture en communauté sont libres.",
    },
    {
      q: 'Pourquoi y a-t-il plusieurs calendriers liturgiques ?',
      a: "Le calendrier romain universel décrit les célébrations communes à toute l’Église. Chaque conférence épiscopale, puis chaque diocèse, peut ajouter des fêtes et mémoires propres : saints nationaux, patrons de paroisses, dédicaces d’églises, etc. Le calendrier LitaBible tient compte de ces particularités pour les pays francophones.",
    },
    {
      q: "Qu’est-ce que l’année liturgique ?",
      a: "L’année liturgique est le cycle des temps et des fêtes qui structure la prière de l’Église. Elle commence avec le premier dimanche de l’Avent et se conclut par la solennité du Christ Roi. Elle est rythmée par l’Avent, Noël, le Temps ordinaire, le Carême, le Triduum pascal, le Temps pascal et de nouveau le Temps ordinaire.",
    },
    {
      q: "Comment puis-je m’abonner aux lectures quotidiennes ?",
      a: "Le site LitaBible propose un accès gratuit aux lectures du jour. Vous pouvez aussi télécharger les applications mobiles officielles pour iOS et Android, ou vous abonner à la lettre quotidienne par courriel si elle est disponible.",
    },
    {
      q: "Qu’est-ce que le Livre des heures (Liturgie des Heures) ?",
      a: "La Liturgie des Heures est la prière officielle de l’Église, sanctifiant le cours du jour. Elle comprend l’Office des lectures, les Laudes, Tierce, Sexte, None, les Vêpres et les Complies. Prêtres, diacres, religieux et religieuses la prient chaque jour ; de plus en plus de laïcs s’y associent.",
    },
    {
      q: 'Comment savoir quelle couleur liturgique utiliser tel jour ?',
      a: "La couleur liturgique dépend du temps (vert en Temps ordinaire, violet en Avent et Carême, blanc aux fêtes du Seigneur et de la Vierge, rouge pour les martyrs et la Pentecôte, rose aux dimanches de Gaudete et Laetare). Le calendrier LitaBible indique chaque jour la couleur à utiliser.",
    },
    {
      q: 'Que faire si je trouve une erreur sur le site ?',
      a: "Vous pouvez signaler toute erreur (textuelle, technique, de calendrier) via le formulaire de contact. Précisez la date, le texte concerné et une description de l’erreur. Notre équipe technique et liturgique examinera la correction dans les meilleurs délais.",
    },
    {
      q: 'Les textes bibliques sont-ils la traduction officielle de l\'Église ?',
      a: "LitaBible propose plusieurs traductions bibliques francophones, dont la Louis Segond 1910 (domaine public). Pour la proclamation liturgique officielle, l’Église utilise la traduction liturgique reconnue par les évêques francophones. Pour l’étude personnelle, d’autres traductions existent (Traduction œcuménique de la Bible, Bible de Jérusalem).",
    },
    {
      q: "Puis-je soutenir l’activité de LitaBible ?",
      a: "LitaBible est un service à but non lucratif. Vous pouvez le soutenir par un don ponctuel ou régulier. Renseignez-vous auprès du secrétariat pour les modalités.",
    },
  ],
}

// ---------------------------------------------------------------------------
// Mentions légales
// ---------------------------------------------------------------------------
export const mentions: TextSection = {
  title: 'Mentions légales',
  paragraphs: [
    "Éditeur : LitaBible, service éditorial francophone de Bible et de liturgie, dont le siège social est sis 7, place Vauban, 75017 Paris, France.",
    "Directeur de la publication : le responsable éditorial de LitaBible en exercice.",
    "Hébergeur : la société d’hébergement retenue par LitaBible, dont les coordonnées peuvent être obtenues sur demande auprès du secrétariat de LitaBible.",
    "Propriété intellectuelle : l’ensemble des éléments figurant sur le site (textes, traductions, images, logos, mise en page) est protégé par le droit de la propriété intellectuelle. Toute reproduction, totale ou partielle, sans autorisation écrite préalable, est interdite et constitue une contrefaçon.",
    "Données personnelles et confidentialité : conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement général sur la protection des données (RGPD), vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition concernant les données vous concernant. Pour l’exercer, adressez-vous à LitaBible par courriel. La durée de conservation des données est limitée à ce qui est nécessaire à la finalité du traitement.",
  ],
}

// ---------------------------------------------------------------------------
// Sections index — keyed by sub-page id.
// ---------------------------------------------------------------------------
export const aproposSections: Record<string, TextSection> = {
  missions,
  organisation,
  realisations,
  'videos-apropos': videos,
  podcasts,
  conditions,
  questions,
  mentions,
}

export function getSection(id: string): TextSection | undefined {
  return aproposSections[id]
}
