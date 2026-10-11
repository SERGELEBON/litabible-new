import { bibleBooks, bookNames } from './bible-books'

// =============================================================================
// LitaBible — Daily Bible reading plan.
//
// A curated, deterministic list of ~150 readings walking through the whole
// Bible (Genesis → Revelation) with Psalms and Proverbs sprinkled in. Each
// reading is 1-3 chapters and ships with a short localized title (EN/FR/ES).
//
// `getReadingForDate(dateISO)` maps any given ISO date to a reading by
// cycling deterministically through the plan — so the same calendar date
// always yields the same reading on every client.
//
// `bookId` is the standard Bolls/AEB mapping (1 = Genesis … 66 = Revelation),
// which is what the bolls.life / api.bible resolver expects. `bookName` is
// looked up from `@/data/bible-books` so the localizations stay in sync with
// the rest of the app.
// =============================================================================

export interface ReadingPlanItem {
  /** 0..N-1, used to map a date to a reading deterministically. */
  dayIndex: number
  /** 1..66 (protocanon), for the bolls/api.bible resolver. */
  bookId: number
  /** Localized book name, e.g. { en: 'Genesis', fr: 'Genèse', es: 'Génesis' }. */
  bookName: { en: string; fr: string; es: string }
  /** First chapter to read (inclusive). */
  chapterFrom: number
  /** Last chapter to read (inclusive); equals chapterFrom for single chapter. */
  chapterTo: number
  /** Short localized title, e.g. { en: 'The Creation', fr: 'La Création', es: 'La Creación' }. */
  title: { en: string; fr: string; es: string }
}

// Reverse lookup: bolls book id (1..66) → localized name.
const bookNameByBollsId: Record<number, { en: string; fr: string; es: string }> = {}
for (const b of bibleBooks) {
  if (b.bollsBookId != null) {
    bookNameByBollsId[b.bollsBookId] = bookNames[b.id]
  }
}

// Compact raw tuple: [bollsBookId, chapterFrom, chapterTo, titleEn, titleFr, titleEs].
type Raw = [number, number, number, string, string, string]

