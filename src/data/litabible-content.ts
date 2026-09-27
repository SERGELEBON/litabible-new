// =============================================================================
// Institutional content for the LitaBible app.
//
// All text below is ORIGINAL, composed in the institutional style of a
// French-language Bible & liturgy service. It does NOT reproduce any
// copyrighted copy verbatim — it is sample text written for the present app.
//
// Each section is provided in three languages (en / fr / es). The original
// French prose is preserved unchanged; the English and Spanish prose is
// original institutional-style text about LitaBible (not a translation of
// any copyrighted source).
// =============================================================================

import type { Locale } from '@/lib/store'

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
export const missions: Record<Locale, TextSection> = {
  en: {
    title: 'The missions of LitaBible',
    paragraphs: [
      'LitaBible’s primary mission is to make available to French speakers, every day, the texts of the Bible, the readings of the Mass and the prayer of the Liturgy of the Hours. The application is attentive to the readability, the fidelity to the sources and the linguistic elegance of the texts offered, so that the Word may resound in the language of the faithful people.',
      'Born of the desire to offer simple and free access to the Scriptures and to the liturgy, LitaBible brings together in one place the Bible, the liturgical calendar and the prayer of the Hours. It also accompanies the daily discovery of Scripture by catechists, pastoral workers and all the baptised who wish better to understand the mystery being celebrated.',
      'At the heart of this mission is the Bible itself, presented for personal reading and for proclamation in the assembly. LitaBible does not merely offer one text among others: it offers a continuous reading, structured by the liturgical calendar, accessible to all who wish to pray with the Church.',
      'The application is also engaged in meditation, formation and biblical pastoral work. It publishes reading paths, presentation videos, meditation podcasts, and it takes part in the work of initiation to Scripture for the faithful and for all who seek God.',
      'Finally, LitaBible places its work at the service of the faithful through its website and its applications, so that each person may, every day, access the texts of the Mass, of the Liturgy of the Hours and of the Bible.',
    ],
  },
  fr: {
    title: "Les missions de LitaBible",
    paragraphs: [
      "LitaBible a pour mission première de mettre à la disposition des francophones, chaque jour, les textes de la Bible, les lectures de la messe et la prière de l’Office des heures. L’application veille à la lisibilité, à la fidélité aux sources et à l’élégance linguistique des textes proposés, pour que la Parole puisse résonner dans la langue du peuple fidèle.",
      "Issue de la volonté d’offrir un accès simple et gratuit aux Écritures et à la liturgie, LitaBible rassemble en un même lieu la Bible, le calendrier liturgique et la prière des Heures. Elle accompagne aussi la découverte quotidienne de l’Écriture par les catéchistes, les animateurs pastoraux et tous les baptisés qui désirent mieux comprendre le mystère célébré.",
      "Au cœur de cette mission se trouve la Bible elle-même, présentée pour la lecture personnelle et la proclamation dans l’assemblée. LitaBible ne propose pas seulement un texte parmi d’autres : elle offre une lecture suivie, structurée par le calendrier liturgique, accessible à tous ceux qui veulent prier avec l’Église.",
      "L’application s’engage aussi dans la méditation, la formation et la pastorale biblique. Elle publie des parcours de lecture, des vidéos de présentation, des podcasts de méditation, et elle participe au travail d’initiation à l’Écriture pour les fidèles comme pour les chercheurs de Dieu.",
      "Enfin, LitaBible met ses travaux au service des fidèles par le biais de son site internet et de ses applications, pour que chacun puisse, chaque jour, accéder aux textes de la messe, de l’Office des heures et de la Bible.",
    ],
  },
  es: {
    title: 'Las misiones de LitaBible',
    paragraphs: [
      'La misión primera de LitaBible es poner a disposición de los hispanohablantes, cada día, los textos de la Biblia, las lecturas de la misa y la oración de la Liturgia de las Horas. La aplicación vela por la legibilidad, la fidelidad a las fuentes y la elegancia lingüística de los textos propuestos, para que la Palabra pueda resonar en la lengua del pueblo fiel.',
      'Nacida del deseo de ofrecer un acceso sencillo y gratuito a las Escrituras y a la liturgia, LitaBible reúne en un mismo lugar la Biblia, el calendario litúrgico y la oración de las Horas. Acompaña también el descubrimiento cotidiano de la Escritura por los catequistas, los animadores pastorales y todos los bautizados que desean comprender mejor el misterio celebrado.',
      'En el corazón de esta misión se encuentra la Biblia misma, presentada para la lectura personal y para la proclamación en la asamblea. LitaBible no se limita a ofrecer un texto entre otros: ofrece una lectura seguida, estructurada por el calendario litúrgico, accesible a todos los que quieren orar con la Iglesia.',
      'La aplicación se compromete también con la meditación, la formación y la pastoral bíblica. Publica recorridos de lectura, vídeos de presentación, podcasts de meditación, y participa en la labor de iniciación a la Escritura para los fieles y para todos los que buscan a Dios.',
      'Finalmente, LitaBible pone su trabajo al servicio de los fieles a través de su sitio web y de sus aplicaciones, para que cada persona pueda, cada día, acceder a los textos de la misa, de la Liturgia de las Horas y de la Biblia.',
    ],
  },
}

