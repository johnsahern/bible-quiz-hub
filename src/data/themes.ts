
import { QuizTheme } from '@/types/quiz';

interface Theme {
  id: QuizTheme;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export const getThemes = (): Theme[] => [
  // Nouveau Testament - Jésus et sa vie
  { id: 'vie-jesus' as QuizTheme, name: 'Vie de Jésus', description: 'Naissance, ministère, crucifixion et résurrection', icon: '✟', category: 'Jésus-Christ' },
  { id: 'miracles-jesus' as QuizTheme, name: 'Miracles de Jésus', description: 'Guérisons, multiplications, résurrections', icon: '✨', category: 'Jésus-Christ' },
  { id: 'paraboles-jesus' as QuizTheme, name: 'Paraboles de Jésus', description: 'Enseignements par paraboles', icon: '📚', category: 'Jésus-Christ' },
  { id: 'passion-christ' as QuizTheme, name: 'Passion du Christ', description: 'Dernière semaine, crucifixion, mort', icon: '⚜️', category: 'Jésus-Christ' },
  { id: 'resurrection' as QuizTheme, name: 'Résurrection', description: 'Résurrection et apparitions', icon: '🌅', category: 'Jésus-Christ' },
  { id: 'bapteme-jesus' as QuizTheme, name: 'Baptême de Jésus', description: 'Baptême par Jean-Baptiste', icon: '💧', category: 'Jésus-Christ' },
  { id: 'transfiguration' as QuizTheme, name: 'Transfiguration', description: 'Transfiguration sur la montagne', icon: '⛰️', category: 'Jésus-Christ' },
  { id: 'ascension' as QuizTheme, name: 'Ascension', description: 'Montée au ciel de Jésus', icon: '☁️', category: 'Jésus-Christ' },
  { id: 'enfance-jesus' as QuizTheme, name: 'Enfance de Jésus', description: 'Nativité, présentation au temple, fuite en Égypte', icon: '👶', category: 'Jésus-Christ' },
  { id: 'genealogie-jesus' as QuizTheme, name: 'Généalogie de Jésus', description: 'Lignée de David, ancêtres du Messie', icon: '🌳', category: 'Jésus-Christ' },

  // Évangiles et personnages NT
  { id: 'evangeliles' as QuizTheme, name: 'Les Évangiles', description: 'Matthieu, Marc, Luc, Jean', icon: '📖', category: 'Nouveau Testament' },
  { id: 'mathieu' as QuizTheme, name: 'Évangile de Matthieu', description: 'Premier évangile, généalogie, sermon sur la montagne', icon: '📜', category: 'Nouveau Testament' },
  { id: 'marc' as QuizTheme, name: 'Évangile de Marc', description: 'Évangile de l\'action, miracles', icon: '⚡', category: 'Nouveau Testament' },
  { id: 'luc' as QuizTheme, name: 'Évangile de Luc', description: 'Évangile de la miséricorde', icon: '💝', category: 'Nouveau Testament' },
  { id: 'jean-evangeliste' as QuizTheme, name: 'Évangile de Jean', description: 'Évangile spirituel, "Je suis"', icon: '🕊️', category: 'Nouveau Testament' },
  { id: 'actes-apotres' as QuizTheme, name: 'Actes des Apôtres', description: 'Débuts de l\'Église primitive', icon: '🔥', category: 'Nouveau Testament' },
  { id: 'jean-baptiste' as QuizTheme, name: 'Jean-Baptiste', description: 'Précurseur, baptême dans le Jourdain', icon: '🌊', category: 'Nouveau Testament' },
  { id: 'sermon-montagne' as QuizTheme, name: 'Sermon sur la Montagne', description: 'Béatitudes, Notre Père, enseignements', icon: '🏔️', category: 'Nouveau Testament' },
  { id: 'derniere-cene' as QuizTheme, name: 'Dernière Cène', description: 'Repas pascal, institution de la communion', icon: '🍞', category: 'Nouveau Testament' },

  // Apôtres et disciples
  { id: 'pierre-apotre' as QuizTheme, name: 'Pierre l\'Apôtre', description: 'Simon Pierre, chef des apôtres', icon: '🗝️', category: 'Apôtres' },
  { id: 'paul-apotre' as QuizTheme, name: 'Paul l\'Apôtre', description: 'Saul de Tarse, apôtre des nations', icon: '✉️', category: 'Apôtres' },
  { id: 'jean-apotre' as QuizTheme, name: 'Jean l\'Apôtre', description: 'Disciple bien-aimé, épîtres', icon: '❤️', category: 'Apôtres' },
  { id: 'jacques-apotre' as QuizTheme, name: 'Jacques l\'Apôtre', description: 'Frère de Jean, épître de Jacques', icon: '⚖️', category: 'Apôtres' },
  { id: 'barnabe' as QuizTheme, name: 'Barnabé', description: 'Compagnon de Paul, fils de consolation', icon: '🤝', category: 'Apôtres' },
  { id: 'timothee' as QuizTheme, name: 'Timothée', description: 'Disciple de Paul, épîtres pastorales', icon: '👨‍🎓', category: 'Apôtres' },
  { id: 'tite' as QuizTheme, name: 'Tite', description: 'Collaborateur de Paul en Crète', icon: '🏛️', category: 'Apôtres' },
  { id: 'etienne-martyr' as QuizTheme, name: 'Étienne le Martyr', description: 'Premier martyr chrétien', icon: '👑', category: 'Apôtres' },
  { id: 'philippe-diacre' as QuizTheme, name: 'Philippe le Diacre', description: 'Évangéliste, eunuque éthiopien', icon: '🚶', category: 'Apôtres' },
  { id: 'douze-apotres' as QuizTheme, name: 'Les Douze Apôtres', description: 'Disciples choisis par Jésus', icon: '👥', category: 'Apôtres' },
  { id: 'andre-apotre' as QuizTheme, name: 'André l\'Apôtre', description: 'Frère de Pierre, premier appelé', icon: '🎣', category: 'Apôtres' },
  { id: 'thomas-apotre' as QuizTheme, name: 'Thomas l\'Apôtre', description: 'Thomas l\'incrédule, mission en Inde', icon: '🤚', category: 'Apôtres' },
  { id: 'matthieu-apotre' as QuizTheme, name: 'Matthieu l\'Apôtre', description: 'Collecteur d\'impôts devenu évangéliste', icon: '💰', category: 'Apôtres' },

  // Épîtres
  { id: 'epitres-paul' as QuizTheme, name: 'Épîtres de Paul', description: 'Lettres de l\'apôtre Paul', icon: '✉️', category: 'Épîtres' },
  { id: 'pierre-jean' as QuizTheme, name: 'Épîtres de Pierre et Jean', description: 'Épîtres de Pierre et Jean', icon: '📮', category: 'Épîtres' },
  { id: 'apocalypse' as QuizTheme, name: 'Apocalypse', description: 'Révélations de Jean', icon: '🌟', category: 'Épîtres' },
  { id: 'romains' as QuizTheme, name: 'Épître aux Romains', description: 'Doctrine du salut par la foi', icon: '🏛️', category: 'Épîtres' },
  { id: 'corinthiens' as QuizTheme, name: 'Épîtres aux Corinthiens', description: 'Problèmes et solutions d\'église', icon: '⛪', category: 'Épîtres' },
  { id: 'galates' as QuizTheme, name: 'Épître aux Galates', description: 'Liberté chrétienne, justification', icon: '🔓', category: 'Épîtres' },
  { id: 'ephesiens' as QuizTheme, name: 'Épître aux Éphésiens', description: 'Unité de l\'Église, armure spirituelle', icon: '🛡️', category: 'Épîtres' },
  { id: 'philippiens' as QuizTheme, name: 'Épître aux Philippiens', description: 'Joie chrétienne, humilité du Christ', icon: '😊', category: 'Épîtres' },
  { id: 'colossiens' as QuizTheme, name: 'Épître aux Colossiens', description: 'Suprématie du Christ', icon: '👑', category: 'Épîtres' },
  { id: 'thessaloniciens' as QuizTheme, name: 'Épîtres aux Thessaloniciens', description: 'Seconde venue du Christ', icon: '⏰', category: 'Épîtres' },
  { id: 'hebreux' as QuizTheme, name: 'Épître aux Hébreux', description: 'Supériorité du Christ, foi des anciens', icon: '🎺', category: 'Épîtres' },

  // Femmes du Nouveau Testament
  { id: 'marie-mere-jesus' as QuizTheme, name: 'Marie, Mère de Jésus', description: 'Annonciation, nativité, Magnificat', icon: '👸', category: 'Femmes NT' },
  { id: 'marie-madeleine' as QuizTheme, name: 'Marie-Madeleine', description: 'Disciple, première témoin de la résurrection', icon: '🌹', category: 'Femmes NT' },
  { id: 'elisabeth' as QuizTheme, name: 'Élisabeth', description: 'Mère de Jean-Baptiste, cousine de Marie', icon: '🤱', category: 'Femmes NT' },
  { id: 'marie-marthe' as QuizTheme, name: 'Marie et Marthe', description: 'Sœurs de Béthanie, amies de Jésus', icon: '👭', category: 'Femmes NT' },
  { id: 'femme-samaritaine' as QuizTheme, name: 'Femme Samaritaine', description: 'Rencontre au puits, eau vive', icon: '⛲', category: 'Femmes NT' },
  { id: 'femme-adultere' as QuizTheme, name: 'Femme Adultère', description: 'Pardon de Jésus, "Va et ne pèche plus"', icon: '💔', category: 'Femmes NT' },

  // Église primitive
  { id: 'pentecote' as QuizTheme, name: 'Pentecôte', description: 'Descente du Saint-Esprit', icon: '🔥', category: 'Église Primitive' },
  { id: 'eglise-primitive' as QuizTheme, name: 'Église Primitive', description: 'Premières communautés chrétiennes', icon: '⛪', category: 'Église Primitive' },
  { id: 'voyages-paul' as QuizTheme, name: 'Voyages de Paul', description: 'Missions apostoliques de Paul', icon: '🗺️', category: 'Église Primitive' },
  { id: 'concile-jerusalem' as QuizTheme, name: 'Concile de Jérusalem', description: 'Décision sur les gentils convertis', icon: '🏛️', category: 'Église Primitive' },
  { id: 'persecutions' as QuizTheme, name: 'Persécutions', description: 'Épreuves des premiers chrétiens', icon: '⚔️', category: 'Église Primitive' },

  // Pentateuque
  { id: 'creation' as QuizTheme, name: 'La Création', description: 'Genèse et les origines du monde', icon: '🌍', category: 'Pentateuque' },
  { id: 'genese' as QuizTheme, name: 'Genèse', description: 'Premier livre de la Bible', icon: '🌱', category: 'Pentateuque' },
  { id: 'exode' as QuizTheme, name: 'Exode', description: 'Sortie d\'Égypte et Mont Sinaï', icon: '🏔️', category: 'Pentateuque' },
  { id: 'nombres' as QuizTheme, name: 'Nombres', description: 'Quarante ans dans le désert', icon: '🏜️', category: 'Pentateuque' },
  { id: 'deuteronome' as QuizTheme, name: 'Deutéronome', description: 'Répétition de la Loi', icon: '📜', category: 'Pentateuque' },
  { id: 'commandements' as QuizTheme, name: 'Les Commandements', description: 'Les 10 commandements', icon: '📋', category: 'Pentateuque' },
  { id: 'levitique' as QuizTheme, name: 'Lévitique', description: 'Lois cérémonielles et sacrifices', icon: '🔥', category: 'Pentateuque' },
  { id: 'plaies-egypte' as QuizTheme, name: 'Plaies d\'Égypte', description: 'Dix fléaux sur l\'Égypte', icon: '🐸', category: 'Pentateuque' },
  { id: 'paque' as QuizTheme, name: 'La Pâque', description: 'Institution de la Pâque, agneau pascal', icon: '🐑', category: 'Pentateuque' },
  { id: 'mer-rouge' as QuizTheme, name: 'Traversée de la Mer Rouge', description: 'Miracle de la libération', icon: '🌊', category: 'Pentateuque' },

  // Patriarches et personnages de la Genèse
  { id: 'patriarches' as QuizTheme, name: 'Les Patriarches', description: 'Abraham, Isaac, Jacob', icon: '👴', category: 'Patriarches' },
  { id: 'abraham' as QuizTheme, name: 'Abraham', description: 'Père de la foi, alliance avec Dieu', icon: '🌟', category: 'Patriarches' },
  { id: 'isaac' as QuizTheme, name: 'Isaac', description: 'Fils de la promesse, sacrifice', icon: '🔥', category: 'Patriarches' },
  { id: 'jacob' as QuizTheme, name: 'Jacob', description: 'Israël, échelle, lutte avec l\'ange', icon: '🪜', category: 'Patriarches' },
  { id: 'joseph' as QuizTheme, name: 'Joseph', description: 'Rêves, Égypte, vice-roi', icon: '👑', category: 'Patriarches' },
  { id: 'noe' as QuizTheme, name: 'Noé', description: 'Arche, déluge, alliance arc-en-ciel', icon: '🌈', category: 'Patriarches' },
  { id: 'adam-eve' as QuizTheme, name: 'Adam et Ève', description: 'Premiers humains, jardin d\'Éden', icon: '🍎', category: 'Patriarches' },
  { id: 'cain-abel' as QuizTheme, name: 'Caïn et Abel', description: 'Premiers frères, premier meurtre', icon: '⚔️', category: 'Patriarches' },
  { id: 'enoch' as QuizTheme, name: 'Hénoch', description: 'Homme juste enlevé par Dieu', icon: '☁️', category: 'Patriarches' },
  { id: 'mathusalem' as QuizTheme, name: 'Mathusalem', description: 'L\'homme le plus âgé de la Bible', icon: '👴', category: 'Patriarches' },
  { id: 'melchisedek' as QuizTheme, name: 'Melchisédek', description: 'Roi de Salem, sacrificateur du Très-Haut', icon: '👨‍💼', category: 'Patriarches' },

  // Prophètes
  { id: 'prophetes' as QuizTheme, name: 'Les Prophètes', description: 'Messages prophétiques', icon: '📢', category: 'Prophètes' },
  { id: 'elie-elisee' as QuizTheme, name: 'Élie et Élisée', description: 'Prophètes thaumaturges', icon: '⚡', category: 'Prophètes' },
  { id: 'esaie' as QuizTheme, name: 'Ésaïe', description: 'Grand prophète messianique', icon: '🕊️', category: 'Prophètes' },
  { id: 'jeremie' as QuizTheme, name: 'Jérémie', description: 'Prophète de l\'exil', icon: '😢', category: 'Prophètes' },
  { id: 'ezechiel' as QuizTheme, name: 'Ézéchiel', description: 'Visions prophétiques', icon: '👁️', category: 'Prophètes' },
  { id: 'daniel' as QuizTheme, name: 'Daniel', description: 'Daniel dans la fosse aux lions', icon: '🦁', category: 'Prophètes' },
  { id: 'jonas' as QuizTheme, name: 'Jonas', description: 'Prophète dans le ventre de la baleine', icon: '🐋', category: 'Prophètes' },
  { id: 'osee' as QuizTheme, name: 'Osée', description: 'Amour fidèle de Dieu', icon: '💕', category: 'Prophètes' },
  { id: 'joel' as QuizTheme, name: 'Joël', description: 'Jour de l\'Éternel, effusion de l\'Esprit', icon: '🌪️', category: 'Prophètes' },
  { id: 'amos' as QuizTheme, name: 'Amos', description: 'Justice sociale, berger prophète', icon: '⚖️', category: 'Prophètes' },
  { id: 'abdias' as QuizTheme, name: 'Abdias', description: 'Prophétie contre Édom', icon: '🏔️', category: 'Prophètes' },
  { id: 'michee' as QuizTheme, name: 'Michée', description: 'Naissance du Messie à Bethléem', icon: '⭐', category: 'Prophètes' },
  { id: 'nahum' as QuizTheme, name: 'Nahum', description: 'Chute de Ninive', icon: '🏛️', category: 'Prophètes' },
  { id: 'habacuc' as QuizTheme, name: 'Habacuc', description: 'Le juste vivra par la foi', icon: '🤔', category: 'Prophètes' },
  { id: 'sophonie' as QuizTheme, name: 'Sophonie', description: 'Jour de colère, restauration', icon: '⚡', category: 'Prophètes' },
  { id: 'aggee' as QuizTheme, name: 'Aggée', description: 'Reconstruction du temple', icon: '🏗️', category: 'Prophètes' },
  { id: 'zacharie' as QuizTheme, name: 'Zacharie', description: 'Visions messianiques', icon: '👁️', category: 'Prophètes' },
  { id: 'malachie' as QuizTheme, name: 'Malachie', description: 'Dernier prophète, précurseur du Messie', icon: '🚪', category: 'Prophètes' },

  // Rois et histoire
  { id: 'rois-israel' as QuizTheme, name: 'Rois d\'Israël', description: 'Royaume du Nord', icon: '👑', category: 'Rois' },
  { id: 'david' as QuizTheme, name: 'David', description: 'Roi berger et psalmiste', icon: '🎭', category: 'Rois' },
  { id: 'salomon' as QuizTheme, name: 'Salomon', description: 'Roi sage et bâtisseur', icon: '🏛️', category: 'Rois' },
  { id: 'samuel' as QuizTheme, name: 'Samuel', description: 'Dernier juge, prophète', icon: '👨‍🦳', category: 'Rois' },
  { id: 'saul' as QuizTheme, name: 'Saül', description: 'Premier roi d\'Israël', icon: '👑', category: 'Rois' },
  { id: 'roboam' as QuizTheme, name: 'Roboam', description: 'Fils de Salomon, division du royaume', icon: '💔', category: 'Rois' },
  { id: 'jeroboam' as QuizTheme, name: 'Jéroboam', description: 'Premier roi d\'Israël du Nord', icon: '🐂', category: 'Rois' },
  { id: 'achab' as QuizTheme, name: 'Achab', description: 'Roi impie, époux de Jézabel', icon: '👹', category: 'Rois' },
  { id: 'josaphat' as QuizTheme, name: 'Josaphat', description: 'Roi pieux de Juda', icon: '😇', category: 'Rois' },
  { id: 'ezechias' as QuizTheme, name: 'Ézéchias', description: 'Réformateur, guérison miraculeuse', icon: '💊', category: 'Rois' },
  { id: 'josias' as QuizTheme, name: 'Josias', description: 'Grand réformateur de Juda', icon: '📜', category: 'Rois' },

  // Livres poétiques
  { id: 'job' as QuizTheme, name: 'Job', description: 'Épreuves et fidélité de Job', icon: '💼', category: 'Livres Poétiques' },
  { id: 'psalmes' as QuizTheme, name: 'Psaumes', description: 'Cantiques et prières de David', icon: '🎵', category: 'Livres Poétiques' },
  { id: 'proverbes' as QuizTheme, name: 'Proverbes', description: 'Sagesse de Salomon', icon: '💡', category: 'Livres Poétiques' },
  { id: 'ecclesiaste' as QuizTheme, name: 'Ecclésiaste', description: 'Vanité des vanités, sagesse pratique', icon: '🤷', category: 'Livres Poétiques' },
  { id: 'cantique-cantiques' as QuizTheme, name: 'Cantique des Cantiques', description: 'Amour entre l\'époux et l\'épouse', icon: '💝', category: 'Livres Poétiques' },

  // Femmes de l'Ancien Testament
  { id: 'ruth' as QuizTheme, name: 'Ruth', description: 'Histoire de Ruth et Naomi', icon: '💐', category: 'Femmes AT' },
  { id: 'esther' as QuizTheme, name: 'Esther', description: 'Reine qui sauva son peuple', icon: '👸', category: 'Femmes AT' },
  { id: 'femmes-bible' as QuizTheme, name: 'Femmes de la Bible', description: 'Marie, Esther, Ruth, Déborah...', icon: '👩', category: 'Femmes AT' },
  { id: 'deborah' as QuizTheme, name: 'Déborah', description: 'Juge et prophétesse d\'Israël', icon: '⚖️', category: 'Femmes AT' },
  { id: 'sara' as QuizTheme, name: 'Sara', description: 'Épouse d\'Abraham, mère d\'Isaac', icon: '👵', category: 'Femmes AT' },
  { id: 'rebecca' as QuizTheme, name: 'Rébecca', description: 'Épouse d\'Isaac, mère de Jacob et Ésaü', icon: '💍', category: 'Femmes AT' },
  { id: 'rachel-lea' as QuizTheme, name: 'Rachel et Léa', description: 'Épouses de Jacob', icon: '👭', category: 'Femmes AT' },
  { id: 'anne-mere-samuel' as QuizTheme, name: 'Anne', description: 'Mère de Samuel, prière exaucée', icon: '🙏', category: 'Femmes AT' },
  { id: 'abigail' as QuizTheme, name: 'Abigaïl', description: 'Sagesse et beauté, épouse de David', icon: '🌸', category: 'Femmes AT' },
  { id: 'bathsheba' as QuizTheme, name: 'Bath-Schéba', description: 'Mère de Salomon', icon: '🛁', category: 'Femmes AT' },

  // Juges
  { id: 'juges-israel' as QuizTheme, name: 'Juges d\'Israël', description: 'Époque des Juges', icon: '⚖️', category: 'Juges' },
  { id: 'samson' as QuizTheme, name: 'Samson', description: 'Force surhumaine, Dalila', icon: '💪', category: 'Juges' },
  { id: 'gedeon' as QuizTheme, name: 'Gédéon', description: 'Juge libérateur, toison', icon: '⚔️', category: 'Juges' },
  { id: 'jephte' as QuizTheme, name: 'Jephté', description: 'Vœu téméraire, victoire', icon: '🗡️', category: 'Juges' },
  { id: 'ehud' as QuizTheme, name: 'Éhud', description: 'Juge gaucher, libérateur', icon: '🗡️', category: 'Juges' },
  { id: 'barak' as QuizTheme, name: 'Barak', description: 'Chef militaire avec Déborah', icon: '⚔️', category: 'Juges' },

  // Moïse et Exode
  { id: 'moise' as QuizTheme, name: 'Moïse', description: 'Libérateur d\'Israël', icon: '🏺', category: 'Moïse et Exode' },
  { id: 'aaron' as QuizTheme, name: 'Aaron', description: 'Grand-prêtre, frère de Moïse', icon: '👨‍💼', category: 'Moïse et Exode' },
  { id: 'miriam' as QuizTheme, name: 'Miriam', description: 'Sœur de Moïse, prophétesse', icon: '🎵', category: 'Moïse et Exode' },
  { id: 'josue' as QuizTheme, name: 'Josué', description: 'Successeur de Moïse, conquête de Canaan', icon: '🏹', category: 'Moïse et Exode' },
  { id: 'caleb' as QuizTheme, name: 'Caleb', description: 'Espion fidèle, héritage à 85 ans', icon: '🕵️', category: 'Moïse et Exode' },

  // Géographie
  { id: 'jerusalem' as QuizTheme, name: 'Jérusalem', description: 'Ville sainte, temple, murailles', icon: '🏛️', category: 'Géographie' },
  { id: 'bethlehem' as QuizTheme, name: 'Bethléem', description: 'Ville de David, naissance de Jésus', icon: '🌟', category: 'Géographie' },
  { id: 'nazareth' as QuizTheme, name: 'Nazareth', description: 'Ville de l\'enfance de Jésus', icon: '🏘️', category: 'Géographie' },
  { id: 'galilee' as QuizTheme, name: 'Galilée', description: 'Région du ministère de Jésus', icon: '🏞️', category: 'Géographie' },
  { id: 'judee' as QuizTheme, name: 'Judée', description: 'Région de Jérusalem et du temple', icon: '🏛️', category: 'Géographie' },
  { id: 'samarie' as QuizTheme, name: 'Samarie', description: 'Région des Samaritains', icon: '⛲', category: 'Géographie' },
  { id: 'egypte' as QuizTheme, name: 'Égypte', description: 'Terre d\'esclavage et de refuge', icon: '🔺', category: 'Géographie' },
  { id: 'babylone' as QuizTheme, name: 'Babylone', description: 'Empire de l\'exil', icon: '🏗️', category: 'Géographie' },
  { id: 'ninive' as QuizTheme, name: 'Ninive', description: 'Capitale de l\'Assyrie', icon: '🏛️', category: 'Géographie' },

  // Thématiques doctrinales
  { id: 'ancien-testament' as QuizTheme, name: 'Ancien Testament', description: 'Vue d\'ensemble de l\'AT', icon: '📙', category: 'Vue d\'Ensemble' },
  { id: 'nouveau-testament' as QuizTheme, name: 'Nouveau Testament', description: 'Vue d\'ensemble du NT', icon: '📘', category: 'Vue d\'Ensemble' },
  { id: 'messie' as QuizTheme, name: 'Le Messie', description: 'Prophéties et accomplissement', icon: '👑', category: 'Vue d\'Ensemble' },
  { id: 'alliance' as QuizTheme, name: 'Les Alliances', description: 'Alliances divines dans l\'histoire', icon: '🤝', category: 'Vue d\'Ensemble' },
  { id: 'sacrifice' as QuizTheme, name: 'Les Sacrifices', description: 'Système sacrificiel, types et antitypes', icon: '🔥', category: 'Vue d\'Ensemble' },
  { id: 'temple' as QuizTheme, name: 'Le Temple', description: 'Tabernacle, temple de Salomon, temple d\'Hérode', icon: '🏛️', category: 'Vue d\'Ensemble' },
  { id: 'fetes-juives' as QuizTheme, name: 'Fêtes Juives', description: 'Pâque, Pentecôte, Tabernacles', icon: '🎉', category: 'Vue d\'Ensemble' },
  { id: 'genealogies' as QuizTheme, name: 'Généalogies', description: 'Lignées bibliques importantes', icon: '🌳', category: 'Vue d\'Ensemble' }
];
