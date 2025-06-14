
export interface BiblicalContext {
  title: string;
  context: string;
  keyVerses: string[];
}

export const biblicalContexts: Record<string, BiblicalContext> = {
  // Jésus-Christ - Fondements doctrinaux
  'vie-jesus': {
    title: 'la vie de Jésus-Christ, le Fils de Dieu',
    context: 'Incarnation (Jean 1:14), naissance virginale à Bethléem (Matthieu 1:18-25, Luc 2:1-20), annonciation à Marie (Luc 1:26-38), fuite en Égypte (Matthieu 2:13-15), enfance à Nazareth (Luc 2:39-40), baptême par Jean-Baptiste dans le Jourdain (Matthieu 3:13-17), tentation au désert (Matthieu 4:1-11), appel des douze apôtres (Marc 3:13-19), sermon sur la montagne (Matthieu 5-7), miracles de guérison et résurrections, transfiguration (Matthieu 17:1-9), entrée triomphale à Jérusalem (Matthieu 21:1-11), dernière cène et institution de la communion (Matthieu 26:26-29), agonie à Gethsémané (Matthieu 26:36-46), arrestation et procès (Matthieu 26:47-27:31), crucifixion au Golgotha (Matthieu 27:32-56), résurrection le troisième jour (Matthieu 28:1-10), apparitions post-résurrection (Luc 24, Jean 20-21), ascension au ciel (Actes 1:9-11)',
    keyVerses: ['Jean 3:16', 'Jean 1:1', 'Philippiens 2:6-8', 'Hébreux 4:15', 'Matthieu 1:23']
  },
  'miracles-jesus': {
    title: 'les miracles de Jésus attestant sa divinité',
    context: 'Guérisons miraculeuses : aveugles-nés (Jean 9:1-12), paralytiques (Marc 2:1-12), lépreux (Matthieu 8:1-4), possédés (Marc 5:1-20), femme hémorroïsse (Marc 5:25-34), serviteur du centurion (Matthieu 8:5-13), belle-mère de Pierre (Matthieu 8:14-15), homme à la main sèche (Matthieu 12:9-13), sourd-muet (Marc 7:31-37), aveugle de Bethsaïda (Marc 8:22-26), dix lépreux (Luc 17:11-19). Résurrections : fille de Jaïrus (Marc 5:35-43), fils de la veuve de Naïn (Luc 7:11-17), Lazare après quatre jours (Jean 11:1-44). Miracles sur la nature : multiplication des pains et poissons (Matthieu 14:13-21, 15:32-39), marche sur les eaux (Matthieu 14:22-33), tempête apaisée (Marc 4:35-41), pêche miraculeuse (Luc 5:1-11, Jean 21:1-11), eau changée en vin à Cana (Jean 2:1-11), figuier desséché (Matthieu 21:18-22), pièce dans la bouche du poisson (Matthieu 17:24-27)',
    keyVerses: ['Jean 20:30-31', 'Matthieu 11:4-5', 'Marc 16:20', 'Actes 2:22', 'Hébreux 2:4']
  },
  'paraboles-jesus': {
    title: 'les paraboles de Jésus, enseignements du Royaume',
    context: 'Paraboles du Royaume des cieux : semeur (Matthieu 13:1-23), ivraie (Matthieu 13:24-30), grain de moutarde (Matthieu 13:31-32), levain (Matthieu 13:33), trésor caché (Matthieu 13:44), perle de grand prix (Matthieu 13:45-46), filet (Matthieu 13:47-50), maître de maison (Matthieu 13:52). Paraboles de miséricorde : bon Samaritain (Luc 10:25-37), fils prodigue (Luc 15:11-32), brebis perdue (Luc 15:3-7), drachme perdue (Luc 15:8-10), pharisien et publicain (Luc 18:9-14). Paraboles d\'exhortation : bon et mauvais serviteur (Matthieu 24:45-51), dix vierges (Matthieu 25:1-13), talents (Matthieu 25:14-30), ouvriers de la vigne (Matthieu 20:1-16), riche insensé (Luc 12:16-21), intendant infidèle (Luc 16:1-13), juge inique (Luc 18:1-8), ami importun (Luc 11:5-8)',
    keyVerses: ['Matthieu 13:34-35', 'Marc 4:33-34', 'Luc 8:10', 'Matthieu 13:11', 'Psaume 78:2']
  },

  // Apôtres
  'jacques-apotre': {
    title: 'Jacques l\'Apôtre, frère de Jean et pilier de l\'Église',
    context: 'Jacques, fils de Zébédée et frère de Jean, appelé avec son frère par Jésus près de la mer de Galilée (Matthieu 4:21-22, Marc 1:19-20). Surnommé avec Jean "Boanergès" (fils du tonnerre) à cause de leur zèle ardent (Marc 3:17). Témoin privilégié de la transfiguration sur la montagne sainte avec Pierre et Jean (Matthieu 17:1-9, Marc 9:2-8, Luc 9:28-36). Présent lors de la résurrection de la fille de Jaïrus (Marc 5:37, Luc 8:51). Accompagne Jésus dans ses derniers moments à Gethsémané (Matthieu 26:37, Marc 14:33). Demande avec Jean les places d\'honneur dans le royaume (Matthieu 20:20-28, Marc 10:35-45). Premier apôtre martyr, mis à mort par l\'épée sur ordre d\'Hérode Agrippa Ier vers 44 ap. J.-C. (Actes 12:1-2). Son martyre marque le début des persécutions contre les dirigeants de l\'Église primitive. Membre du cercle intime des Douze avec Pierre et Jean.',
    keyVerses: ['Actes 12:2', 'Marc 3:17', 'Matthieu 17:1', 'Marc 10:39', 'Luc 9:54']
  },

  // Pentateuque - Fondements de la foi
  'creation': {
    title: 'la création du monde par la Parole de Dieu',
    context: 'Six jours de création (Genèse 1:1-31) : Jour 1 -lumière/ténèbres, Jour 2 -firmament/eaux, Jour 3 -terre sèche/végétation, Jour 4 -astres/luminaires, Jour 5 -animaux marins/oiseaux, Jour 6 -animaux terrestres/homme créé à l\'image de Dieu (Genèse 1:26-27), Jour 7 -sabbat de repos (Genèse 2:1-3). Formation de l\'homme de la poussière (Genèse 2:7), souffle de vie, jardin d\'Éden planté par l\'Éternel (Genèse 2:8), arbre de vie et arbre de la connaissance du bien et du mal (Genèse 2:9), quatre fleuves (Genèse 2:10-14), commandement divin (Genèse 2:16-17), création de la femme (Genèse 2:18-25), nudité sans honte (Genèse 2:25), chute par désobéissance (Genèse 3:1-7), conséquences du péché (Genèse 3:8-24), promesse du Rédempteur (Genèse 3:15)',
    keyVerses: ['Genèse 1:1', 'Genèse 1:26-27', 'Genèse 2:7', 'Jean 1:3', 'Colossiens 1:16']
  },
  'moise': {
    title: 'Moïse, législateur et libérateur choisi par Dieu',
    context: 'Naissance en Égypte pendant l\'oppression (Exode 1:8-22), sauvé des eaux du Nil (Exode 2:1-10), éducation à la cour de Pharaon (Actes 7:22), fuite au pays de Madian après le meurtre de l\'Égyptien (Exode 2:11-22), mariage avec Séphora (Exode 2:21), appel divin au buisson ardent (Exode 3:1-4:17), "Je suis celui qui suis" (Exode 3:14), mission de libération avec Aaron (Exode 4:14-16), dix plaies d\'Égypte (Exode 7-12), institution de la Pâque (Exode 12:1-28), sortie d\'Égypte et passage de la mer Rouge (Exode 14), cantique de victoire (Exode 15), don de la manne (Exode 16), eau du rocher (Exode 17:1-7), victoire contre Amalek (Exode 17:8-16), don de la Loi au Sinaï (Exode 19-20), intercession pour le peuple (Exode 32:11-14), face rayonnante (Exode 34:29-35), construction du tabernacle (Exode 25-40), mort sur le mont Nébo (Deutéronome 34:1-8)',
    keyVerses: ['Exode 3:14', 'Deutéronome 18:15', 'Hébreux 11:24-26', 'Nombres 12:3', 'Deutéronome 34:10']
  },

  // Nouveau Testament - Église primitive
  'actes-apotres': {
    title: 'les Actes des Apôtres et l\'Église naissante',
    context: 'Promesse du Saint-Esprit (Actes 1:4-8), ascension de Jésus (Actes 1:9-11), élection de Matthias (Actes 1:15-26), Pentecôte et descente de l\'Esprit (Actes 2:1-13), prédication de Pierre (Actes 2:14-41), 3000 convertis, vie communautaire (Actes 2:42-47), guérison du paralytique (Actes 3:1-10), arrestation de Pierre et Jean (Actes 4:1-22), prière de l\'Église (Actes 4:23-31), Ananias et Saphira (Actes 5:1-11), signes et prodiges (Actes 5:12-16), persécution du sanhédrin (Actes 5:17-42), élection des sept diacres (Actes 6:1-7), martyre d\'Étienne (Actes 7:54-60), persécution de Saul (Actes 8:1-3), Philippe en Samarie (Actes 8:4-25), conversion de l\'eunuque éthiopien (Actes 8:26-40), conversion de Saul sur le chemin de Damas (Actes 9:1-19), vision de Pierre et Corneille (Actes 10), Église d\'Antioche (Actes 11:19-30), mort d\'Hérode Agrippa (Actes 12:20-23), premier voyage missionnaire (Actes 13-14), concile de Jérusalem (Actes 15), expansion vers l\'Europe (Actes 16:6-10), ministère à Philippes, Thessalonique, Bérée, Athènes, Corinthe (Actes 16-18), troisième voyage (Actes 18:23-21:17), arrestation à Jérusalem (Actes 21:17-23:35), procès devant Félix et Festus (Actes 24-26), voyage vers Rome et naufrage (Actes 27-28)',
    keyVerses: ['Actes 1:8', 'Actes 2:41', 'Actes 4:12', 'Actes 9:15', 'Actes 20:28']
  },

  // Prophètes
  'esaie': {
    title: 'Ésaïe, le prophète messianique par excellence',
    context: 'Appel prophétique et vision du temple (Ésaïe 6:1-13), Emmanuel (Ésaïe 7:14), enfant qui nous est né (Ésaïe 9:5-6), rejeton d\'Isaï (Ésaïe 11:1-10), chants du Serviteur souffrant (Ésaïe 42:1-9, 49:1-13, 50:4-11, 52:13-53:12), "Il a été blessé pour nos péchés" (Ésaïe 53:5), consolation d\'Israël (Ésaïe 40:1-11), "Voix de celui qui crie dans le désert" (Ésaïe 40:3), "Tous comme des brebis nous étions errants" (Ésaïe 53:6), libération de l\'exil babylonien par Cyrus (Ésaïe 44:28-45:13), nouveaux cieux et nouvelle terre (Ésaïe 65:17-25), jugement des nations (Ésaïe 13-23), petite apocalypse (Ésaïe 24-27), malheurs contre Juda et Jérusalem (Ésaïe 28-35), Ézéchias et Sanchérib (Ésaïe 36-39), livre de la consolation (Ésaïe 40-66)',
    keyVerses: ['Ésaïe 7:14', 'Ésaïe 9:5', 'Ésaïe 53:5-6', 'Ésaïe 40:3', 'Ésaïe 6:3']
  },

  // Pour tous les autres thèmes, on utilise un contexte générique mais bibliquement correct
  'default': {
    title: 'ce thème biblique important',
    context: 'Un sujet biblique fondamental qui mérite une étude approfondie des Écritures saintes. Les questions porteront sur les enseignements, personnages, événements et vérités doctrinales liés à ce thème, en s\'appuyant sur l\'ensemble de la révélation biblique.',
    keyVerses: ['2 Timothée 3:16', 'Psaume 119:105', '1 Pierre 1:25']
  }
};

export function getBiblicalContext(theme: string): BiblicalContext {
  return biblicalContexts[theme] || biblicalContexts['default'];
}
