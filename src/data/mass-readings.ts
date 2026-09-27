import type { MassData, Reading } from './types'
import { getDayInfo } from './liturgical-calendar'

// =============================================================================
// Mass readings — SAMPLE liturgical content for the AELF clone.
//
// All biblical text below is composed in the public-domain French style of
// the Louis Segond 1910 translation (which is widely considered public
// domain). It is NOT a reproduction of any copyrighted AELF translation.
// This is sample content for a UI clone.
// =============================================================================

const PAROLE_DU_SEIGNEUR = '– Parole du Seigneur.'
const ACCLAMONS = '– Acclamons la Parole de Dieu.'
const LOUANGE = '– Louange à toi, Seigneur Jésus.'

// ---------------------------------------------------------------------------
// 2026-09-27 — 22e dimanche du Temps ordinaire, Année A
// ---------------------------------------------------------------------------
const mass_2026_09_27: MassData = {
  date: '2026-09-27',
  dayInfo: getDayInfo('2026-09-27'),
  readings: [
    {
      type: 'premiere_lecture',
      label: 'Première lecture',
      title: 'Lecture du livre du prophète Jérémie',
      source: 'Lecture du livre du prophète Jérémie',
      reference: 'Jr 20, 7-9',
      citation: 'Tu m’as persuadé, Seigneur',
      content: [
        'Tu m’as persuadé, ô Éternel, et je me suis laissé persuader ; tu m’as saisi, et tu m’as vaincu. Je suis devenu chaque jour l’objet de railleries, tout le monde se moque de moi.',
        'Car chaque fois que je parle, il faut crier, il faut proclamer : Violence et oppression ! La parole de l’Éternel est pour moi un opprobre et une moquerie, tout le jour.',
        'Et je me disais : « Je ne veux plus penser à lui, je ne parlerai plus en son nom. » Mais il y avait en mon cœur comme un feu dévorant, enfermé dans mes os ; je m’épuisais à le contenir, et je n’ai pas pu.',
      ],
      conclusion: PAROLE_DU_SEIGNEUR,
    },
    {
      type: 'psaume',
      label: 'Psaume',
      title: 'Psaume 62 (63)',
      reference: 'Ps 62 (63), 2.3.4.5.6.7.8',
      citation: 'Mon âme a soif de toi, Seigneur',
      refrain: 'R/ Mon âme a soif de toi, Seigneur, mon Dieu.',
      strophes: [
        { number: 'I', text: 'Ô Dieu, tu es mon Dieu, je te cherche dès l’aube ; mon âme a soif de toi, ma chair soupire après toi, comme une terre aride, altérée, sans eau.' },
        { number: 'II', text: 'Ainsi je t’ai contemplé dans le sanctuaire, pour voir ta puissance et ta gloire. Car ta bonté vaut mieux que la vie : mes lèvres te loueront.' },
        { number: 'III', text: 'Je te bénirai tout au long de mes jours, j’élèverai mes mains en ton nom. Mon âme se rassasie comme de moelle et de graisse, et ma bouche te loue avec des lèvres joyeuses.' },
        { number: 'IV', text: 'Quand je pense à toi sur ma couche, je médite sur toi pendant les veilles de la nuit. Car tu es mon secours, et je chanterai sous l’ombre de tes ailes.' },
      ],
    },
    {
      type: 'deuxieme_lecture',
      label: 'Deuxième lecture',
      title: 'Lecture de la lettre de saint Paul apôtre aux Romains',
      source: 'Lecture de la lettre de saint Paul apôtre aux Romains',
      reference: 'Rm 12, 1-2',
      citation: 'Soyez transformés par le renouvellement de l’intelligence',
      content: [
        'Je vous exhorte donc, frères, par les compassions de Dieu, à offrir vos corps comme un sacrifice vivant, saint, agréable à Dieu, ce qui sera de votre part un culte raisonnable.',
        'Et ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l’intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait.',
      ],
      conclusion: PAROLE_DU_SEIGNEUR,
    },
    {
      type: 'alleluia',
      label: 'Alléluia',
      title: 'Alléluia, alléluia',
      reference: 'cf. Ps 94 (95), 8a',
      citation: 'Aujourd’hui, ne fermez pas votre cœur',
      refrain: 'R/ Alléluia, alléluia !',
      content: [
        'Aujourd’hui, ne fermez pas votre cœur, mais écoutez la voix du Seigneur.',
      ],
    },
    {
      type: 'evangile',
      label: 'Évangile',
      title: 'Évangile de Jésus Christ selon saint Matthieu',
      source: 'Évangile de Jésus Christ selon saint Matthieu',
      reference: 'Mt 16, 21-27',
      citation: 'Tu m’es un obstacle ; tes pensées ne sont pas celles de Dieu',
      content: [
        'En ce temps-là, Jésus commença à faire connaître à ses disciples qu’il devait aller à Jérusalem, souffrir beaucoup de la part des anciens, des principaux sacrificateurs et des scribes, être mis à mort, et ressusciter le troisième jour.',
        'Pierre, l’ayant pris à part, se mit à le reprendre, et dit : « À Dieu ne plaise, Seigneur ! Cela ne t’arrivera point. » Mais Jésus, se retournant, dit à Pierre : « Retire-toi de moi, Satan ! tu m’es en scandale ; car tes pensées ne sont pas les pensées de Dieu, mais celles des hommes. »',
        'Alors Jésus dit à ses disciples : « Si quelqu’un veut venir après moi, qu’il renonce à lui-même, qu’il se charge de sa croix, et qu’il me suive. Car celui qui voudra sauver sa vie la perdra, et celui qui perdra sa vie à cause de moi la trouvera. Car quel avantage y a-t-il pour un homme à gagner le monde entier, s’il perd son âme ? Ou que donnera un homme en échange de son âme ?',
        'Car le Fils de l’homme doit venir dans la gloire de son Père, avec ses anges ; et alors il rendra à chacun selon ses œuvres. »',
      ],
      conclusion: ACCLAMONS,
    },
  ],
}