const RAW_READINGS: Raw[] = [
  // --- Pentateuch (Genesis – Deuteronomy) ---
  [1, 1, 2, 'The Creation', 'La Création', 'La Creación'],
  [1, 3, 3, 'The Fall', 'La Chute', 'La Caída'],
  [1, 6, 9, 'The Flood', 'Le Déluge', 'El Diluvio'],
  [1, 12, 12, 'The Call of Abraham', "L'Appel d'Abraham", 'El Llamado de Abraham'],
  [1, 15, 15, 'The Covenant Confirmed', "L'Alliance confirmée", 'La Alianza confirmada'],
  [1, 22, 22, 'The Binding of Isaac', 'Le Sacrifice d’Isaac', 'El Sacrificio de Isaac'],
  [1, 28, 28, "Jacob's Ladder", "L'Échelle de Jacob", 'La Escalera de Jacob'],
  [1, 37, 37, "Joseph's Dreams", 'Les Songes de Joseph', 'Los Sueños de José'],
  [1, 45, 45, 'Joseph Reveals Himself', 'Joseph se fait reconnaître', 'José se da a conocer'],
  [2, 3, 3, 'The Burning Bush', 'Le Buisson ardent', 'La Zarza ardiente'],
  [2, 12, 12, 'The Passover', 'La Pâque', 'La Pascua'],
  [2, 14, 14, 'Crossing the Sea', 'La Traversée de la mer', 'El Cruce del mar'],
  [2, 16, 16, 'Manna in the Desert', 'La Manne au désert', 'El Maná en el desierto'],
  [2, 20, 20, 'The Ten Words', 'Les Dix Paroles', 'Las Diez Palabras'],
  [2, 32, 32, 'The Golden Calf', 'Le Veau d’or', 'El Becerro de oro'],
  [2, 34, 34, "Moses' Face", 'Le Visage de Moïse', 'El Rostro de Moisés'],
  [3, 19, 19, 'Be Holy', 'Soyez saints', 'Sed santos'],
  [4, 6, 6, 'The Priestly Blessing', 'La Bénédiction sacerdotale', 'La Bendición sacerdotal'],
  [4, 13, 14, 'The Spies', 'Les Explorateurs', 'Los Exploradores'],
  [5, 5, 5, 'The Ten Words Again', 'Les Dix Paroles redites', 'Las Diez Palabras reiteradas'],
  [5, 6, 6, 'The Shema', 'Le Shema', 'El Shemá'],
  [5, 8, 8, 'Remember the Desert', 'Souviens-toi du désert', 'Recuerda el desierto'],
  [5, 34, 34, "Moses' Death", 'La Mort de Moïse', 'La Muerte de Moisés'],

  // --- Historical books (Joshua – Esther) ---
  [6, 1, 1, 'Be Strong and Courageous', 'Sois fort et courageux', 'Sé fuerte y valiente'],
  [6, 3, 3, 'Crossing the Jordan', 'Le Passage du Jourdain', 'El Cruce del Jordán'],
  [6, 6, 6, 'The Fall of Jericho', 'La Chute de Jéricho', 'La Caída de Jericó'],
  [6, 24, 24, 'The Covenant Renewed', "L'Alliance renouvelée", 'La Alianza renovada'],
  [7, 6, 7, "Gideon's Three Hundred", 'Les Trois Cents de Gédéon', 'Los Trescientos de Gedeón'],
  [7, 13, 16, 'Samson', 'Samson', 'Sansón'],
  [8, 1, 4, 'Ruth the Moabite', 'Ruth la Moabite', 'Rut la moabita'],
  [9, 1, 1, "Hannah's Prayer", 'La Prière d’Anne', 'La Oración de Ana'],
  [9, 3, 3, 'The Call of Samuel', "L'Appel de Samuel", 'El Llamado de Samuel'],
  [9, 8, 8, 'Give Us a King', 'Donnez-nous un roi', 'Danos un rey'],
  [9, 16, 16, 'David Anointed', 'David oint', 'David ungido'],
  [9, 17, 17, 'David and Goliath', 'David et Goliath', 'David y Goliat'],
  [9, 24, 24, 'Sparing Saul', 'Épargner Saül', 'Perdonar a Saúl'],
  [10, 7, 7, 'The Davidic Covenant', "L'Alliance davidique", 'La Alianza davídica'],
  [10, 11, 12, 'David and Bathsheba', 'David et Bethsabée', 'David y Betsabé'],
  [10, 22, 22, "David's Song", 'Le Cantique de David', 'El Cántico de David'],
  [11, 3, 3, "Solomon's Wisdom", 'La Sagesse de Salomon', 'La Sabiduría de Salomón'],
  [11, 8, 8, 'The Temple Dedicated', 'La Dédicace du Temple', 'La Dedicación del Templo'],
  [11, 17, 17, 'Elijah and the Ravens', 'Élie et les corbeaux', 'Elías y los cuervos'],
  [11, 18, 18, 'Elijah on Mount Carmel', 'Élie au mont Carmel', 'Elías en el monte Carmelo'],
  [11, 19, 19, 'The Still Small Voice', 'Le Murmure léger', 'La Voz apacible'],
  [12, 5, 5, 'Naaman Healed', 'Naaman guéri', 'Naamán sanado'],
  [12, 17, 17, 'The Exile of Israel', "L'Exil d'Israël", 'El Exilio de Israel'],
  [12, 22, 22, 'The Book Found', 'Le Livre retrouvé', 'El Libro hallado'],
  [12, 25, 25, 'Jerusalem Falls', 'La Chute de Jérusalem', 'La Caída de Jerusalén'],
  [14, 7, 7, 'The Temple Filled', 'Le Temple rempli', 'El Templo lleno'],
  [14, 34, 34, "Josiah's Reform", 'La Réforme de Josias', 'La Reforma de Josías'],
  [15, 1, 1, "Cyrus' Decree", "L'Édit de Cyrus", 'El Edicto de Ciro'],
  [16, 1, 2, 'Rebuilding the Walls', 'Rebâtir les murs', 'Reedificar los muros'],
  [16, 8, 8, 'Reading the Law', 'La Lecture de la Loi', 'La Lectura de la Ley'],
  [17, 4, 4, 'For Such a Time as This', 'Pour un temps comme celui-ci', 'Para un tiempo como este'],
  [17, 8, 9, 'Deliverance', 'La Délivrance', 'La Liberación'],

  // --- Wisdom & Psalms ---
  [18, 1, 2, 'Job Tested', 'Job éprouvé', 'Job probado'],
  [18, 19, 19, 'My Redeemer Lives', 'Mon Rédempteur vit', 'Mi Redentor vive'],
  [18, 38, 38, 'The Lord Answers', 'Le Seigneur répond', 'El Señor responde'],
  [18, 42, 42, 'Restoration', 'Restauration', 'Restauración'],
  [19, 1, 1, 'Two Ways', 'Les Deux Voies', 'Los Dos Caminos'],
  [19, 8, 8, 'Crowned with Glory', 'Couronné de gloire', 'Coronado de gloria'],
  [19, 19, 19, 'Heavens and Law', 'Cieux et Loi', 'Cielos y Ley'],
  [19, 23, 23, 'The Lord My Shepherd', 'Le Seigneur mon berger', 'El Señor es mi pastor'],
  [19, 27, 27, 'The Lord My Light', 'Le Seigneur ma lumière', 'El Señor es mi luz'],
  [19, 32, 32, 'Forgiven', 'Pardonné', 'Perdonado'],
  [19, 42, 43, 'As the Deer', 'Comme le cerf', 'Como el ciervo'],
  [19, 46, 46, 'A Very Present Help', 'Un secours très certain', 'Refugio muy presente'],
  [19, 51, 51, 'Create in Me', 'Crée en moi', 'Crea en mí'],
  [19, 63, 63, 'My Soul Thirsts', 'Mon âme a soif', 'Mi alma tiene sed'],
  [19, 84, 84, 'Better One Day', 'Mieux vaut un jour', 'Vale más un día'],
  [19, 90, 90, 'A Thousand Years', 'Mille ans', 'Mil años'],
  [19, 100, 100, 'Enter His Gates', 'Entrez par ses portes', 'Entrad por sus puertas'],
  [19, 103, 103, 'Bless the Lord', 'Bénis le Seigneur', 'Bendice al Señor'],
  [19, 110, 110, 'You Are a Priest', 'Tu es prêtre', 'Tú eres sacerdote'],
  [19, 119, 119, 'Your Word', 'Ta parole', 'Tu palabra'],
  [19, 121, 121, 'I Lift Up My Eyes', 'Je lève les yeux', 'Levanto mis ojos'],
  [19, 127, 127, 'Unless the Lord', 'Si le Seigneur ne bâtit', 'Si el Señor no edifica'],
  [19, 130, 130, 'Out of the Depths', 'Des profondeurs', 'Desde lo profundo'],
  [19, 139, 139, 'You Have Searched Me', 'Tu m’as sondé', 'Tú me has examinado'],
  [19, 150, 150, 'Let Everything Praise', 'Que tout loue', 'Que todo alabe'],
  [20, 1, 2, 'The Fear of the Lord', 'La Crainte du Seigneur', 'El Temor del Señor'],
  [20, 3, 3, 'Trust in the Lord', 'Confie-toi au Seigneur', 'Confía en el Señor'],
  [20, 8, 8, "Wisdom's Call", "L'Appel de la Sagesse", 'El Llamado de la Sabiduría'],
  [20, 31, 31, 'The Excellent Wife', 'La Femme vaillante', 'La Mujer virtuosa'],
  [21, 1, 1, 'Vanity of Vanities', 'Vanité des vanités', 'Vanidad de vanidades'],
  [21, 3, 3, 'A Time for Everything', 'Un temps pour tout', 'Un tiempo para todo'],
  [21, 12, 12, 'The Whole Duty', 'Tout le devoir', 'Todo el deber'],
  [22, 1, 2, 'The Kiss of His Mouth', 'Le Baiser de sa bouche', 'El Beso de su boca'],
  [22, 8, 8, 'Love Strong as Death', 'L’Amour fort comme la mort', 'El Amor fuerte como la muerte'],

  // --- Prophets ---
  [23, 1, 1, 'Hear, O Heavens', 'Écoutez, cieux', 'Oíd, cielos'],
  [23, 6, 6, 'Here Am I, Send Me', 'Me voici, envoie-moi', 'Heme aquí, envíame'],
  [23, 7, 7, 'Immanuel', 'Emmanuel', 'Emanuel'],
  [23, 9, 9, 'A Child Is Born', 'Un enfant nous est né', 'Un niño nos es nacido'],
  [23, 11, 11, 'A Shoot from Jesse', 'Un rejeton d’Isaï', 'Un vástago de Isaí'],
  [23, 25, 25, 'He Will Swallow Up Death', 'Il engloutira la mort', 'Deglutirá la muerte'],
  [23, 40, 40, 'Comfort, Comfort', 'Consolez, consolez', 'Consolaos, consolaos'],
  [23, 42, 42, 'My Servant', 'Mon Serviteur', 'Mi Siervo'],
  [23, 52, 53, 'The Suffering Servant', 'Le Serviteur souffrant', 'El Siervo sufriente'],
  [23, 55, 55, 'Come, Everyone', 'Venez tous', 'Venid todos'],
  [23, 58, 58, 'The True Fast', 'Le Jeûne véritable', 'El Ayuno verdadero'],
  [23, 61, 61, 'Good News to the Poor', 'La Bonne Nouvelle aux pauvres', 'La Buena Nueva a los pobres'],
  [24, 1, 1, 'I Have Appointed You', 'Je t’ai établi', 'Te he constituído'],
  [24, 7, 7, 'Trust Not in Lying Words', 'Ne vous fiez pas aux paroles trompeuses', 'No os fiéis de palabras mentirosas'],
  [24, 29, 29, 'Seek the Welfare of the City', 'Cherchez le bien de la ville', 'Buscad el bien de la ciudad'],
  [24, 31, 31, 'A New Covenant', 'Une Alliance nouvelle', 'Una Alianza nueva'],
  [25, 3, 3, 'The Steadfast Love', "L'Amour fidèle", 'La Misericordia'],
  [26, 1, 1, 'The Chariot Vision', 'La Vision du char', 'La Visión del carro'],
  [26, 18, 18, 'The Soul Who Sins', "L'Âme qui pèche", 'El Alma que peca'],
  [26, 34, 34, 'The Shepherds', 'Les Bergers', 'Los Pastores'],
  [26, 36, 36, 'A New Heart', 'Un cœur nouveau', 'Un corazón nuevo'],
  [26, 37, 37, 'The Dry Bones', 'Les Ossements secs', 'Los Huesos secos'],
  [27, 2, 2, 'The Great Statue', 'La Grande Statue', 'La Gran estatua'],
  [27, 3, 3, 'The Fiery Furnace', 'La Fournaise ardente', 'El Horno ardiente'],
  [27, 6, 6, "The Lions' Den", 'La Fosse aux lions', 'El Foso de los leones'],
  [27, 7, 7, 'The Son of Man', 'Le Fils de l’homme', 'El Hijo del hombre'],
  [28, 1, 1, 'Gomer', 'Gomer', 'Gomer'],
  [28, 11, 11, 'Out of Egypt', "Hors d'Égypte", 'De Egipto'],
  [29, 2, 2, 'I Will Pour Out My Spirit', 'Je répandrai mon Esprit', 'Derramaré mi Espíritu'],
  [30, 5, 5, 'Seek Me and Live', 'Cherchez-moi et vivez', 'Buscadme y vivid'],
  [32, 1, 4, 'Jonah and the Fish', 'Jonas et le grand poisson', 'Jonás y el gran pez'],
  [33, 6, 6, 'What Does the Lord Require', 'Ce que le Seigneur demande', 'Lo que el Señor pide'],
  [35, 2, 2, 'The Just Shall Live', 'Le Juste vivra', 'El Justo vivirá'],
  [38, 9, 9, 'Your King Comes', 'Ton roi vient', 'Tu rey viene'],
  [39, 3, 3, 'The Messenger', 'Le Messager', 'El Mensajero'],

  // --- Gospels & Acts ---
  [40, 1, 2, 'The Birth of Jesus', 'La Naissance de Jésus', 'El Nacimiento de Jesús'],
  [40, 3, 3, 'The Baptist', 'Le Baptiste', 'El Bautista'],
  [40, 4, 4, 'Temptation in the Desert', 'La Tentation au désert', 'La Tentación en el desierto'],
  [40, 5, 7, 'The Sermon on the Mount', 'Le Sermon sur la montagne', 'El Sermón del Monte'],
  [40, 13, 13, 'Parables of the Kingdom', 'Les Paraboles du Royaume', 'Las Parábolas del Reino'],
  [40, 14, 14, 'Feeding the Five Thousand', 'La Multiplication des pains', 'La Multiplicación de los panes'],
  [40, 16, 16, "Peter's Confession", 'La Confession de Pierre', 'La Confesión de Pedro'],
  [40, 17, 17, 'The Transfiguration', 'La Transfiguration', 'La Transfiguración'],
  [40, 21, 21, 'Entry into Jerusalem', "L'Entrée à Jérusalem", 'La Entrada en Jerusalén'],
  [40, 24, 25, 'The End of the Age', 'La Fin des temps', 'El Fin de los tiempos'],
  [40, 26, 26, 'The Last Supper', 'La Cène', 'La Última Cena'],
  [40, 27, 27, 'The Crucifixion', 'La Crucifixion', 'La Crucifixión'],
  [40, 28, 28, 'The Resurrection', 'La Résurrection', 'La Resurrección'],
  [41, 1, 1, 'The Beginning of the Gospel', 'Le Commencement de l’Évangile', 'El Principio del Evangelio'],
  [41, 4, 4, 'Parables by the Sea', 'Paraboles au bord de la mer', 'Parábolas junto al mar'],
  [41, 8, 8, 'Who Do You Say I Am', 'Pour qui me prenez-vous', '¿Quién decís que soy?'],
  [41, 14, 16, 'Passion and Resurrection', 'Passion et Résurrection', 'Pasión y Resurrección'],
  [42, 1, 2, 'The Births Announced', 'Les Naissances annoncées', 'Los Nacimientos anunciados'],
  [42, 4, 4, 'Rejection at Nazareth', 'Refus à Nazareth', 'Rechazo en Nazaret'],
  [42, 6, 6, 'Blessings and Woes', 'Béatitudes et malheurs', 'Bienaventuranzas y ayes'],
  [42, 10, 10, 'The Good Samaritan', 'Le Bon Samaritain', 'El Buen Samaritano'],
  [42, 11, 11, 'Teach Us to Pray', 'Apprends-nous à prier', 'Enséñanos a orar'],
  [42, 12, 12, 'Do Not Be Anxious', 'Ne vous inquiétez pas', 'No os angustiéis'],
  [42, 15, 15, 'Lost and Found', 'Perdu et retrouvé', 'Perdido y hallado'],
  [42, 19, 19, 'Zacchaeus', 'Zachée', 'Zaqueo'],
  [42, 24, 24, 'The Road to Emmaus', "Le Chemin d'Emmaüs", 'El Camino a Emaús'],
  [43, 1, 1, 'The Word', 'Le Verbe', 'El Verbo'],
  [43, 2, 2, 'Cana and the Temple', 'Cana et le Temple', 'Caná y el Templo'],
  [43, 3, 3, 'Born Again', 'Naître de nouveau', 'Nacer de nuevo'],
  [43, 4, 4, 'The Samaritan Woman', 'La Samaritaine', 'La Samaritana'],
  [43, 5, 5, 'Healing at Bethesda', 'Guérison à Bethesda', 'Sanidad en Betesda'],
  [43, 6, 6, 'The Bread of Life', 'Le Pain de vie', 'El Pan de vida'],
  [43, 8, 8, 'Light of the World', 'Lumière du monde', 'Luz del mundo'],
  [43, 9, 9, 'Born Blind', 'Né aveugle', 'Ciego de nacimiento'],
  [43, 10, 10, 'The Good Shepherd', 'Le Bon Pasteur', 'El Buen Pastor'],
  [43, 11, 11, 'Lazarus Raised', 'Lazare ressuscité', 'Lázaro resucitado'],
  [43, 13, 13, 'Washing Feet', 'Le Lavement des pieds', 'El Lavatorio de los pies'],
  [43, 14, 16, 'The Farewell Discourse', 'Le Discours d’adieu', 'El Discurso de despedida'],
  [43, 17, 17, 'The High Priestly Prayer', 'La Prière sacerdotale', 'La Oración sacerdotal'],
  [43, 19, 19, 'It Is Finished', 'Tout est accompli', 'Todo está cumplido'],
  [43, 20, 20, 'Mary at the Tomb', 'Marie au tombeau', 'María en el sepulcro'],
  [43, 21, 21, 'Peter Restored', 'Pierre restauré', 'Pedro restaurado'],
  [44, 1, 1, 'You Shall Be Witnesses', 'Vous serez mes témoins', 'Seréis mis testigos'],
  [44, 2, 2, 'Pentecost', 'La Pentecôte', 'Pentecostés'],
  [44, 3, 4, 'In the Name of Jesus', 'Au nom de Jésus', 'En el nombre de Jesús'],
  [44, 7, 7, "Stephen's Witness", 'Le Témoignage d’Étienne', 'El Testimonio de Esteban'],
  [44, 8, 8, 'To Samaria', "Jusqu'en Samarie", 'Hasta Samaria'],
  [44, 9, 9, 'The Conversion of Saul', 'La Conversion de Saul', 'La Conversión de Saulo'],
  [44, 10, 10, 'Peter and Cornelius', 'Pierre et Corneille', 'Pedro y Cornelio'],
  [44, 13, 13, 'Sent Out', 'Envoyés', 'Enviados'],
  [44, 15, 15, 'The Council', 'Le Concile', 'El Concilio'],
  [44, 16, 16, 'The Philippian Jailer', 'Le Geôlier de Philippes', 'El Carcelero de Filipos'],
  [44, 17, 17, 'Paul at Athens', 'Paul à Athènes', 'Pablo en Atenas'],
  [44, 27, 28, 'To Rome', 'Vers Rome', 'Hacia Roma'],

  // --- Epistles & Revelation ---
  [45, 1, 1, 'The Power of the Gospel', "La Puissance de l'Évangile", 'El Poder del Evangelio'],
  [45, 3, 3, 'Justified by Faith', 'Justifiés par la foi', 'Justificados por la fe'],
  [45, 5, 5, 'Peace with God', 'La Paix avec Dieu', 'La Paz con Dios'],
  [45, 6, 6, 'Dead to Sin', 'Morts au péché', 'Muertos al pecado'],
  [45, 8, 8, 'More Than Conquerors', 'Plus que vainqueurs', 'Más que vencedores'],
  [45, 12, 12, 'A Living Sacrifice', 'Le Sacrifice vivant', 'El Sacrificio vivo'],
  [46, 13, 13, 'The Way of Love', 'La Voie de l’amour', 'La Vía del amor'],
  [46, 15, 15, 'Christ Raised', 'Le Christ ressuscité', 'Cristo resucitado'],
  [47, 5, 5, 'A New Creation', 'Une Création nouvelle', 'Una Nueva creación'],
  [48, 5, 5, 'Walk by the Spirit', "Marcher par l'Esprit", 'Andar por el Espíritu'],
  [49, 1, 2, 'By Grace Through Faith', 'Par la grâce, par la foi', 'Por gracia, por la fe'],
  [49, 6, 6, 'The Whole Armor', "Toute l'armure", 'Toda la armadura'],
  [50, 2, 2, 'The Mind of Christ', 'Les Sentiments du Christ', 'Los Sentimientos de Cristo'],
  [50, 4, 4, 'Rejoice Always', 'Soyez toujours joyeux', 'Alegraos siempre'],
  [51, 1, 1, 'The Image of God', "L'Image du Dieu invisible", 'La Imagen del Dios invisible'],
  [51, 3, 3, 'Set Your Minds Above', 'Affection aux choses d’en haut', 'Pensad en lo de arriba'],
  [52, 4, 4, 'The Coming of the Lord', "L'Avènement du Seigneur", 'La Venida del Señor'],
  [54, 6, 6, 'The Good Confession', 'La Bonne Confession', 'La Buena Confesión'],
  [55, 2, 2, 'A Worker Approved', 'Un ouvrier approuvé', 'Un obrero aprobado'],
  [55, 4, 4, 'I Have Fought', 'J’ai combattu', 'He combatido'],
  [56, 2, 2, 'The Grace Appeared', 'La Grâce apparue', 'La Gracia manifestada'],
  [58, 4, 4, 'The Rest of God', 'Le Repos de Dieu', 'El Reposo de Dios'],
  [58, 11, 11, 'By Faith', 'Par la foi', 'Por la fe'],
  [59, 1, 1, 'Count It All Joy', 'Comptez-le pour une joie', 'Tenedlo por gozo'],
  [59, 2, 2, 'Faith Without Works', 'La Foi sans les œuvres', 'La Fe sin obras'],
  [59, 3, 3, 'Taming the Tongue', 'Dompter la langue', 'Domar la lengua'],
  [60, 1, 1, 'Born Again', 'Régénérés', 'Renacidos'],
  [60, 2, 2, 'A Chosen People', 'Une Nation élue', 'Una Nación elegida'],
  [61, 3, 3, 'The Day of the Lord', 'Le Jour du Seigneur', 'El Día del Señor'],
  [62, 1, 1, 'Walk in the Light', 'Marcher dans la lumière', 'Andar en la luz'],
  [62, 4, 4, 'God Is Love', 'Dieu est amour', 'Dios es amor'],
  [65, 1, 1, 'Contend for the Faith', 'Combats pour la foi', 'Contiende por la fe'],
  [66, 1, 1, 'The Vision of the Son of Man', 'La Vision du Fils de l’homme', 'La Visión del Hijo del hombre'],
  [66, 2, 3, 'Letters to the Churches', 'Lettres aux Églises', 'Cartas a las Iglesias'],
  [66, 5, 5, 'The Lamb Who Was Slain', 'L’Agneau immolé', 'El Cordero inmolado'],
  [66, 7, 7, 'A Great Multitude', 'Une Grande Foule', 'Una Gran Multitud'],
  [66, 12, 12, 'The Woman and the Dragon', 'La Femme et le Dragon', 'La Mujer y el Dragón'],
  [66, 21, 21, 'The New Heaven and Earth', 'Le Nouveau Ciel et la Nouvelle Terre', 'El Nuevo Cielo y la Nueva Tierra'],
  [66, 22, 22, 'The River of Life', 'Le Fleuve de vie', 'El Río de vida'],
]

