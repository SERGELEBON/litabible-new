// =============================================================================
// Institutional content for the AELF clone.
//
// All text below is ORIGINAL, composed in the institutional style of an
// association of bishops' conferences serving French-language liturgy. It
// does NOT reproduce any copyrighted AELF copy verbatim — it is sample
// text written for the present UI clone.
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
// Missions de l’AELF
// ---------------------------------------------------------------------------
export const missions: TextSection = {
  title: "Les missions de l’AELF",
  paragraphs: [
    "L’Association Épiscopale Liturgique pour les pays Francophones (AELF) a pour mission première de mettre à la disposition des Églises qui la composent les textes liturgiques en langue française. Elle veille à la qualité, à la fidélité théologique et à l’élégance linguistique de ces traductions, pour que la prière de l’Église puisse résonner dans la langue du peuple fidèle.",
    "Issue de la volonté des évêques francophones, l’AELF rassemble les conférences épiscopales de langue française pour un service commun : la traduction, l’approbation et la diffusion des textes bibliques, eucharistiques et sacramentels. Elle accompagne aussi la formation liturgique des pasteurs, des catéchistes, des animateurs et de tous les baptisés qui désirent mieux comprendre le mystère célébré.",
    "Au cœur de cette mission se trouve la Bible liturgique, traduite pour la proclamation dans l’assemblée. L’AELF ne propose pas seulement une traduction parmi d’autres : elle propose la traduction officielle que l’Église utilise dans sa liturgie, et qui a été reconnue par les évêques pour la prière publique.",
    "L’association s’engage aussi dans la recherche, la formation et la pastorale liturgique. Elle publie des documents de référence, des ouvrages pour les liturges, des articles pour la catéchèse, et elle participe aux chantiers œcuméniques de traduction des textes bibliques et liturgiques.",
    "Enfin, l’AELF met ses travaux au service des fidèles par le biais de son site internet et de ses applications, pour que chacun puisse, chaque jour, accéder aux textes de la messe, de l’Office des heures et de la Bible.",
  ],
}

// ---------------------------------------------------------------------------
// Organisation
// ---------------------------------------------------------------------------
export const organisation: TextSection = {
  title: 'Organisation',
  paragraphs: [
    "L’AELF réunit les conférences épiscopales francophones : la Conférence des évêques de France (CEF), la Conférence épiscopale de Belgique (CEB), la Conférence des évêques suisses (CES), la Conférence épiscopale du Luxembourg, la Conférence des évêques catholiques du Canada (CECC), la Conférence des évêques de l’Afrique du Nord (CERNA) et l’archidiocèse de Monaco.",
    "L’assemblée générale, réunie chaque année, rassemble les évêques membres et définit les grandes orientations de l’association. Elle élit le président, les vice-présidents, le conseil et le bureau.",
    "Le Conseil, organe délibérant, se réunit plusieurs fois par an pour examiner les chantiers de traduction, les projets éditoriaux et les questions financières. Le Conseil permanent assure l’intercession entre les sessions.",
    "Le secrétariat général, dirigé par le secrétaire général, met en œuvre les décisions et coordonne les commissions : traduction biblique, traduction liturgique, livre des heures, missel, etc. Des groupes de travail rassemblent biblistes, liturgistes, pasteurs et experts, pour avancer dans la fidélité à la source hébraïque, grecque et latine.",
    "L’AELF collabore étroitement avec le Dicastère pour le culte divin, à Rome, et avec d’autres associations liturgiques de langue non francophone, pour partager savoir-faire et expériences.",
  ],
}

