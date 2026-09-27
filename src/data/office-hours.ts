import type { OfficeData, Reading } from './types'
import { getDayInfo } from './liturgical-calendar'

// =============================================================================
// Office of the Hours (Liturgie des Heures) — SAMPLE liturgical content.
//
// Hymn texts are composed in the spirit of very old Latin hymns (4th-9th
// centuries), which are universally in the public domain. Psalm verses follow
// the public-domain Louis Segond 1910 style of French. This is sample
// content for a UI clone; it is not a reproduction of the copyrighted LitaBible
// translation of the Liturgie des Heures.
// =============================================================================

const COMMON_INTRO_VIGIL = [
  'Seigneur, ouvre mes lèvres,',
  'et ma bouche publiera ta louange.',
  'Dieu, viens à mon aide,',
  'Seigneur, viens vite à mon secours.',
  'Gloire au Père, et au Fils, et au Saint-Esprit,',
  'au Dieu qui est, qui était et qui vient,',
  'pour les siècles des siècles. Amen. Alléluia.',
]

const COMMON_INTRO_DAY = [
  'Dieu, viens à mon aide,',
  'Seigneur, viens vite à mon secours.',
  'Gloire au Père, et au Fils, et au Saint-Esprit,',
  'comme il était au commencement, maintenant et à jamais,',
  'pour les siècles des siècles. Amen. Alléluia.',
]

function patristicReading(): Reading {
  return {
    type: 'lecture_patristique',
    label: 'Lecture patristique',
    title: 'Homélie de saint Augustin sur le psaume 95',
    source: 'Homélie de saint Augustin, évêque, sur le psaume 95',
    reference: 'Sermon 95, 4-5',
    citation: 'Chantez au Seigneur un cantique nouveau',
    patristicSource: 'Saint Augustin, Sermon sur les psaumes',
    content: [
      '« Chantez au Seigneur un cantique nouveau », chantez sa nouveauté. Le premier homme, pécheur par sa naissance, est ancien ; mais nous, en naissant de l’eau et de l’Esprit, nous sommes devenus nouveaux.',
      'Celui qui veut chanter le cantique nouveau ne doit pas aimer le monde ancien. Personne en effet ne peut chanter un cantique nouveau avec le cœur ancien. Le cœur ancien, ce sont les désirs anciens ; le cœur nouveau, ce sont les désirs nouveaux.',
      'L’amour du monde est ancien ; l’amour de Dieu est nouveau. Quand l’amour de Dieu grandit en nous, l’amour du monde diminue. Quand l’amour du monde diminue, l’amour de Dieu grandit en nous.',
      'Frères, nous avons à chanter un cantique nouveau, non par la voix mais par la vie. Car le cantique nouveau n’est pas dans les paroles mais dans le cœur. Celui dont la vie est sainte chante un cantique nouveau ; et si sa vie n’est pas sainte, en vain ses lèvres remuent.',
    ],
  }
}

