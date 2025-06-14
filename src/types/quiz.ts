
export type DifficultyLevel = 'facile' | 'moyen' | 'difficile';
export type QuizTheme = 
  | 'vie-jesus' | 'commandements' | 'creation' | 'prophetes' | 'nouveau-testament'
  | 'ancien-testament' | 'genese' | 'exode' | 'psalmes' | 'proverbes'
  | 'evangeliles' | 'actes-apotres' | 'epitres-paul' | 'apocalypse' | 'rois-israel'
  | 'juges-israel' | 'patriarches' | 'moise' | 'david' | 'salomon'
  | 'elie-elisee' | 'daniel' | 'ezechiel' | 'esaie' | 'jeremie'
  | 'samuel' | 'ruth' | 'esther' | 'job' | 'jonas'
  | 'osee' | 'amos' | 'michee' | 'habacuc' | 'sophonie'
  | 'zacharie' | 'malachie' | 'cantiques' | 'ecclesiaste' | 'lamentations'
  | 'nombres' | 'deuteronome' | 'josue' | 'chroniques' | 'esdras'
  | 'nehemie' | 'miracles-jesus' | 'paraboles-jesus' | 'passion-christ' | 'resurrection'
  | 'pentecote' | 'eglise-primitive' | 'voyages-paul' | 'pierre-jean' | 'femmes-bible'
  | 'abraham' | 'isaac' | 'jacob' | 'joseph' | 'noe' | 'adam-eve' | 'cain-abel'
  | 'mathieu' | 'marc' | 'luc' | 'jean-evangeliste' | 'jean-baptiste' | 'marie-mere-jesus'
  | 'marie-madeleine' | 'pierre-apotre' | 'paul-apotre' | 'barnabe' | 'timothee'
  | 'tite' | 'philemon' | 'jacques-apotre' | 'jude-apotre' | 'etienne-martyr'
  | 'philippe-diacre' | 'apollos' | 'priscille-aquilas' | 'lydie' | 'cornelius'
  | 'saul-roi' | 'jonathan' | 'absalom' | 'adonias' | 'bathsheba' | 'urie'
  | 'nathan-prophete' | 'gad-prophete' | 'ahijah' | 'iddo' | 'shemaya'
  | 'josaphat' | 'ezechias' | 'josias' | 'manasse' | 'amon' | 'jotham'
  | 'achaz' | 'roboam' | 'abijam' | 'asa' | 'nadab' | 'baasha'
  | 'ela' | 'zimri' | 'omri' | 'achab' | 'ochozias' | 'joram'
  | 'jehu' | 'joachaz' | 'joas' | 'jeroboam-ii' | 'zacharie-roi' | 'shallum'
  | 'menahem' | 'peqahia' | 'peqah' | 'osee-roi' | 'sargon' | 'sennacherib'
  | 'nebucadnetsar' | 'belschatsar' | 'darius' | 'cyrus' | 'artaxerxes'
  | 'anne-mere-samuel' | 'peninna' | 'eli-pretre' | 'hophni-phineas' | 'ichabod'
  | 'deborah-juge' | 'barak' | 'jael' | 'sisera' | 'gedeon' | 'abimelech'
  | 'jephte' | 'samson' | 'dalila' | 'boaz' | 'naomi' | 'orpa'
  | 'elimelech' | 'mahlon' | 'kiljon' | 'obed' | 'isaï' | 'goliath'
  | 'abigail' | 'nabal' | 'michal' | 'mephibosheth' | 'amnon' | 'tamar'
  | 'adonija' | 'shimei' | 'joab' | 'abishai' | 'asahel' | 'abner'
  | 'ish-bosheth' | 'rizpa' | 'armoni' | 'mephibosheth-rizpa' | 'hadad'
  | 'rezon' | 'jeroboam-i' | 'ahija-prophete' | 'shemaya-prophete' | 'homme-dieu'
  | 'jezabel' | 'nabot' | 'michee-prophete' | 'sedekias' | 'hanania-prophete'
  | 'abdias-prophete' | 'joel-prophete' | 'aggee-prophete' | 'mardochee'
  | 'haman' | 'vasthi' | 'assueus' | 'bigtan' | 'teresh' | 'zeresh'
  | 'harbona' | 'memukan' | 'tarshish' | 'admatha' | 'carshena'
  | 'bildad' | 'eliphaz' | 'tsophar' | 'elihu' | 'leviathan' | 'behemoth'
  | 'rahab-prostituee' | 'achan' | 'caleb' | 'josue-fils-nun' | 'phineas-pretre'
  | 'othniel' | 'ehud' | 'shamgar' | 'tola' | 'jair' | 'ibzan'
  | 'elon' | 'abdon' | 'manoah' | 'femme-manoah' | 'philistins' | 'dagon'
  | 'penuel' | 'succoth' | 'zebah' | 'tsalmunna' | 'oreb' | 'zeeb'
  | 'midianites' | 'amalecites' | 'moabites' | 'ammonites' | 'edomites'
  | 'hethiens' | 'jebusiens' | 'cananeen' | 'perizziens' | 'hiviens'
  | 'guirgasiens' | 'arvadiens' | 'tsemariens' | 'hamathiens' | 'tsidonie'
  | 'tyr' | 'sidon' | 'damas' | 'palmyre' | 'petra' | 'babylone'
  | 'ninive' | 'assur' | 'egypte' | 'memphis' | 'thebes' | 'alexandria'
  | 'rome' | 'corinthe' | 'ephese' | 'philippes' | 'thessalonique'
  | 'beree' | 'athenes' | 'crete' | 'chypre' | 'malte' | 'antioche'
  | 'damas-paul' | 'tarce' | 'jerusalem' | 'bethlehem' | 'nazareth'
  | 'capernaum' | 'cana' | 'nain' | 'jericho' | 'emmaus' | 'bethabara'
  | 'bethsaida' | 'chorazin' | 'magdala' | 'bethanie' | 'gethsemane'
  | 'golgotha' | 'arimathie' | 'cyrene' | 'samarie' | 'sychar' | 'puits-jacob'
  | 'mont-carmel' | 'mont-horeb' | 'mont-sinai' | 'mont-nebo' | 'mont-hermon'
  | 'mont-tabor' | 'mont-oliviers' | 'mont-sion' | 'mont-morija' | 'vallee-josaphat'
  | 'vallee-hinnom' | 'cedron' | 'jourdain' | 'mer-morte' | 'lac-tiberiade'
  | 'mer-rouge' | 'nil' | 'euphrate' | 'tigre' | 'pison' | 'guihon'
  | 'arche-alliance' | 'tabernacle' | 'temple-salomon' | 'temple-herode' | 'sanctuaire'
  | 'saint-lieux' | 'tres-saint' | 'autel-holocaustes' | 'autel-parfums' | 'chandelier'
  | 'table-pains' | 'voile-temple' | 'propitiatoire' | 'cherubin' | 'urim-thummim'
  | 'ephod' | 'pectoral' | 'robe-ephod' | 'tunique' | 'tiare' | 'lame-or'
  | 'ceinture' | 'calecons' | 'huile-onction' | 'parfum-saint' | 'encens'
  | 'manne' | 'cailles' | 'eau-rocher' | 'serpent-airain' | 'nuee-gloire'
  | 'colonne-feu' | 'colonne-nuee' | 'shekinah' | 'kabod' | 'ruach'
  | 'elohim' | 'adonai' | 'yahveh' | 'el-shaddai' | 'emmanuel' | 'messie'
  | 'christ' | 'fils-homme' | 'fils-dieu' | 'agneau-dieu' | 'lion-juda'
  | 'roi-rois' | 'seigneur-seigneurs' | 'alpha-omega' | 'je-suis' | 'parole'
  | 'logos' | 'esprit-saint' | 'paraclet' | 'consolateur' | 'esprit-verite'
  | 'trinite' | 'pere-fils-saint-esprit' | 'bapteme-jesus' | 'transfiguration'
  | 'ascension' | 'seconde-venue' | 'parousie' | 'enlevement' | 'resurrection-morts'
  | 'jugement-dernier' | 'nouveau-ciel' | 'nouvelle-terre' | 'nouvelle-jerusalem'
  | 'paradis' | 'enfer' | 'sheol' | 'hades' | 'gehenne' | 'lac-feu'
  | 'salut' | 'redemption' | 'justification' | 'sanctification' | 'glorification'
  | 'grace' | 'foi' | 'esperance' | 'charite' | 'amour-agape' | 'communion'
  | 'fellowship' | 'koinonia' | 'ecclesia' | 'eglise-corps-christ' | 'epouse-christ'
  | 'bapteme-eau' | 'bapteme-esprit' | 'cene' | 'communion-pain-vin' | 'eucharistie'
  | 'dons-esprit' | 'fruits-esprit' | 'charismes' | 'ministeres' | 'apostolat'
  | 'prophetie' | 'evangelisation' | 'enseignement' | 'pastorat' | 'diaconie'
  | 'anciens' | 'diacres' | 'eveques' | 'presbyteres' | 'surveillants'
  | 'serviteurs' | 'sacrificateurs' | 'levites' | 'nazireens' | 'recabites';

export interface QuizConfig {
  difficulty: DifficultyLevel;
  theme: QuizTheme;
  questionCount: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  verse?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  badge: string;
}