// ---------------------------------------------------------------------------
// Réalisations
// ---------------------------------------------------------------------------
export const realisations: TextSection = {
  title: 'Réalisations',
  paragraphs: [
    "Depuis sa fondation, l’AELF a produit de nombreux ouvrages devenus des références pour la prière des fidèles francophones : le Missel, le Livre des heures (Liturgie des Heures), la Bible liturgique, le Lectionnaire de la messe, les rituels des sacrements, ainsi que de multiples publications liées aux temps liturgiques.",
    "La traduction officielle de la Bible liturgique, fruit d’un long travail d’exégèse et de pastorale, est celle que l’on entend chaque dimanche à la messe et chaque jour à l’Office. Elle est publiée en volumes distincts et dans des éditions intégrées.",
    "Le Missel romain en français, conforme à l’édition typique latine, est un ouvrage de référence pour les prêtres et les diacres. Il contient l’ordinaire de la messe, le propre du temps et des saints, les préfaces et les prières eucharistiques.",
    "La Liturgie des Heures, en quatre volumes, est la prière officielle de l’Église. Elle est utilisée par les prêtres, les diacres, les religieux et religieuses, et de plus en plus par les laïcs.",
    "Aujourd’hui, l’AELF propose aussi des ressources numériques : le site internet aelf.org, des applications mobiles pour la messe et l’Office, un podcast pour la méditation quotidienne. Ces services rejoignent chaque jour des centaines de milliers de fidèles.",
  ],
}

// ---------------------------------------------------------------------------
// Vidéos
// ---------------------------------------------------------------------------
export const videos: TextSection = {
  title: 'Vidéos',
  intro:
    "Découvrez en quelques vidéos l’activité de l’AELF : traduction de la Bible liturgique, présentation du Missel, du Livre des heures, des temps liturgiques, et bien plus encore.",
}

// ---------------------------------------------------------------------------
// Podcasts
// ---------------------------------------------------------------------------
export const podcasts: TextSection = {
  title: 'Podcasts',
  intro:
    "Écoutez des méditations, des entretiens et des conférences sur la liturgie, la Bible et les temps de l’année liturgique, en partenariat avec les commissions de l’AELF.",
}

// ---------------------------------------------------------------------------
// Conditions d’utilisation
// ---------------------------------------------------------------------------
export const conditions: TextSection = {
  title: "Conditions d’utilisation",
  paragraphs: [
    "Les textes diffusés sur le présent site sont destinés à un usage personnel et communautaire, dans le cadre de la prière et de la célébration. Ils ne peuvent être reproduits, copiés, modifiés ou distribués sans autorisation écrite préalable de l’AELF.",
    "Toute utilisation des textes à des fins commerciales, éditoriales ou pastorales publiques (publication, diffusion, représentation) requiert une autorisation et, le cas échéant, le paiement de droits. Pour toute demande, adressez-vous à l’AELF par courriel.",
    "Les traductions liturgiques sont protégées par le droit d’auteur au bénéfice de l’Association. Leur reproduction non autorisée est un délit. Pour la liturgie publique de l’Église, l’utilisation des textes officiels (Missel, Livre des heures) est régie par les statuts de chaque diocèse.",
    "Le présent site peut contenir des liens vers des sites tiers. L’AELF n’est pas responsable du contenu de ces sites, ni des éventuels changements qui peuvent y survenir.",
    "En utilisant ce site, vous reconnaissez accepter les présentes conditions d’utilisation. L’AELF se réserve le droit de les modifier à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.",
  ],
}