// ---------------------------------------------------------------------------
// 2026-09-28 — Lundi de la 22e semaine du Temps ordinaire, Année A (paire impaire)
// ---------------------------------------------------------------------------
const mass_2026_09_28: MassData = {
  date: '2026-09-28',
  dayInfo: getDayInfo('2026-09-28'),
  readings: [
    {
      type: 'premiere_lecture',
      label: 'Première lecture',
      title: 'Lecture du livre de Job',
      source: 'Lecture du livre de Job',
      reference: 'Jb 1, 6-22',
      citation: 'L’Éternel a donné, l’Éternel a ôté',
      content: [
        'Il y eut un jour où les fils de Dieu vinrent se présenter devant l’Éternel, et Satan vint aussi au milieu d’eux. L’Éternel dit à Satan : « D’où viens-tu ? » Et Satan répondit : « De parcourir la terre et m’y promener. »',
        'L’Éternel dit à Satan : « As-tu remarqué mon serviteur Job ? Il n’a point son pareil sur la terre, homme intègre et droit, craignant Dieu, et se détournant du mal. » Satan répondit : « Est-ce pour rien que Job craint Dieu ? »',
        'Encore un peu, et Job dit : « L’Éternel a donné, et l’Éternel a ôté ; que le nom de l’Éternel soit béni ! » En tout cela Job ne pécha point et n’attribua rien à Dieu de blâmable.',
      ],
      conclusion: PAROLE_DU_SEIGNEUR,
    },
    {
      type: 'psaume',
      label: 'Psaume',
      title: 'Psaume 18 (19)',
      reference: 'Ps 18 (19), 2.3.4.5',
      citation: 'Que la bouche proclame ta louange',
      refrain: 'R/ Que la bouche proclame ta louange, Seigneur notre Dieu.',
      strophes: [
        { number: 'I', text: 'Les cieux racontent la gloire de Dieu, et l’étendue de la main de ses œuvres proclame la grandeur de son nom.' },
        { number: 'II', text: 'Le jour envoie au jour la nouvelle, la nuit à la nuit donne enseignement.' },
        { number: 'III', text: 'Ce n’est point un langage, ce ne sont point des paroles dont la voix ne soit entendue : leur retentissement s’étend à toute la terre.' },
        { number: 'IV', text: 'Que la parole de ma bouche te soit agréable, ô Éternel ! mon rocher, mon rédempteur.' },
      ],
    },
    {
      type: 'alleluia',
      label: 'Alléluia',
      title: 'Alléluia, alléluia',
      reference: 'cf. Mc 1, 15',
      citation: 'Le règne de Dieu est tout proche',
      refrain: 'R/ Alléluia, alléluia !',
      content: [
        'Le règne de Dieu est tout proche : convertissez-vous et croyez à l’Évangile.',
      ],
    },
    {
      type: 'evangile',
      label: 'Évangile',
      title: 'Évangile de Jésus Christ selon saint Luc',
      source: 'Évangile de Jésus Christ selon saint Luc',
      reference: 'Lc 10, 1-12',
      citation: 'La moisson est grande, mais les ouvriers peu nombreux',
      content: [
        'En ce temps-là, le Seigneur désigna encore soixante-douze autres disciples, et il les envoya deux à deux devant lui dans toutes les villes et lieux où il devait lui-même aller.',
        'Il leur dit : « La moisson est grande, mais les ouvriers sont peu nombreux. Priez donc le Seigneur de la moisson d’envoyer des ouvriers dans sa moisson. Allez ! Voici que je vous envoie comme des agneaux au milieu des loups.',
        'Dans quelque maison que vous entriez, dites d’abord : Paix à cette maison ! Et s’il s’y trouve un fils de paix, votre paix reposera sur lui ; sinon, elle reviendra à vous. Demeurez dans cette maison, mangeant et buvant ce qu’on vous donnera ; car l’ouvrier mérite son salaire.',
        'Et si l’on ne vous reçoit pas, sortez de cette ville, et secouez la poussière de vos pieds, en témoignage contre eux. »',
      ],
      conclusion: ACCLAMONS,
    },
  ],
}

