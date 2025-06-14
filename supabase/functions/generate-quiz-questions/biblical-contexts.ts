
export interface BiblicalContext {
  id: string;
  title: string;
  context: string;
  keyVerses?: string[];
}

export const biblicalContexts: BiblicalContext[] = [
  // Jésus-Christ
  {
    id: 'vie-jesus',
    title: 'La Vie de Jésus-Christ',
    context: 'L\'étude complète de la vie terrestre de Jésus-Christ, depuis sa naissance miraculeuse à Bethléem jusqu\'à son ascension glorieuse. Cette thématique couvre les événements majeurs : l\'Incarnation, les miracles, les paraboles, la passion, la crucifixion, la résurrection et l\'ascension. Les questions exploreront les enseignements du Seigneur, ses interactions avec les disciples et les foules, ainsi que l\'accomplissement des prophéties messianiques.',
    keyVerses: ['Jean 1:1-14', 'Matthieu 1:23', 'Luc 2:7', 'Jean 3:16', 'Matthieu 28:18-20', 'Actes 1:9-11']
  },
  {
    id: 'miracles-jesus',
    title: 'Les Miracles de Jésus',
    context: 'L\'étude des œuvres miraculeuses de Jésus-Christ qui attestent sa divinité et sa compassion. Ces miracles incluent les guérisons, les résurrections, les multiplications, la domination sur la nature et les délivrances spirituelles. Chaque miracle révèle un aspect de la nature divine du Christ et préfigure l\'œuvre du salut.',
    keyVerses: ['Matthieu 14:13-21', 'Marc 4:35-41', 'Jean 11:1-44', 'Luc 5:12-16', 'Matthieu 8:1-4', 'Marc 2:1-12']
  },
  {
    id: 'paraboles-jesus',
    title: 'Les Paraboles de Jésus',
    context: 'L\'étude des enseignements de Jésus à travers les paraboles, ces récits terrestres aux vérités célestes. Les paraboles révèlent les mystères du Royaume des cieux, l\'amour de Dieu, la repentance, le pardon et la vie chrétienne. Chaque parabole contient des leçons spirituelles profondes pour la foi et la conduite.',
    keyVerses: ['Matthieu 13:3-9', 'Luc 15:11-32', 'Matthieu 25:14-30', 'Luc 10:25-37', 'Matthieu 20:1-16', 'Marc 4:26-29']
  },
  {
    id: 'passion-christ',
    title: 'La Passion du Christ',
    context: 'L\'étude détaillée des derniers jours de Jésus sur terre, depuis son entrée triomphale à Jérusalem jusqu\'à sa crucifixion. Cette période inclut la Cène, l\'agonie à Gethsémané, l\'arrestation, les procès, la flagellation et la crucifixion. Ces événements constituent le cœur de l\'Évangile et l\'accomplissement du plan de salut.',
    keyVerses: ['Matthieu 26:26-28', 'Luc 22:39-46', 'Jean 19:1-7', 'Matthieu 27:32-56', 'Luc 23:34', 'Jean 19:28-30']
  },
  {
    id: 'resurrection',
    title: 'La Résurrection du Christ',
    context: 'L\'étude de l\'événement central de la foi chrétienne : la résurrection de Jésus-Christ. Cette thématique couvre la découverte du tombeau vide, les apparitions aux disciples, les preuves de la résurrection et ses implications théologiques pour le salut et l\'espérance chrétienne.',
    keyVerses: ['Matthieu 28:1-10', 'Luc 24:13-35', 'Jean 20:11-18', '1 Corinthiens 15:3-8', 'Actes 1:3', 'Romains 6:4']
  },
  {
    id: 'bapteme-jesus',
    title: 'Le Baptême de Jésus',
    context: 'L\'étude du baptême de Jésus par Jean-Baptiste dans le Jourdain, événement qui marque le début du ministère public du Christ. Cette scène révèle la Trinité, l\'onction de l\'Esprit Saint et la voix du Père céleste proclamant Jésus comme son Fils bien-aimé.',
    keyVerses: ['Matthieu 3:13-17', 'Marc 1:9-11', 'Luc 3:21-22', 'Jean 1:32-34']
  },
  {
    id: 'transfiguration',
    title: 'La Transfiguration',
    context: 'L\'étude de la transfiguration de Jésus sur la montagne sainte, événement où sa gloire divine fut révélée à Pierre, Jacques et Jean. Cette manifestation extraordinaire, avec l\'apparition de Moïse et d\'Élie, confirme la divinité du Christ et préfigure sa gloire éternelle.',
    keyVerses: ['Matthieu 17:1-8', 'Marc 9:2-8', 'Luc 9:28-36', '2 Pierre 1:16-18']
  },
  {
    id: 'ascension',
    title: 'L\'Ascension du Christ',
    context: 'L\'étude de l\'ascension de Jésus-Christ au ciel, quarante jours après sa résurrection. Cet événement marque l\'achèvement de son œuvre terrestre et son retour auprès du Père, ainsi que la promesse de son retour glorieux et l\'envoi du Saint-Esprit.',
    keyVerses: ['Actes 1:9-11', 'Luc 24:50-53', 'Marc 16:19', 'Éphésiens 4:8-10']
  },

  // Nouveau Testament
  {
    id: 'evangeliles',
    title: 'Les Évangiles',
    context: 'L\'étude des quatre récits évangéliques : Matthieu, Marc, Luc et Jean. Chaque évangile présente Jésus sous un angle particulier et s\'adresse à un public spécifique, offrant une perspective unique sur la vie, l\'enseignement et l\'œuvre du Christ.',
    keyVerses: ['Matthieu 1:1', 'Marc 1:1', 'Luc 1:1-4', 'Jean 1:1-14', 'Jean 20:31']
  },
  {
    id: 'mathieu',
    title: 'L\'Évangile de Matthieu',
    context: 'L\'étude de l\'évangile de Matthieu, écrit principalement pour les Juifs, présentant Jésus comme le Messie promis et le Roi d\'Israël. Cet évangile met l\'accent sur l\'accomplissement des prophéties et contient le Sermon sur la Montagne.',
    keyVerses: ['Matthieu 1:1', 'Matthieu 5:1-12', 'Matthieu 16:16', 'Matthieu 28:18-20']
  },
  {
    id: 'marc',
    title: 'L\'Évangile de Marc',
    context: 'L\'étude de l\'évangile de Marc, le plus court des évangiles, présentant Jésus comme le Serviteur de Dieu. Marc met l\'accent sur les actions et les miracles de Jésus, révélant sa puissance divine et son service désintéressé.',
    keyVerses: ['Marc 1:1', 'Marc 10:43-45', 'Marc 8:29', 'Marc 16:15']
  },
  {
    id: 'luc',
    title: 'L\'Évangile de Luc',
    context: 'L\'étude de l\'évangile de Luc, écrit par le médecin bien-aimé, présentant Jésus comme l\'Homme parfait et le Sauveur universel. Luc souligne la compassion de Jésus pour les marginaux et son amour pour tous les peuples.',
    keyVerses: ['Luc 1:1-4', 'Luc 2:10-11', 'Luc 19:10', 'Luc 24:47']
  },
  {
    id: 'jean-evangeliste',
    title: 'L\'Évangile de Jean',
    context: 'L\'étude de l\'évangile de Jean, l\'évangile spirituel présentant Jésus comme le Fils de Dieu et la Parole éternelle. Jean met l\'accent sur la divinité du Christ et contient les "Je suis" révélant l\'identité divine de Jésus.',
    keyVerses: ['Jean 1:1-14', 'Jean 3:16', 'Jean 14:6', 'Jean 20:30-31']
  },
  {
    id: 'actes-apotres',
    title: 'Les Actes des Apôtres',
    context: 'L\'étude du livre des Actes, récit de l\'expansion de l\'Église primitive sous la direction du Saint-Esprit. Ce livre couvre la Pentecôte, les premiers témoignages, les persécutions et les voyages missionnaires de Paul.',
    keyVerses: ['Actes 1:8', 'Actes 2:1-4', 'Actes 9:1-19', 'Actes 13:2-3', 'Actes 28:31']
  },
  {
    id: 'jean-baptiste',
    title: 'Jean-Baptiste, le Précurseur du Messie',
    context: 'L\'étude détaillée de la vie et du ministère de Jean-Baptiste, le dernier et le plus grand des prophètes de l\'Ancien Testament. Fils de Zacharie et Élisabeth, Jean fut appelé dès le ventre de sa mère à préparer le chemin du Seigneur. Son ministère de baptême dans le Jourdain, sa prédication de la repentance, son témoignage sur Jésus comme l\'Agneau de Dieu, et son martyre sous Hérode Antipas constituent les éléments centraux de cette thématique.',
    keyVerses: ['Luc 1:13-17', 'Matthieu 3:1-3', 'Jean 1:29', 'Matthieu 11:11', 'Marc 6:14-29', 'Luc 3:16']
  },

  // Apôtres
  {
    id: 'pierre-apotre',
    title: 'Pierre l\'Apôtre',
    context: 'L\'étude de Simon Pierre, le chef des douze apôtres, depuis son appel jusqu\'à son martyre. Pierre, malgré ses faiblesses humaines, devint le porte-parole des apôtres et le leader de l\'Église primitive. Son caractère impétueux, son reniement et sa restauration illustrent la grâce transformatrice de Dieu.',
    keyVerses: ['Matthieu 16:16-18', 'Jean 21:15-17', 'Actes 2:14-41', '1 Pierre 5:1-4']
  },
  {
    id: 'paul-apotre',
    title: 'Paul l\'Apôtre',
    context: 'L\'étude de Saul de Tarse devenu Paul, l\'apôtre des nations. Sa conversion dramatique sur le chemin de Damas, ses trois voyages missionnaires, ses épîtres doctrinales et son impact sur l\'expansion du christianisme primitif font de lui une figure centrale du Nouveau Testament.',
    keyVerses: ['Actes 9:1-19', 'Galates 2:20', 'Philippiens 3:7-8', 'Romains 1:16', '2 Timothée 4:7-8']
  },

  // Pentateuque
  {
    id: 'creation',
    title: 'La Création',
    context: 'L\'étude du récit de la création en Genèse, révélant Dieu comme Créateur souverain de l\'univers. Cette thématique couvre les six jours de création, la formation de l\'homme à l\'image de Dieu, l\'institution du sabbat et la relation originelle entre Dieu et l\'humanité dans le jardin d\'Éden.',
    keyVerses: ['Genèse 1:1', 'Genèse 1:27', 'Genèse 2:7', 'Genèse 2:15', 'Colossiens 1:16']
  },
  {
    id: 'genese',
    title: 'Le Livre de la Genèse',
    context: 'L\'étude du premier livre de la Bible, couvrant les origines du monde, de l\'humanité et du peuple de Dieu. La Genèse présente les récits fondamentaux : la création, la chute, le déluge, l\'appel d\'Abraham et l\'histoire des patriarches jusqu\'à Joseph en Égypte.',
    keyVerses: ['Genèse 1:1', 'Genèse 3:15', 'Genèse 12:1-3', 'Genèse 50:20']
  },
  {
    id: 'exode',
    title: 'Le Livre de l\'Exode',
    context: 'L\'étude de la sortie d\'Égypte et de la formation d\'Israël comme nation théocratique. L\'Exode raconte l\'oppression en Égypte, l\'appel de Moïse, les dix plaies, la Pâque, la traversée de la mer Rouge et la réception de la Loi au Sinaï.',
    keyVerses: ['Exode 3:14', 'Exode 12:13', 'Exode 14:21', 'Exode 20:1-17', 'Exode 25:8']
  },
  {
    id: 'commandements',
    title: 'Les Dix Commandements',
    context: 'L\'étude de la Loi morale donnée par Dieu à Moïse sur le mont Sinaï. Ces dix paroles constituent le fondement de l\'éthique biblique et révèlent la sainteté de Dieu ainsi que ses exigences pour une vie juste et droite.',
    keyVerses: ['Exode 20:1-17', 'Deutéronome 5:4-21', 'Matthieu 22:37-39']
  },

  // Patriarches
  {
    id: 'patriarches',
    title: 'Les Patriarches',
    context: 'L\'étude des pères de la foi : Abraham, Isaac et Jacob, fondateurs du peuple de Dieu. Leurs vies illustrent l\'alliance divine, la foi obéissante, les promesses de Dieu et la formation du caractère à travers les épreuves.',
    keyVerses: ['Genèse 12:1-3', 'Genèse 26:24', 'Genèse 28:13-15', 'Hébreux 11:8-22']
  },
  {
    id: 'abraham',
    title: 'Abraham, le Père de la Foi',
    context: 'L\'étude d\'Abraham, appelé d\'Ur des Chaldéens pour devenir le père de la nation d\'Israël. Son obéissance à l\'appel divin, sa foi lors du sacrifice d\'Isaac et l\'alliance éternelle que Dieu établit avec lui font d\'Abraham le modèle de la foi authentique.',
    keyVerses: ['Genèse 12:1-4', 'Genèse 15:6', 'Genèse 22:1-19', 'Romains 4:16-17']
  },
  {
    id: 'moise',
    title: 'Moïse, le Libérateur d\'Israël',
    context: 'L\'étude de Moïse, le plus grand prophète de l\'Ancien Testament, libérateur et législateur d\'Israël. Depuis sa naissance providentielle jusqu\'à sa mort sur le mont Nebo, Moïse incarne le leadership selon Dieu et la médiation entre Dieu et son peuple.',
    keyVerses: ['Exode 3:1-15', 'Deutéronome 34:10-12', 'Hébreux 11:24-28']
  },

  // Rois
  {
    id: 'david',
    title: 'David, le Roi selon le Cœur de Dieu',
    context: 'L\'étude du roi David, berger devenu roi d\'Israël, ancêtre du Messie et psalmiste inspiré. Sa vie illustre l\'élection divine, la foi victorieuse, la repentance sincère et l\'alliance davidique éternelle.',
    keyVerses: ['1 Samuel 16:7', '2 Samuel 7:12-16', 'Psaume 23', 'Psaume 51', 'Actes 13:22']
  },
  {
    id: 'salomon',
    title: 'Salomon, le Roi Sage',
    context: 'L\'étude du roi Salomon, fils de David, connu pour sa sagesse extraordinaire et la construction du Temple de Jérusalem. Son règne glorieux mais aussi sa chute spirituelle enseignent sur les bénédictions et les responsabilités du leadership.',
    keyVerses: ['1 Rois 3:5-14', '1 Rois 6:1', '1 Rois 8:23', 'Ecclésiaste 12:13']
  },

  // Livres Poétiques
  {
    id: 'job',
    title: 'Job et le Mystère de la Souffrance',
    context: 'L\'étude du livre de Job, qui traite de la question universelle de la souffrance du juste. À travers les épreuves de Job, ses dialogues avec ses amis et la réponse de Dieu, ce livre explore la souveraineté divine et la foi authentique.',
    keyVerses: ['Job 1:21', 'Job 19:25-26', 'Job 38:4', 'Job 42:5-6']
  },
  {
    id: 'psalmes',
    title: 'Les Psaumes',
    context: 'L\'étude du livre des Psaumes, le recueil de cantiques et de prières d\'Israël. Ces 150 psaumes expriment toute la gamme des émotions humaines devant Dieu : louange, supplication, confession, action de grâces et espérance messianique.',
    keyVerses: ['Psaume 1:1-3', 'Psaume 23', 'Psaume 51', 'Psaume 119:105', 'Psaume 150']
  },
  {
    id: 'proverbes',
    title: 'Les Proverbes',
    context: 'L\'étude de la littérature sapientiale d\'Israël, principalement attribuée au roi Salomon. Les Proverbes enseignent la sagesse pratique pour la vie quotidienne, fondée sur la crainte de l\'Éternel et l\'obéissance à ses commandements.',
    keyVerses: ['Proverbes 1:7', 'Proverbes 3:5-6', 'Proverbes 31:30']
  },

  // Prophètes
  {
    id: 'prophetes',
    title: 'Les Prophètes',
    context: 'L\'étude des prophètes de l\'Ancien Testament, porte-paroles de Dieu auprès de son peuple. Ces hommes inspirés ont proclamé la Parole divine, appelé à la repentance, annoncé le jugement et prophétisé sur le Messie à venir.',
    keyVerses: ['Jérémie 1:9', 'Ézéchiel 3:17', 'Amos 3:7', 'Hébreux 1:1']
  },
  {
    id: 'esaie',
    title: 'Ésaïe, le Prophète Évangéliste',
    context: 'L\'étude du prophète Ésaïe et de son livre, surnommé "le cinquième évangile" pour ses nombreuses prophéties messianiques. Ésaïe prophétise sur l\'Emmanuel, le Serviteur souffrant et la gloire future du règne messianique.',
    keyVerses: ['Ésaïe 7:14', 'Ésaïe 9:6', 'Ésaïe 53:1-12', 'Ésaïe 55:11']
  },

  // Femmes
  {
    id: 'ruth',
    title: 'Ruth, la Fidélité Récompensée',
    context: 'L\'étude de Ruth la Moabite, belle-fille de Naomi, dont la fidélité et la piété la conduisent dans la lignée du Messie. Son histoire illustre la providence divine, la rédemption et l\'inclusion des nations dans le plan de salut.',
    keyVerses: ['Ruth 1:16-17', 'Ruth 2:12', 'Ruth 4:13-17']
  },
  {
    id: 'esther',
    title: 'Esther, la Reine Providentielle',
    context: 'L\'étude de la reine Esther qui, "pour un temps comme celui-ci", sauva le peuple juif du génocide planifié par Haman. Son courage et sa foi démontrent comment Dieu utilise ses serviteurs pour accomplir ses desseins.',
    keyVerses: ['Esther 4:14', 'Esther 4:16', 'Esther 8:6']
  },

  // Vue d'ensemble
  {
    id: 'ancien-testament',
    title: 'L\'Ancien Testament',
    context: 'L\'étude d\'ensemble des 39 livres de l\'Ancien Testament, depuis la Genèse jusqu\'à Malachie. Cette thématique englobe la création, les patriarches, l\'histoire d\'Israël, les rois, les prophètes et la sagesse biblique, préparant la venue du Messie.',
    keyVerses: ['Genèse 1:1', 'Exode 20:1-17', 'Deutéronome 6:4-5', 'Psaume 23', 'Ésaïe 53:5', 'Malachie 3:10']
  },
  {
    id: 'nouveau-testament',
    title: 'Le Nouveau Testament',
    context: 'L\'étude complète des 27 livres du Nouveau Testament, depuis Matthieu jusqu\'à l\'Apocalypse. Cette thématique couvre la vie du Christ, l\'établissement de l\'Église primitive, les épîtres apostoliques et les prophéties eschatologiques.',
    keyVerses: ['Matthieu 28:19', 'Jean 14:6', 'Actes 2:38', 'Romains 3:23', '1 Corinthiens 15:3-4', 'Apocalypse 21:4']
  },

  // Contextes par défaut pour les thèmes restants
  {
    id: 'nombres',
    title: 'Le Livre des Nombres',
    context: 'L\'étude du quatrième livre du Pentateuque, relatant les quarante années d\'errance d\'Israël dans le désert. Ce livre enseigne sur la fidélité de Dieu malgré l\'infidélité humaine, les conséquences de la rébellion et la préparation à l\'entrée en Terre Promise.',
    keyVerses: ['Nombres 14:34', 'Nombres 21:9', 'Nombres 23:19']
  },
  {
    id: 'deuteronome',
    title: 'Le Deutéronome',
    context: 'L\'étude du cinquième livre de Moïse, contenant ses derniers discours avant la conquête de Canaan. Le Deutéronome rappelle la Loi, exhorte à l\'obéissance et établit les principes pour la vie en Terre Promise.',
    keyVerses: ['Deutéronome 6:4-5', 'Deutéronome 8:3', 'Deutéronome 30:19-20']
  },
  {
    id: 'josue',
    title: 'Josué et la Conquête',
    context: 'L\'étude de Josué, successeur de Moïse, et de la conquête de la Terre Promise. Ce livre illustre la fidélité de Dieu à ses promesses et l\'importance de l\'obéissance pour recevoir les bénédictions divines.',
    keyVerses: ['Josué 1:8-9', 'Josué 24:15']
  },
  {
    id: 'juges-israel',
    title: 'Les Juges d\'Israël',
    context: 'L\'étude de la période troublée des Juges, caractérisée par des cycles de péché, oppression, repentance et délivrance. Cette époque révèle les conséquences de l\'apostasie et la miséricorde de Dieu qui suscite des libérateurs.',
    keyVerses: ['Juges 21:25', 'Juges 2:16']
  },
  {
    id: 'samuel',
    title: 'Samuel, le Prophète-Juge',
    context: 'L\'étude de Samuel, dernier juge et premier des prophètes-écrivains, qui oint les premiers rois d\'Israël. Sa vie illustre le service fidèle, l\'écoute de Dieu et la transition entre la théocratie et la monarchie.',
    keyVerses: ['1 Samuel 3:10', '1 Samuel 15:22']
  },
  {
    id: 'rois-israel',
    title: 'Les Rois d\'Israël et de Juda',
    context: 'L\'étude des rois du royaume divisé, leurs succès et leurs échecs spirituels. Cette période enseigne sur l\'importance du leadership pieux et les conséquences de l\'idolâtrie sur les nations.',
    keyVerses: ['1 Rois 11:11', '2 Chroniques 7:14']
  },
  {
    id: 'daniel',
    title: 'Daniel, l\'Homme de Prière',
    context: 'L\'étude de Daniel et de ses compagnons en exil babylonien. Leur fidélité à Dieu dans un environnement hostile et les visions prophétiques de Daniel révèlent la souveraineté divine sur l\'histoire.',
    keyVerses: ['Daniel 1:8', 'Daniel 3:17-18', 'Daniel 6:10']
  },
  {
    id: 'ezechiel',
    title: 'Ézéchiel et les Visions Prophétiques',
    context: 'L\'étude du prophète Ézéchiel et de ses visions extraordinaires pendant l\'exil babylonien. Ses prophéties traitent du jugement, de la restauration et de la gloire future du Temple.',
    keyVerses: ['Ézéchiel 36:26', 'Ézéchiel 37:1-14']
  },
  {
    id: 'jeremie',
    title: 'Jérémie, le Prophète des Larmes',
    context: 'L\'étude de Jérémie, prophète de la captivité babylonienne, surnommé "le prophète pleureur". Ses messages d\'avertissement et d\'espoir révèlent le cœur brisé de Dieu face au péché de son peuple.',
    keyVerses: ['Jérémie 1:5', 'Jérémie 29:11', 'Jérémie 31:31-34']
  },
  {
    id: 'elie-elisee',
    title: 'Élie et Élisée, les Prophètes Thaumaturges',
    context: 'L\'étude des prophètes Élie et Élisée, leurs miracles extraordinaires et leur combat contre l\'idolâtrie d\'Israël. Leurs ministères révèlent la puissance de Dieu et son soin pour les fidèles.',
    keyVerses: ['1 Rois 18:39', '2 Rois 2:11', '2 Rois 4:34']
  },
  {
    id: 'jonas',
    title: 'Jonas et la Miséricorde Divine',
    context: 'L\'étude du prophète Jonas et de sa mission à Ninive. Cette histoire enseigne sur l\'obéissance, la repentance, la miséricorde divine envers les nations et l\'universalité du salut.',
    keyVerses: ['Jonas 1:17', 'Jonas 3:10', 'Jonas 4:11']
  },
  {
    id: 'isaac',
    title: 'Isaac, le Fils de la Promesse',
    context: 'L\'étude d\'Isaac, fils d\'Abraham et de Sara, figure du sacrifice et de l\'obéissance. Sa vie illustre l\'accomplissement des promesses divines et préfigure le sacrifice du Christ.',
    keyVerses: ['Genèse 22:2', 'Genèse 26:3-4']
  },
  {
    id: 'jacob',
    title: 'Jacob-Israël, le Transformé',
    context: 'L\'étude de Jacob, dont la lutte avec l\'ange symbolise la transformation spirituelle. Devenu Israël, il devient le père des douze tribus et illustre la grâce transformatrice de Dieu.',
    keyVerses: ['Genèse 32:28', 'Genèse 35:10']
  },
  {
    id: 'joseph',
    title: 'Joseph, la Providence en Action',
    context: 'L\'étude de Joseph, vendu par ses frères mais élevé par Dieu au rang de vice-roi d\'Égypte. Sa vie démontre comment Dieu transforme le mal en bien pour l\'accomplissement de ses desseins.',
    keyVerses: ['Genèse 50:20', 'Genèse 41:39-40']
  },
  {
    id: 'noe',
    title: 'Noé et l\'Arche du Salut',
    context: 'L\'étude de Noé, prédicateur de justice qui construisit l\'arche selon les instructions divines. Le déluge et l\'alliance de l\'arc-en-ciel révèlent à la fois le jugement et la miséricorde de Dieu.',
    keyVerses: ['Genèse 6:9', 'Genèse 9:13', 'Hébreux 11:7']
  },
  {
    id: 'adam-eve',
    title: 'Adam et Ève, les Premiers Humains',
    context: 'L\'étude d\'Adam et Ève, créés à l\'image de Dieu mais tombés dans le péché. Leur histoire révèle la dignité originelle de l\'humanité, la réalité du péché et la promesse de rédemption.',
    keyVerses: ['Genèse 1:27', 'Genèse 3:15', 'Romains 5:12']
  },
  {
    id: 'cain-abel',
    title: 'Caïn et Abel, les Premiers Frères',
    context: 'L\'étude de Caïn et Abel, illustrant les deux voies possibles devant Dieu : l\'obéissance qui conduit à l\'acceptation ou la rébellion qui mène à la condamnation. Le premier meurtre révèle la progression du péché.',
    keyVerses: ['Genèse 4:4-5', 'Hébreux 11:4', '1 Jean 3:12']
  },
  {
    id: 'samson',
    title: 'Samson, la Force et la Faiblesse',
    context: 'L\'étude de Samson, juge d\'Israël doté d\'une force surnaturelle mais qui succomba aux tentations. Sa vie enseigne sur les dons de Dieu, les conséquences de la désobéissance et la possibilité de restauration.',
    keyVerses: ['Juges 13:5', 'Juges 16:17', 'Juges 16:30']
  },
  {
    id: 'femmes-bible',
    title: 'Les Femmes de la Bible',
    context: 'L\'étude des femmes remarquables de l\'Écriture : Marie, Esther, Ruth, Déborah, Anne et autres. Leurs vies illustrent la foi, le courage, la fidélité et le rôle important des femmes dans l\'histoire du salut.',
    keyVerses: ['Luc 1:38', 'Esther 4:14', 'Ruth 1:16', 'Juges 4:4']
  },
  {
    id: 'marie-mere-jesus',
    title: 'Marie, Mère de Jésus',
    context: 'L\'étude de Marie, choisie pour être la mère du Sauveur. Son Magnificat, sa foi lors de l\'Annonciation et sa présence au pied de la croix révèlent une femme de foi exemplaire.',
    keyVerses: ['Luc 1:38', 'Luc 1:46-55', 'Jean 19:25-27']
  },
  {
    id: 'marie-madeleine',
    title: 'Marie-Madeleine, Disciple Fidèle',
    context: 'L\'étude de Marie-Madeleine, délivrée par Jésus et devenue l\'une de ses disciples les plus fidèles. Première témoin de la résurrection, elle illustre la transformation par la grâce et la fidélité dans le service.',
    keyVerses: ['Luc 8:2', 'Jean 20:11-18']
  },
  {
    id: 'pentecote',
    title: 'La Pentecôte',
    context: 'L\'étude de la descente du Saint-Esprit sur les disciples à Jérusalem, marquant la naissance de l\'Église. Cet événement accomplit la promesse de Jésus et inaugure l\'ère de l\'évangélisation mondiale.',
    keyVerses: ['Actes 2:1-4', 'Actes 2:38-39']
  },
  {
    id: 'eglise-primitive',
    title: 'L\'Église Primitive',
    context: 'L\'étude des premières communautés chrétiennes, leur organisation, leur croissance et leurs défis. L\'exemple des premiers chrétiens révèle les caractéristiques d\'une église selon le cœur de Dieu.',
    keyVerses: ['Actes 2:42-47', 'Actes 4:32-35']
  },
  {
    id: 'voyages-paul',
    title: 'Les Voyages Missionnaires de Paul',
    context: 'L\'étude des trois voyages missionnaires de l\'apôtre Paul, sa stratégie d\'évangélisation et l\'établissement d\'églises dans tout l\'Empire romain. Ces voyages illustrent l\'expansion du christianisme primitif.',
    keyVerses: ['Actes 13:2-3', 'Actes 14:23', 'Actes 28:31']
  },
  {
    id: 'epitres-paul',
    title: 'Les Épîtres de Paul',
    context: 'L\'étude des lettres doctrinales de l\'apôtre Paul aux églises et aux individus. Ces épîtres contiennent l\'enseignement fondamental sur la foi chrétienne, la vie en Christ et l\'organisation ecclésiastique.',
    keyVerses: ['Romains 1:16', 'Galates 2:20', 'Éphésiens 2:8-9']
  },
  {
    id: 'pierre-jean',
    title: 'Les Épîtres de Pierre et Jean',
    context: 'L\'étude des épîtres de Pierre et Jean, traitant de l\'espérance chrétienne, de la sainteté, de l\'amour fraternel et de la vérité doctrinale face aux faux enseignements.',
    keyVerses: ['1 Pierre 1:3-4', '1 Jean 4:7-8', '2 Pierre 3:9']
  },
  {
    id: 'apocalypse',
    title: 'L\'Apocalypse',
    context: 'L\'étude de la révélation donnée à Jean sur l\'île de Patmos, concernant les derniers temps, le retour du Christ et l\'établissement de son royaume éternel. Ce livre révèle la victoire finale de Dieu.',
    keyVerses: ['Apocalypse 1:3', 'Apocalypse 19:11-16', 'Apocalypse 21:1-4']
  }
];

export function getBiblicalContext(themeId: string): BiblicalContext {
  const context = biblicalContexts.find(c => c.id === themeId);
  if (!context) {
    console.warn(`⚠️ Thème biblique non trouvé: ${themeId}, utilisation du contexte par défaut`);
    return {
      id: 'default',
      title: 'Connaissance Biblique Générale',
      context: 'Un sujet biblique fondamental qui mérite une étude approfondie des Écritures saintes. Les questions porteront sur les enseignements, personnages, événements et vérités doctrinales liés à ce thème, en s\'appuyant sur l\'ensemble de la révélation biblique.',
      keyVerses: ['2 Timothée 3:16', 'Psaume 119:105', '1 Pierre 1:25']
    };
  }
  return context;
}