// ---------------------------------------------------------------------------
// Questions courantes (FAQ)
// ---------------------------------------------------------------------------
export const questions: TextSection = {
  title: 'Questions courantes',
  items: [
    {
      q: "D’où viennent les textes diffusés sur AELF.org ?",
      a: "Les textes de la messe, de l’Office des heures et de la Bible liturgique proviennent des traductions officielles de l’AELF, approuvées par les évêques francophones et reconnues pour la prière publique de l’Église. Ils sont le fruit d’un long travail de biblistes, liturgistes et pasteurs.",
    },
    {
      q: 'Puis-je utiliser les textes AELF pour mon site, mon blog ou ma paroisse ?',
      a: "Les textes sont protégés par le droit d’auteur. Pour les reproduire dans une publication (papier ou numérique), à but pastoral, catéchétique ou commercial, il faut demander une autorisation écrite à l’AELF. L’usage personnel et la lecture en communauté sont libres.",
    },
    {
      q: 'Pourquoi y a-t-il plusieurs calendriers liturgiques ?',
      a: "Le calendrier romain universel décrit les célébrations communes à toute l’Église. Chaque conférence épiscopale, puis chaque diocèse, peut ajouter des fêtes et mémoires propres : saints nationaux, patrons de paroisses, dédicaces d’églises, etc. Le calendrier AELF tient compte de ces particularités pour les pays francophones.",
    },
    {
      q: "Qu’est-ce que l’année liturgique ?",
      a: "L’année liturgique est le cycle des temps et des fêtes qui structure la prière de l’Église. Elle commence avec le premier dimanche de l’Avent et se conclut par la solennité du Christ Roi. Elle est rythmée par l’Avent, Noël, le Temps ordinaire, le Carême, le Triduum pascal, le Temps pascal et de nouveau le Temps ordinaire.",
    },
    {
      q: "Comment puis-je m’abonner aux lectures quotidiennes ?",
      a: "Le site AELF.org propose un accès gratuit aux lectures du jour. Vous pouvez aussi télécharger les applications mobiles officielles pour iOS et Android, ou vous abonner à la lettre quotidienne par courriel si elle est disponible.",
    },
    {
      q: "Qu’est-ce que le Livre des heures (Liturgie des Heures) ?",
      a: "La Liturgie des Heures est la prière officielle de l’Église, sanctifiant le cours du jour. Elle comprend l’Office des lectures, les Laudes, Tierce, Sexte, None, les Vêpres et les Complies. Prêtres, diacres, religieux et religieuses la prient chaque jour ; de plus en plus de laïcs s’y associent.",
    },
    {
      q: 'Comment savoir quelle couleur liturgique utiliser tel jour ?',
      a: "La couleur liturgique dépend du temps (vert en Temps ordinaire, violet en Avent et Carême, blanc aux fêtes du Seigneur et de la Vierge, rouge pour les martyrs et la Pentecôte, rose aux dimanches de Gaudete et Laetare). Le calendrier AELF indique chaque jour la couleur à utiliser.",
    },
    {
      q: 'Que faire si je trouve une erreur sur le site ?',
      a: "Vous pouvez signaler toute erreur (textuelle, technique, de calendrier) via le formulaire de contact. Précisez la date, le texte concerné et une description de l’erreur. Notre équipe technique et liturgique examinera la correction dans les meilleurs délais.",
    },
    {
      q: 'Les textes bibliques sont-ils la traduction officielle de l\'Église ?',
      a: "Oui. La Bible liturgique de l’AELF est la traduction reconnue par les évêques francophones pour la proclamation dans la liturgie. Pour l’étude personnelle, d’autres traductions existent (Louis Segond, Traduction œcuménique de la Bible, Bible de Jérusalem).",
    },
    {
      q: "Puis-je soutenir l’activité de l’AELF ?",
      a: "L’AELF est une association à but non lucratif. Vous pouvez la soutenir par un don ponctuel ou régulier, en métropole ou dans votre diocèse. Renseignez-vous auprès du secrétariat pour les modalités.",
    },
  ],
}

// ---------------------------------------------------------------------------
// Mentions légales
// ---------------------------------------------------------------------------
export const mentions: TextSection = {
  title: 'Mentions légales',
  paragraphs: [
    "Éditeur : Association Épiscopale Liturgique pour les pays Francophones (AELF), association régie par la loi du 1er juillet 1901, dont le siège social est sis 7, place Vauban, 75017 Paris, France.",
    "Directeur de la publication : le président de l’AELF en exercice.",
    "Hébergeur : la société d’hébergement retenue par l’association, dont les coordonnées peuvent être obtenues sur demande auprès du secrétariat de l’AELF.",
    "Propriété intellectuelle : l’ensemble des éléments figurant sur le site (textes, traductions, images, logos, mise en page) est protégé par le droit de la propriété intellectuelle. Toute reproduction, totale ou partielle, sans autorisation écrite préalable, est interdite et constitue une contrefaçon.",
    "Données personnelles et confidentialité : conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement général sur la protection des données (RGPD), vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition concernant les données vous concernant. Pour l’exercer, adressez-vous à l’AELF par courriel. La durée de conservation des données est limitée à ce qui est nécessaire à la finalité du traitement.",
  ],
}

// ---------------------------------------------------------------------------
// Sections index — keyed by sub-page id.
// ---------------------------------------------------------------------------
export const aelfSections: Record<string, TextSection> = {
  missions,
  organisation,
  realisations,
  videos,
  podcasts,
  conditions,
  questions,
  mentions,
}

export function getSection(id: string): TextSection | undefined {
  return aelfSections[id]
}