// ---------------------------------------------------------------------------
// 2026-09-29 — Saints Michel, Gabriel et Raphaël, archanges — fête
// ---------------------------------------------------------------------------
const mass_2026_09_29: MassData = {
  date: '2026-09-29',
  dayInfo: getDayInfo('2026-09-29'),
  readings: [
    {
      type: 'premiere_lecture',
      label: 'Première lecture',
      title: 'Lecture de l’Apocalypse de saint Jean',
      source: 'Lecture de l’Apocalypse de saint Jean apôtre',
      reference: 'Ap 12, 7-12ab',
      citation: 'Michel et ses anges combattirent le dragon',
      content: [
        'Il y eut une guerre dans le ciel. Michel et ses anges combattirent contre le dragon. Et le dragon combattit, lui et ses anges ; mais il ne fut pas le plus fort, et leur place ne se trouva plus dans le ciel.',
        'Et il fut précipité, le grand dragon, le serpent ancien, appelé le diable et Satan, celui qui égare toute la terre ; il fut précipité sur la terre, et ses anges furent précipités avec lui.',
        'Et j’entendis dans le ciel une voix forte qui disait : « Voici le salut, la puissance, et le règne de notre Dieu, et la puissance de son Christ ; car il a été jeté dehors l’accusateur de nos frères, celui qui les accusait devant notre Dieu jour et nuit.',
        'Ils l’ont vaincu à cause du sang de l’Agneau et à cause de la parole de leur témoignage, et ils n’ont pas aimé leur vie, même exposés à la mort. »',
      ],
      conclusion: PAROLE_DU_SEIGNEUR,
    },
    {
      type: 'psaume',
      label: 'Psaume',
      title: 'Psaume 102 (103)',
      reference: 'Ps 102 (103), 1-2.3-4.9-10.11-12',
      citation: 'Bénissez le Seigneur, vous ses anges',
      refrain: 'R/ Bénissez le Seigneur, vous ses anges, puissants et forts.',
      strophes: [
        { number: 'I', text: 'Bénis l’Éternel, ô mon âme ! Que tout ce qui est en moi bénisse son saint nom !' },
        { number: 'II', text: 'Bénis l’Éternel, ô mon âme, et n’oublie aucun de ses bienfaits ! C’est lui qui pardonne toutes tes iniquités, qui guérit toutes tes maladies.' },
        { number: 'III', text: 'Il ne conteste pas sans cesse, il ne garde pas sa colère à toujours. Il ne nous traite pas selon nos péchés, il ne nous rend pas selon nos iniquités.' },
        { number: 'IV', text: 'Car autant les cieux sont élevés au-dessus de la terre, autant sa bonté est grande envers ceux qui le craignent.' },
      ],
    },
    {
      type: 'alleluia',
      label: 'Alléluia',
      title: 'Alléluia, alléluia',
      reference: 'cf. Dn 12, 3 ; Mt 5, 8',
      citation: 'Vous verrez le ciel ouvert',
      refrain: 'R/ Alléluia, alléluia !',
      content: [
        'Bienheureux les cœurs purs, car ils verront Dieu. Vous verrez le ciel ouvert, et les anges de Dieu monter et descendre sur le Fils de l’homme.',
      ],
    },
    {
      type: 'evangile',
      label: 'Évangile',
      title: 'Évangile de Jésus Christ selon saint Jean',
      source: 'Évangile de Jésus Christ selon saint Jean',
      reference: 'Jn 1, 47-51',
      citation: 'Vous verrez le ciel ouvert, et les anges de Dieu monter et descendre',
      content: [
        'En ce temps-là, Jésus vit venir à lui Nathanaël, et il dit de lui : « Voici vraiment un Israélite dans lequel il n’y a point de fraude. » Nathanaël lui dit : « D’où me connais-tu ? » Jésus lui répondit : « Avant que Philippe t’appelât, quand tu étais sous le figuier, je t’ai vu. »',
        'Nathanaël lui répondit : « Rabbi, tu es le Fils de Dieu, tu es le roi d’Israël. » Jésus lui dit : « Parce que je t’ai dit que je t’ai vu sous le figuier, tu crois ; tu verras de plus grandes choses que celles-ci. »',
        'Et il lui dit : « En vérité, en vérité, je vous le dis : vous verrez désormais le ciel ouvert, et les anges de Dieu monter et descendre sur le Fils de l’homme. »',
      ],
      conclusion: ACCLAMONS,
    },
  ],
}

