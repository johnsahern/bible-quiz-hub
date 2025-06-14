import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Target, BookOpen, Search } from 'lucide-react';
import { QuizConfig, DifficultyLevel, QuizTheme } from '@/types/quiz';
import { Input } from '@/components/ui/input';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const QuizSetup = ({ onStartQuiz }: QuizSetupProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('facile');
  const [selectedTheme, setSelectedTheme] = useState<QuizTheme>('vie-jesus');
  const [searchTerm, setSearchTerm] = useState('');

  const difficulties = [
    {
      id: 'facile' as DifficultyLevel,
      name: 'Facile',
      description: 'Questions générales sur la Bible',
      color: 'bg-green-100 text-green-800',
      questions: 10,
      time: 45
    },
    {
      id: 'moyen' as DifficultyLevel,
      name: 'Moyen',
      description: 'Questions sur les détails bibliques',
      color: 'bg-yellow-100 text-yellow-800',
      questions: 15,
      time: 35
    },
    {
      id: 'difficile' as DifficultyLevel,
      name: 'Difficile',
      description: 'Questions théologiques approfondies',
      color: 'bg-red-100 text-red-800',
      questions: 20,
      time: 30
    }
  ];

  const themes = [
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

    // Moïse et l'Exode
    { id: 'moise' as QuizTheme, name: 'Moïse', description: 'Libérateur d\'Israël', icon: '🏺', category: 'Moïse et Exode' },
    { id: 'manne' as QuizTheme, name: 'La Manne', description: 'Pain du ciel dans le désert', icon: '🍞', category: 'Moïse et Exode' },
    { id: 'mer-rouge' as QuizTheme, name: 'Passage de la Mer Rouge', description: 'Miracle de la séparation des eaux', icon: '🌊', category: 'Moïse et Exode' },
    { id: 'mont-sinai' as QuizTheme, name: 'Mont Sinaï', description: 'Don de la Loi, buisson ardent', icon: '⛰️', category: 'Moïse et Exode' },
    { id: 'veau-or' as QuizTheme, name: 'Veau d\'Or', description: 'Idolâtrie d\'Israël au Sinaï', icon: '🐄', category: 'Moïse et Exode' },
    { id: 'tabernacle' as QuizTheme, name: 'Le Tabernacle', description: 'Sanctuaire portatif, arche d\'alliance', icon: '⛺', category: 'Moïse et Exode' },

    // Conquête et Juges
    { id: 'josue' as QuizTheme, name: 'Josué', description: 'Conquête de la Terre Promise', icon: '⚔️', category: 'Conquête' },
    { id: 'jericho' as QuizTheme, name: 'Prise de Jéricho', description: 'Chute des murailles', icon: '🏰', category: 'Conquête' },
    { id: 'caleb' as QuizTheme, name: 'Caleb', description: 'Espion fidèle, héritage', icon: '🗡️', category: 'Conquête' },
    { id: 'rahab-prostituee' as QuizTheme, name: 'Rahab', description: 'Prostituée de Jéricho, foi', icon: '🏠', category: 'Conquête' },

    // Juges d'Israël
    { id: 'juges-israel' as QuizTheme, name: 'Juges d\'Israël', description: 'Époque des Juges', icon: '⚖️', category: 'Juges' },
    { id: 'deborah-juge' as QuizTheme, name: 'Déborah', description: 'Juge et prophétesse', icon: '👩‍⚖️', category: 'Juges' },
    { id: 'gedeon' as QuizTheme, name: 'Gédéon', description: 'Toison, 300 hommes', icon: '🛡️', category: 'Juges' },
    { id: 'jephte' as QuizTheme, name: 'Jephté', description: 'Vœu tragique', icon: '🗡️', category: 'Juges' },
    { id: 'samson' as QuizTheme, name: 'Samson', description: 'Force surhumaine, Dalila', icon: '💪', category: 'Juges' },
    { id: 'dalila' as QuizTheme, name: 'Dalila', description: 'Trahison de Samson', icon: '✂️', category: 'Juges' },

    // Samuel et les rois
    { id: 'samuel' as QuizTheme, name: 'Samuel', description: 'Dernier juge, prophète', icon: '👨‍🦳', category: 'Samuel et Rois' },
    { id: 'anne-mere-samuel' as QuizTheme, name: 'Anne', description: 'Mère de Samuel, prière', icon: '🙏', category: 'Samuel et Rois' },
    { id: 'eli-pretre' as QuizTheme, name: 'Éli le Prêtre', description: 'Maître de Samuel', icon: '👴', category: 'Samuel et Rois' },
    { id: 'saul-roi' as QuizTheme, name: 'Saül', description: 'Premier roi d\'Israël', icon: '👑', category: 'Samuel et Rois' },
    { id: 'david' as QuizTheme, name: 'David', description: 'Roi berger et psalmiste', icon: '🎭', category: 'Samuel et Rois' },
    { id: 'goliath' as QuizTheme, name: 'David et Goliath', description: 'Combat du berger contre le géant', icon: '🪨', category: 'Samuel et Rois' },
    { id: 'jonathan' as QuizTheme, name: 'Jonathan', description: 'Fils de Saül, ami de David', icon: '🤝', category: 'Samuel et Rois' },
    { id: 'bathsheba' as QuizTheme, name: 'Bath-Schéba', description: 'Épouse d\'Urie, puis de David', icon: '💔', category: 'Samuel et Rois' },
    { id: 'absalom' as QuizTheme, name: 'Absalom', description: 'Fils rebelle de David', icon: '⚔️', category: 'Samuel et Rois' },
    { id: 'salomon' as QuizTheme, name: 'Salomon', description: 'Roi sage et bâtisseur', icon: '🏛️', category: 'Samuel et Rois' },
    { id: 'temple-salomon' as QuizTheme, name: 'Temple de Salomon', description: 'Premier temple de Jérusalem', icon: '🏛️', category: 'Samuel et Rois' },
    { id: 'reine-saba' as QuizTheme, name: 'Reine de Saba', description: 'Visite à Salomon', icon: '👸', category: 'Samuel et Rois' },

    // Royaume divisé
    { id: 'rois-israel' as QuizTheme, name: 'Rois d\'Israël', description: 'Royaume du Nord', icon: '👑', category: 'Royaume Divisé' },
    { id: 'rois-juda' as QuizTheme, name: 'Rois de Juda', description: 'Royaume du Sud', icon: '👑', category: 'Royaume Divisé' },
    { id: 'jeroboam-i' as QuizTheme, name: 'Jéroboam I', description: 'Premier roi du royaume du Nord', icon: '🐂', category: 'Royaume Divisé' },
    { id: 'roboam' as QuizTheme, name: 'Roboam', description: 'Fils de Salomon, division du royaume', icon: '💔', category: 'Royaume Divisé' },
    { id: 'achab' as QuizTheme, name: 'Achab', description: 'Roi impie d\'Israël', icon: '👹', category: 'Royaume Divisé' },
    { id: 'jezabel' as QuizTheme, name: 'Jézabel', description: 'Épouse d\'Achab, persécution', icon: '👿', category: 'Royaume Divisé' },
    { id: 'ezechias' as QuizTheme, name: 'Ézéchias', description: 'Roi réformateur de Juda', icon: '🔄', category: 'Royaume Divisé' },
    { id: 'josias' as QuizTheme, name: 'Josias', description: 'Grande réforme religieuse', icon: '📜', category: 'Royaume Divisé' },

    // Prophètes
    { id: 'elie-elisee' as QuizTheme, name: 'Élie et Élisée', description: 'Prophètes thaumaturges', icon: '⚡', category: 'Prophètes' },
    { id: 'mont-carmel' as QuizTheme, name: 'Défi du Mont Carmel', description: 'Élie contre les prophètes de Baal', icon: '🔥', category: 'Prophètes' },
    { id: 'char-feu' as QuizTheme, name: 'Char de Feu', description: 'Enlèvement d\'Élie', icon: '🔥', category: 'Prophètes' },

    // Prophètes majeurs
    { id: 'esaie' as QuizTheme, name: 'Ésaïe', description: 'Grand prophète messianique', icon: '🕊️', category: 'Prophètes Majeurs' },
    { id: 'jeremie' as QuizTheme, name: 'Jérémie', description: 'Prophète de l\'exil', icon: '😢', category: 'Prophètes Majeurs' },
    { id: 'ezechiel' as QuizTheme, name: 'Ézéchiel', description: 'Visions prophétiques', icon: '👁️', category: 'Prophètes Majeurs' },
    { id: 'daniel' as QuizTheme, name: 'Daniel', description: 'Daniel dans la fosse aux lions', icon: '🦁', category: 'Prophètes Majeurs' },
    { id: 'lamentations' as QuizTheme, name: 'Lamentations', description: 'Plaintes sur Jérusalem', icon: '💔', category: 'Prophètes Majeurs' },

    // Prophètes mineurs
    { id: 'osee' as QuizTheme, name: 'Osée', description: 'Amour fidèle de Dieu', icon: '💕', category: 'Prophètes Mineurs' },
    { id: 'joel-prophete' as QuizTheme, name: 'Joël', description: 'Jour de l\'Éternel, effusion de l\'Esprit', icon: '🌪️', category: 'Prophètes Mineurs' },
    { id: 'amos' as QuizTheme, name: 'Amos', description: 'Justice sociale', icon: '⚖️', category: 'Prophètes Mineurs' },
    { id: 'abdias-prophete' as QuizTheme, name: 'Abdias', description: 'Prophétie contre Édom', icon: '⛰️', category: 'Prophètes Mineurs' },
    { id: 'jonas' as QuizTheme, name: 'Jonas', description: 'Jonas et la baleine', icon: '🐋', category: 'Prophètes Mineurs' },
    { id: 'michee' as QuizTheme, name: 'Michée', description: 'Prophéties messianiques', icon: '🎯', category: 'Prophètes Mineurs' },
    { id: 'nahum' as QuizTheme, name: 'Nahum', description: 'Chute de Ninive', icon: '🏛️', category: 'Prophètes Mineurs' },
    { id: 'habacuc' as QuizTheme, name: 'Habacuc', description: 'Questions à Dieu', icon: '❓', category: 'Prophètes Mineurs' },
    { id: 'sophonie' as QuizTheme, name: 'Sophonie', description: 'Jour du Seigneur', icon: '☀️', category: 'Prophètes Mineurs' },
    { id: 'aggee-prophete' as QuizTheme, name: 'Aggée', description: 'Reconstruction du temple', icon: '🏗️', category: 'Prophètes Mineurs' },
    { id: 'zacharie' as QuizTheme, name: 'Zacharie', description: 'Visions de restauration', icon: '🔮', category: 'Prophètes Mineurs' },
    { id: 'malachie' as QuizTheme, name: 'Malachie', description: 'Dernier prophète', icon: '🔚', category: 'Prophètes Mineurs' },

    // Livres historiques post-exil
    { id: 'chroniques' as QuizTheme, name: 'Chroniques', description: 'Histoire des rois de Juda', icon: '📊', category: 'Post-Exil' },
    { id: 'esdras' as QuizTheme, name: 'Esdras', description: 'Retour d\'exil et reconstruction', icon: '🏗️', category: 'Post-Exil' },
    { id: 'nehemie' as QuizTheme, name: 'Néhémie', description: 'Reconstruction des murailles', icon: '🧱', category: 'Post-Exil' },
    { id: 'esther' as QuizTheme, name: 'Esther', description: 'Reine qui sauva son peuple', icon: '👸', category: 'Post-Exil' },
    { id: 'mardochee' as QuizTheme, name: 'Mardochée', description: 'Oncle d\'Esther, sage conseiller', icon: '👨‍💼', category: 'Post-Exil' },
    { id: 'haman' as QuizTheme, name: 'Haman', description: 'Ennemi du peuple juif', icon: '👹', category: 'Post-Exil' },

    // Femmes de l'Ancien Testament
    { id: 'ruth' as QuizTheme, name: 'Ruth', description: 'Histoire de Ruth et Naomi', icon: '💐', category: 'Femmes AT' },
    { id: 'naomi' as QuizTheme, name: 'Naomi', description: 'Belle-mère de Ruth', icon: '👵', category: 'Femmes AT' },
    { id: 'femmes-bible' as QuizTheme, name: 'Femmes de la Bible', description: 'Marie, Esther, Ruth, Déborah...', icon: '👩', category: 'Femmes AT' },
    { id: 'sara' as QuizTheme, name: 'Sara', description: 'Épouse d\'Abraham, mère d\'Isaac', icon: '👩‍👧‍👦', category: 'Femmes AT' },
    { id: 'rebecca' as QuizTheme, name: 'Rébecca', description: 'Épouse d\'Isaac, mère de Jacob et Ésaü', icon: '🏺', category: 'Femmes AT' },
    { id: 'rachel' as QuizTheme, name: 'Rachel', description: 'Épouse bien-aimée de Jacob', icon: '🐑', category: 'Femmes AT' },
    { id: 'lea' as QuizTheme, name: 'Léa', description: 'Première épouse de Jacob', icon: '👁️', category: 'Femmes AT' },
    { id: 'miriam' as QuizTheme, name: 'Miriam', description: 'Sœur de Moïse, prophétesse', icon: '🎵', category: 'Femmes AT' },
    { id: 'abigail' as QuizTheme, name: 'Abigaël', description: 'Femme sage, épouse de David', icon: '🧠', category: 'Femmes AT' },

    // Livres poétiques et de sagesse
    { id: 'job' as QuizTheme, name: 'Job', description: 'Épreuves et fidélité de Job', icon: '💼', category: 'Livres Poétiques' },
    { id: 'psalmes' as QuizTheme, name: 'Psaumes', description: 'Cantiques et prières de David', icon: '🎵', category: 'Livres Poétiques' },
    { id: 'proverbes' as QuizTheme, name: 'Proverbes', description: 'Sagesse de Salomon', icon: '💡', category: 'Livres Poétiques' },
    { id: 'ecclesiaste' as QuizTheme, name: 'Ecclésiaste', description: 'Réflexions sur la vie', icon: '🤔', category: 'Livres Poétiques' },
    { id: 'cantiques' as QuizTheme, name: 'Cantique des Cantiques', description: 'Chant d\'amour poétique', icon: '🌹', category: 'Livres Poétiques' },

    // Lieux géographiques
    { id: 'jerusalem' as QuizTheme, name: 'Jérusalem', description: 'Ville sainte, temple, murailles', icon: '🏛️', category: 'Géographie' },
    { id: 'bethlehem' as QuizTheme, name: 'Bethléem', description: 'Ville de David, naissance de Jésus', icon: '🌟', category: 'Géographie' },
    { id: 'nazareth' as QuizTheme, name: 'Nazareth', description: 'Ville de l\'enfance de Jésus', icon: '🏘️', category: 'Géographie' },
    { id: 'capernaum' as QuizTheme, name: 'Capharnaüm', description: 'Ville du ministère de Jésus', icon: '🐟', category: 'Géographie' },
    { id: 'mont-oliviers' as QuizTheme, name: 'Mont des Oliviers', description: 'Ascension, Gethsémané', icon: '🫒', category: 'Géographie' },
    { id: 'jourdain' as QuizTheme, name: 'Fleuve Jourdain', description: 'Baptême, passage miraculeux', icon: '🌊', category: 'Géographie' },
    { id: 'lac-tiberiade' as QuizTheme, name: 'Lac de Tibériade', description: 'Pêche miraculeuse, marche sur l\'eau', icon: '🏊', category: 'Géographie' },

    // Thématiques doctrinales
    { id: 'trinite' as QuizTheme, name: 'La Trinité', description: 'Père, Fils et Saint-Esprit', icon: '☰', category: 'Doctrine' },
    { id: 'esprit-saint' as QuizTheme, name: 'Saint-Esprit', description: 'Consolateur, dons spirituels', icon: '🕊️', category: 'Doctrine' },
    { id: 'salut' as QuizTheme, name: 'Le Salut', description: 'Grâce, foi, rédemption', icon: '✝️', category: 'Doctrine' },
    { id: 'resurrection-morts' as QuizTheme, name: 'Résurrection des Morts', description: 'Espérance chrétienne', icon: '⚰️', category: 'Doctrine' },
    { id: 'seconde-venue' as QuizTheme, name: 'Seconde Venue', description: 'Retour du Christ', icon: '☁️', category: 'Doctrine' },
    { id: 'jugement-dernier' as QuizTheme, name: 'Jugement Dernier', description: 'Jugement final de Dieu', icon: '⚖️', category: 'Doctrine' },
    { id: 'nouvelle-jerusalem' as QuizTheme, name: 'Nouvelle Jérusalem', description: 'Cité céleste', icon: '🏰', category: 'Doctrine' },

    // Ministères et services
    { id: 'dons-esprit' as QuizTheme, name: 'Dons de l\'Esprit', description: 'Charismes spirituels', icon: '🎁', category: 'Ministères' },
    { id: 'fruits-esprit' as QuizTheme, name: 'Fruits de l\'Esprit', description: 'Amour, joie, paix, patience...', icon: '🍇', category: 'Ministères' },
    { id: 'ministeres' as QuizTheme, name: 'Les Ministères', description: 'Apôtres, prophètes, évangélistes...', icon: '👥', category: 'Ministères' },
    { id: 'diaconie' as QuizTheme, name: 'La Diaconie', description: 'Service et aide aux nécessiteux', icon: '🤲', category: 'Ministères' },

    // Sacrements et pratiques
    { id: 'bapteme-eau' as QuizTheme, name: 'Baptême d\'Eau', description: 'Immersion, nouvelle naissance', icon: '💧', category: 'Sacrements' },
    { id: 'cene' as QuizTheme, name: 'Sainte Cène', description: 'Pain et vin, communion', icon: '🍞', category: 'Sacrements' },
    { id: 'priere' as QuizTheme, name: 'La Prière', description: 'Communication avec Dieu', icon: '🙏', category: 'Sacrements' },
    { id: 'jeune' as QuizTheme, name: 'Le Jeûne', description: 'Privation spirituelle', icon: '🚫', category: 'Sacrements' },

    // Thématiques générales
    { id: 'ancien-testament' as QuizTheme, name: 'Ancien Testament', description: 'Vue d\'ensemble de l\'AT', icon: '📙', category: 'Vue d\'Ensemble' },
    { id: 'nouveau-testament' as QuizTheme, name: 'Nouveau Testament', description: 'Vue d\'ensemble du NT', icon: '📘', category: 'Vue d\'Ensemble' },
    { id: 'prophetes' as QuizTheme, name: 'Les Prophètes', description: 'Messages prophétiques', icon: '📢', category: 'Vue d\'Ensemble' },
    { id: 'alliances' as QuizTheme, name: 'Les Alliances', description: 'Noé, Abraham, Moïse, David, Nouvelle Alliance', icon: '🤝', category: 'Vue d\'Ensemble' },
    { id: 'miracles-bible' as QuizTheme, name: 'Miracles de la Bible', description: 'Interventions surnaturelles de Dieu', icon: '✨', category: 'Vue d\'Ensemble' }
  ];

  const filteredThemes = themes.filter(theme => 
    theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedThemes = filteredThemes.reduce((acc, theme) => {
    if (!acc[theme.category]) {
      acc[theme.category] = [];
    }
    acc[theme.category].push(theme);
    return acc;
  }, {} as Record<string, typeof themes>);

  const selectedDifficultyData = difficulties.find(d => d.id === selectedDifficulty);

  const handleStartQuiz = () => {
    const config: QuizConfig = {
      difficulty: selectedDifficulty,
      theme: selectedTheme,
      questionCount: selectedDifficultyData?.questions || 10
    };
    onStartQuiz(config);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Difficulty Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Choisissez votre niveau</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {difficulties.map((difficulty) => (
              <div
                key={difficulty.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedDifficulty === difficulty.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedDifficulty(difficulty.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{difficulty.name}</h3>
                  <Badge className={difficulty.color}>
                    {difficulty.questions} Q
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">{difficulty.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{difficulty.time}s/question</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span>Choisissez votre thématique ({themes.length} thèmes disponibles)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher une thématique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Themes by Category */}
          <div className="space-y-6">
            {Object.entries(groupedThemes).map(([category, categoryThemes]) => (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-1">
                  {category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {categoryThemes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedTheme === theme.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedTheme(theme.id)}
                    >
                      <div className="text-center">
                        <div className="text-xl mb-1">{theme.icon}</div>
                        <h4 className="font-medium text-sm mb-1">{theme.name}</h4>
                        <p className="text-gray-600 text-xs">{theme.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredThemes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune thématique trouvée pour "{searchTerm}"</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center">
        <Button
          onClick={handleStartQuiz}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
        >
          <Play className="w-5 h-5 mr-2" />
          Commencer le Quiz
          <span className="ml-2 text-sm opacity-90">
            ({selectedDifficultyData?.questions} questions)
          </span>
        </Button>
      </div>
    </div>
  );
};

export default QuizSetup;
