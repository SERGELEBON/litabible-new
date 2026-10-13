// =============================================================================
// Institutional content for the LitaBible app.
//
// LitaBible is framed as a neutral, non-denominational Bible-reading
// community: a place where people read the Bible, share and chat together
// daily. All prose below is ORIGINAL, composed for the present app — it does
// NOT reproduce any copyrighted copy verbatim.
//
// Each section is provided in three languages (en / fr / es). The English and
// Spanish prose mirrors the French in style and intent.
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
      'LitaBible’s primary mission is to offer, every day, the texts of the Bible, the daily readings and Bible teaching. The application is attentive to the readability, the fidelity to the sources and the linguistic elegance of the texts offered, so that the Word may resound in the language of each reader.',
      'Born of the desire to offer simple and free access to the Scriptures, LitaBible brings together in one place the Bible, the daily readings and the shared calendar. It also accompanies the daily discovery of Scripture by readers, by small groups and by all who wish better to understand the text being read.',
      'At the heart of this mission is the Bible itself, presented for personal reading and for sharing in the community. LitaBible does not merely offer one text among others: it offers a continuous reading, structured by the shared calendar, accessible to all who wish to read and pray together.',
      'The application is also engaged in meditation, formation and Bible reading. It publishes reading paths, presentation videos, meditation podcasts, and it takes part in the work of initiation to Scripture for readers and for all who seek God.',
      'Finally, LitaBible places its work at the service of readers through its website and its applications, so that each person may, every day, access the daily readings, Bible teaching and the Bible.',
    ],
  },
  fr: {
    title: "Les missions de LitaBible",
    paragraphs: [
      "LitaBible a pour mission première de mettre à la disposition de chacun, chaque jour, les textes de la Bible, les lectures du jour et l’enseignement biblique. L’application veille à la lisibilité, à la fidélité aux sources et à l’élégance linguistique des textes proposés, pour que la Parole puisse résonner dans la langue de chaque lecteur.",
      "Issue de la volonté d’offrir un accès simple et gratuit aux Écritures, LitaBible rassemble en un même lieu la Bible, les lectures du jour et le calendrier partagé. Elle accompagne aussi la découverte quotidienne de l’Écriture par les lecteurs, par les petits groupes et par tous ceux qui désirent mieux comprendre le texte lu.",
      "Au cœur de cette mission se trouve la Bible elle-même, présentée pour la lecture personnelle et pour le partage en communauté. LitaBible ne propose pas seulement un texte parmi d’autres : elle offre une lecture suivie, structurée par le calendrier partagé, accessible à tous ceux qui veulent lire et prier ensemble.",
      "L’application s’engage aussi dans la méditation, la formation et la lecture biblique. Elle publie des parcours de lecture, des vidéos de présentation, des podcasts de méditation, et elle participe au travail d’initiation à l’Écriture pour les lecteurs comme pour les chercheurs de Dieu.",
      "Enfin, LitaBible met ses travaux au service des lecteurs par le biais de son site internet et de ses applications, pour que chacun puisse, chaque jour, accéder aux lectures du jour, à l’enseignement biblique et à la Bible.",
    ],
  },
  es: {
    title: 'Las misiones de LitaBible',
    paragraphs: [
      'La misión primera de LitaBible es poner a disposición de cada persona, cada día, los textos de la Biblia, las lecturas del día y la enseñanza bíblica. La aplicación vela por la legibilidad, la fidelidad a las fuentes y la elegancia lingüística de los textos propuestos, para que la Palabra pueda resonar en la lengua de cada lector.',
      'Nacida del deseo de ofrecer un acceso sencillo y gratuito a las Escrituras, LitaBible reúne en un mismo lugar la Biblia, las lecturas del día y el calendario compartido. Acompaña también el descubrimiento cotidiano de la Escritura por los lectores, por los pequeños grupos y por todos los que desean comprender mejor el texto leído.',
      'En el corazón de esta misión se encuentra la Biblia misma, presentada para la lectura personal y para el compartir en comunidad. LitaBible no se limita a ofrecer un texto entre otros: ofrece una lectura seguida, estructurada por el calendario compartido, accesible a todos los que quieren leer y orar juntos.',
      'La aplicación se compromete también con la meditación, la formación y la lectura bíblica. Publica recorridos de lectura, vídeos de presentación, podcasts de meditación, y participa en la labor de iniciación a la Escritura para los lectores y para todos los que buscan a Dios.',
      'Finalmente, LitaBible pone su trabajo al servicio de los lectores a través de su sitio web y de sus aplicaciones, para que cada persona pueda, cada día, acceder a las lecturas del día, a la enseñanza bíblica y a la Biblia.',
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
      'LitaBible brings together a small team of Bible readers, translators, developers and community facilitators, who watch over the quality of the texts published and the accuracy of the shared calendar. It works in connection with the major currents of Bible translation to offer a faithful and accessible reading.',
      'The editorial team, meeting regularly, sets the major orientations of the project: choice of translations, reading paths, meditation resources. It elects from among its members an editorial lead and a technical lead.',
      'The reading committee, the deliberative body, meets several times a year to examine the reading paths, the editorial projects and the technical questions. A small sub-committee ensures continuity between sessions.',
      'The editorial secretariat, led by the editor-in-chief, implements the decisions and coordinates the working groups: continuous reading of the Bible, shared calendar, Bible teaching, reading paths. Working groups bring together Bible readers, translators and facilitators, to advance in fidelity to the Hebrew, Greek and Latin sources.',
      'LitaBible works closely with the associations and publishers engaged in the translation and diffusion of biblical texts, to share know-how and experience.',
    ],
  },
  fr: {
    title: 'Organisation',
    paragraphs: [
      "LitaBible réunit une petite équipe de lecteurs bibliques, traducteurs, développeurs et animateurs communautaires, qui veille à la qualité des textes diffusés et à la justesse du calendrier partagé. Elle travaille en lien avec les grands courants de la traduction biblique pour offrir une lecture fidèle et accessible.",
      "L’équipe éditoriale, réunie régulièrement, définit les grandes orientations du projet : choix des traductions, parcours de lecture, ressources de méditation. Elle élit parmi elle un responsable éditorial et un responsable technique.",
      "Le comité de lecture, organe délibérant, se réunit plusieurs fois par an pour examiner les parcours de lecture, les projets éditoriaux et les questions techniques. Un comité restreint assure la continuité entre les sessions.",
      "Le secrétariat de rédaction, dirigé par le rédacteur en chef, met en œuvre les décisions et coordonne les groupes de travail : lecture suivie de la Bible, calendrier partagé, enseignement biblique, parcours de lecture. Des groupes de travail rassemblent lecteurs bibliques, traducteurs et animateurs, pour avancer dans la fidélité à la source hébraïque, grecque et latine.",
      "LitaBible collabore étroitement avec les associations et les éditeurs qui travaillent à la traduction et à la diffusion des textes bibliques, pour partager savoir-faire et expériences.",
    ],
  },
  es: {
    title: 'Organización',
    paragraphs: [
      'LitaBible reúne a un pequeño equipo de lectores bíblicos, traductores, desarrolladores y animadores comunitarios, que vela por la calidad de los textos difundidos y por la exactitud del calendario compartido. Trabaja en contacto con las grandes corrientes de la traducción bíblica para ofrecer una lectura fiel y accesible.',
      'El equipo editorial, reunido con regularidad, define las grandes orientaciones del proyecto: elección de las traducciones, recorridos de lectura, recursos de meditación. Elige entre sus miembros a un responsable editorial y a un responsable técnico.',
      'El comité de lectura, órgano deliberante, se reúne varias veces al año para examinar los recorridos de lectura, los proyectos editoriales y las cuestiones técnicas. Un comité restringido asegura la continuidad entre las sesiones.',
      'La secretaría de redacción, dirigida por el redactor jefe, ejecuta las decisiones y coordina los grupos de trabajo: lectura seguida de la Biblia, calendario compartido, enseñanza bíblica, recorridos de lectura. Grupos de trabajo reúnen a lectores bíblicos, traductores y animadores, para avanzar en la fidelidad a la fuente hebrea, griega y latina.',
      'LitaBible colabora estrechamente con las asociaciones y editores que trabajan en la traducción y la difusión de los textos bíblicos, para compartir saber hacer y experiencias.',
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
      'Since its foundation, LitaBible has produced many resources that have become landmarks for the daily reading of Bible readers: the continuous reading of the Bible, the shared calendar day after day, the daily readings, as well as multiple paths linked to the seasons of the year.',
      'The continuous reading of the Bible, the fruit of a long work of study and sharing, is the one that can be listened to and meditated upon every day. It is presented in integrated paths and in continuous editions.',
      'The daily readings, drawn from the available Bible translations, are a daily reference for readers. LitaBible presents them day by day, following the rhythm of the shared calendar, with introductions and prayers for personal meditation.',
      'Today, LitaBible also offers digital resources: the website litabible.org, mobile applications for the readings and the audio Bible, a podcast for daily meditation. These services reach hundreds of thousands of readers every day.',
    ],
  },
  fr: {
    title: 'Réalisations',
    paragraphs: [
      "Depuis sa fondation, LitaBible a produit de nombreuses ressources devenues des repères pour la lecture quotidienne des lecteurs : la lecture suivie de la Bible, le calendrier partagé jour après jour, les lectures du jour, ainsi que de multiples parcours liés aux temps de l’année.",
      "La lecture suivie de la Bible, fruit d’un long travail d’étude et de partage, est celle que l’on peut écouter et méditer chaque jour. Elle est présentée en parcours intégrés et en éditions suivies.",
      "Les lectures du jour, issues des traductions bibliques disponibles, sont une référence quotidienne pour les lecteurs. LitaBible les présente jour après jour, au rythme du calendrier partagé, avec des introductions et des prières pour la méditation personnelle.",
      "Aujourd’hui, LitaBible propose aussi des ressources numériques : le site internet litabible.org, des applications mobiles pour les lectures et la Bible audio, un podcast pour la méditation quotidienne. Ces services rejoignent chaque jour des centaines de milliers de lecteurs.",
    ],
  },
  es: {
    title: 'Realizaciones',
    paragraphs: [
      'Desde su fundación, LitaBible ha producido numerosos recursos que se han convertido en puntos de referencia para la lectura cotidiana de los lectores: la lectura seguida de la Biblia, el calendario compartido día tras día, las lecturas del día, así como múltiples recorridos ligados a los tiempos del año.',
      'La lectura seguida de la Biblia, fruto de un largo trabajo de estudio y compartir, es la que se puede escuchar y meditar cada día. Se presenta en recorridos integrados y en ediciones seguidas.',
      'Las lecturas del día, procedentes de las traducciones bíblicas disponibles, son una referencia cotidiana para los lectores. LitaBible las presenta día tras día, al ritmo del calendario compartido, con introducciones y oraciones para la meditación personal.',
      'Hoy, LitaBible ofrece también recursos digitales: el sitio web litabible.org, aplicaciones móviles para las lecturas y la Biblia en audio, un podcast para la meditación cotidiana. Estos servicios alcanzan cada día a cientos de miles de lectores.',
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
      'Discover LitaBible’s activity in a few videos: continuous reading of the Bible, presentation of the daily readings, Bible summaries, the seasons of the year, and much more.',
  },
  fr: {
    title: 'Vidéos',
    intro:
      "Découvrez en quelques vidéos l’activité de LitaBible : lecture suivie de la Bible, présentation des lectures du jour, résumés de livres bibliques, des temps de l’année, et bien plus encore.",
  },
  es: {
    title: 'Videos',
    intro:
      'Descubra en unos vídeos la actividad de LitaBible: lectura seguida de la Biblia, presentación de las lecturas del día, resúmenes de libros bíblicos, de los tiempos del año, y mucho más.',
  },
}