// ---------------------------------------------------------------------------
// Office des Lectures — Sunday, 2026-09-27
// ---------------------------------------------------------------------------
const office_lectures_2026_09_27: OfficeData = {
  date: '2026-09-27',
  hour: 'lectures',
  title: 'Office des lectures — 22e dimanche du Temps ordinaire',
  introduction: COMMON_INTRO_VIGIL,
  hymn: {
    text: [
      'Ô Christ, lumière sans déclin,',
      'Tu veilles au cœur de la nuit ;',
      'Ta Parole est lampe à nos pas,',
      'Ta présence est feu sur nos lèvres.',
      '',
      'Tu es l’Astre qui se lève,',
      'Tu viens visiter ton peuple ;',
      'Répands sur nous ton Esprit,',
      'Et conduis-nous au Père.',
      '',
      'Gloire à toi, Seigneur Jésus,',
      'Au Père et à l’Esprit saint,',
      'Maintenant et pour les siècles,',
      'Dans la nuit qui devient jour.',
    ],
    author: 'Compose pour le présent office (d’après les anciennes hymnes vigiliales)',
    reference: 'Hymne de l’Office des lectures',
  },
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 1',
      title: 'Psaume 1',
      reference: 'Ps 1, 1-6',
      citation: 'Heureux l’homme qui se plaît dans la loi du Seigneur',
      refrain: 'R/ Heureux l’homme qui se plaît dans la loi du Seigneur.',
      strophes: [
        { number: 'I', text: 'Heureux l’homme qui ne marche pas selon le conseil des méchants, qui ne s’arrête pas dans la voie des pécheurs, et ne s’assied pas sur le siège des moqueurs.' },
        { number: 'II', text: 'Mais qui trouve son plaisir dans la loi de l’Éternel, et la médite jour et nuit ! Il est comme un arbre planté près d’un courant d’eau, qui donne son fruit en sa saison.' },
        { number: 'III', text: 'Il n’en est pas ainsi des méchants : ils sont comme la paille que le vent dissipe. Car l’Éternel connaît la voie des justes, et la voie des pécheurs mène à la perdition.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 2',
      title: 'Psaume 2',
      reference: 'Ps 2, 1-12',
      citation: 'Le Seigneur m’a dit : Tu es mon Fils',
      refrain: 'R/ Tu es mon Fils, moi, aujourd’hui, je t’ai engendré.',
      strophes: [
        { number: 'I', text: 'Pourquoi ce tumulte des nations, ce vain murmure des peuples ? Les rois de la terre se soulèvent, les princes se liguent ensemble contre l’Éternel et contre son Oint.' },
        { number: 'II', text: 'Celui qui siège dans les cieux rit ; le Seigneur se moque d’eux. Puis il leur parle dans sa colère, il les épouvante dans sa fureur.' },
        { number: 'III', text: '« Moi, j’ai oint mon roi sur Sion, ma sainte montagne. » Je publierai le décret de l’Éternel. Il m’a dit : « Tu es mon Fils, moi, aujourd’hui, je t’ai engendré. »' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 3',
      title: 'Psaume 3',
      reference: 'Ps 3, 2-9',
      citation: 'Je me couche, je m’endors ; je me réveille, l’Éternel me soutient',
      refrain: 'R/ L’Éternel est mon salut, mon Dieu mon secours.',
      strophes: [
        { number: 'I', text: 'Éternel, que mes ennemis sont nombreux ! Que nombreux sont ceux qui se lèvent contre moi ! Nombreux sont ceux qui disent de moi : « Point de salut pour lui en Dieu ! »' },
        { number: 'II', text: 'Mais toi, ô Éternel, tu es un bouclier autour de moi, tu es ma gloire, et tu relèves ma tête. De ma voix je crie à l’Éternel ; il me répond de sa montagne sainte.' },
        { number: 'III', text: 'Je me couche, je m’endors ; je me réveille, l’Éternel me soutient. Salut, Éternel ! Il décerne tes biens sur ton peuple !' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture',
      title: 'Lecture du livre du prophète Isaïe',
      source: 'Lecture du livre du prophète Isaïe',
      reference: 'Is 55, 6-11',
      citation: 'Ma parole accomplit ma volonté',
      content: [
        'Cherchez l’Éternel pendant qu’il se trouve ; invoquez-le tandis qu’il est près. Que le méchant abandonne sa voie, et l’homme d’iniquité ses pensées ; qu’il revienne à l’Éternel, qui aura pitié de lui, et à notre Dieu, qui ne tarit pas le pardon.',
        'Car mes pensées ne sont pas vos pensées, et vos voies ne sont pas mes voies, dit l’Éternel. Autant les cieux sont élevés au-dessus de la terre, autant mes voies sont élevées au-dessus de vos voies, et mes pensées au-dessus de vos pensées.',
        'Comme la pluie et la neige descendent des cieux et n’y retournent pas sans avoir arrosé la terre, sans l’avoir fécondée et fait germer, pour donner la semence au semeur et le pain à celui qui mange, ainsi est ma parole qui sort de ma bouche : elle ne revient pas à moi sans effet, sans avoir fait ce que j’ai voulu et accompli mes desseins.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
  ],
  patristicReading: patristicReading(),
  conclusion: [
    'Répons : Dieu, viens à mon aide.',
    '– Seigneur, viens vite à mon secours.',
    'Gloire au Père, et au Fils, et au Saint-Esprit,',
    'comme il était au commencement, maintenant et à jamais,',
    'pour les siècles des siècles. Amen.',
    'Oraison : Seigneur Dieu, tu as voulu que la grâce de l’Esprit Saint transforme nos cœurs ; accorde-nous d’être dociles à ta Parole, pour vivre selon ta volonté. Par Jésus Christ, ton Fils, notre Seigneur.',
  ],
}

// ---------------------------------------------------------------------------
// Laudes — Sunday, 2026-09-27
// ---------------------------------------------------------------------------
const office_laudes_2026_09_27: OfficeData = {
  date: '2026-09-27',
  hour: 'laudes',
  title: 'Laudes — 22e dimanche du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: {
    text: [
      'Aurore qui resplendis,',
      'Tu chasses l’ombre de la nuit ;',
      'Tu viens faire lever le jour,',
      'Et nous chantons vers toi, ô Christ.',
      '',
      'Lumière qui viens du Père,',
      'Tu dissipes les ténèbres ;',
      'Tu viens illuminer nos cœurs,',
      'Et nous apporter le salut.',
      '',
      'Gloire à toi, Seigneur ressuscité,',
      'Au Père et à l’Esprit saint,',
      'Pour les siècles des siècles. Amen.',
    ],
    author: 'Compose (d’après l’hymne « Aurora lucis rutilat », Ve siècle)',
    reference: 'Hymne des Laudes',
  },
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 62 (63)',
      title: 'Psaume 62 (63)',
      reference: 'Ps 62 (63), 2-9',
      citation: 'Mon âme a soif de toi, Seigneur',
      refrain: 'R/ Mon âme a soif de toi, Seigneur, mon Dieu.',
      strophes: [
        { number: 'I', text: 'Ô Dieu, tu es mon Dieu, je te cherche dès l’aube ; mon âme a soif de toi, ma chair soupire après toi, comme une terre aride, altérée, sans eau.' },
        { number: 'II', text: 'Ainsi je t’ai contemplé dans le sanctuaire, pour voir ta puissance et ta gloire. Car ta bonté vaut mieux que la vie : mes lèvres te loueront.' },
        { number: 'III', text: 'Je te bénirai tout au long de mes jours, j’élèverai mes mains en ton nom. Mon âme se rassasie comme de moelle et de graisse, et ma bouche te loue avec des lèvres joyeuses.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Cantique des trois enfants (Dn 3)',
      title: 'Cantique de Daniel 3',
      reference: 'Dn 3, 57-88.56',
      citation: 'Toutes les œuvres du Seigneur, bénissez-le',
      refrain: 'R/ Louez-le, toutes ses œuvres, et exaltez-le dans les siècles.',
      strophes: [
        { number: 'I', text: 'Toutes les œuvres du Seigneur, bénissez-le ; anges du Seigneur, bénissez-le. Cieux, bénissez-le ; eaux qui êtes au-dessus des cieux, bénissez-le.' },
        { number: 'II', text: 'Soleil et lune, bénissez-le ; étoiles des cieux, bénissez-le. Pluies et rosées, bénissez-le ; vents et tempêtes, bénissez-le.' },
        { number: 'III', text: 'Nuits et jours, bénissez-le ; lumière et ténèbres, bénissez-le. Montagnes et collines, bénissez-le ; tout ce qui pousse sur la terre, bénissez-le.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 149',
      title: 'Psaume 149',
      reference: 'Ps 149, 1-5.9a',
      citation: 'Le Seigneur aime son peuple',
      refrain: 'R/ Chantez au Seigneur un cantique nouveau.',
      strophes: [
        { number: 'I', text: 'Louez l’Éternel ! Chantez à l’Éternel un cantique nouveau, sa louange dans l’assemblée des saints !' },
        { number: 'II', text: 'Qu’Israël se réjouisse en celui qui l’a fait ! Que les fils de Sion soient joyeux en leur roi !' },
        { number: 'III', text: 'Que les fidèles applaudissent de joie ; qu’ils louent Dieu à haute voix. C’est une parure pour les saints.' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture de la lettre de saint Paul apôtre aux Philippiens',
      source: 'Lecture de la lettre de saint Paul apôtre aux Philippiens',
      reference: 'Ph 4, 4-5',
      citation: 'Réjouissez-vous toujours dans le Seigneur',
      content: [
        'Soyez toujours joyeux dans le Seigneur ; je le répète, soyez joyeux. Que votre douceur soit connue de tous les hommes. Le Seigneur est proche.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'conclusion',
      label: 'Répons',
      title: 'Répons bref',
      reference: 'Cf. Ps 95 (96), 6',
      citation: 'Splendeur et puissance',
      content: [
        'R/ Splendeur et majesté sont devant lui ; puissance et gloire, dans son sanctuaire.',
      ],
    },
    {
      type: 'hymne',
      label: 'Cantique de Zacharie',
      title: 'Cantique de Zacharie (Benedictus)',
      reference: 'Lc 1, 68-79',
      citation: 'Béni soit le Seigneur, le Dieu d’Israël',
      content: [
        'Béni soit le Seigneur, le Dieu d’Israël, parce qu’il a visité et racheté son peuple.',
        'Il nous a suscité un puissant Sauveur dans la maison de David, son serviteur.',
        'Comme il l’avait annoncé par la bouche de ses saints prophètes des temps anciens.',
        'Et toi, petit enfant, tu seras appelé prophète du Très-Haut, car tu marcheras devant la face du Seigneur, pour préparer ses voies.',
      ],
    },
    {
      type: 'intercession',
      label: 'Intercessions',
      title: 'Intercessions',
      content: [
        'Béni soit le Seigneur notre Dieu, qui veille sans relâche sur son peuple. Prions-le et disons :',
        'R/ Garde-nous en ta lumière, Seigneur.',
        'Pour ton Église, dispersée sur la face du monde, qu’elle soit le sel de la terre et la lumière des nations, nous te prions.',
        'Pour ceux qui cherchent la vérité et qui peinent à la reconnaître, qu’ils la trouvent en ton Fils, nous te prions.',
        'Pour tous ceux qui sont dans la tristesse, la solitude ou la maladie, qu’ils rencontrent ta tendresse, nous te prions.',
      ],
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison du jour',
      content: [
        'Seigneur Dieu, fais-nous la grâce de mettre à profit les biens passagers, pour adhérer de tout cœur aux biens éternels. Par Jésus Christ, ton Fils, notre Seigneur.',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Tierce — Sunday, 2026-09-27
// ---------------------------------------------------------------------------
const office_tierce_2026_09_27: OfficeData = {
  date: '2026-09-27',
  hour: 'tierce',
  title: 'Tierce — 22e dimanche du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: {
    text: [
      'Esprit Saint, viens en nos cœurs,',
      'Et fais briller ta lumière d’en haut ;',
      'Père des pauvres, donateur de biens,',
      'Lumière des cœurs.',
      '',
      'Viens, ô très saint Consolateur,',
      'Hôte de l’âme, doux séjour ;',
      'Au labeur, repos, à la fièvre, fraîcheur,',
      'Dans les pleurs, saint réconfort.',
    ],
    author: 'Compose (d’après l’hymne « Nunc sancte nobis Spiritus », VIIIe siècle, d’Origène)',
    reference: 'Hymne de Tierce',
  },
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 118 (119) I',
      title: 'Psaume 118 (119), 1-8',
      reference: 'Ps 118 (119), 1-8',
      citation: 'Bienheureux ceux qui marchent dans la voie de l’Éternel',
      refrain: 'R/ Bienheureux ceux qui marchent dans la loi de l’Éternel.',
      strophes: [
        { number: 'I', text: 'Bienheureux ceux qui sont intègres dans leur voie, qui marchent dans la loi de l’Éternel !' },
        { number: 'II', text: 'Tu as prescrit tes commandements, pour qu’on les observe avec soin. Que mes voies soient affermies pour observer tes statuts !' },
        { number: 'III', text: 'Je ne rougirai point à la vue de tes commandements, quand tu seras véritablement juste.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 118 (119) II',
      title: 'Psaume 118 (119), 9-16',
      reference: 'Ps 118 (119), 9-16',
      citation: 'Comment le jeune homme rendra-t-il pur sa voie ?',
      refrain: 'R/ Je serre ta parole en mon cœur.',
      strophes: [
        { number: 'I', text: 'Comment le jeune homme rendra-t-il pure sa voie ? En se dirigeant d’après ta parole.' },
        { number: 'II', text: 'Je serre ta parole dans mon cœur, afin de ne pas pécher contre toi.' },
        { number: 'III', text: 'Je fais mes délices de tes statuts : je n’oublierai point ta parole.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 118 (119) III',
      title: 'Psaume 118 (119), 17-24',
      reference: 'Ps 118 (119), 17-24',
      citation: 'Ouvre mes yeux pour voir les merveilles de ta loi',
      refrain: 'R/ Fais vivre mon âme, et elle te louera.',
      strophes: [
        { number: 'I', text: 'Fais du bien à ton serviteur, afin que je vive et que j’observe ta parole.' },
        { number: 'II', text: 'Ouvre mes yeux, pour que je voie les merveilles de ta loi !' },
        { number: 'III', text: 'J’ai choisi la voie de la vérité : je place tes lois sous mes yeux.' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture du livre des Actes des Apôtres',
      source: 'Lecture des Actes des Apôtres',
      reference: 'Ac 2, 1-4',
      citation: 'Ils furent tous remplis du Saint-Esprit',
      content: [
        'Le jour de la Pentecôte, étant tous ensemble dans un même lieu, ils furent tout à coup remplis du Saint-Esprit, et se mirent à parler en d’autres langues, selon que l’Esprit leur donnait de s’exprimer.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison',
      content: [
        'Ô Dieu, qui as voulu instruire ton Église par l’Esprit Saint, accorde-nous, par ce même Esprit, d’avoir la connaissance de la vérité et de goûter toujours sa consolation. Par Jésus Christ.',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Sexte — Sunday, 2026-09-27
// ---------------------------------------------------------------------------
const office_sexte_2026_09_27: OfficeData = {
  date: '2026-09-27',
  hour: 'sexe',
  title: 'Sexte — 22e dimanche du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: {
    text: [
      'Ô Christ, soleil de justice,',
      'Qui brilles au milieu du jour,',
      'Dissipe les ombres en nos cœurs,',
      'Et garde-nous du mal.',
      '',
      'Au milieu du labeur,',
      'Tu viens reposer les fatigués ;',
      'Au plus haut de la croix,',
      'Tu offres ta vie pour les hommes.',
      '',
      'Gloire à toi, Seigneur Jésus,',
      'Au Père et à l’Esprit saint,',
      'Pour les siècles des siècles. Amen.',
    ],
    author: 'Compose (d’après les hymnes de Sexte, attribuées à saint Ambroise)',
    reference: 'Hymne de Sexte',
  },
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 122 (123)',
      title: 'Psaume 122 (123)',
      reference: 'Ps 122 (123), 1-4',
      citation: 'Comme les yeux des serviteurs vers leur maître',
      refrain: 'R/ Nos yeux, Seigneur, sont tournés vers toi.',
      strophes: [
        { number: 'I', text: 'Vers toi j’élève mes yeux, toi qui siège dans les cieux !' },
        { number: 'II', text: 'Voici, comme les yeux des serviteurs sont fixés sur la main de leurs maîtres, ainsi nos yeux se tournent vers l’Éternel, notre Dieu.' },
        { number: 'III', text: 'Aie pitié de nous, ô Éternel, aie pitié de nous ! Car nous sommes rassasiés de mépris.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 124 (125)',
      title: 'Psaume 124 (125)',
      reference: 'Ps 124 (125), 1-5',
      citation: 'Ceux qui se confient en l’Éternel sont comme la montagne de Sion',
      refrain: 'R/ La paix d’Israël, sur ceux qui aiment Dieu.',
      strophes: [
        { number: 'I', text: 'Ceux qui se confient en l’Éternel sont comme la montagne de Sion : elle ne chancelle point, elle est affermie pour toujours.' },
        { number: 'II', text: 'Comme les montagnes entourent Jérusalem, ainsi l’Éternel entoure son peuple, dès maintenant et à jamais.' },
        { number: 'III', text: 'L’Éternel, le juste, ne laisse pas peser sur les justes la verge de la méchanceté.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 126 (127)',
      title: 'Psaume 126 (127)',
      reference: 'Ps 126 (127), 1-5a',
      citation: 'Si l’Éternel ne bâtit la maison, c’est en vain que bâtissent les ouvriers',
      refrain: 'R/ Si l’Éternel ne bâtit la maison, en vain bâtissent les ouvriers.',
      strophes: [
        { number: 'I', text: 'Si l’Éternel ne bâtit la maison, ceux qui la bâtissent travaillent en vain ; si l’Éternel ne garde la ville, celui qui la garde veille en vain.' },
        { number: 'II', text: 'Il est vain pour vous de vous lever de bonne heure, de vous coucher tard, de manger le pain de douleur ; il en donne autant à son bien-aimé pendant son sommeil.' },
        { number: 'III', text: 'Voici, des fils sont un héritage de l’Éternel, le fruit des entrailles est une récompense.' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture de la lettre aux Hébreux',
      source: 'Lecture de la lettre aux Hébreux',
      reference: 'He 4, 12-13',
      citation: 'La parole de Dieu juge les sentiments du cœur',
      content: [
        'Car la parole de Dieu est vivante et efficace, plus tranchante qu’une épée à deux lames ; elle pénètre jusqu’au point de séparer l’âme et l’esprit, les jointures et les moelles ; elle juge les sentiments et les pensées du cœur.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison',
      content: [
        'Seigneur Dieu, au milieu du jour, tu nous offres le pain de ta Parole ; donne-nous d’en vivre et d’y puiser la force du service. Par Jésus Christ.',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// None — Sunday, 2026-09-27
// ---------------------------------------------------------------------------
const office_none_2026_09_27: OfficeData = {
  date: '2026-09-27',
  hour: 'none',
  title: 'None — 22e dimanche du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: {
    text: [
      'Toi qui subis sur la croix',
      'La douleur de nos péchés,',
      'Tu remets ton esprit au Père,',
      'Et nous ouvres le paradis.',
      '',
      'Ta mort a vaincu la mort,',
      'Ta Passion nous a sauvés ;',
      'Au couchant de ce jour,',
      'Garde-nous dans ta paix.',
      '',
      'Gloire à toi, Seigneur Jésus,',
      'Au Père et à l’Esprit saint,',
      'Pour les siècles des siècles. Amen.',
    ],
    author: 'Compose (d’après les hymnes de None, VIIIe siècle)',
    reference: 'Hymne de None',
  },
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 125 (126)',
      title: 'Psaume 125 (126)',
      reference: 'Ps 125 (126), 1-6',
      citation: 'Quand l’Éternel ramène les captifs de Sion',
      refrain: 'R/ L’Éternel fait grandes choses pour nous.',
      strophes: [
        { number: 'I', text: 'Quand l’Éternel ramena les captifs de Sion, nous étions comme ceux qui rêvent.' },
        { number: 'II', text: 'Alors notre bouche était pleine d’un cri de joie, et notre langue chantait l’allégresse.' },
        { number: 'III', text: 'Ceux qui sèment avec larmes moissonnent avec chants de joie. Ils s’en vont en pleurant, en portant la semence ; ils reviennent avec chants de joie.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 127 (128)',
      title: 'Psaume 127 (128)',
      reference: 'Ps 127 (128), 1-5',
      citation: 'Bienheureux celui qui craint l’Éternel',
      refrain: 'R/ Bienheureux tous ceux qui craignent l’Éternel.',
      strophes: [
        { number: 'I', text: 'Bienheureux tout homme qui craint l’Éternel, qui marche dans ses voies !' },
        { number: 'II', text: 'Tu jouis du travail de tes mains ; tu es heureux, il t’est bien.' },
        { number: 'III', text: 'Ta femme est comme une vigne féconde dans l’intérieur de ta maison ; tes fils, comme des plants d’olivier autour de ta table.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 128 (129)',
      title: 'Psaume 128 (129)',
      reference: 'Ps 128 (129), 1-4',
      citation: 'Ils m’ont beaucoup opprimé dès ma jeunesse',
      refrain: 'R/ Qu’Israël le dise : ils m’ont beaucoup opprimé.',
      strophes: [
        { number: 'I', text: 'Ils m’ont beaucoup opprimé dès ma jeunesse — qu’Israël le dise —' },
        { number: 'II', text: 'ils m’ont beaucoup opprimé dès ma jeunesse, mais ils n’ont pas prévalu sur moi.' },
        { number: 'III', text: 'Sur mon dos ont labouré les laboureurs, ils ont fait de longs sillons. L’Éternel est juste : il a coupé les cordes des méchants.' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture du livre de l’Ecclésiaste (Qohéleth)',
      source: 'Lecture du livre de l’Ecclésiaste',
      reference: 'Qo 3, 1.2a.11a',
      citation: 'Un temps pour toute chose',
      content: [
        'Tout a son temps, et toute chose sous le ciel a son heure. Il y a un temps pour naître, et un temps pour mourir. Dieu a fait toutes choses bonnes, chacune en son temps.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison',
      content: [
        'Seigneur Dieu, qui as tout créé en sagesse, conduis-nous au soir de ce jour vers la louange de ton nom. Par Jésus Christ.',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Vêpres — Sunday, 2026-09-27
// ---------------------------------------------------------------------------
const office_vepres_2026_09_27: OfficeData = {
  date: '2026-09-27',
  hour: 'vepres',
  title: 'Vêpres — 22e dimanche du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: {
    text: [
      'Ô Créateur de la lumière,',
      'Qui fais lever le soir,',
      'Jésus, viens à notre secours,',
      'Et bénis cette fin de jour.',
      '',
      'Au couchant, nous te prions,',
      'Pour qu’en cette nuit venue,',
      'Notre cœur, sans cesse éveillé,',
      'Garde mémoire de ta croix.',
      '',
      'Trinité sainte, reçois',
      'La louange du soir ;',
      'Sois béni dans les siècles,',
      'À présent et pour toujours. Amen.',
    ],
    author: 'Compose (d’après l’hymne « Lucis creator optime », VIIIe siècle)',
    reference: 'Hymne des Vêpres',
  },
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 110 (111)',
      title: 'Psaume 110 (111)',
      reference: 'Ps 110 (111), 1-10',
      citation: 'L’œuvre de l’Éternel est grande',
      refrain: 'R/ Grandes sont les œuvres de l’Éternel.',
      strophes: [
        { number: 'I', text: 'Je louerai l’Éternel de tout mon cœur, dans le conseil des justes et dans l’assemblée.' },
        { number: 'II', text: 'Les œuvres de l’Éternel sont grandes, recherchées par tous ceux qui les aiment.' },
        { number: 'III', text: 'L’œuvre de ses mains est vérité et droit ; tous ses ordres sont vérité.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 113 (114-115)',
      title: 'Psaume 113 (114-115)',
      reference: 'Ps 113 (114-115), 1-4.12-18',
      citation: 'Quand Israël sortit d’Égypte',
      refrain: 'R/ Non pas à nous, Éternel, non pas à nous, mais à ton nom donne gloire.',
      strophes: [
        { number: 'I', text: 'Quand Israël sortit d’Égypte, la maison de Jacob, de chez un peuple barbare,' },
        { number: 'II', text: 'Judah devint son sanctuaire, Israël son domaine.' },
        { number: 'III', text: 'Non pas à nous, Éternel, non pas à nous, mais à ton nom donne gloire, à cause de ta bonté et de ta fidélité.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Cantique de l’Apocalypse',
      title: 'Cantique (Ap 15, 3-4)',
      reference: 'Ap 15, 3-4',
      citation: 'Grandes et merveilleuses sont tes œuvres',
      refrain: 'R/ Toutes les nations, Seigneur, viendront se prosterner devant toi.',
      strophes: [
        { number: 'I', text: 'Grandes et merveilleuses sont tes œuvres, Seigneur Dieu, maître de l’univers ; justes et véritables sont tes voies, roi des nations.' },
        { number: 'II', text: 'Qui ne craindrait, Seigneur, et ne glorifierait ton nom ? Car tu es le seul saint ; toutes les nations viendront se prosterner devant toi.' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture de la première lettre de saint Jean',
      source: 'Lecture de la première lettre de saint Jean',
      reference: '1 Jn 3, 1-2',
      citation: 'Voyez quel amour nous a donné le Père',
      content: [
        'Voyez quel amour le Père nous a donné, pour que nous soyons appelés enfants de Dieu ! Bien-aimés, nous sommes dès maintenant enfants de Dieu, et ce que nous serons n’a pas encore été manifesté.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'hymne',
      label: 'Cantique de Marie',
      title: 'Cantique de Marie (Magnificat)',
      reference: 'Lc 1, 46-55',
      citation: 'Mon âme exalte le Seigneur',
      content: [
        'Mon âme exalte le Seigneur, et mon esprit se réjouit en Dieu, mon Sauveur.',
        'Parce qu’il a regardé la bassesse de sa servante, voici, désormais toutes les générations me diront bienheureuse.',
        'Car le Tout-Puissant a fait pour moi de grandes choses ; son nom est saint.',
        'Sa miséricorde s’étend d’âge en âge sur ceux qui le craignent.',
      ],
    },
    {
      type: 'intercession',
      label: 'Intercessions',
      title: 'Intercessions',
      content: [
        'Au soir de ce dimanche, prions le Christ, lumière sans déclin :',
        'R/ Bénis ton peuple, Seigneur.',
        'Pour ceux qui célèbrent ta louange en ce jour, qu’ils reçoivent la grâce d’être tes témoins dans la semaine qui s’ouvre, nous te prions.',
        'Pour ceux qui peinent à croire, que ta lumière les rejoigne au creux de leurs nuit, nous te prions.',
        'Pour les malades, les mourants et les isolés, qu’ils trouvent en toi la paix, nous te prions.',
      ],
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison du soir',
      content: [
        'Dieu qui as donné ta loi à ton peuple d’Israël et, par ton Fils, accompli toute justice, fais que nous marchions selon l’Esprit et non selon la chair, pour obtenir la vie éternelle. Par Jésus Christ.',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Complies — Sunday, 2026-09-27
// ---------------------------------------------------------------------------
const office_complies_2026_09_27: OfficeData = {
  date: '2026-09-27',
  hour: 'complies',
  title: 'Complies — 22e dimanche du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: {
    text: [
      'Avant que le jour ne finisse,',
      'Créateur, nous te prions,',
      'Garde-nous cette nuit,',
      'Par ta tendresse, ô Christ.',
      '',
      'Que notre cœur ne se trouble pas,',
      'Que le malin n’ait pas de prise ;',
      'Que ton Esprit, dans la nuit,',
      'Maintienne notre louange.',
      '',
      'Gloire au Père et au Fils',
      'Et à l’Esprit de sainteté ;',
      'Pour les siècles des siècles. Amen.',
    ],
    author: 'Compose (d’après l’hymne « Te lucis ante terminum », VIIIe siècle)',
    reference: 'Hymne de Complies',
  },
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 4',
      title: 'Psaume 4',
      reference: 'Ps 4, 2-9',
      citation: 'Éternel, entends-moi quand je crie',
      refrain: 'R/ Seigneur, fais-moi entendre ta grâce au matin.',
      strophes: [
        { number: 'I', text: 'Éternel, entends-moi quand je crie ! Sois favorable à ma prière.' },
        { number: 'II', text: 'Sachez que l’Éternel s’est choisi un fidèle ; l’Éternel entend quand je crie à lui.' },
        { number: 'III', text: 'Tu mets dans mon cœur plus de joie qu’ils n’en ont quand abondent leur froment et leur vin nouveau. En paix, je me couche aussitôt je m’endors : toi seul, ô Éternel, tu me fais habiter en sécurité.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 90 (91)',
      title: 'Psaume 90 (91)',
      reference: 'Ps 90 (91), 1-8.11-16',
      citation: 'Mon refuge et ma forteresse',
      refrain: 'R/ Mon refuge, mon Dieu, mon recours.',
      strophes: [
        { number: 'I', text: 'Celui qui demeure sous l’abri du Très-Haut repose à l’ombre du Tout-Puissant.' },
        { number: 'II', text: 'Je dis à l’Éternel : Mon refuge et ma forteresse, mon Dieu en qui je me confie !' },
        { number: 'III', text: 'Car il te charge de ses anges, pour qu’ils te gardent dans toutes tes voies.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 133 (134)',
      title: 'Psaume 133 (134)',
      reference: 'Ps 133 (134), 1-3',
      citation: 'Bénissez l’Éternel, vous tous, serviteurs de l’Éternel',
      refrain: 'R/ Bénissez le Seigneur, vous qui veillez en sa maison.',
      strophes: [
        { number: 'I', text: 'Voici, bénissez l’Éternel, vous tous, serviteurs de l’Éternel, qui vous tenez dans la maison de l’Éternel pendant les nuits !' },
        { number: 'II', text: 'Élevez vos mains vers le sanctuaire, et bénissez l’Éternel !' },
        { number: 'III', text: 'Que l’Éternel te bénisse de Sion, lui qui a fait les cieux et la terre !' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture de la première lettre de saint Pierre',
      source: 'Lecture de la première lettre de saint Pierre apôtre',
      reference: '1 P 5, 8-9',
      citation: 'Sobres, veillez',
      content: [
        'Sobres, veillez. Votre adversaire, le diable, rôde comme un lion rugissant, cherchant qui dévorer. Résistez-lui avec une foi ferme.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'conclusion',
      label: 'Répons bref',
      title: 'Répons',
      reference: 'Cf. Ps 4, 9 ; 90 (91), 5',
      citation: 'En paix, je me couche et je dors',
      content: [
        'R/ Tu as mis mon cœur au large, Seigneur ; je m’endors en ta paix.',
      ],
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison de Complies',
      content: [
        'Visite, Seigneur, notre maison, et chasses-en loin tout piège de l’ennemi ; que tes saints anges y habitent pour nous garder dans la paix, et que ta bénédiction demeure sur nous. Par Jésus Christ.',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Offices du lundi 2026-09-28 — Lundi de la 22e semaine du Temps ordinaire
// ---------------------------------------------------------------------------
const office_lectures_2026_09_28: OfficeData = {
  date: '2026-09-28',
  hour: 'lectures',
  title: 'Office des lectures — Lundi de la 22e semaine du Temps ordinaire',
  introduction: COMMON_INTRO_VIGIL,
  hymn: {
    text: [
      'Dans le silence de la nuit,',
      'Tu viens, ô Verbe du Père ;',
      'Tu veilles sur ton Église,',
      'Tu la conduis vers la lumière.',
      '',
      'Ta Parole nous est donnée,',
      'Comme pain pour le voyageur ;',
      'Nous la portons dans nos cœurs,',
      'Et marchons vers le Royaume.',
      '',
      'Gloire à toi, Verbe éternel,',
      'Au Père et à l’Esprit saint,',
      'Pour les siècles des siècles. Amen.',
    ],
    author: 'Compose pour le présent office (d’après les hymnes vigiliales anciennes)',
    reference: 'Hymne de l’Office des lectures',
  },
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 5',
      title: 'Psaume 5',
      reference: 'Ps 5, 2-3.5-7.12',
      citation: 'Éternel, prête l’oreille à mes paroles',
      refrain: 'R/ Au matin, tu entends ma voix, Seigneur.',
      strophes: [
        { number: 'I', text: 'Éternel, prête l’oreille à mes paroles, écoute mes soupirs !' },
        { number: 'II', text: 'Éternel, au matin, tu entends ma voix ; au matin, je me dispose pour toi, et je veille.' },
        { number: 'III', text: 'Mais toi, ô Éternel, tu es juste dans tes arrêts ; tu détestes l’iniquité.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 6',
      title: 'Psaume 6',
      reference: 'Ps 6, 2-3.4-5.6-7',
      citation: 'Éternel, ne me reprends pas dans ta colère',
      refrain: 'R/ Éternel, délivre mon âme.',
      strophes: [
        { number: 'I', text: 'Éternel, ne me reprends pas dans ta colère, et ne me châtie pas dans ta fureur.' },
        { number: 'II', text: 'Aie pitié de moi, Éternel ! Car je suis sans force ; guéris-moi, Éternel ! Car mes os sont tremblants.' },
        { number: 'III', text: 'Mon âme est toute troublée ; et toi, Éternel, jusques à quand ?' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 7',
      title: 'Psaume 7',
      reference: 'Ps 7, 2-4.6.12-13',
      citation: 'Éternel, mon Dieu, en toi je cherche un refuge',
      refrain: 'R/ Mon bouclier est auprès de Dieu.',
      strophes: [
        { number: 'I', text: 'Éternel, mon Dieu, je cherche en toi mon refuge : délivre-moi de tous mes persécuteurs, et sauve-moi !' },
        { number: 'II', text: 'Éternel, mon Dieu, si j’ai fait cela, s’il y a de l’iniquité dans mes mains !' },
        { number: 'III', text: 'Dieu est un juste juge ; il menace chaque jour.' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture',
      title: 'Lecture du livre de Job',
      source: 'Lecture du livre de Job',
      reference: 'Jb 1, 1-22',
      citation: 'L’Éternel a donné, l’Éternel a ôté',
      content: [
        'Il y avait dans le pays d’Uts un homme qui s’appelait Job. Cet homme était intègre et droit ; il craignait Dieu, et se détournait du mal.',
        'Il y eut un jour où les fils de Dieu vinrent se présenter devant l’Éternel, et Satan vint aussi au milieu d’eux.',
        'L’Éternel dit à Satan : « As-tu remarqué mon serviteur Job ? Il n’a point son pareil sur la terre. » Satan répondit : « Est-ce pour rien que Job craint Dieu ? »',
        'L’Éternel permit alors à Satan de frapper Job. Job perdit ses biens et ses enfants. Alors Job se leva, déchira son manteau, et rasa sa tête ; puis, se jetant en terre, il se prosterna, et dit : « L’Éternel a donné, et l’Éternel a ôté ; que le nom de l’Éternel soit béni ! » En tout cela Job ne pécha point.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
  ],
  patristicReading: {
    type: 'lecture_patristique',
    label: 'Lecture patristique',
    title: 'Commentaire d’Origène sur l’Évangile de Jean',
    source: 'Commentaire d’Origène sur l’Évangile de Jean',
    reference: 'Commentaire sur Jean, 1, 4',
    citation: 'Le Verbe était la vraie lumière',
    patristicSource: 'Origène, Commentaire sur Jean',
    content: [
      '« Au commencement était le Verbe. » Ce commencement dont parle l’évangéliste n’est-il pas le même que celui de la Genèse : « Au commencement, Dieu créa les cieux et la terre » ?',
      'Car ce qui est au commencement, le Verbe, est Dieu ; et tout a été fait par lui, et rien de ce qui a été fait n’a été fait sans lui.',
      'Le Verbe n’est pas seulement parole proférée, mais le Verbe subsistant, qui était dès le commencement auprès de Dieu, et qui était Dieu. Il est venu chez les siens, et les siens ne l’ont pas reçu.',
      'Mais à tous ceux qui l’ont reçu, il a donné le pouvoir de devenir enfants de Dieu. Voilà l’inépuisable richesse du Verbe : il nous fait enfants du Père.',
    ],
  },
  conclusion: [
    'Répons : En tes mains, Seigneur, je remets mon esprit.',
    '– Tu nous rachètes, Seigneur, Dieu de vérité.',
    'Gloire au Père, et au Fils, et au Saint-Esprit,',
    'comme il était au commencement, maintenant et à jamais,',
    'pour les siècles des siècles. Amen.',
    'Oraison : Seigneur, sois pour nous, dans la nuit, lampe qui veille, feu qui réchauffe, et clarté qui t’éclaire. Par Jésus Christ.',
  ],
}

// Reuse the hymn/structure for the Monday weekday offices. The Office of Hours
// shares a great deal of structure across days, so for Tierce/Sexte/None/
// Vêpres/Complies of Monday 2026-09-28 we provide slimmed content with the
// appropriate weekday psalmody.

const office_laudes_2026_09_28: OfficeData = {
  date: '2026-09-28',
  hour: 'laudes',
  title: 'Laudes — Lundi de la 22e semaine du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: office_laudes_2026_09_27.hymn,
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 50 (51)',
      title: 'Psaume 50 (51)',
      reference: 'Ps 50 (51), 3-4.5-6.12-13.14.17',
      citation: 'Pitié pour moi, ô Dieu',
      refrain: 'R/ Crée en moi un cœur pur, ô Dieu.',
      strophes: [
        { number: 'I', text: 'O Dieu, aie pitié de moi dans ta bonté ! Selon ta grande compassion, efface mes transgressions.' },
        { number: 'II', text: 'Lave-moi complètement de mon iniquité, et purifie-moi de mon péché.' },
        { number: 'III', text: 'Crée en moi un cœur pur, ô Dieu ! Et renouvelle en moi un esprit bien disposé.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Cantique d’Ézéchiel (Ez 36)',
      title: 'Cantique d’Ézéchiel 36',
      reference: 'Ez 36, 24-28',
      citation: 'Je vous donnerai un cœur nouveau',
      refrain: 'R/ Je serai votre Dieu, vous serez mon peuple.',
      strophes: [
        { number: 'I', text: 'Je vous prendrai du milieu des nations, je vous rassemblerai de tous les pays, et je vous ramènerai dans votre pays.' },
        { number: 'II', text: 'Je vous donnerai un cœur nouveau, et je mettrai en vous un esprit nouveau.' },
        { number: 'III', text: 'Je mettrai mon esprit en vous, et je ferai que vous suiviez mes ordonnances.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 148',
      title: 'Psaume 148',
      reference: 'Ps 148, 1-5.13-14',
      citation: 'Louez l’Éternel dans les cieux',
      refrain: 'R/ Que tout ce respire loue l’Éternel.',
      strophes: [
        { number: 'I', text: 'Louez l’Éternel du haut des cieux, louez-le dans les hauteurs !' },
        { number: 'II', text: 'Que tous les anges le louent, que toutes ses armées le louent !' },
        { number: 'III', text: 'Que tout ce qui respire loue l’Éternel !' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture de la lettre aux Hébreux',
      source: 'Lecture de la lettre aux Hébreux',
      reference: 'He 3, 12-13',
      citation: 'Exhortez-vous chaque jour',
      content: [
        'Prenez garde, frères, qu’il n’y ait en aucun de vous un cœur mauvais et incrédule, qui le fasse se détourner du Dieu vivant. Mais exhortez-vous chaque jour, aussi longtemps qu’on peut dire : « Aujourd’hui. »',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'hymne',
      label: 'Cantique de Zacharie',
      title: 'Cantique de Zacharie (Benedictus)',
      reference: 'Lc 1, 68-79',
      citation: 'Béni soit le Seigneur, le Dieu d’Israël',
      content: office_laudes_2026_09_27.readings.find((r) => r.type === 'hymne')?.content ?? [],
    },
    {
      type: 'intercession',
      label: 'Intercessions',
      title: 'Intercessions',
      content: [
        'Au matin de ce nouveau jour, bénissons le Christ, soleil levant :',
        'R/ Éclaire nos pas, Seigneur.',
        'Pour ceux qui reprennent le travail, que ce labeur soit offrande et joie, nous te prions.',
        'Pour ceux qui n’ont pas de travail, que ta providence les rejoigne, nous te prions.',
        'Pour ceux qui vivent dans le doute, que ton Esprit les conduise à la vérité, nous te prions.',
      ],
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison',
      content: [
        'Dieu qui fais toutes choses nouvelles, donne-nous de commencer ce jour en ta présence, et de marcher dans la voie de ton Fils. Par Jésus Christ.',
      ],
    },
  ],
}

const office_tierce_2026_09_28: OfficeData = {
  date: '2026-09-28',
  hour: 'tierce',
  title: 'Tierce — Lundi de la 22e semaine du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: office_tierce_2026_09_27.hymn,
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 118 (119) IV',
      title: 'Psaume 118 (119), 25-32',
      reference: 'Ps 118 (119), 25-32',
      citation: 'Mon âme est attachée à la poussière',
      refrain: 'R/ Vois ma misère et délivre-moi.',
      strophes: [
        { number: 'I', text: 'Mon âme est attachée à la poussière ; fais-moi vivre selon ta parole !' },
        { number: 'II', text: 'Je raconte mes voies, et tu m’exauces ; enseigne-moi tes statuts !' },
        { number: 'III', text: 'Je cours dans la voie de tes commandements, car tu élargis mon cœur.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 118 (119) V',
      title: 'Psaume 118 (119), 33-40',
      reference: 'Ps 118 (119), 33-40',
      citation: 'Dirige-moi dans la voie de tes commandements',
      refrain: 'R/ Donne-moi l’intelligence pour observer ta loi.',
      strophes: [
        { number: 'I', text: 'Éternel, enseigne-moi la voie de tes statuts, et je la garderai jusqu’à la fin.' },
        { number: 'II', text: 'Donne-moi l’intelligence, pour que j’observe ta loi et que je la garde de tout mon cœur.' },
        { number: 'III', text: 'Vois que j’aime tes commandements ; Éternel, fais-moi vivre dans ta justice.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 118 (119) VI',
      title: 'Psaume 118 (119), 41-48',
      reference: 'Ps 118 (119), 41-48',
      citation: 'Que ta bonté vienne à moi',
      refrain: 'R/ Je marcherai dans ta liberté.',
      strophes: [
        { number: 'I', text: 'Que ta bonté vienne à moi, ô Éternel ! Et ton salut, selon ta parole.' },
        { number: 'II', text: 'Je marcherai dans la liberté, car je recherche tes ordonnances.' },
        { number: 'III', text: 'Je lève mes mains vers tes commandements, que j’aime.' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture de la lettre aux Galates',
      source: 'Lecture de la lettre de saint Paul apôtre aux Galates',
      reference: 'Ga 5, 25-26',
      citation: 'Si nous vivons par l’Esprit, marchons aussi par l’Esprit',
      content: [
        'Si nous vivons par l’Esprit, marchons aussi par l’Esprit. Ne cherchons pas une vaine gloire, en nous provoquant les uns les autres, en nous portant envie les uns aux autres.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison',
      content: [
        'Seigneur Dieu, en ce milieu de matinée, accorde-nous de demeurer fidèles à ton Esprit, pour porter ce jour les fruits de la charité. Par Jésus Christ.',
      ],
    },
  ],
}

const office_sexte_2026_09_28: OfficeData = {
  date: '2026-09-28',
  hour: 'sexe',
  title: 'Sexte — Lundi de la 22e semaine du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: office_sexte_2026_09_27.hymn,
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 118 (119) VII',
      title: 'Psaume 118 (119), 49-56',
      reference: 'Ps 118 (119), 49-56',
      citation: 'Souviens-toi de ta parole à ton serviteur',
      refrain: 'R/ Tes statuts sont mes cantons.',
      strophes: [
        { number: 'I', text: 'Souviens-toi de ta parole à ton serviteur, sur laquelle tu m’as fait attendre.' },
        { number: 'II', text: 'C’est ma consolation dans ma misère, que ta parole me rende la vie.' },
        { number: 'III', text: 'Tant que je chante, tes statuts sont mes cantons dans la maison de mon pèlerinage.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 118 (119) VIII',
      title: 'Psaume 118 (119), 57-64',
      reference: 'Ps 118 (119), 57-64',
      citation: 'Tu es mon partage, ô Éternel',
      refrain: 'R/ Tu es mon partage, Éternel, j’ai dit que j’observerais tes paroles.',
      strophes: [
        { number: 'I', text: 'Tu es mon partage, ô Éternel ! J’ai dit que j’observerais tes paroles.' },
        { number: 'II', text: 'Je te cherche de tout mon cœur : ne me laisse pas errer loin de tes commandements !' },
        { number: 'III', text: 'Je me hâte, et je ne diffère point d’observer tes ordonnances.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 118 (119) IX',
      title: 'Psaume 118 (119), 65-72',
      reference: 'Ps 118 (119), 65-72',
      citation: 'Tu es bon, et tu fais le bien',
      refrain: 'R/ Il est bon pour moi d’être humilié, afin que j’apprenne tes statuts.',
      strophes: [
        { number: 'I', text: 'Tu es bon, et bienfaisant ; enseigne-moi tes statuts.' },
        { number: 'II', text: 'Les orgueilleux me disent fausseté ; moi, je garde de tout mon cœur tes ordonnances.' },
        { number: 'III', text: 'Il est bon pour moi d’être humilié, afin que j’apprenne tes statuts.' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture de la lettre de saint Paul apôtre aux Éphésiens',
      source: 'Lecture de la lettre de saint Paul apôtre aux Éphésiens',
      reference: 'Ep 4, 30-32',
      citation: 'Soyez bons les uns envers les autres',
      content: [
        'N’attristez pas le Saint-Esprit de Dieu, par lequel vous avez été scellés pour le jour de la rédemption. Que toute amertume, toute animosité, toute colère, toute clameur, toute médisance, et toute malice disparaissent du milieu de vous. Soyez bons les uns envers les autres, miséricordieux.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison',
      content: [
        'Seigneur Dieu, tu nous offres le repos du midi ; accorde-nous d’y puiser la charité fraternelle et la patience. Par Jésus Christ.',
      ],
    },
  ],
}

const office_none_2026_09_28: OfficeData = {
  date: '2026-09-28',
  hour: 'none',
  title: 'None — Lundi de la 22e semaine du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: office_none_2026_09_27.hymn,
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 118 (119) X',
      title: 'Psaume 118 (119), 73-80',
      reference: 'Ps 118 (119), 73-80',
      citation: 'Tes mains m’ont fait et m’ont formé',
      refrain: 'R/ Que je voie ta gloire, Seigneur.',
      strophes: [
        { number: 'I', text: 'Tes mains m’ont fait et m’ont formé ; donne-moi l’intelligence, pour que j’apprenne tes commandements.' },
        { number: 'II', text: 'Ceux qui te craignent me verront et se réjouiront, car j’espère en ta parole.' },
        { number: 'III', text: 'Que ton cœur soit intègre dans mes statuts, afin que je ne sois pas confondu.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 118 (119) XI',
      title: 'Psaume 118 (119), 81-88',
      reference: 'Ps 118 (119), 81-88',
      citation: 'Mon âme languit après ton salut',
      refrain: 'R/ Je n’abandonne pas tes ordonnances.',
      strophes: [
        { number: 'I', text: 'Mon âme languit après ton salut ; j’espère en ta parole.' },
        { number: 'II', text: 'Mes yeux languissent après ta parole, en disant : Quand me consoleras-tu ?' },
        { number: 'III', text: 'Tous tes commandements ne sont que fidélité ; c’est sans raison qu’on me persécute : aide-moi !' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 118 (119) XII',
      title: 'Psaume 118 (119), 89-96',
      reference: 'Ps 118 (119), 89-96',
      citation: 'Ta parole est affermie dans les cieux',
      refrain: 'R/ Ta parole est affermie dans les cieux, Seigneur.',
      strophes: [
        { number: 'I', text: 'À toujours, ô Éternel, ta parole est affermie dans les cieux.' },
        { number: 'II', text: 'De génération en génération, ta fidélité subsiste ; tu as fondé la terre, et elle demeure.' },
        { number: 'III', text: 'J’ai vu une fin à tout ce qui est parfait ; tes commandements sont au large.' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture de la lettre de saint Paul apôtre aux Colossiens',
      source: 'Lecture de la lettre de saint Paul apôtre aux Colossiens',
      reference: 'Col 3, 12-13',
      citation: 'Revêtez-vous de tendresse et de bonté',
      content: [
        'Revêtez-vous, comme des élus de Dieu, de compassion, de bonté, d’humilité, de douceur, de patience. Supportez-vous les uns les autres, et pardonnez-vous mutuellement.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison',
      content: [
        'Seigneur Dieu, au soir de ce jour qui s’avance, ne nous laisse pas fléchir, mais fais-nous persévérer dans la foi de ton Fils. Par Jésus Christ.',
      ],
    },
  ],
}

const office_vepres_2026_09_28: OfficeData = {
  date: '2026-09-28',
  hour: 'vepres',
  title: 'Vêpres — Lundi de la 22e semaine du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: office_vepres_2026_09_27.hymn,
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 18 (19)',
      title: 'Psaume 18 (19)',
      reference: 'Ps 18 (19), 2-5',
      citation: 'Les cieux racontent la gloire de Dieu',
      refrain: 'R/ Que la bouche proclame ta louange, Seigneur.',
      strophes: [
        { number: 'I', text: 'Les cieux racontent la gloire de Dieu, et l’étendue de la main de ses œuvres proclame la grandeur de son nom.' },
        { number: 'II', text: 'Le jour envoie au jour la nouvelle, la nuit à la nuit donne enseignement.' },
        { number: 'III', text: 'Leur retentissement s’étend à toute la terre, et leurs paroles jusqu’aux extrémités du monde.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 45 (46)',
      title: 'Psaume 45 (46)',
      reference: 'Ps 45 (46), 2-4.6.8-9',
      citation: 'Dieu est pour nous refuge et force',
      refrain: 'R/ L’Éternel des armées est avec nous, le Dieu de Jacob est notre refuge.',
      strophes: [
        { number: 'I', text: 'Dieu est pour nous refuge et force, un secours qui ne défaille jamais dans la détresse.' },
        { number: 'II', text: 'Des fleuves réjouissent la ville de Dieu, le Très-Haut a sanctifié sa demeure.' },
        { number: 'III', text: 'L’Éternel des armées est avec nous, le Dieu de Jacob est notre refuge.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 111 (112)',
      title: 'Psaume 111 (112)',
      reference: 'Ps 111 (112), 1-9',
      citation: 'Lumière qui se lève dans les ténèbres pour le juste',
      refrain: 'R/ Le juste se souvient des commandements du Seigneur.',
      strophes: [
        { number: 'I', text: 'Bienheureux l’homme qui craint l’Éternel, qui prend ses délices dans ses commandements !' },
        { number: 'II', text: 'Lumière qui se lève dans les ténèbres pour le droit ; il est miséricordieux, compatissant et juste.' },
        { number: 'III', text: 'À jamais il est affermi ; le juste sera en mémoire éternelle.' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture de la première lettre de saint Paul apôtre aux Thessaloniciens',
      source: 'Lecture de la première lettre de saint Paul apôtre aux Thessaloniciens',
      reference: '1 Th 5, 4-5',
      citation: 'Vous êtes tous des enfants de la lumière',
      content: [
        'Pour vous, frères, vous n’êtes pas dans les ténèbres, pour que ce jour vous surprenne comme un voleur. Vous êtes tous des enfants de la lumière et des enfants du jour.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'hymne',
      label: 'Cantique de Marie',
      title: 'Cantique de Marie (Magnificat)',
      reference: 'Lc 1, 46-55',
      citation: 'Mon âme exalte le Seigneur',
      content: office_vepres_2026_09_27.readings.find((r) => r.type === 'hymne')?.content ?? [],
    },
    {
      type: 'intercession',
      label: 'Intercessions',
      title: 'Intercessions',
      content: [
        'Au soir de ce jour, bénissons le Christ, lumière qui ne décline pas :',
        'R/ Reste avec nous, Seigneur, car le soir tombe.',
        'Pour ceux qui rentrent de leur travail, qu’ils trouvent le repos en ta louange, nous te prions.',
        'Pour les familles dispersées, qu’elles se retrouvent en ta paix, nous te prions.',
        'Pour ceux qui s’endorment dans la solitude, que tes anges les entourent, nous te prions.',
      ],
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison du soir',
      content: [
        'Dieu qui ne défailles jamais, fais que ton Esprit nous habite, pour qu’en ce soir ta louange soit sur nos lèvres. Par Jésus Christ.',
      ],
    },
  ],
}

const office_complies_2026_09_28: OfficeData = {
  date: '2026-09-28',
  hour: 'complies',
  title: 'Complies — Lundi de la 22e semaine du Temps ordinaire',
  introduction: COMMON_INTRO_DAY,
  hymn: office_complies_2026_09_27.hymn,
  psalms: [
    {
      type: 'psaume',
      label: 'Psaume 11',
      title: 'Psaume 11',
      reference: 'Ps 11, 1-4.7',
      citation: 'L’Éternel est dans son saint temple',
      refrain: 'R/ Tu vois, Seigneur, et tu juges.',
      strophes: [
        { number: 'I', text: 'Dans l’Éternel, je cherche mon refuge. Comment pouvez-vous me dire : Fuis sur vos montagnes, comme un oiseau ?' },
        { number: 'II', text: 'Car voici, les méchants bandent l’arc ; ils mettent la flèche sur la corde.' },
        { number: 'III', text: 'L’Éternel est dans son saint temple ; l’Éternel a son trône dans les cieux.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 90 (91)',
      title: 'Psaume 90 (91)',
      reference: 'Ps 90 (91), 1-8.11-16',
      citation: 'Mon refuge et ma forteresse',
      refrain: 'R/ Mon refuge, mon Dieu, mon recours.',
      strophes: [
        { number: 'I', text: 'Celui qui demeure sous l’abri du Très-Haut repose à l’ombre du Tout-Puissant.' },
        { number: 'II', text: 'Je dis à l’Éternel : Mon refuge et ma forteresse, mon Dieu en qui je me confie !' },
        { number: 'III', text: 'Car il te charge de ses anges, pour qu’ils te gardent dans toutes tes voies.' },
      ],
    },
    {
      type: 'psaume',
      label: 'Psaume 133 (134)',
      title: 'Psaume 133 (134)',
      reference: 'Ps 133 (134), 1-3',
      citation: 'Bénissez l’Éternel, vous tous, serviteurs de l’Éternel',
      refrain: 'R/ Bénissez le Seigneur, vous qui veillez en sa maison.',
      strophes: [
        { number: 'I', text: 'Voici, bénissez l’Éternel, vous tous, serviteurs de l’Éternel, qui vous tenez dans la maison de l’Éternel pendant les nuits !' },
        { number: 'II', text: 'Élevez vos mains vers le sanctuaire, et bénissez l’Éternel !' },
        { number: 'III', text: 'Que l’Éternel te bénisse de Sion, lui qui a fait les cieux et la terre !' },
      ],
    },
  ],
  readings: [
    {
      type: 'lecture',
      label: 'Lecture brève',
      title: 'Lecture du livre des Proverbes',
      source: 'Lecture du livre des Proverbes',
      reference: 'Pr 3, 23-24',
      citation: 'Lorsque tu te coucheras, tu seras sans crainte',
      content: [
        'Alors tu marcheras avec assurance dans ta voie, et ton pied ne heurtera pas. Si tu te couches, tu seras sans crainte ; et si tu dors, ton sommeil sera doux.',
      ],
      conclusion: '– Parole du Seigneur.',
    },
    {
      type: 'oraison',
      label: 'Oraison',
      title: 'Oraison de Complies',
      content: [
        'Seigneur, exauce nos prières du soir ; fais qu’en cette nuit, délivrés de toute crainte, nous reposions en ta paix, et que demain nous chantions ta louange. Par Jésus Christ.',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Index of all sample offices, keyed by `${date}|${hour}`.
// ---------------------------------------------------------------------------
const sampleOffices: Record<string, OfficeData> = {
  '2026-09-27|lectures': office_lectures_2026_09_27,
  '2026-09-27|laudes': office_laudes_2026_09_27,
  '2026-09-27|tierce': office_tierce_2026_09_27,
  '2026-09-27|sexe': office_sexte_2026_09_27,
  '2026-09-27|none': office_none_2026_09_27,
  '2026-09-27|vepres': office_vepres_2026_09_27,
  '2026-09-27|complies': office_complies_2026_09_27,
  '2026-09-28|lectures': office_lectures_2026_09_28,
  '2026-09-28|laudes': office_laudes_2026_09_28,
  '2026-09-28|tierce': office_tierce_2026_09_28,
  '2026-09-28|sexe': office_sexte_2026_09_28,
  '2026-09-28|none': office_none_2026_09_28,
  '2026-09-28|vepres': office_vepres_2026_09_28,
  '2026-09-28|complies': office_complies_2026_09_28,
}

const HOURS: OfficeData['hour'][] = ['lectures', 'laudes', 'tierce', 'sexe', 'none', 'vepres', 'complies']

/**
 * Returns the OfficeData for the given ISO date and hour. If no sample is
 * available, falls back gracefully:
 * 1. try the same hour for the Sunday sample (2026-09-27),
 * 2. fall back to the Office of Readings of 2026-09-27.
 */
export function getOfficeData(date: string, hour: OfficeData['hour']): OfficeData {
  const direct = sampleOffices[`${date}|${hour}`]
  if (direct) return direct

  // Fallback: same hour, but on the Sunday sample.
  const sameHourSunday = sampleOffices[`2026-09-27|${hour}`]
  if (sameHourSunday) {
    return patchDate(sameHourSunday, date)
  }

  // Ultimate fallback: Office of Readings Sunday, patched.
  return patchDate(sampleOffices['2026-09-27|lectures'], date)
}

function patchDate(o: OfficeData, date: string): OfficeData {
  return {
    ...o,
    date,
    title: `${o.title} (modèle)`,
    introduction: o.introduction,
  }
}

export const sampleOfficeDates = ['2026-09-27', '2026-09-28']

export const sampleOfficeHours = HOURS

export const allSampleOffices: OfficeData[] = HOURS.flatMap((h) =>
  sampleOfficeDates.map((d) => sampleOffices[`${d}|${h}`]).filter(Boolean)
)

export type { OfficeData, Reading }