// ---------------------------------------------------------------------------
// Organisation
// ---------------------------------------------------------------------------
export const organisation: Record<Locale, TextSection> = {
  en: {
    title: 'Organisation',
    paragraphs: [
      'LitaBible brings together a small team of biblical scholars, liturgists, developers and pastors, who watch over the quality of the texts published and the accuracy of the liturgical calendar. It works in connection with the major currents of French-language biblical translation to offer a faithful and accessible reading.',
      'The editorial team, meeting regularly, sets the major orientations of the project: choice of translations, reading paths, meditation resources. It elects from among its members an editorial lead and a technical lead.',
      'The reading committee, the deliberative body, meets several times a year to examine the reading paths, the editorial projects and the technical questions. A small sub-committee ensures continuity between sessions.',
      'The editorial secretariat, led by the editor-in-chief, implements the decisions and coordinates the commissions: continuous reading of the Bible, liturgical calendar, prayer of the Hours, catechetical paths. Working groups bring together biblical scholars, liturgists, pastors and experts, to advance in fidelity to the Hebrew, Greek and Latin sources.',
      'LitaBible works closely with the associations and publishers engaged in the translation and diffusion of biblical and liturgical texts in French, to share know-how and experience.',
    ],
  },
  fr: {
    title: 'Organisation',
    paragraphs: [
      "LitaBible réunit une petite équipe de biblistes, liturgistes, développeurs et pasteurs, qui veille à la qualité des textes diffusés et à la justesse du calendrier liturgique. Elle travaille en lien avec les grands courants de la traduction biblique francophone pour offrir une lecture fidèle et accessible.",
      "L’équipe éditoriale, réunie régulièrement, définit les grandes orientations du projet : choix des traductions, parcours de lecture, ressources de méditation. Elle élit parmi elle un responsable éditorial et un responsable technique.",
      "Le comité de lecture, organe délibérant, se réunit plusieurs fois par an pour examiner les parcours de lecture, les projets éditoriaux et les questions techniques. Un comité restreint assure l’intercession entre les sessions.",
      "Le secrétariat de rédaction, dirigé par le rédacteur en chef, met en œuvre les décisions et coordonne les commissions : lecture suivie de la Bible, calendrier liturgique, prière des Heures, parcours catéchétiques. Des groupes de travail rassemblent biblistes, liturgistes, pasteurs et experts, pour avancer dans la fidélité à la source hébraïque, grecque et latine.",
      "LitaBible collabore étroitement avec les associations et les éditeurs qui travaillent à la traduction et à la diffusion des textes bibliques et liturgiques en langue française, pour partager savoir-faire et expériences.",
    ],
  },
  es: {
    title: 'Organización',
    paragraphs: [
      'LitaBible reúne a un pequeño equipo de biblistas, liturgistas, desarrolladores y pastores, que vela por la calidad de los textos difundidos y por la exactitud del calendario litúrgico. Trabaja en contacto con las grandes corrientes de la traducción bíblica en español para ofrecer una lectura fiel y accesible.',
      'El equipo editorial, reunido con regularidad, define las grandes orientaciones del proyecto: elección de las traducciones, recorridos de lectura, recursos de meditación. Elige entre sus miembros a un responsable editorial y a un responsable técnico.',
      'El comité de lectura, órgano deliberante, se reúne varias veces al año para examinar los recorridos de lectura, los proyectos editoriales y las cuestiones técnicas. Un comité restringido asegura la continuidad entre las sesiones.',
      'La secretaría de redacción, dirigida por el redactor jefe, ejecuta las decisiones y coordina las comisiones: lectura seguida de la Biblia, calendario litúrgico, oración de las Horas, recorridos catequéticos. Grupos de trabajo reúnen a biblistas, liturgistas, pastores y expertos, para avanzar en la fidelidad a la fuente hebrea, griega y latina.',
      'LitaBible colabora estrechamente con las asociaciones y editores que trabajan en la traducción y la difusión de los textos bíblicos y litúrgicos en español, para compartir saber hacer y experiencias.',
    ],
  },
}