// ---------------------------------------------------------------------------
// Podcasts
// ---------------------------------------------------------------------------
export const podcasts: Record<Locale, TextSection> = {
  en: {
    title: 'Podcasts',
    intro:
      'Listen to meditations, interviews and talks on the Bible, the daily readings and the seasons of the year, in partnership with LitaBible’s editors.',
  },
  fr: {
    title: 'Podcasts',
    intro:
      "Écoutez des méditations, des entretiens et des conférences sur la Bible, les lectures du jour et les temps de l’année, en partenariat avec les rédacteurs de LitaBible.",
  },
  es: {
    title: 'Podcasts',
    intro:
      'Escuche meditaciones, entrevistas y conferencias sobre la Biblia, las lecturas del día y los tiempos del año, en colaboración con los redactores de LitaBible.',
  },
}

// ---------------------------------------------------------------------------
// Conditions d’utilisation
// ---------------------------------------------------------------------------
export const conditions: Record<Locale, TextSection> = {
  en: {
    title: 'Terms of use',
    paragraphs: [
      'The texts published on this site are intended for personal and communal use, in the context of reading and prayer. They may not be reproduced, copied, modified or distributed without prior written permission from LitaBible.',
      'Any use of the texts for commercial, editorial or public purposes (publication, broadcasting, performance) requires permission and, where applicable, the payment of royalties. For any request, contact LitaBible by email.',
      'The biblical translations offered are protected by copyright for the benefit of their respective publishers. Unauthorized reproduction of them is an infringement. For public reading, the use of the shared texts is governed by the rules of the community.',
      'This site may contain links to third-party sites. LitaBible is not responsible for the content of those sites, nor for any changes that may occur there.',
      'By using this site, you acknowledge that you accept these terms of use. LitaBible reserves the right to modify them at any time. The modifications take effect upon their publication on the site.',
    ],
  },
  fr: {
    title: "Conditions d’utilisation",
    paragraphs: [
      "Les textes diffusés sur le présent site sont destinés à un usage personnel et communautaire, dans le cadre de la lecture et de la prière. Ils ne peuvent être reproduits, copiés, modifiés ou distribués sans autorisation écrite préalable de LitaBible.",
      "Toute utilisation des textes à des fins commerciales, éditoriales ou publiques (publication, diffusion, représentation) requiert une autorisation et, le cas échéant, le paiement de droits. Pour toute demande, adressez-vous à LitaBible par courriel.",
      "Les traductions bibliques proposées sont protégées par le droit d’auteur au bénéfice de leurs éditeurs respectifs. Leur reproduction non autorisée est un délit. Pour la lecture publique, l’utilisation des textes partagés est régie par les règles de la communauté.",
      "Le présent site peut contenir des liens vers des sites tiers. LitaBible n’est pas responsable du contenu de ces sites, ni des éventuels changements qui peuvent y survenir.",
      "En utilisant ce site, vous reconnaissez accepter les présentes conditions d’utilisation. LitaBible se réserve le droit de les modifier à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.",
    ],
  },
  es: {
    title: 'Condiciones de uso',
    paragraphs: [
      'Los textos difundidos en este sitio están destinados a un uso personal y comunitario, en el marco de la lectura y la oración. No pueden ser reproducidos, copiados, modificados ni distribuidos sin autorización escrita previa de LitaBible.',
      'Toda utilización de los textos con fines comerciales, editoriales o públicos (publicación, difusión, representación) requiere autorización y, en su caso, el pago de derechos. Para cualquier solicitud, diríjase a LitaBible por correo electrónico.',
      'Las traducciones bíblicas ofrecidas están protegidas por el derecho de autor en beneficio de sus respectivos editores. Su reproducción no autorizada constituye un delito. Para la lectura pública, el uso de los textos compartidos se rige por las reglas de la comunidad.',
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
        a: 'The texts of the daily readings, of the teaching and of the Bible offered by LitaBible come from recognised translations, presented for personal and shared reading. They are the fruit of long work by Bible readers, translators and community facilitators.',
      },
      {
        q: 'May I use the texts of LitaBible for my website, blog or community?',
        a: 'The texts are protected by copyright. To reproduce them in a publication (print or digital), for commercial, editorial or communal purposes, written permission must be requested from LitaBible. Personal use and reading in community are free.',
      },
      {
        q: 'Why are there several liturgical calendars?',
        a: 'The shared calendar describes the readings common to the whole community. Each region, then each local group, may add its own readings and commemorations: regional saints, local commemorations, etc. The LitaBible calendar takes these particularities into account for French-speaking and Spanish-speaking countries.',
      },
      {
        q: 'What is the liturgical year?',
        a: 'The liturgical year is the cycle of seasons and feasts that structures shared reading. It begins with the first Sunday of Advent and ends with the feast of Christ the King. It is punctuated by Advent, Christmas, Ordinary Time, Lent, the Paschal Triduum, the Easter season and again Ordinary Time.',
      },
      {
        q: 'How can I subscribe to the daily readings?',
        a: 'The LitaBible site offers free access to the daily readings. You can also download the mobile applications for iOS and Android, or subscribe to the daily email newsletter when available.',
      },
      {
        q: 'How do I know which liturgical colour to use on a given day?',
        a: 'The liturgical colour depends on the season (green in Ordinary Time, violet in Advent and Lent, white for feasts of the Lord and of the Virgin, red for martyrs and Pentecost, rose on Gaudete and Laetare Sundays). The LitaBible calendar indicates the colour to use each day.',
      },
      {
        q: 'What should I do if I find an error on the site?',
        a: 'You can report any error (textual, technical, calendar) via the contact form. Specify the date, the text concerned and a description of the error. Our team will examine the correction as soon as possible.',
      },
      {
        q: 'Are the biblical texts an officially recognised translation?',
        a: 'LitaBible offers several Bible translations, including the Louis Segond 1910 (public domain). Other recognised translations (Ecumenical Translation of the Bible, Jerusalem Bible) may be consulted for personal study.',
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
        a: "Les textes des lectures du jour, de l’enseignement et de la Bible proposés par LitaBible proviennent de traductions reconnues, présentées pour la lecture personnelle et partagée. Ils sont le fruit d’un long travail de lecteurs bibliques, traducteurs et animateurs communautaires.",
      },
      {
        q: 'Puis-je utiliser les textes de LitaBible pour mon site, mon blog ou ma communauté ?',
        a: "Les textes sont protégés par le droit d’auteur. Pour les reproduire dans une publication (papier ou numérique), à but commercial, éditorial ou communautaire, il faut demander une autorisation écrite à LitaBible. L’usage personnel et la lecture en communauté sont libres.",
      },
      {
        q: 'Pourquoi y a-t-il plusieurs calendriers liturgiques ?',
        a: "Le calendrier partagé décrit les lectures communes à toute la communauté. Chaque région, puis chaque groupe local, peut ajouter ses lectures et commémorations propres : saints régionaux, commémorations locales, etc. Le calendrier LitaBible tient compte de ces particularités pour les pays francophones.",
      },
      {
        q: "Qu’est-ce que l’année liturgique ?",
        a: "L’année liturgique est le cycle des temps et des fêtes qui structure la lecture partagée. Elle commence avec le premier dimanche de l’Avent et se conclut par la solennité du Christ Roi. Elle est rythmée par l’Avent, Noël, le Temps ordinaire, le Carême, le Triduum pascal, le Temps pascal et de nouveau le Temps ordinaire.",
      },
      {
        q: "Comment puis-je m’abonner aux lectures quotidiennes ?",
        a: "Le site LitaBible propose un accès gratuit aux lectures du jour. Vous pouvez aussi télécharger les applications mobiles pour iOS et Android, ou vous abonner à la lettre quotidienne par courriel si elle est disponible.",
      },
      {
        q: 'Comment savoir quelle couleur liturgique utiliser tel jour ?',
        a: "La couleur liturgique dépend du temps (vert en Temps ordinaire, violet en Avent et Carême, blanc aux fêtes du Seigneur et de la Vierge, rouge pour les martyrs et la Pentecôte, rose aux dimanches de Gaudete et Laetare). Le calendrier LitaBible indique chaque jour la couleur à utiliser.",
      },
      {
        q: 'Que faire si je trouve une erreur sur le site ?',
        a: "Vous pouvez signaler toute erreur (textuelle, technique, de calendrier) via le formulaire de contact. Précisez la date, le texte concerné et une description de l’erreur. Notre équipe examinera la correction dans les meilleurs délais.",
      },
      {
        q: 'Les textes bibliques sont-ils une traduction reconnue ?',
        a: "LitaBible propose plusieurs traductions bibliques, dont la Louis Segond 1910 (domaine public). D’autres traductions reconnues (Traduction œcuménique de la Bible, Bible de Jérusalem) peuvent être consultées pour l’étude personnelle.",
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
        a: 'Los textos de las lecturas del día, de la enseñanza y de la Biblia que ofrece LitaBible provienen de traducciones reconocidas, presentadas para la lectura personal y compartida. Son fruto de un largo trabajo de lectores bíblicos, traductores y animadores comunitarios.',
      },
      {
        q: '¿Puedo usar los textos de LitaBible para mi sitio, mi blog o mi comunidad?',
        a: 'Los textos están protegidos por el derecho de autor. Para reproducirlos en una publicación (impresa o digital), con fines comerciales, editoriales o comunitarios, hay que solicitar autorización escrita a LitaBible. El uso personal y la lectura en comunidad son libres.',
      },
      {
        q: '¿Por qué existen varios calendarios litúrgicos?',
        a: 'El calendario compartido describe las lecturas comunes a toda la comunidad. Cada región, y luego cada grupo local, puede añadir sus lecturas y conmemoraciones propias: santos regionales, conmemoraciones locales, etc. El calendario de LitaBible tiene en cuenta estas particularidades para los países hispanohablantes.',
      },
      {
        q: '¿Qué es el año litúrgico?',
        a: 'El año litúrgico es el ciclo de tiempos y fiestas que estructura la lectura compartida. Comienza con el primer domingo de Adviento y termina con la solemnidad de Cristo Rey. Está marcado por Adviento, Navidad, Tiempo ordinario, Cuaresma, el Triduo pascual, el Tiempo pascual y de nuevo el Tiempo ordinario.',
      },
      {
        q: '¿Cómo puedo suscribirme a las lecturas diarias?',
        a: 'El sitio de LitaBible ofrece acceso gratuito a las lecturas del día. También puede descargar las aplicaciones móviles para iOS y Android, o suscribirse al boletín diario por correo cuando esté disponible.',
      },
      {
        q: '¿Cómo sé qué color litúrgico usar en un día dado?',
        a: 'El color litúrgico depende del tiempo (verde en Tiempo ordinario, morado en Adviento y Cuaresma, blanco para las fiestas del Señor y de la Virgen, rojo para los mártires y Pentecostés, rosa en los domingos de Gaudete y Laetare). El calendario de LitaBible indica el color que debe usarse cada día.',
      },
      {
        q: '¿Qué hago si encuentro un error en el sitio?',
        a: 'Puede informar de cualquier error (textual, técnico, de calendario) a través del formulario de contacto. Especifique la fecha, el texto concernido y una descripción del error. Nuestro equipo examinará la corrección a la mayor brevedad.',
      },
      {
        q: '¿Son los textos bíblicos una traducción reconocida?',
        a: 'LitaBible ofrece varias traducciones bíblicas en español, entre ellas la Reina-Valera (de uso muy extendido). Otras traducciones reconocidas (Traducción ecuménica de la Biblia, Biblia de Jerusalén) pueden consultarse para el estudio personal.',
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