export const readingPlan: ReadingPlanItem[] = RAW_READINGS.map(
  ([bookId, chapterFrom, chapterTo, en, fr, es], i) => ({
    dayIndex: i,
    bookId,
    bookName: bookNameByBollsId[bookId] ?? { en: '', fr: '', es: '' },
    chapterFrom,
    chapterTo,
    title: { en, fr, es },
  }),
)

const MS_PER_DAY = 24 * 60 * 60 * 1000
const PLAN_LENGTH = readingPlan.length

/**
 * Returns the deterministic reading for a given ISO date (cycles through the
 * plan). Same date → same reading, on every client. Day 0 of the cycle is the
 * Unix epoch (1970-01-01) so the mapping is independent of the user's clock.
 */
export function getReadingForDate(dateISO: string): ReadingPlanItem {
  const d = new Date(dateISO + 'T00:00:00')
  const dayNumber = Math.floor(d.getTime() / MS_PER_DAY)
  const idx = ((dayNumber % PLAN_LENGTH) + PLAN_LENGTH) % PLAN_LENGTH
  return readingPlan[idx]
}

/** Convenience: localized reference string, e.g. "Genesis 1-2" / "Genèse 1-2". */
export function readingReference(
  r: Pick<ReadingPlanItem, 'bookName' | 'chapterFrom' | 'chapterTo'>,
  locale: 'en' | 'fr' | 'es',
): string {
  const name = r.bookName[locale] || r.bookName.en
  return r.chapterFrom === r.chapterTo
    ? `${name} ${r.chapterFrom}`
    : `${name} ${r.chapterFrom}-${r.chapterTo}`
}