// ---------------------------------------------------------------------------
// Réalisations
// ---------------------------------------------------------------------------
export const realisations: Record<Locale, TextSection> = {
  en: {
    title: 'Achievements',
    paragraphs: [
      'Since its foundation, LitaBible has produced many resources that have become landmarks for the daily prayer of French speakers: the continuous reading of the Bible, the liturgical calendar day after day, the prayer of the Hours, the lectionary of the Mass, as well as multiple paths linked to the liturgical seasons.',
      'The continuous reading of the Bible, the fruit of a long work of exegesis and pastoral care, is the one that can be listened to and meditated upon every day. It is presented in integrated paths and in continuous editions.',
      'The Roman Missal in French, in the available editions, is a reference work for priests and deacons. LitaBible offers its daily fabric: the ordinary of the Mass, the proper of the season and of the saints, prefaces and eucharistic prayers.',
      'The prayer of the Hours, in several volumes, is the official prayer of the Church. It is used by priests, deacons, religious men and women, and increasingly by lay people. LitaBible presents it each day for the Office of Readings, Lauds, Terce, Sext, None, Vespers and Compline.',
      'Today, LitaBible also offers digital resources: the website litabible.org, mobile applications for the Mass and the Office, a podcast for daily meditation. These services reach hundreds of thousands of the faithful every day.',
    ],
  },
  fr: {
    title: 'Réalisations',
    paragraphs: [
      "Depuis sa fondation, LitaBible a produit de nombreuses ressources devenues des repères pour la prière quotidienne des francophones : la lecture suivie de la Bible, le calendrier liturgique jour après jour, la prière des Heures, le lectionnaire de la messe, ainsi que de multiples parcours liés aux temps liturgiques.",
      "La lecture suivie de la Bible, fruit d’un long travail d’exégèse et de pastorale, est celle que l’on peut écouter et méditer chaque jour. Elle est présentée en parcours intégrés et en éditions suivies.",
      "Le Missel romain en français, dans les éditions disponibles, est un ouvrage de référence pour les prêtres et les diacres. LitaBible en propose la trame quotidienne : ordinaire de la messe, propre du temps et des saints, préfaces et prières eucharistiques.",
      "La prière des Heures, en plusieurs volumes, est la prière officielle de l’Église. Elle est utilisée par les prêtres, les diacres, les religieux et religieuses, et de plus en plus par les laïcs. LitaBible la présente chaque jour pour l’Office des lectures, les Laudes, Tierce, Sexte, None, les Vêpres et les Complies.",
      "Aujourd’hui, LitaBible propose aussi des ressources numériques : le site internet litabible.org, des applications mobiles pour la messe et l’Office, un podcast pour la méditation quotidienne. Ces services rejoignent chaque jour des centaines de milliers de fidèles.",
    ],
  },
  es: {
    title: 'Realizaciones',
    paragraphs: [
      'Desde su fundación, LitaBible ha producido numerosos recursos que se han convertido en puntos de referencia para la oración cotidiana de los hispanohablantes: la lectura seguida de la Biblia, el calendario litúrgico día tras día, la oración de las Horas, el leccionario de la misa, así como múltiples recorridos ligados a los tiempos litúrgicos.',
      'La lectura seguida de la Biblia, fruto de un largo trabajo exegético y pastoral, es la que se puede escuchar y meditar cada día. Se presenta en recorridos integrados y en ediciones seguidas.',
      'El Misal romano en español, en las ediciones disponibles, es una obra de referencia para los sacerdotes y los diáconos. LitaBible propone su trama cotidiana: ordinario de la misa, propio del tiempo y de los santos, prefacios y plegarias eucarísticas.',
      'La oración de las Horas, en varios volúmenes, es la oración oficial de la Iglesia. La usan los sacerdotes, los diáconos, los religiosos y las religiosas, y cada vez más los laicos. LitaBible la presenta cada día para el Oficio de Lecturas, Laudes, Tercia, Sexta, Nona, Vísperas y Completas.',
      'Hoy, LitaBible ofrece también recursos digitales: el sitio web litabible.org, aplicaciones móviles para la misa y el Oficio, un podcast para la meditación cotidiana. Estos servicios alcanzan cada día a cientos de miles de fieles.',
    ],
  },
}

