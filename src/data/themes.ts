
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

  // Évangiles et personnages NT
  { id: 'evangeliles' as QuizTheme, name: 'Les Évangiles', description: 'Matthieu, Marc, Luc, Jean', icon: '📖', category: 'Nouveau Testament' },
  { id: 'mathieu' as QuizTheme, name: 'Évangile de Matthieu', description: 'Premier évangile, généalogie, sermon sur la montagne', icon: '📜', category: 'Nouveau Testament' },
  { id: 'marc' as QuizTheme, name: 'Évangile de Marc', description: 'Évangile de l\'action, miracles', icon: '⚡', category: 'Nouveau Testament' },
  { id: 'luc' as QuizTheme, name: 'Évangile de Luc', description: 'Évangile de la miséricorde', icon: '💝', category: 'Nouveau Testament' },
  { id: 'jean-evangeliste' as QuizTheme, name: 'Évangile de Jean', description: 'Évangile spirituel, "Je suis"', icon: '🕊️', category: 'Nouveau Testament' },
  { id: 'actes-apotres' as QuizTheme, name: 'Actes des Apôtres', description: 'Débuts de l\'Église primitive', icon: '🔥', category: 'Nouveau Testament' },
  { id: 'jean-baptiste' as QuizTheme, name: 'Jean-Baptiste', description: 'Précurseur, baptême dans le Jourdain', icon: '🌊', category: 'Nouveau Testament' },

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

  // Épîtres
  { id: 'epitres-paul' as QuizTheme, name: 'Épîtres de Paul', description: 'Lettres de l\'apôtre Paul', icon: '✉️', category: 'Épîtres' },
  { id: 'pierre-jean' as QuizTheme, name: 'Épîtres de Pierre et Jean', description: 'Épîtres de Pierre et Jean', icon: '📮', category: 'Épîtres' },
  { id: 'apocalypse' as QuizTheme, name: 'Apocalypse', description: 'Révélations de Jean', icon: '🌟', category: 'Épîtres' },

  // Femmes du Nouveau Testament
  { id: 'marie-mere-jesus' as QuizTheme, name: 'Marie, Mère de Jésus', description: 'Annonciation, nativité, Magnificat', icon: '👸', category: 'Femmes NT' },
  { id: 'marie-madeleine' as QuizTheme, name: 'Marie-Madeleine', description: 'Disciple, première témoin de la résurrection', icon: '🌹', category: 'Femmes NT' },

  // Église primitive
  { id: 'pentecote' as QuizTheme, name: 'Pentecôte', description: 'Descente du Saint-Esprit', icon: '🔥', category: 'Église Primitive' },
  { id: 'eglise-primitive' as QuizTheme, name: 'Église Primitive', description: 'Premières communautés chrétiennes', icon: '⛪', category: 'Église Primitive' },
  { id: 'voyages-paul' as QuizTheme, name: 'Voyages de Paul', description: 'Missions apostoliques de Paul', icon: '🗺️', category: 'Église Primitive' },

  // Pentateuque
  { id: 'creation' as QuizTheme, name: 'La Création', description: 'Genèse et les origines du monde', icon: '🌍', category: 'Pentateuque' },
  { id: 'genese' as QuizTheme, name: 'Genèse', description: 'Premier livre de la Bible', icon: '🌱', category: 'Pentateuque' },
  { id: 'exode' as QuizTheme, name: 'Exode', description: 'Sortie d\'Égypte et Mont Sinaï', icon: '🏔️', category: 'Pentateuque' },
  { id: 'nombres' as QuizTheme, name: 'Nombres', description: 'Quarante ans dans le désert', icon: '🏜️', category: 'Pentateuque' },
  { id: 'deuteronome' as QuizTheme, name: 'Deutéronome', description: 'Répétition de la Loi', icon: '📜', category: 'Pentateuque' },
  { id: 'commandements' as QuizTheme, name: 'Les Commandements', description: 'Les 10 commandements', icon: '📋', category: 'Pentateuque' },

  // Patriarches et personnages de la Genèse
  { id: 'patriarches' as QuizTheme, name: 'Les Patriarches', description: 'Abraham, Isaac, Jacob', icon: '👴', category: 'Patriarches' },
  { id: 'abraham' as QuizTheme, name: 'Abraham', description: 'Père de la foi, alliance avec Dieu', icon: '🌟', category: 'Patriarches' },
  { id: 'isaac' as QuizTheme, name: 'Isaac', description: 'Fils de la promesse, sacrifice', icon: '🔥', category: 'Patriarches' },
  { id: 'jacob' as QuizTheme, name: 'Jacob', description: 'Israël, échelle, lutte avec l\'ange', icon: '🪜', category: 'Patriarches' },
  { id: 'joseph' as QuizTheme, name: 'Joseph', description: 'Rêves, Égypte, vice-roi', icon: '👑', category: 'Patriarches' },
  { id: 'noe' as QuizTheme, name: 'Noé', description: 'Arche, déluge, alliance arc-en-ciel', icon: '🌈', category: 'Patriarches' },
  { id: 'adam-eve' as QuizTheme, name: 'Adam et Ève', description: 'Premiers humains, jardin d\'Éden', icon: '🍎', category: 'Patriarches' },
  { id: 'cain-abel' as QuizTheme, name: 'Caïn et Abel', description: 'Premiers frères, premier meurtre', icon: '⚔️', category: 'Patriarches' },

  // Prophètes
  { id: 'prophetes' as QuizTheme, name: 'Les Prophètes', description: 'Messages prophétiques', icon: '📢', category: 'Prophètes' },
  { id: 'elie-elisee' as QuizTheme, name: 'Élie et Élisée', description: 'Prophètes thaumaturges', icon: '⚡', category: 'Prophètes' },
  { id: 'esaie' as QuizTheme, name: 'Ésaïe', description: 'Grand prophète messianique', icon: '🕊️', category: 'Prophètes' },
  { id: 'jeremie' as QuizTheme, name: 'Jérémie', description: 'Prophète de l\'exil', icon: '😢', category: 'Prophètes' },
  { id: 'ezechiel' as QuizTheme, name: 'Ézéchiel', description: 'Visions prophétiques', icon: '👁️', category: 'Prophètes' },
  { id: 'daniel' as QuizTheme, name: 'Daniel', description: 'Daniel dans la fosse aux lions', icon: '🦁', category: 'Prophètes' },
  
  // Rois et histoire
  { id: 'rois-israel' as QuizTheme, name: 'Rois d\'Israël', description: 'Royaume du Nord', icon: '👑', category: 'Rois' },
  { id: 'david' as QuizTheme, name: 'David', description: 'Roi berger et psalmiste', icon: '🎭', category: 'Rois' },
  { id: 'salomon' as QuizTheme, name: 'Salomon', description: 'Roi sage et bâtisseur', icon: '🏛️', category: 'Rois' },
  { id: 'samuel' as QuizTheme, name: 'Samuel', description: 'Dernier juge, prophète', icon: '👨‍🦳', category: 'Rois' },

  // Livres poétiques
  { id: 'job' as QuizTheme, name: 'Job', description: 'Épreuves et fidélité de Job', icon: '💼', category: 'Livres Poétiques' },
  { id: 'psalmes' as QuizTheme, name: 'Psaumes', description: 'Cantiques et prières de David', icon: '🎵', category: 'Livres Poétiques' },
  { id: 'proverbes' as QuizTheme, name: 'Proverbes', description: 'Sagesse de Salomon', icon: '💡', category: 'Livres Poétiques' },

  // Femmes de l'Ancien Testament
  { id: 'ruth' as QuizTheme, name: 'Ruth', description: 'Histoire de Ruth et Naomi', icon: '💐', category: 'Femmes AT' },
  { id: 'esther' as QuizTheme, name: 'Esther', description: 'Reine qui sauva son peuple', icon: '👸', category: 'Femmes AT' },
  { id: 'femmes-bible' as QuizTheme, name: 'Femmes de la Bible', description: 'Marie, Esther, Ruth, Déborah...', icon: '👩', category: 'Femmes AT' },

  // Juges
  { id: 'juges-israel' as QuizTheme, name: 'Juges d\'Israël', description: 'Époque des Juges', icon: '⚖️', category: 'Juges' },
  { id: 'samson' as QuizTheme, name: 'Samson', description: 'Force surhumaine, Dalila', icon: '💪', category: 'Juges' },

  // Moïse et Exode
  { id: 'moise' as QuizTheme, name: 'Moïse', description: 'Libérateur d\'Israël', icon: '🏺', category: 'Moïse et Exode' },

  // Géographie
  { id: 'jerusalem' as QuizTheme, name: 'Jérusalem', description: 'Ville sainte, temple, murailles', icon: '🏛️', category: 'Géographie' },
  { id: 'bethlehem' as QuizTheme, name: 'Bethléem', description: 'Ville de David, naissance de Jésus', icon: '🌟', category: 'Géographie' },
  { id: 'nazareth' as QuizTheme, name: 'Nazareth', description: 'Ville de l\'enfance de Jésus', icon: '🏘️', category: 'Géographie' },

  // Thématiques doctrinales
  { id: 'ancien-testament' as QuizTheme, name: 'Ancien Testament', description: 'Vue d\'ensemble de l\'AT', icon: '📙', category: 'Vue d\'Ensemble' },
  { id: 'nouveau-testament' as QuizTheme, name: 'Nouveau Testament', description: 'Vue d\'ensemble du NT', icon: '📘', category: 'Vue d\'Ensemble' }
];