// ---------------------------------------------------------------------------
// 2026-09-30 — Saint Jérôme, prêtre et docteur de l’Église — mémoire
// ---------------------------------------------------------------------------
const mass_2026_09_30: MassData = {
  date: '2026-09-30',
  dayInfo: getDayInfo('2026-09-30'),
  readings: [
    {
      type: 'premiere_lecture',
      label: 'Première lecture',
      title: 'Lecture de la deuxième lettre de saint Paul apôtre à Timothée',
      source: 'Lecture de la deuxième lettre de saint Paul apôtre à Timothée',
      reference: '2 Tm 3, 14-17',
      citation: 'Toute Écriture est inspirée de Dieu',
      content: [
        'Toi, demeure dans ce que tu as appris et reconnu pour certain, sachant de qui tu l’as appris ; dès ton enfance, tu connais les saintes lettres, qui peuvent te donner la sagesse en vue du salut par la foi en Jésus Christ.',
        'Toute Écriture est inspirée de Dieu et utile pour enseigner, pour convaincre, pour corriger, pour former à la justice, afin que l’homme de Dieu soit accompli, propre à toute bonne œuvre.',
      ],
      conclusion: PAROLE_DU_SEIGNEUR,
    },
    {
      type: 'psaume',
      label: 'Psaume',
      title: 'Psaume 1',
      reference: 'Ps 1, 1-2.3.4.6',
      citation: 'Heureux l’homme qui se plaît dans la loi du Seigneur',
      refrain: 'R/ Heureux l’homme qui se plaît dans la loi du Seigneur.',
      strophes: [
        { number: 'I', text: 'Heureux l’homme qui ne marche pas selon le conseil des méchants, qui ne s’arrête pas dans la voie des pécheurs, et ne s’assied pas sur le siège des moqueurs.' },
        { number: 'II', text: 'Mais qui trouve son plaisir dans la loi de l’Éternel, et la médite jour et nuit ! Il est comme un arbre planté près d’un courant d’eau, qui donne son fruit en sa saison.' },
        { number: 'III', text: 'Il n’en est pas ainsi des méchants : ils sont comme la paille que le vent dissipe.' },
        { number: 'IV', text: 'Car l’Éternel connaît la voie des justes, et la voie des pécheurs mène à la perdition.' },
      ],
    },
    {
      type: 'alleluia',
      label: 'Alléluia',
      title: 'Alléluia, alléluia',
      reference: 'Jn 15, 16',
      citation: 'Je vous ai choisis pour que vous portiez du fruit',
      refrain: 'R/ Alléluia, alléluia !',
      content: [
        'Ce n’est pas vous qui m’avez choisi, c’est moi qui vous ai choisis, afin que vous alliez et que vous portiez du fruit, et que votre fruit demeure.',
      ],
    },
    {
      type: 'evangile',
      label: 'Évangile',
      title: 'Évangile de Jésus Christ selon saint Matthieu',
      source: 'Évangile de Jésus Christ selon saint Matthieu',
      reference: 'Mt 23, 8-12',
      citation: 'Vous tous, vous êtes frères',
      content: [
        'En ce temps-là, Jésus disait à ses disciples : « Vous, ne vous faites pas appeler Rabbi ; car un seul est votre Maître, et vous êtes tous frères.',
        'N’appelez personne sur la terre votre père ; car un seul est votre Père, celui qui est dans les cieux. Ne vous faites pas appeler docteurs ; car un seul est votre Docteur, le Christ.',
        'Le plus grand parmi vous sera votre serviteur. Quiconque s’élèvera sera abaissé, et quiconque s’abaissera sera élevé. »',
      ],
      conclusion: ACCLAMONS,
    },
  ],
}