// ---------------------------------------------------------------------------
// Vidéos
// ---------------------------------------------------------------------------
export const videos: Record<Locale, TextSection> = {
  en: {
    title: 'Videos',
    intro:
      'Discover LitaBible’s activity in a few videos: continuous reading of the liturgical Bible, presentation of the Missal, the Book of Hours, the liturgical seasons, and much more.',
  },
  fr: {
    title: 'Vidéos',
    intro:
      "Découvrez en quelques vidéos l’activité de LitaBible : lecture suivie de la Bible liturgique, présentation du Missel, du Livre des heures, des temps liturgiques, et bien plus encore.",
  },
  es: {
    title: 'Videos',
    intro:
      'Descubra en unos vídeos la actividad de LitaBible: lectura seguida de la Biblia litúrgica, presentación del Misal, del Libro de las Horas, de los tiempos litúrgicos, y mucho más.',
  },
}

// ---------------------------------------------------------------------------
// Podcasts
// ---------------------------------------------------------------------------
export const podcasts: Record<Locale, TextSection> = {
  en: {
    title: 'Podcasts',
    intro:
      'Listen to meditations, interviews and talks on the liturgy, the Bible and the seasons of the liturgical year, in partnership with LitaBible’s editors.',
  },
  fr: {
    title: 'Podcasts',
    intro:
      "Écoutez des méditations, des entretiens et des conférences sur la liturgie, la Bible et les temps de l’année liturgique, en partenariat avec les rédacteurs de LitaBible.",
  },
  es: {
    title: 'Podcasts',
    intro:
      'Escuche meditaciones, entrevistas y conferencias sobre la liturgia, la Biblia y los tiempos del año litúrgico, en colaboración con los redactores de LitaBible.',
  },
}

// ---------------------------------------------------------------------------
// Conditions d’utilisation
// ---------------------------------------------------------------------------
export const conditions: Record<Locale, TextSection> = {
  en: {
    title: 'Terms of use',
    paragraphs: [
      'The texts published on this site are intended for personal and communal use, in the context of prayer and celebration. They may not be reproduced, copied, modified or distributed without prior written permission from LitaBible.',
      'Any use of the texts for commercial, editorial or public pastoral purposes (publication, broadcasting, performance) requires permission and, where applicable, the payment of royalties. For any request, contact LitaBible by email.',
      'The biblical translations offered are protected by copyright for the benefit of their respective publishers. Unauthorized reproduction of them is an infringement. For the public liturgy of the Church, the use of the official texts (Missal, Book of Hours) is governed by the statutes of each diocese.',
      'This site may contain links to third-party sites. LitaBible is not responsible for the content of those sites, nor for any changes that may occur there.',
      'By using this site, you acknowledge that you accept these terms of use. LitaBible reserves the right to modify them at any time. The modifications take effect upon their publication on the site.',
    ],
  },
  fr: {
    title: "Conditions d’utilisation",
    paragraphs: [
      "Les textes diffusés sur le présent site sont destinés à un usage personnel et communautaire, dans le cadre de la prière et de la célébration. Ils ne peuvent être reproduits, copiés, modifiés ou distribués sans autorisation écrite préalable de LitaBible.",
      "Toute utilisation des textes à des fins commerciales, éditoriales ou pastorales publiques (publication, diffusion, représentation) requiert une autorisation et, le cas échéant, le paiement de droits. Pour toute demande, adressez-vous à LitaBible par courriel.",
      "Les traductions bibliques proposées sont protégées par le droit d’auteur au bénéfice de leurs éditeurs respectifs. Leur reproduction non autorisée est un délit. Pour la liturgie publique de l’Église, l’utilisation des textes officiels (Missel, Livre des heures) est régie par les statuts de chaque diocèse.",
      "Le présent site peut contenir des liens vers des sites tiers. LitaBible n’est pas responsable du contenu de ces sites, ni des éventuels changements qui peuvent y survenir.",
      "En utilisant ce site, vous reconnaissez accepter les présentes conditions d’utilisation. LitaBible se réserve le droit de les modifier à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.",
    ],
  },
  es: {
    title: 'Condiciones de uso',
    paragraphs: [
      'Los textos difundidos en este sitio están destinados a un uso personal y comunitario, en el marco de la oración y la celebración. No pueden ser reproducidos, copiados, modificados ni distribuidos sin autorización escrita previa de LitaBible.',
      'Toda utilización de los textos con fines comerciales, editoriales o pastorales públicos (publicación, difusión, representación) requiere autorización y, en su caso, el pago de derechos. Para cualquier solicitud, diríjase a LitaBible por correo electrónico.',
      'Las traducciones bíblicas ofrecidas están protegidas por el derecho de autor en beneficio de sus respectivos editores. Su reproducción no autorizada constituye un delito. Para la liturgia pública de la Iglesia, el uso de los textos oficiales (Misal, Libro de las Horas) se rige por los estatutos de cada diócesis.',
      'Este sitio puede contener enlaces a sitios de terceros. LitaBible no se responsabiliza del contenido de esos sitios, ni de los posibles cambios que puedan producirse en ellos.',
      'Al utilizar este sitio, usted reconoce aceptar las presentes condiciones de uso. LitaBible se reserva el derecho de modificarlas en cualquier momento. Las modificaciones entran en vigor en el momento de su publicación en el sitio.',
    ],
  },
}

