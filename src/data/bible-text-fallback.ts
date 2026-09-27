// =============================================================================
// Local Bible text fallback (public domain — Louis Segond 1910, French).
//
// These chapters are embedded so the Bible page always displays real Scripture
// even when the external free Bible APIs (bolls.life, bible-api.com) are
// unreachable from the host. The Louis Segond 1910 translation is in the
// public domain.
//
// Keyed by `${bookId}:${chapter}` where bookId follows the standard Bolls/AEB
// protocanon mapping (1 = Genesis … 66 = Revelation).
// =============================================================================

export interface FallbackVerse {
  verse: number
  text: string
}

export const BIBLE_TEXT_FALLBACK: Record<string, FallbackVerse[]> = {
  // Genèse 1
  "1:1": [
    { verse: 1, text: "Au commencement, Dieu créa les cieux et la terre." },
    { verse: 2, text: "La terre était informe et vide : il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux." },
    { verse: 3, text: "Dieu dit : Que la lumière soit ! Et la lumière fut." },
    { verse: 4, text: "Dieu vit que la lumière était bonne ; et Dieu sépara la lumière d'avec les ténèbres." },
    { verse: 5, text: "Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut soir, et il y eut matin : ce fut le premier jour." },
    { verse: 6, text: "Dieu dit : Qu'il y ait une étendue entre les eaux, et qu'elle sépare les eaux d'avec les eaux." },
    { verse: 7, text: "Et Dieu fit l'étendue, et il sépara les eaux qui sont au-dessous de l'étendue d'avec les eaux qui sont au-dessus de l'étendue. Et cela fut ainsi." },
    { verse: 8, text: "Dieu appela l'étendue ciel. Ainsi, il y eut soir, et il y eut matin : ce fut le second jour." },
    { verse: 9, text: "Dieu dit : Que les eaux qui sont au-dessous du ciel se rassemblent en un seul lieu, et que le sec paraisse. Et cela fut ainsi." },
    { verse: 10, text: "Dieu appela le sec terre, et il appela l'amas des eaux mers. Dieu vit que cela était bon." },
    { verse: 11, text: "Puis Dieu dit : Que la terre produise de la verdure, de l'herbe portant de la semence, des arbres fruitiers donnant du fruit selon leur espèce et ayant en eux leur semence sur la terre. Et cela fut ainsi." },
    { verse: 12, text: "La terre produisit de la verdure, de l'herbe portant de la semence selon son espèce, et des arbres donnant du fruit et ayant en eux leur semence selon leur espèce. Dieu vit que cela était bon." },
    { verse: 13, text: "Ainsi, il y eut soir, et il y eut matin : ce fut le troisième jour." },
    { verse: 14, text: "Dieu dit : Qu'il y ait des luminaires dans l'étendue du ciel, pour séparer le jour d'avec la nuit ; que ce soient des signes pour marquer les époques, les jours et les années ;" },
    { verse: 15, text: "et que ce soient des luminaires dans l'étendue du ciel, pour éclairer la terre. Et cela fut ainsi." },
    { verse: 16, text: "Dieu fit les deux grands luminaires, le plus grand luminaire pour présider au jour, et le plus petit luminaire pour présider à la nuit ; il fit aussi les étoiles." },
    { verse: 17, text: "Dieu les plaça dans l'étendue du ciel, pour éclairer la terre," },
    { verse: 18, text: "pour présider au jour et à la nuit, et pour séparer la lumière d'avec les ténèbres. Dieu vit que cela était bon." },
    { verse: 19, text: "Ainsi, il y eut soir, et il y eut matin : ce fut le quatrième jour." },
    { verse: 20, text: "Dieu dit : Que les eaux produisent en abondance des animaux vivants, et qu'il y ait des oiseaux qui volent sur la terre vers l'étendue du ciel." },
    { verse: 21, text: "Dieu créa les grands animaux des eaux, tout ce qui a souffle de vie et qui se meut, et dont les eaux produisirent en abondance selon leur espèce ; il créa aussi tout oiseau ailé selon son espèce. Dieu vit que cela était bon." },
    { verse: 22, text: "Dieu les bénit, en disant : Soyez féconds, multipliez, et remplissez les eaux des mers ; et que les oiseaux multiplient sur la terre." },
    { verse: 23, text: "Ainsi, il y eut soir, et il y eut matin : ce fut le cinquième jour." },
    { verse: 24, text: "Dieu dit : Que la terre produise des animaux vivants selon leur espèce, du bétail, des reptiles et des animaux terrestres, selon leur espèce. Et cela fut ainsi." },
    { verse: 25, text: "Dieu fit les animaux de la terre selon leur espèce, le bétail selon son espèce, et tous les reptiles de la terre selon leur espèce. Dieu vit que cela était bon." },
    { verse: 26, text: "Puis Dieu dit : Faisons l'homme à notre image, selon notre ressemblance, et qu'il domine sur les poissons de la mer, sur les oiseaux du ciel, sur le bétail, sur toute la terre, et sur tous les reptiles qui rampent sur la terre." },
    { verse: 27, text: "Dieu créa l'homme à son image, il le créa à l'image de Dieu, il créa l'homme et la femme." },
    { verse: 28, text: "Dieu les bénit, et Dieu leur dit : Soyez féconds, multipliez, remplissez la terre, et l'assujettissez ; et dominez sur les poissons de la mer, sur les oiseaux du ciel, et sur tout animal qui se meut sur la terre." },
    { verse: 29, text: "Et Dieu dit : Voici, je vous donne toute herbe portant de la semence et qui est à la surface de toute la terre, et tout arbre ayant en lui du fruit d'arbre et portant de la semence : ce sera votre nourriture." },
    { verse: 30, text: "Et à tout animal de la terre, à tout oiseau du ciel, et à tout ce qui se meut sur la terre, ayant en soi un souffle de vie, je donne toute herbe verte pour nourriture. Et cela fut ainsi." },
    { verse: 31, text: "Dieu vit tout ce qu'il avait fait, et voici, cela était très bon. Ainsi, il y eut soir, et il y eut matin : ce fut le sixième jour." },
  ],

  // Psaume 23
  "19:23": [
    { verse: 1, text: "Cantique de David. L'Éternel est mon berger : je ne manquerai de rien." },
    { verse: 2, text: "Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles." },
    { verse: 3, text: "Il restaure mon âme, il me conduit dans les sentiers de la justice, à cause de son nom." },
    { verse: 4, text: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi : ta houlette et ton bâton me rassurent." },
    { verse: 5, text: "Tu dresses devant moi une table, en face de mes adversaires ; tu oins d'huile ma tête, et ma coupe déborde." },
    { verse: 6, text: "Oui, le bonheur et la miséricorde m'accompagneront tous les jours de ma vie, et j'habiterai dans la maison de l'Éternel jusqu'à la fin de mes jours." },
  ],

  // Psaume 1
  "19:1": [
    { verse: 1, text: "Heureux l'homme qui ne marche pas selon le conseil des méchants, qui ne s'arrête pas sur la voie des pécheurs, et qui ne s'assied pas en compagnie des moqueurs ;" },
    { verse: 2, text: "mais qui trouve son plaisir dans la loi de l'Éternel, et qui la médite jour et nuit !" },
    { verse: 3, text: "Il est comme un arbre planté près d'un courant d'eau, qui donne son fruit en sa saison, et dont le feuillage ne se flétrit point : tout ce qu'il fait prospère." },
    { verse: 4, text: "Il n'en est pas ainsi des méchants : ils sont comme la paille que le vent dissipe." },
    { verse: 5, text: "C'est pourquoi les méchants ne résistent pas quand le jugement vient, ni les pécheurs dans l'assemblée des justes ;" },
    { verse: 6, text: "car l'Éternel connaît la voie des justes, et la voie des pécheurs mène à la perdition." },
  ],

  // Psaume 100
  "19:100": [
    { verse: 1, text: "Psaume de louange. Poussez vers l'Éternel des cris de joie, vous tous, habitants de la terre !" },
    { verse: 2, text: "Servez l'Éternel avec joie, venez avec allégresse en sa présence !" },
    { verse: 3, text: "Sachez que l'Éternel est Dieu ! c'est lui qui nous a faits, et nous lui appartenons : nous sommes son peuple, et le troupeau de son pâturage." },
    { verse: 4, text: "Entrez dans ses portes avec des louanges, dans ses parvis avec des cantiques ! célébrez-le, bénissez son nom !" },
    { verse: 5, text: "Car l'Éternel est bon ; sa bonté dure à toujours, et sa fidélité de génération en génération." },
  ],

  // Jean 1
  "43:1": [
    { verse: 1, text: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu." },
    { verse: 2, text: "Elle était au commencement avec Dieu." },
    { verse: 3, text: "Toutes choses ont été faites par elle, et rien de ce qui a été fait n'a été fait sans elle." },
    { verse: 4, text: "En elle était la vie, et la vie était la lumière des hommes." },
    { verse: 5, text: "La lumière luit dans les ténèbres, et les ténèbres ne l'ont point reçue." },
    { verse: 6, text: "Il y eut un homme envoyé de Dieu : son nom était Jean." },
    { verse: 7, text: "Il vint pour servir de témoin, pour rendre témoignage à la lumière, afin que tous crussent par lui," },
    { verse: 8, text: "il n'était pas la lumière, mais il parut pour rendre témoignage à la lumière." },
    { verse: 9, text: "Cette lumière était la véritable lumière, qui, en venant dans le monde, éclaire tout homme." },
    { verse: 10, text: "Elle était dans le monde, et le monde a été fait par elle, et le monde ne l'a point connue." },
    { verse: 11, text: "Elle est venue chez les siens, et les siens ne l'ont point reçue." },
    { verse: 12, text: "Mais à tous ceux qui l'ont reçue, à ceux qui croient en son nom, elle a donné le pouvoir de devenir enfants de Dieu, lesquels sont nés," },
    { verse: 13, text: "non du sang, ni de la volonté de la chair, ni de la volonté de l'homme, mais de Dieu." },
    { verse: 14, text: "Et la Parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité ; et nous avons contemplé sa gloire, une gloire comme celle du Fils unique venu du Père." },
  ],

  // Jean 3
  "43:3": [
    { verse: 1, text: "Mais il y eut un homme d'entre les pharisiens, nommé Nicodème, un chef des Juifs." },
    { verse: 2, text: "Il vint, de nuit, trouver Jésus, et lui dit : Rabbi, nous savons que tu es un docteur venu de Dieu ; car personne ne peut faire ces miracles que tu fais, si Dieu n'est avec lui." },
    { verse: 3, text: "Jésus lui répondit : En vérité, en vérité, je te le dis, si un homme ne naît de nouveau, il ne peut voir le royaume de Dieu." },
    { verse: 4, text: "Nicodème lui dit : Comment un homme peut-il naître quand il est vieux ? Peut-il rentrer dans le sein de sa mère pour naître ?" },
    { verse: 5, text: "Jésus répondit : En vérité, en vérité, je te le dis, si un homme ne naît d'eau et d'Esprit, il ne peut entrer dans le royaume de Dieu." },
    { verse: 6, text: "Ce qui est né de la chair est chair, et ce qui est né de l'Esprit est esprit." },
    { verse: 7, text: "Ne t'étonne pas que je t'aie dit : Il faut que vous naissiez de nouveau." },
    { verse: 8, text: "Le vent souffle où il veut, et tu en entends le bruit ; mais tu ne sais d'où il vient, ni où il va. Il en est ainsi de tout homme qui est né de l'Esprit." },
    { verse: 9, text: "Nicodème lui dit : Comment cela peut-il se faire ?" },
    { verse: 10, text: "Jésus lui répondit : Tu es le docteur d'Israël, et tu ne sais pas ces choses !" },
    { verse: 11, text: "En vérité, en vérité, je te le dis, nous disons ce que nous savons, et nous rendons témoignage de ce que nous avons vu ; et vous ne recevez pas notre témoignage." },
    { verse: 12, text: "Si vous ne croyez pas quand je vous ai parlé des choses terrestres, comment croirez-vous quand je vous parlerai des choses célestes ?" },
    { verse: 13, text: "Personne n'est monté au ciel, sinon celui qui est descendu du ciel, le Fils de l'homme qui est dans le ciel." },
    { verse: 14, text: "Et comme Moïse éleva le serpent dans le désert, il faut de même que le Fils de l'homme soit élevé," },
    { verse: 15, text: "afin que quiconque croit en lui ait la vie éternelle." },
    { verse: 16, text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
    { verse: 17, text: "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour qu'il juge le monde, mais pour que le monde soit sauvé par lui." },
    { verse: 18, text: "Celui qui croit en lui n'est point jugé ; mais celui qui ne croit pas est déjà jugé, parce qu'il n'a pas cru au nom du Fils unique de Dieu." },
    { verse: 19, text: "Et ce jugement c'est que, la lumière étant venue dans le monde, les hommes ont préféré les ténèbres à la lumière, parce que leurs œuvres étaient mauvaises." },
    { verse: 20, text: "Car quiconque fait le mal hait la lumière, et ne vient point à la lumière, de peur que ses œuvres ne soient dévoilées ;" },
    { verse: 21, text: "mais celui qui agit selon la vérité vient à la lumière, afin que ses œuvres soient manifestées, parce qu'elles sont faites en Dieu." },
  ],

  // Matthieu 5 (Béatitudes)
  "40:5": [
    { verse: 1, text: "Voyant la foule, Jésus monta sur la montagne ; et, après qu'il se fut assis, ses disciples s'approchèrent de lui." },
    { verse: 2, text: "Puis, ayant ouvert la bouche, il les enseigna, et dit :" },
    { verse: 3, text: "Heureux les pauvres en esprit, car le royaume des cieux est à eux !" },
    { verse: 4, text: "Heureux les affligés, car ils seront consolés !" },
    { verse: 5, text: "Heureux les débonnaires, car ils hériteront la terre !" },
    { verse: 6, text: "Heureux ceux qui ont faim et soif de la justice, car ils seront rassasiés !" },
    { verse: 7, text: "Heureux les miséricordieux, car ils obtiendront miséricorde !" },
    { verse: 8, text: "Heureux ceux qui ont le cœur pur, car ils verront Dieu !" },
    { verse: 9, text: "Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu !" },
    { verse: 10, text: "Heureux ceux qui sont persécutés pour la justice, car le royaume des cieux est à eux !" },
    { verse: 11, text: "Heureux serez-vous, lorsqu'on vous outragera, qu'on vous persécutera et qu'on dira faussement de vous toute sorte de mal, à cause de moi." },
    { verse: 12, text: "Réjouissez-vous et soyez dans l'allégresse, parce que votre récompense sera grande dans les cieux ; car c'est ainsi qu'on a persécuté les prophètes qui ont vécu avant vous." },
  ],

  // 1 Corinthiens 13
  "46:13": [
    { verse: 1, text: "Quand je parlerais les langues des hommes et des anges, si je n'ai pas la charité, je suis un airain qui résonne, ou une cymbale qui retentit." },
    { verse: 2, text: "Et quand j'aurais le don de prophétie, la science de tous les mystères et toute la connaissance, quand j'aurais même toute la foi jusqu'à transporter les montagnes, si je n'ai pas la charité, je ne suis rien." },
    { verse: 3, text: "Et quand je distribuerais tous mes biens pour la nourriture des pauvres, quand je livrerais même mon corps pour être brûlé, si je n'ai pas la charité, cela ne me sert de rien." },
    { verse: 4, text: "La charité est patiente, elle est pleine de bonté ; la charité n'est point envieuse ; la charité ne se vante point, elle ne s'enfle point d'orgueil," },
    { verse: 5, text: "elle ne fait rien de malhonnête, elle ne cherche point son intérêt, elle ne s'irrite point, elle ne soupçonne point le mal," },
    { verse: 6, text: "elle ne se réjouit point de l'injustice, mais elle se réjouit de la vérité ;" },
    { verse: 7, text: "elle excuse tout, elle croit tout, elle espère tout, elle supporte tout." },
    { verse: 8, text: "La charité ne périt jamais. Les prophéties prendront fin, les langues cesseront, la connaissance disparaîtra." },
    { verse: 9, text: "Car nous connaissons en partie, et nous prophétisons en partie," },
    { verse: 10, text: "mais quand ce qui est parfait sera venu, ce qui est en partie disparaîtra." },
    { verse: 11, text: "Quand j'étais enfant, je parlais comme un enfant, je pensais comme un enfant, je raisonnais comme un enfant ; lorsque je suis devenu homme, j'ai fait disparaître ce qui était de l'enfant." },
    { verse: 12, text: "Aujourd'hui nous voyons au moyen d'un miroir, d'une manière obscure, mais alors nous verrons face à face ; aujourd'hui je connais en partie, mais alors je connaîtrai comme j'ai été connu." },
    { verse: 13, text: "Maintenant donc ces trois choses demeurent : la foi, l'espérance, la charité ; mais la plus grande de ces choses, c'est la charité." },
  ],

  // Romains 8
  "45:8": [
    { verse: 1, text: "Il n'y a donc maintenant aucune condamnation pour ceux qui sont en Jésus-Christ." },
    { verse: 2, text: "En effet, la loi de l'esprit de vie en Jésus-Christ m'a affranchi de la loi du péché et de la mort." },
    { verse: 3, text: "Car la chose impossible à la loi, parce que la chair la rendait sans force, Dieu l'a faite : il a condamné le péché dans la chair, en envoyant, à cause du péché, son propre Fils dans une chair semblable à celle du péché," },
    { verse: 28, text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein." },
    { verse: 31, text: "Que dirons-nous donc à ces choses ? Si Dieu est pour nous, qui sera contre nous ?" },
    { verse: 37, text: "Mais dans toutes ces choses nous sommes plus que vainqueurs par celui qui nous a aimés." },
    { verse: 38, text: "Car j'ai l'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir, ni les puissances," },
    { verse: 39, text: "ni la hauteur, ni la profondeur, ni aucune autre créature, ne pourra nous séparer de l'amour de Dieu manifesté en Jésus-Christ notre Seigneur." },
  ],

  // Romains 12
  "45:12": [
    { verse: 1, text: "Je vous exhorte donc, frères, par les compassions de Dieu, à offrir vos corps comme un sacrifice vivant, saint, agréable à Dieu, ce qui sera de votre part un culte raisonnable." },
    { verse: 2, text: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait." },
  ],

  // Ésaïe 53
  "23:53": [
    { verse: 1, text: "Qui a cru à ce qui nous était annoncé ? À qui le bras de l'Éternel a-t-il été révélé ?" },
    { verse: 2, text: "Il s'est élevé devant lui comme une faible plante, comme un rejeton qui sort d'une terre desséchée ; il n'avait ni beauté ni éclat pour attirer nos regards, et son aspect n'avait rien pour nous plaire." },
    { verse: 3, text: "Méprisé et abandonné des hommes, homme de douleur et connaissant la souffrance, il était comme un objet devant lequel on cache le visage ; il a été méprisé, nous ne l'avons pas estimé." },
    { verse: 4, text: "Cependant, ce sont nos souffrances qu'il a portées, c'est de nos douleurs qu'il s'est chargé ; et nous, nous l'avons considéré comme puni, frappé de Dieu et humilié." },
    { verse: 5, text: "Mais il était blessé pour nos péchés, brisé pour nos iniquités ; le châtiment qui nous donne la paix est tombé sur lui, et c'est par ses meurtrissures que nous sommes guéris." },
    { verse: 6, text: "Nous étions tous errants comme des brebis, chacun suivait sa propre voie ; et l'Éternel a fait retomber sur lui l'iniquité de nous tous." },
    { verse: 7, text: "Il a été maltraité et opprimé, et il n'a point ouvert la bouche, comme un agneau qu'on mène à l'abattoir, comme une brebis muette devant ceux qui la tondent ; il n'a point ouvert la bouche." },
  ],

  // Psaume 51
  "19:51": [
    { verse: 1, text: "Au chef des chantres. Psaume de David, lorsque Nathan, le prophète, vint à lui après que David fut allé vers Bath-Schéba." },
    { verse: 3, text: "Lave-moi complètement de mon iniquité, et purifie-moi de mon péché." },
    { verse: 4, text: "Car je reconnais mes transgressions, et mon péché est constamment devant moi." },
    { verse: 10, text: "Ô Dieu ! crée en moi un cœur pur, renouvelle en moi un esprit bien disposé." },
    { verse: 11, text: "Ne me rejette pas loin de ta face, ne me retire pas ton esprit saint." },
    { verse: 12, text: "Rends-moi la joie de ton salut, et qu'un esprit de bonne volonté me soutienne !" },
  ],

  // Apocalypse 21
  "66:21": [
    { verse: 1, text: "Puis je vis un nouveau ciel et une nouvelle terre ; car le premier ciel et la première terre avaient disparu, et la mer n'était plus." },
    { verse: 2, text: "Et je vis descendre du ciel, d'auprès de Dieu, la ville sainte, la nouvelle Jérusalem, préparée comme une épouse qui s'est parée pour son époux." },
    { verse: 3, text: "Et j'entendis du trône une forte voix qui disait : Voici le tabernacle de Dieu avec les hommes ! Il habitera avec eux, et ils seront son peuple, et Dieu lui-même sera avec eux." },
    { verse: 4, text: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu." },
    { verse: 5, text: "Et celui qui était assis sur le trône dit : Voici, je fais toutes choses nouvelles. Et il dit : Écris ; car ces paroles sont certaines et véritables." },
    { verse: 6, text: "Et il me dit : C'est fait ! Je suis l'alpha et l'oméga, le commencement et la fin. Je donnerai de la source de l'eau de la vie gratuitement à celui qui a soif." },
    { verse: 7, text: "Celui qui vaincra héritera ces choses ; je serai son Dieu, et il sera mon fils." },
  ],
}

/** Get a local fallback chapter by canonical book id + chapter, or null. */
export function getLocalChapter(bookId: number, chapter: number): FallbackVerse[] | null {
  return BIBLE_TEXT_FALLBACK[`${bookId}:${chapter}`] ?? null
}