// ---------------------------------------------------------------------------
// 2026-10-01 — Sainte Thérèse de l’Enfant-Jésus, vierge et docteur — fête
// ---------------------------------------------------------------------------
const mass_2026_10_01: MassData = {
  date: '2026-10-01',
  dayInfo: getDayInfo('2026-10-01'),
  readings: [
    {
      type: 'premiere_lecture',
      label: 'Première lecture',
      title: 'Lecture du livre du prophète Isaïe',
      source: 'Lecture du livre du prophète Isaïe',
      reference: 'Is 66, 10-14c',
      citation: 'Vers Jérusalem, répandez la joie',
      content: [
        'Réjouissez-vous avec Jérusalem, soyez transports d’allégresse en elle, vous tous qui l’aimez ; soyez remplis de joie avec elle, vous tous qui vous étiez affligés en elle.',
        'Afin que vous nourrissiez et soyez rassasiés du lait de ses consolations, afin que vous jouissiez de l’abondance de sa gloire.',
        'Car voici ce que dit l’Éternel : « Je vais faire couler sur elle la paix comme un fleuve, et la gloire des nations comme un torrent qui déborde. »',
        'Vous le verrez, votre cœur sera dans la joie, vos os reprendront vigueur comme l’herbe. On connaîtra que la main de l’Éternel est avec ses serviteurs.',
      ],
      conclusion: PAROLE_DU_SEIGNEUR,
    },
    {
      type: 'psaume',
      label: 'Psaume',
      title: 'Psaume 130 (131)',
      reference: 'Ps 130 (131), 1.2.3',
      citation: 'Garde en moi, Seigneur, le trésor d’un enfant',
      refrain: 'R/ Garde en moi, Seigneur, le trésor d’un enfant.',
      strophes: [
        { number: 'I', text: 'Éternel ! mon cœur ne s’est pas élevé, et mes yeux n’ont pas regardé en haut ; je n’ai point recherché les choses grandes et sublimes, ni ce qui est trop élevé pour moi.' },
        { number: 'II', text: 'Certainement, je me suis calmé et apaisé mon âme, comme un enfant sevré contre sa mère ; comme un enfant sevré est mon âme en moi.' },
        { number: 'III', text: 'Israël, mets ton espoir en l’Éternel, dès maintenant et à jamais.' },
      ],
    },
    {
      type: 'deuxieme_lecture',
      label: 'Deuxième lecture',
      title: 'Lecture de la lettre de saint Paul apôtre aux Philippiens',
      source: 'Lecture de la lettre de saint Paul apôtre aux Philippiens',
      reference: 'Ph 3, 7-14',
      citation: 'Je cours vers le but pour le prix de l’appel d’en haut',
      content: [
        'Frères, les choses qui étaient pour moi des gains, je les ai regardées comme une perte, à cause du Christ. Et même, je regarde toutes choses comme une perte, à cause de l’excellence de la connaissance de Jésus Christ mon Seigneur.',
        'Je les regarde comme de la boue, afin de gagner Christ, et d’être trouvé en lui, non avec ma justice, celle qui vient de la loi, mais avec celle qui s’obtient par la foi en Christ.',
        'C’est afin de le connaître, ainsi que la puissance de sa résurrection et la communion de ses souffrances, en devenant conforme à lui dans sa mort, pour parvenir, si je puis, à la résurrection d’entre les morts.',
        'Non, je n’ai pas atteint le but, ni déjà été rendu parfait ; mais je continue à courir pour saisir, comme aussi j’ai été saisi par le Christ Jésus. Frères, je ne pense pas l’avoir saisi ; mais je fais une chose : oubliant ce qui est derrière, et tendant avec effort vers ce qui est devant, je cours vers le but, pour remporter le prix de l’appel céleste de Dieu en Jésus Christ.',
      ],
      conclusion: PAROLE_DU_SEIGNEUR,
    },
    {
      type: 'alleluia',
      label: 'Alléluia',
      title: 'Alléluia, alléluia',
      reference: 'cf. Mt 18, 4',
      citation: 'Le plus petit dans le Royaume',
      refrain: 'R/ Alléluia, alléluia !',
      content: [
        'Celui qui s’abaissera comme un petit enfant, celui-là est le plus grand dans le royaume des cieux.',
      ],
    },
    {
      type: 'evangile',
      label: 'Évangile',
      title: 'Évangile de Jésus Christ selon saint Matthieu',
      source: 'Évangile de Jésus Christ selon saint Matthieu',
      reference: 'Mt 18, 1-4',
      citation: 'Si vous ne changez pas pour devenir comme les enfants',
      content: [
        'En ce temps-là, les disciples s’approchèrent de Jésus et dirent : « Qui donc est le plus grand dans le royaume des cieux ? »',
        'Jésus appela un petit enfant, le plaça au milieu d’eux, et dit : « Je vous le dis en vérité, si vous ne vous convertissez et si vous ne devenez comme les petits enfants, vous n’entrerez point dans le royaume des cieux.',
        'C’est pourquoi, quiconque se rendra humble comme un petit enfant, celui-là est le plus grand dans le royaume des cieux. »',
      ],
      conclusion: ACCLAMONS,
    },
  ],
}

// ---------------------------------------------------------------------------
// Index of all sample masses.
// ---------------------------------------------------------------------------
const sampleMasses: Record<string, MassData> = {
  '2026-09-27': mass_2026_09_27,
  '2026-09-28': mass_2026_09_28,
  '2026-09-29': mass_2026_09_29,
  '2026-09-30': mass_2026_09_30,
  '2026-10-01': mass_2026_10_01,
}

export const sampleMassDates = Object.keys(sampleMasses)

/**
 * Returns the MassData for the given ISO date. If no sample has been written
 * for that date, the first sample (2026-09-27) is returned as a fallback so
 * the UI always has content to display.
 */
export function getMassData(date: string): MassData {
  const found = sampleMasses[date]
  if (found) return found
  // Fall back to the first sample, but patch the date and dayInfo so the UI
  // reflects the requested date.
  const fallback = mass_2026_09_27
  return {
    ...fallback,
    date,
    dayInfo: getDayInfo(date),
  }
}

/** List of all sample MassData objects, in chronological order. */
export const allSampleMasses: MassData[] = [
  mass_2026_09_27,
  mass_2026_09_28,
  mass_2026_09_29,
  mass_2026_09_30,
  mass_2026_10_01,
]

export type { MassData, Reading }