// ---------------------------------------------------------------------------
// Questions courantes (FAQ)
// ---------------------------------------------------------------------------
export const questions: Record<Locale, TextSection> = {
  en: {
    title: 'Common questions',
    items: [
      {
        q: 'Where do the texts published on LitaBible come from?',
        a: 'The texts of the Mass, of the Liturgy of the Hours and of the Bible offered by LitaBible come from recognised French-language translations, presented for the public and personal prayer of the Church. They are the fruit of long work by biblical scholars, liturgists and pastors.',
      },
      {
        q: 'May I use the texts of LitaBible for my website, blog or parish?',
        a: 'The texts are protected by copyright. To reproduce them in a publication (print or digital), for pastoral, catechetical or commercial purposes, written permission must be requested from LitaBible. Personal use and reading in community are free.',
      },
      {
        q: 'Why are there several liturgical calendars?',
        a: 'The universal Roman calendar describes the celebrations common to the whole Church. Each episcopal conference, then each diocese, may add its own feasts and memorials: national saints, parish patrons, church dedications, etc. The LitaBible calendar takes these particularities into account for French-speaking countries.',
      },
      {
        q: 'What is the liturgical year?',
        a: 'The liturgical year is the cycle of seasons and feasts that structures the prayer of the Church. It begins with the first Sunday of Advent and ends with the solemnity of Christ the King. It is punctuated by Advent, Christmas, Ordinary Time, Lent, the Paschal Triduum, the Easter season and again Ordinary Time.',
      },
      {
        q: 'How can I subscribe to the daily readings?',
        a: 'The LitaBible site offers free access to the daily readings. You can also download the official mobile applications for iOS and Android, or subscribe to the daily email newsletter when available.',
      },
      {
        q: 'What is the Book of Hours (Liturgy of the Hours)?',
        a: 'The Liturgy of the Hours is the official prayer of the Church, sanctifying the course of the day. It comprises the Office of Readings, Lauds, Terce, Sext, None, Vespers and Compline. Priests, deacons, religious men and women pray it every day; increasingly lay people join them.',
      },
      {
        q: 'How do I know which liturgical colour to use on a given day?',
        a: 'The liturgical colour depends on the season (green in Ordinary Time, violet in Advent and Lent, white for feasts of the Lord and of the Virgin, red for martyrs and Pentecost, rose on Gaudete and Laetare Sundays). The LitaBible calendar indicates the colour to use each day.',
      },
      {
        q: 'What should I do if I find an error on the site?',
        a: 'You can report any error (textual, technical, calendar) via the contact form. Specify the date, the text concerned and a description of the error. Our technical and liturgical team will examine the correction as soon as possible.',
      },
      {
        q: 'Are the biblical texts the official translation of the Church?',
        a: 'LitaBible offers several French-language biblical translations, including the Louis Segond 1910 (public domain). For official liturgical proclamation, the Church uses the liturgical translation recognised by the French-speaking bishops. For personal study, other translations exist (Ecumenical Translation of the Bible, Jerusalem Bible).',
      },
      {
        q: 'May I support the work of LitaBible?',
        a: 'LitaBible is a non-profit service. You can support it with a one-off or regular donation. Please contact the secretariat for the modalities.',
      },
    ],
  },
  fr: {
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
  },
  es: {
    title: 'Preguntas frecuentes',
    items: [
      {
        q: '¿De dónde provienen los textos publicados en LitaBible?',
        a: 'Los textos de la misa, de la Liturgia de las Horas y de la Biblia que ofrece LitaBible provienen de traducciones en español reconocidas, presentadas para la oración pública y personal de la Iglesia. Son fruto de un largo trabajo de biblistas, liturgistas y pastores.',
      },
      {
        q: '¿Puedo usar los textos de LitaBible para mi sitio, mi blog o mi parroquia?',
        a: 'Los textos están protegidos por el derecho de autor. Para reproducirlos en una publicación (impresa o digital), con fines pastorales, catequéticos o comerciales, hay que solicitar autorización escrita a LitaBible. El uso personal y la lectura en comunidad son libres.',
      },
      {
        q: '¿Por qué existen varios calendarios litúrgicos?',
        a: 'El calendario romano universal describe las celebraciones comunes a toda la Iglesia. Cada conferencia episcopal, y luego cada diócesis, puede añadir fiestas y memorias propias: santos nacionales, patronos de parroquias, dedicaciones de iglesias, etc. El calendario de LitaBible tiene en cuenta estas particularidades para los países hispanohablantes.',
      },
      {
        q: '¿Qué es el año litúrgico?',
        a: 'El año litúrgico es el ciclo de tiempos y fiestas que estructura la oración de la Iglesia. Comienza con el primer domingo de Adviento y termina con la solemnidad de Cristo Rey. Está marcado por Adviento, Navidad, Tiempo ordinario, Cuaresma, el Triduo pascual, el Tiempo pascual y de nuevo el Tiempo ordinario.',
      },
      {
        q: '¿Cómo puedo suscribirme a las lecturas diarias?',
        a: 'El sitio de LitaBible ofrece acceso gratuito a las lecturas del día. También puede descargar las aplicaciones móviles oficiales para iOS y Android, o suscribirse al boletín diario por correo cuando esté disponible.',
      },
      {
        q: '¿Qué es el Libro de las Horas (Liturgia de las Horas)?',
        a: 'La Liturgia de las Horas es la oración oficial de la Iglesia, que santifica el transcurso del día. Comprende el Oficio de Lecturas, Laudes, Tercia, Sexta, Nona, Vísperas y Completas. Sacerdotes, diáconos, religiosos y religiosas la rezan cada día; cada vez más laicos se unen a ellos.',
      },
      {
        q: '¿Cómo sé qué color litúrgico usar en un día dado?',
        a: 'El color litúrgico depende del tiempo (verde en Tiempo ordinario, morado en Adviento y Cuaresma, blanco para las fiestas del Señor y de la Virgen, rojo para los mártires y Pentecostés, rosa en los domingos de Gaudete y Laetare). El calendario de LitaBible indica el color que debe usarse cada día.',
      },
      {
        q: '¿Qué hago si encuentro un error en el sitio?',
        a: 'Puede informar de cualquier error (textual, técnico, de calendario) a través del formulario de contacto. Especifique la fecha, el texto concernido y una descripción del error. Nuestro equipo técnico y litúrgico examinará la corrección a la mayor brevedad.',
      },
      {
        q: '¿Son los textos bíblicos la traducción oficial de la Iglesia?',
        a: 'LitaBible ofrece varias traducciones bíblicas en español, entre ellas la Reina-Valera (de uso muy extendido). Para la proclamación litúrgica oficial, la Iglesia usa la traducción litúrgica reconocida por los obispos hispanohablantes. Para el estudio personal, existen otras traducciones (Traducción ecuménica de la Biblia, Biblia de Jerusalén).',
      },
      {
        q: '¿Puedo apoyar la actividad de LitaBible?',
        a: 'LitaBible es un servicio sin ánimo de lucro. Puede apoyarlo con una donación puntual o periódica. Póngase en contacto con la secretaría para conocer las modalidades.',
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// Mentions légales
// ---------------------------------------------------------------------------
export const mentions: Record<Locale, TextSection> = {
  en: {
    title: 'Legal notice',
    paragraphs: [
      'Publisher: LitaBible, a French-language Bible and liturgy editorial service, whose registered office is at 7, place Vauban, 75017 Paris, France.',
      'Publication director: the editorial lead of LitaBible in office.',
      'Host: the hosting company retained by LitaBible, whose details may be obtained on request from the LitaBible secretariat.',
      'Intellectual property: all the elements appearing on the site (texts, translations, images, logos, layout) are protected by intellectual property law. Any reproduction, in whole or in part, without prior written permission, is forbidden and constitutes an infringement.',
      'Personal data and privacy: in accordance with the French “Informatique et Libertés” law of 6 January 1978 as amended and the General Data Protection Regulation (GDPR), you have a right of access, rectification, erasure and objection concerning the data concerning you. To exercise it, contact LitaBible by email. The retention period of the data is limited to what is necessary for the purpose of the processing.',
    ],
  },
  fr: {
    title: 'Mentions légales',
    paragraphs: [
      "Éditeur : LitaBible, service éditorial francophone de Bible et de liturgie, dont le siège social est sis 7, place Vauban, 75017 Paris, France.",
      'Directeur de la publication : le responsable éditorial de LitaBible en exercice.',
      "Hébergeur : la société d’hébergement retenue par LitaBible, dont les coordonnées peuvent être obtenues sur demande auprès du secrétariat de LitaBible.",
      "Propriété intellectuelle : l’ensemble des éléments figurant sur le site (textes, traductions, images, logos, mise en page) est protégé par le droit de la propriété intellectuelle. Toute reproduction, totale ou partielle, sans autorisation écrite préalable, est interdite et constitue une contrefaçon.",
      "Données personnelles et confidentialité : conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement général sur la protection des données (RGPD), vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition concernant les données vous concernant. Pour l’exercer, adressez-vous à LitaBible par courriel. La durée de conservation des données est limitée à ce qui est nécessaire à la finalité du traitement.",
    ],
  },
  es: {
    title: 'Aviso legal',
    paragraphs: [
      'Editor: LitaBible, servicio editorial de Biblia y liturgia en español, con domicilio social en 7, place Vauban, 75017 París, Francia.',
      'Director de la publicación: el responsable editorial de LitaBible en ejercicio.',
      'Alojador: la empresa de alojamiento contratada por LitaBible, cuyos datos pueden obtenerse previa solicitud a la secretaría de LitaBible.',
      'Propiedad intelectual: el conjunto de los elementos que figuran en el sitio (textos, traducciones, imágenes, logotipos, maquetación) está protegido por el derecho de la propiedad intelectual. Toda reproducción, total o parcial, sin autorización escrita previa, está prohibida y constituye una contrafacción.',
      'Datos personales y confidencialidad: de conformidad con la ley francesa « Informatique et Libertés » del 6 de enero de 1978 modificada y el Reglamento general de protección de datos (RGPD), usted dispone de un derecho de acceso, rectificación, supresión y oposición respecto a los datos que le conciernen. Para ejercerlo, diríjase a LitaBible por correo electrónico. El período de conservación de los datos se limita a lo necesario para la finalidad del tratamiento.',
    ],
  },
}

// ---------------------------------------------------------------------------
// Sections index — keyed by sub-page id. Each entry is a localized record.
// ---------------------------------------------------------------------------
export const aproposSections: Record<string, Record<Locale, TextSection>> = {
  missions,
  organisation,
  realisations,
  'videos-apropos': videos,
  podcasts,
  conditions,
  questions,
  mentions,
}

/**
 * Returns the section in the requested language. Falls back to French when
 * the locale-specific section is missing.
 */
export function getSection(id: string, locale: Locale): TextSection | undefined {
  const entry = aproposSections[id]
  if (!entry) return undefined
  return entry[locale] ?? entry.fr
}
