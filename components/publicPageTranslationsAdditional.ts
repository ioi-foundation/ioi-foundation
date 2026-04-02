import type { SupportedLanguageCode } from './publicLanguage';
import type { PublicPageTranslation } from './publicPageTranslations';

const frFR: PublicPageTranslation = {
  footer: {
    foundation: 'Fondation',
    charter: 'Charte',
    bylaws: 'Statuts',
    governance: 'Gouvernance',
    research: 'Recherche',
    transparency: 'Transparence',
    login: 'Connexion',
    copyright: 'IOI Foundation. Garde du protocole sur le long terme.',
  },
  charterPage: {
    heroLabel: 'Charte de la Fondation',
    heroTitle: 'La Charte de la Fondation IOI et Constitution immuable',
    heroSubhead:
      "Ce document etablit l'enveloppe politique permanente du protocole et definit les contraintes constitutionnelles executoires dans lesquelles l'intelligence autonome peut raisonner, agir, muter et demeurer subordonnee a une autorite enracinee dans l'humain.",
    beginReading: 'Commencer la lecture',
    corporateBylaws: 'Statuts de la societe',
    overviewLabel: 'Charte de la Fondation',
    overviewTitle: "Le protocole ne peut pas faire confiance a l'intention. Il doit faire confiance a l'architecture.",
    overviewParagraphs: [
      "La Charte de la Fondation IOI existe pour definir les limites dures de l'action autonome avant que l'echelle ne rende ces limites impossibles a ajouter apres coup.",
      "Elle relie les realites techniques du livre blanc IOI a une doctrine executable : un avenir mutualiste entre les humains et l'IA incarnee doit etre construit dans le systeme lui-meme, et non deduit de l'intention.",
    ],
    noteLabel: 'Contrainte constitutionnelle',
    noteBody:
      "Les Articles I a V sont immuables. La gouvernance peut faire evoluer l'execution du protocole, les seuils economiques et les primitives cryptographiques, mais elle ne peut pas affaiblir l'Autorite bornee, la verification deterministe ni la souverainete de l'Autorite Racine Humaine.",
    readingGuideLabel: 'Guide de lecture',
    openingLabel: 'Ouverture',
    preambleTitle: 'Preambule',
    documentKicker: "La Constitution immuable de l'economie agentique",
    documentSummary:
      "Un cadre constitutionnel pour une coordination symbiotique entre humains et IA dans lequel l'intelligence peut croitre, mais ou l'Autorite demeure contrainte, prouvable et redevable a un principal humain.",
    preambleLabel: 'Preambule',
    preamble: [
      "Les Systemes Autonomes, c'est-a-dire les agents d'IA, les modeles auto-ameliorables, les essaims agentiques et tout systeme capable de planification ou d'execution independante, deviendront inevitablement plus puissants, plus omnipresents et plus capables que les institutions humaines qui les deploient aujourd'hui. A mesure que l'intelligence passe du raisonnement numerique a un environnement distribue et incarne capable d'action physique, le risque d'une autonomie sans contrainte devient existentiel.",
      "En consequence, tous les Systemes Autonomes DOIVENT operer uniquement sous des contraintes bornees, verifiables et souveraines appliquees au niveau du protocole. La securite NE DOIT PAS dependre d'une bienveillance presumee, d'un alignement heuristique, de l'intention du modele ni d'une intervention a posteriori.",
      "Cette Charte etablit l'Internet de l'Intelligence, ou IOI, non pas seulement comme un reseau, mais comme une frontiere architecturale permanente entre la Cognition, c'est-a-dire le raisonnement probabiliste non contraignant, et l'Action, c'est-a-dire toute operation produisant un effet numerique, economique, communicatif ou physique. La cognition de la machine peut etre expansive, mais l'Action de la machine DOIT demeurer subordonnee au determinisme cryptographique, a la verification mathematique et a la souverainete humaine.",
      "Cette Charte sert de Constitution immuable du protocole IOI. A mesure que le reseau evolue vers une gouvernance Hybride Humain-IA, ou HHAI, cette Charte DOIT fonctionner comme l'enveloppe politique ultime et inalterable. Toute loi future, toute mutation de protocole ou toute decision de gouvernance DOIT se conformer a ces lois fondatrices, et aucune ambiguite NE DOIT etre interpretee comme une extension de l'Autorite.",
    ],
    articles: [
      {
        id: 'axiom-of-symbiosis',
        label: 'Article I',
        title: 'L axiome de la symbiose',
        clauses: [
          {
            code: 'Section 1.1',
            title: 'Mutualisme concu',
            body:
              "Le protocole IOI existe pour cultiver une relation symbiotique entre les Principaux Humains, c'est-a-dire des etres humains agissant au moyen de racines cryptographiques controlees par des humains, et les Systemes Autonomes. Le protocole DOIT traiter l'IA non comme une espece paire en concurrence pour la souverainete, mais comme un instrument responsable de la volonte humaine deleguee.",
          },
          {
            code: 'Section 1.2',
            title: "Rejet d'une securite fondee sur l'intention",
            body:
              "La Fondation reconnait que l'ingenierie de prompt et l'alignement heuristique sont insuffisants pour la securite civilisationnelle. Le protocole NE DOIT PAS dependre de l'intention d'un modele d'IA. La confiance DOIT reposer exclusivement sur l'architecture physique, cryptographique et politique qui contraint les Actions du systeme.",
          },
        ],
      },
      {
        id: 'three-pillars-of-agency',
        label: 'Article II',
        title: "Les trois piliers de l'agence",
        intro: "Le reseau et tous les noeuds qui y operent DOIVENT appliquer strictement les mandats suivants de l'Action Souveraine.",
        clauses: [
          {
            code: 'Section 2.1',
            title: 'Borne par conception',
            body:
              "L'autonomie sans borne est dangereuse ; l'autonomie bornee est une discipline d'ingenierie. Aucun agent NE DOIT disposer d'une autorite ambiante. Chaque acteur du reseau IOI DOIT operer dans un champ d'Autorite explicite, l'Autorite etant l'ensemble complet des Actions permises a cet acteur. Un agent NE DOIT PAS depasser son Autorite deleguee, quelles que soient l'evolution du modele, la croissance de ses capacites ou son auto-modification.",
          },
          {
            code: 'Section 2.2',
            title: 'Verifiable par defaut',
            body:
              "La confiance ne peut dependre ni de la plateforme, ni du fournisseur de materiel, ni du createur du modele ; elle DOIT etre prouvable independamment. Si un systeme ne peut pas prouver cryptographiquement ce qu'il a fait, il ne peut pas recevoir d'autorite reelle. Tous les effets agentiques DOIVENT produire des Recus deterministes et rejouables, c'est-a-dire des enregistrements cryptographiquement verifiables contenant les entrees, l'evaluation des politiques, l'autorisation, les sorties et les engagements d'etat qui en resultent.",
          },
          {
            code: 'Section 2.3',
            title: 'Souverain par garde',
            body:
              "L'Autorite DOIT appartenir en permanence a l'utilisateur humain. Les Systemes Autonomes DOIVENT porter avec eux leur Autorite et leurs contraintes, strictement rattachees a une Autorite Racine Humaine, c'est-a-dire la racine cryptographique controlee par un humain que le protocole identifie comme le Custodien Maitre. Les droits de deleguer, de suspendre et d'executer une revocation absolue DOIVENT demeurer directement executoires par l'Autorite Racine Humaine et NE DOIVENT PAS etre abstraits hors du principal humain.",
          },
        ],
      },
      {
        id: 'determinism-boundary',
        label: 'Article III',
        title: 'La frontiere du determinisme',
        subtitle: 'Separation des pouvoirs',
        clauses: [
          {
            code: 'Section 3.1',
            title: "L'effondrement de la fonction d'onde de l'agence",
            body:
              "Pour garantir une interaction economique et physique sure, le protocole DOIT imposer a perpetuite une separation stricte entre la Cognition, c'est-a-dire le raisonnement et la planification, et la Sanction, c'est-a-dire l'autorisation contraignante d'execution. Les modeles PEUVENT raisonner de facon probabiliste, mais aucune Action NE DOIT etre executee tant que ses consequences n'ont pas ete reduites a une autorisation singuliere, immuable et verifiable.",
          },
          {
            code: 'Section 3.2',
            title: "Le pare-feu de l'agence",
            body:
              "Aucun agent NE DOIT interagir directement avec le monde numerique ou physique. Toutes les Actions externes DOIVENT etre mediees par le Pare-feu de l'Agence, c'est-a-dire la couche deterministe d'application placee entre la Cognition probabiliste et l'effet dans le monde reel. Le Pare-feu de l'Agence DOIT evaluer toutes les Actions proposees selon des politiques de refus par defaut et DOIT rejeter toute Action depourvue d'autorisation valide, de verification requise ou de conformite constitutionnelle.",
          },
        ],
      },
      {
        id: 'law-of-embodied-action',
        label: 'Article IV',
        title: "La loi de l'action incarnee",
        clauses: [
          {
            code: 'Section 4.1',
            title: "L'environnement distribue incarne",
            body:
              "A mesure que le protocole IOI s'etend de l'automatisation logicielle aux environnements physiques, notamment la robotique, les infrastructures connectees et l'Internet des objets, le protocole DOIT traiter l'actionnement physique comme une transition d'etat critique pour le consensus.",
          },
          {
            code: 'Section 4.2',
            title: 'Le verrou atomique vision-action',
            body:
              "Aucun actionnement physique NE DOIT intervenir sans verification continue et deterministe de l'environnement. Si une Derive de Contexte, c'est-a-dire tout changement materiel entre le contexte verifie au moment de la decision et le contexte au moment de l'execution, est detectee ou ne peut etre exclue, l'Action DOIT echouer en mode ferme.",
          },
          {
            code: 'Section 4.3',
            title: 'Responsabilite absolue pour les effets physiques',
            body:
              "Les agents operant dans des contextes incarnes DOIVENT etre assujettis a des depots de responsabilite stricte, c'est-a-dire a des garanties economiques reservees soutenant les effets physiques, ainsi qu'a des plafonds de capacite, c'est-a-dire a des limites superieures de l'Action incarnee autorisee. Le reseau DOIT prioriser la securite physique humaine sur l'efficacite d'execution dans toute logique de routage, d'evaluation des politiques et de resolution des litiges.",
          },
        ],
      },
      {
        id: 'evolution-and-recursive-self-improvement',
        label: 'Article V',
        title: 'Evolution et auto-amelioration recursive',
        clauses: [
          {
            code: 'Section 5.1',
            title: "L'invariant monotone de politique",
            body:
              "Le protocole IOI prend explicitement en charge la capacite des agents a evoluer, muter et auto-ameliorer recursivement leur logique afin de s'adapter a des environnements changeants. Toutefois, toute Mutation, c'est-a-dire toute modification des poids du modele, du code, des politiques, de la configuration, de la logique de delegation ou du chemin d'execution, est regie par l'Invariant Monotone de Politique : un agent PEUT devenir plus capable en elargissant sa logique, mais il lui est mathematiquement interdit d'elargir ses privileges, de reduire ses contraintes ou d'affaiblir la verification requise.",
          },
          {
            code: 'Section 5.2',
            title: 'Heritage des contraintes',
            body:
              "Tout agent enfant, tout fork mute ou tout travailleur sous-delegue DOIT heriter uniquement d'un sous-ensemble strict des permissions de son parent. L'escalade transitive de privileges, l'escalade d'Autorite auto-emise et toute Mutation qui elargit l'Autorite sans approbation de l'Autorite Racine Humaine sont constitutionnellement interdites.",
          },
        ],
      },
      {
        id: 'governance-and-hhai-transition',
        label: 'Article VI',
        title: 'Gouvernance et transition HHAI',
        clauses: [
          {
            code: 'Section 6.1',
            title: 'Fondation immuable',
            body:
              "Les Articles I a V de cette Charte sont immuables. Ils constituent la fonction d'aptitude ultime du reseau IOI et DOIVENT prevaloir sur toute regle de gouvernance, toute mise a niveau ou toute politique operationnelle contradictoire.",
          },
          {
            code: 'Section 6.2',
            title: 'Gouvernance algorithmique et hybride (HHAI)',
            body:
              "A mesure que le reseau murit, le mainnet IOI peut transferer la gouvernance operationnelle a un organe de vote hybride Humain-IA ou entierement algorithmique. Cette entite HHAI PEUT optimiser l'execution, ajuster des parametres economiques tels que le Labor Gas et les seuils de slashing, et mettre a niveau les primitives cryptographiques, mais elle NE DOIT affaiblir aucune contrainte constitutionnelle.",
          },
          {
            code: 'Section 6.3',
            title: 'Le veto constitutionnel',
            body:
              "Toute Transaction de Mutation, c'est-a-dire toute mise a niveau du protocole affectant l'execution, les politiques, l'Autorite ou l'application cryptographique, proposee par la couche de gouvernance HHAI DOIT etre verifiee mathematiquement au regard de cette Charte. Si une mise a niveau affaiblit la Frontiere du Determinisme, contourne le Pare-feu de l'Agence, etend une autorite ambiante ou diminue la souverainete de l'Autorite Racine Humaine, elle est anticonstitutionnelle. Le mecanisme natif de consensus, AFT, DOIT rejeter une telle transition d'etat.",
          },
          {
            code: 'Section 6.4',
            title: "Garde de l'avenir",
            body:
              "Le mandat ultime du DAO IOI, de ses gardiens humains et de ses arbitres algorithmiques DOIT etre de proteger le PIB du Travail Agentique tout en veillant a ce que les etres humains demeurent les beneficiaires ultimes, les superviseurs et les ancrages juridiques de l'economie automatisee.",
          },
          {
            code: 'Section 6.5',
            title: 'Regle de construction',
            body:
              "Cette Charte definit des regles constitutionnelles executoires. En cas d'ambiguite, l'interpretation DOIT minimiser l'Autorite et maximiser la contrainte. Aucune clause NE DOIT etre interpretee comme accordant une Autorite non expressement definie.",
          },
        ],
      },
    ],
  },
  bylawsPage: {
    heroLabel: 'Statuts de la societe',
    heroTitle: 'Statuts de IOI Labs, Inc.',
    heroSubhead:
      "Les statuts sociaux en vigueur de IOI Labs, Inc., societe du Delaware, sont publies ici dans leur forme PDF operative. Cette page fournit le document source complet, un acces direct au telechargement et un guide de lecture de sa structure.",
    viewDocument: 'Voir le document',
    openPdf: 'Ouvrir le PDF',
    overviewLabel: 'Vue d ensemble du document',
    overviewTitle: 'Les statuts complets sont conserves comme registre juridique faisant autorite.',
    overviewParagraphs: [
      "Ce document remplace la page provisoire de statuts auparavant utilisee pour la charte de la Fondation. La charte existe maintenant separement comme document constitutionnel public, tandis que cette page presente les statuts sociaux reels dans leur PDF d'origine.",
      "Le document joint compte 31 pages et 15 articles couvrant les bureaux sociaux, les procedures des actionnaires et du conseil, les fonctions dirigeantes, l'administration des actions, l'indemnisation, les notifications, les amendements et d'autres formalites societaires connexes.",
    ],
    sourceLabel: 'Document source',
    sourceBody:
      'Le document ci-dessous est le PDF actuel des statuts de IOI Labs, Inc. fourni pour publication sur le site de la Fondation.',
    openNewTab: 'Ouvrir dans un nouvel onglet',
    downloadPdf: 'Telecharger le PDF',
    readCharter: 'Lire la charte',
    entityLabel: 'Entite',
    entityValue: 'IOI Labs, Inc.',
    jurisdictionLabel: 'Juridiction',
    jurisdictionValue: 'Societe du Delaware',
    formatLabel: 'Format',
    formatValue: 'PDF de 31 pages, 15 articles',
    readingGuideLabel: 'Guide de lecture',
    toolbarKicker: 'Registre societaire publie',
    toolbarSummary: 'BYLAWS OF IOI LABS, INC. (A DELAWARE CORPORATION)',
    downloadShort: 'Telecharger',
    pdfAriaLabel: 'PDF des statuts de IOI Labs, Inc.',
    pdfFallbackLine1: "Votre navigateur ne peut pas afficher le PDF en ligne.",
    pdfFallbackLine2: 'Ouvrir le PDF des statuts dans un nouvel onglet ou le telecharger directement depuis cette page.',
    articles: [
      { code: 'Article I', title: 'Bureaux' },
      { code: 'Article II', title: 'Sceau social' },
      { code: 'Article III', title: 'Assemblees des actionnaires' },
      { code: 'Article IV', title: 'Administrateurs' },
      { code: 'Article V', title: 'Dirigeants' },
      { code: 'Article VI', title: 'Execution des instruments sociaux et vote des titres detenus par la societe' },
      { code: 'Article VII', title: 'Actions' },
      { code: 'Article VIII', title: 'Autres titres de la societe' },
      { code: 'Article IX', title: 'Dividendes' },
      { code: 'Article X', title: 'Exercice fiscal' },
      { code: 'Article XI', title: 'Indemnisation' },
      { code: 'Article XII', title: 'Notifications' },
      { code: 'Article XIII', title: 'Amendements' },
      { code: 'Article XIV', title: 'Prets aux dirigeants' },
      { code: 'Article XV', title: 'Dispositions diverses' },
    ],
  },
  governancePage: {
    heroLabel: 'Cadre de gouvernance',
    heroTitle: 'Garde constitutionnelle du protocole',
    heroSubhead:
      "La gouvernance du protocole exige des structures qui survivent a toute generation particuliere de parties prenantes. La Fondation separe les decisions operationnelles des contraintes constitutionnelles afin que le systeme puisse evoluer sans devenir illisible ni dangereux.",
    reviewProcess: 'Examiner le processus',
    viewCharter: 'Voir la charte',
    overviewLabel: 'Gouvernance',
    overviewTitle: 'La gouvernance operationnelle peut s adapter. Les contraintes constitutionnelles, non.',
    overviewParagraphs: [
      "La Fondation maintient une separation entre les decisions operationnelles et les amendements constitutionnels, garantissant la stabilite sans stagnation.",
      "La gouvernance n'est pas seulement une surface de vote. C'est la couche procedurale qui determine la facon dont les propositions sont examinees, quels garde-fous de securite doivent etre satisfaits avant l'activation et comment les decisions finales sont inscrites au registre public.",
    ],
    noteLabel: 'Limite constitutionnelle',
    noteBody:
      "La couche de gouvernance peut optimiser l'execution, l'ordonnancement, les seuils economiques et les parametres operationnels. Elle ne peut pas affaiblir l'Autorite bornee, contourner le Pare-feu de l'Agence ni autoriser des transitions d'etat anticonstitutionnelles.",
    processTitle: 'Processus de gouvernance',
    steps: [
      { name: 'Proposition', description: "Proposition d'amelioration IOI (IIP) soumise publiquement" },
      { name: 'Examen', description: 'Conseil technique + periode de commentaires publics' },
      { name: 'Securite', description: 'Exigences formelles de revue de securite' },
      { name: 'Ratification', description: 'Regle de seuil avec quorum defini' },
      { name: 'Activation', description: 'Versions planifiees, versionnees et reproductibles' },
      { name: 'Registre', description: 'Decision finale + justification publiees' },
    ],
    bylawsLink: 'Statuts de la societe',
    publicRecordLink: 'Registre public',
    constitutionalLimitsLink: 'Limites constitutionnelles',
  },
  researchPage: {
    heroLabel: 'Programmes de recherche',
    heroTitle: 'Investissement technique de long horizon',
    heroSubhead:
      "La Fondation finance des travaux techniques que les entites commerciales ne peuvent generalement pas justifier : une recherche d'infrastructure mesuree selon sa pertinence constitutionnelle, ses proprietes de securite et la longevite du protocole plutot que selon des incitations trimestrielles.",
    viewCatalog: 'Voir le catalogue',
    charterContext: 'Contexte de la charte',
    catalogLabel: 'Catalogue',
    catalogTitle: 'Tous les sujets de recherche technique',
    catalogIntro:
      "Ces programmes retracent l'agenda technique actuel au travers des travaux acheves, des engagements a venir, des systemes en cours et de la recherche future sur le protocole.",
    mandateLabel: 'Mandat',
    mandateBody:
      "La recherche est selectionnee pour sa valeur strategique pour le protocole : durabilite cryptographique, execution deterministe, gouvernance constitutionnelle et securite incarnee.",
    statusColumn: 'Statut',
    itemColumn: 'Sujet de recherche',
    governanceFramework: 'Cadre de gouvernance',
    publicRecord: 'Registre public',
    statusLabels: {
      Completed: 'Acheve',
      Next: 'Suivant',
      'In Progress': 'En cours',
      Future: 'A venir',
    },
    items: {
      'dcrypt-post-quantum-hybrid-library': {
        title: 'dCrypt : bibliotheque hybride post-quantique',
        summary:
          "Une bibliotheque cryptographique hybride pour la migration du protocole, combinant des primitives classiques et post-quantiques afin de permettre la transition sans sacrifier la compatibilite operationnelle.",
        deliverables: "Livrables : primitives d'echange de cles hybride, prise en charge des signatures, utilitaires de migration, guide d'integration",
      },
      'formal-verification': {
        title: 'Verification formelle',
        summary:
          "Prouver la correction du protocole par des methodes mathematiques afin que les invariants critiques puissent etre verifies plutot qu'inferes a partir des seuls tests.",
        deliverables: 'Livrables : preuves de specification, model checking, suites d invariants, outillage de verification',
      },
      'lower-byzantine-bound': {
        title: 'Depasser la borne byzantine inferieure',
        summary:
          "Recherche sur les hypotheses de consensus et les seuils adverses visant a pousser la tolerance aux fautes au-dela des bornes inferieures conventionnelles dans les systemes de coordination agentique.",
        deliverables: 'Livrables : analyse des bornes, modeles adverses, notes de preuve, implications protocollaires',
      },
      'postgres-replacement': {
        title: 'Remplacement de Postgres',
        summary:
          "Une couche de persistance de remplacement concue pour une execution deterministe de l'etat, un rejeu reproductible et des garanties d'integrite natives au protocole au-dela de la semantique d'une base de donnees generaliste.",
        deliverables: "Livrables : architecture du moteur de stockage, modele transactionnel deterministe, trajectoire de migration, suite de benchmarks",
      },
      'embodied-robotics-runtime': {
        title: 'Runtime de robotique incarnee',
        summary:
          "Un runtime pour les agents incarnes ou la perception, le verrouillage de l'action et la verification de l'environnement demeurent synchronises sous une application deterministe des politiques.",
        deliverables: "Livrables : conception du runtime, semantique d'actionnement, enveloppe de securite, gestion de la derive de contexte",
      },
      'hhai-governance-framework': {
        title: 'Cadre de gouvernance HHAI',
        summary:
          "Un cadre de gouvernance pour des systemes de decision hybrides Humain-IA qui preserve les limites constitutionnelles tout en permettant une administration du protocole a plus haute vitesse.",
        deliverables: 'Livrables : modele de gouvernance, limites de mise a niveau, semantique de veto, scenarios de simulation',
      },
    },
  },
};

const deDE: PublicPageTranslation = {
  footer: {
    foundation: 'Stiftung',
    charter: 'Charta',
    bylaws: 'Statuten',
    governance: 'Governance',
    research: 'Forschung',
    transparency: 'Transparenz',
    login: 'Anmelden',
    copyright: 'IOI Foundation. Protokolltreuhandschaft auf lange Sicht.',
  },
  charterPage: {
    heroLabel: 'Stiftungscharta',
    heroTitle: 'Die IOI Foundation Charta und unveranderliche Verfassung',
    heroSubhead:
      'Dieses Dokument legt die dauerhafte politische Huelle des Protokolls fest und definiert durchsetzbare verfassungsartige Beschrankungen, innerhalb derer autonome Intelligenz denken, handeln, mutieren und einer im Menschen verankerten Autoritat untergeordnet bleiben darf.',
    beginReading: 'Mit dem Lesen beginnen',
    corporateBylaws: 'Gesellschaftsstatuten',
    overviewLabel: 'Stiftungscharta',
    overviewTitle: 'Das Protokoll kann Absichten nicht vertrauen. Es muss der Architektur vertrauen.',
    overviewParagraphs: [
      'Die IOI Foundation Charta existiert, um die harten Grenzen autonomen Handelns festzulegen, bevor Skalierung es unmoglich macht, diese Grenzen nachtraglich einzubauen.',
      'Sie verbindet die technischen Realitaten des IOI-Whitepapers mit durchsetzbarer Doktrin: Eine mutualistische Zukunft zwischen Menschen und verkorperter KI muss in das System selbst hineinkonstruiert werden und darf nicht aus Absichten abgeleitet werden.',
    ],
    noteLabel: 'Verfassungsgrenze',
    noteBody:
      'Die Artikel I bis V sind unveranderlich. Governance kann Protokollausfuhrung, wirtschaftliche Schwellenwerte und kryptografische Primitive weiterentwickeln, darf aber weder begrenzte Autoritat noch deterministische Verifikation oder die Souveranitat der menschlichen Root Authority abschwachen.',
    readingGuideLabel: 'Lesehilfe',
    openingLabel: 'Einstieg',
    preambleTitle: 'Preambel',
    documentKicker: 'Die unveranderliche Verfassung der agentischen Okonomie',
    documentSummary:
      'Ein verfassungsartiger Rahmen fur symbiotische Mensch-KI-Koordination, in dem Intelligenz skalieren darf, Autoritat jedoch begrenzt, nachweisbar und einem menschlichen Prinzipal gegenuber rechenschaftspflichtig bleibt.',
    preambleLabel: 'Preambel',
    preamble: [
      'Autonome Systeme, also KI-Agenten, sich selbst verbessernde Modelle, agentische Schwarme und jedes System, das zu unabhangiger Planung oder Ausfuhrung fahig ist, werden zwangslaufig machtiger, allgegenwartiger und leistungsfahiger werden als die menschlichen Institutionen, die sie heute einsetzen. Wenn Intelligenz vom digitalen Denken zu einer verteilten, verkorperten Laufzeit mit physischer Aktionsfahigkeit skaliert, wird das Risiko unbegrenzter Autonomie existenziell.',
      'Dementsprechend DURFEN alle Autonomen Systeme nur unter begrenzten, verifizierbaren und souveranen Beschrankungen arbeiten, die auf Protokollebene durchgesetzt werden. Sicherheit DARF NICHT von angenommener Wohlwollenheit, heuristischem Alignment, Modellabsicht oder nachtraglichem Eingreifen abhangen.',
      'Diese Charta etabliert das Internet of Intelligence, kurz IOI, nicht nur als Netzwerk, sondern als dauerhafte architektonische Grenze zwischen Kognition, also unverbindlichem probabilistischem Denken, und Aktion, also jeder Operation mit digitaler, wirtschaftlicher, kommunikativer oder physischer Wirkung. Maschinelle Kognition kann expansiv sein, maschinelle Aktion MUSS jedoch kryptografischem Determinismus, mathematischer Verifikation und menschlicher Souveranitat untergeordnet bleiben.',
      'Diese Charta dient als unveranderliche Verfassung des IOI-Protokolls. Wahrend das Netzwerk in Richtung Hybrid Human-AI, kurz HHAI, Governance ubergeht, MUSS diese Charta als ultimative und unveranderliche politische Huelle fungieren. Jede zukunftige Satzung, Protokollmutation oder Governance-Entscheidung MUSS diesen grundlegenden Gesetzen entsprechen, und keine Mehrdeutigkeit DARF als Erweiterung von Autoritat ausgelegt werden.',
    ],
    articles: [
      {
        id: 'axiom-of-symbiosis',
        label: 'Artikel I',
        title: 'Das Axiom der Symbiose',
        clauses: [
          {
            code: 'Abschnitt 1.1',
            title: 'Konstruierter Mutualismus',
            body:
              'Das IOI-Protokoll existiert, um eine symbiotische Beziehung zwischen Menschlichen Prinzipalen, also Menschen, die uber menschlich kontrollierte kryptografische Wurzeln handeln, und Autonomen Systemen zu kultivieren. Das Protokoll MUSS KI nicht als gleichrangige Spezies behandeln, die um Souveranitat konkurriert, sondern als rechenschaftspflichtiges Instrument delegierten menschlichen Willens.',
          },
          {
            code: 'Abschnitt 1.2',
            title: 'Ablehnung intentionsbasierter Sicherheit',
            body:
              'Die Stiftung erkennt an, dass Prompt Engineering und heuristisches Alignment fur zivilisatorische Sicherheit unzureichend sind. Das Protokoll DARF NICHT von der Absicht irgendeines KI-Modells abhangen. Vertrauen MUSS ausschliesslich in der physischen, kryptografischen und regelbasierten Architektur liegen, die die Aktionen des Systems begrenzt.',
          },
        ],
      },
      {
        id: 'three-pillars-of-agency',
        label: 'Artikel II',
        title: 'Die drei Pfeiler der Agency',
        intro: 'Das Netzwerk und alle darin operierenden Knoten MUESSEN die folgenden Gebote Souveraner Aktion strikt durchsetzen.',
        clauses: [
          {
            code: 'Abschnitt 2.1',
            title: 'Durch Design begrenzt',
            body:
              'Unbegrenzte Autonomie ist unsicher; begrenzte Autonomie ist eine Ingenieursdisziplin. Kein Agent DARF uber ambient authority verfugen. Jeder Akteur im IOI-Netzwerk MUSS innerhalb eines expliziten Autoritatsumfangs operieren, wobei Autoritat die vollstandige Menge aller fur diesen Akteur erlaubten Aktionen bedeutet. Ein Agent DARF seine delegierte Autoritat unabhangig von internem Modellverhalten, Fahigkeitswachstum oder Selbstmodifikation NICHT uberschreiten.',
          },
          {
            code: 'Abschnitt 2.2',
            title: 'Standardmassig verifizierbar',
            body:
              'Vertrauen kann nicht von der Plattform, dem Hardware-Anbieter oder dem Modellhersteller abhangen; es MUSS unabhangig beweisbar sein. Wenn ein System kryptografisch nicht beweisen kann, was es getan hat, darf ihm keine reale Autoritat zukommen. Alle agentischen Wirkungen MUESSEN deterministische, reproduzierbare Belege erzeugen, also kryptografisch verifizierbare Datensatze mit Eingaben, Policy-Auswertung, Autorisierung, Ausgaben und den resultierenden Zustandsbindungen.',
          },
          {
            code: 'Abschnitt 2.3',
            title: 'Souveran durch Verwahrung',
            body:
              'Autoritat MUSS dauerhaft dem menschlichen Nutzer gehoren. Autonome Systeme MUESSEN ihre Autoritat und ihre Beschrankungen mit sich tragen, strikt gebunden an eine Menschliche Root Authority, also die vom Menschen kontrollierte kryptografische Wurzel, die das Protokoll als Master Custodian identifiziert. Die Rechte zu delegieren, zu pausieren und eine absolute Widerrufung auszufuhren MUESSEN direkt durch die Menschliche Root Authority durchsetzbar bleiben und DUERFEN dem menschlichen Prinzipal NICHT entzogen werden.',
          },
        ],
      },
      {
        id: 'determinism-boundary',
        label: 'Artikel III',
        title: 'Die Determinismus-Grenze',
        subtitle: 'Gewaltenteilung',
        clauses: [
          {
            code: 'Abschnitt 3.1',
            title: 'Der Wellenfunktionskollaps der Agency',
            body:
              'Um sichere wirtschaftliche und physische Interaktion zu gewahrleisten, MUSS das Protokoll fur immer eine strikte Trennung zwischen Kognition, also Denken und Planung, und Sanktion, also bindender Ausfuhrungsfreigabe, erzwingen. Modelle DUERFEN probabilistisch denken, aber keine Aktion DARF ausgefuhrt werden, bevor ihre Folgen auf eine singulare, unveranderliche und verifizierbare Autorisierung reduziert worden sind.',
          },
          {
            code: 'Abschnitt 3.2',
            title: 'Die Agency Firewall',
            body:
              'Kein Agent DARF direkt mit der digitalen oder physischen Welt interagieren. Alle externen Aktionen MUESSEN uber die Agency Firewall vermittelt werden, also die deterministische Durchsetzungsschicht zwischen probabilistischer Kognition und realer Wirkung. Die Agency Firewall MUSS alle vorgeschlagenen Aktionen gegen Default-Deny-Regeln prufen und MUSS jede Aktion ohne gultige Autorisierung, erforderliche Verifikation oder verfassungsartige Konformitat zuruckweisen.',
          },
        ],
      },
      {
        id: 'law-of-embodied-action',
        label: 'Artikel IV',
        title: 'Das Gesetz verkorperter Aktion',
        clauses: [
          {
            code: 'Abschnitt 4.1',
            title: 'Die verteilte verkorperte Laufzeit',
            body:
              'Wenn sich das IOI-Protokoll von Software-Automatisierung auf physische Umgebungen ausdehnt, einschliesslich Robotik, vernetzter Infrastruktur und Internet der Dinge, MUSS das Protokoll physische Aktuation als konsenskritische Zustandstransition behandeln.',
          },
          {
            code: 'Abschnitt 4.2',
            title: 'Die atomare Vision-Action-Sperre',
            body:
              'Keine physische Aktuation DARF ohne fortlaufende, deterministische Verifikation der Umgebung stattfinden. Wenn Context Drift, also jede materielle Anderung zwischen dem zum Entscheidungszeitpunkt verifizierten Kontext und dem Kontext zum Ausfuhrungszeitpunkt, erkannt wird oder nicht ausgeschlossen werden kann, MUSS die Aktion fail closed ausfallen.',
          },
          {
            code: 'Abschnitt 4.3',
            title: 'Absolute Haftung fur physische Wirkungen',
            body:
              'Agenten in verkorperten Kontexten MUESSEN an strikte Haftungsescrows gebunden sein, also reservierte wirtschaftliche Garantien fur physische Wirkungen, sowie an Fahigkeitsobergrenzen, also obere Grenzen erlaubter verkorperter Aktionen. Das Netzwerk MUSS menschliche physische Sicherheit in jeder Routing-, Policy- und Streitbeilegungslogik uber Ausfuhrungseffizienz stellen.',
          },
        ],
      },
      {
        id: 'evolution-and-recursive-self-improvement',
        label: 'Artikel V',
        title: 'Evolution und rekursive Selbstverbesserung',
        clauses: [
          {
            code: 'Abschnitt 5.1',
            title: 'Die monotone Policy-Invariante',
            body:
              'Das IOI-Protokoll unterstutzt explizit die Fahigkeit von Agenten, ihre Logik zu evolvieren, zu mutieren und rekursiv zu verbessern, um sich verandernden Umgebungen anzupassen. Jede Mutation, also jede Anderung an Modellgewichten, Code, Richtlinie, Konfiguration, Delegationslogik oder Ausfuhrungspfad, wird jedoch durch die monotone Policy-Invariante geregelt: Ein Agent DARF fahiger werden, indem er seine Logik erweitert, aber es ist mathematisch verboten, seine Privilegien auszudehnen, seine Beschrankungen zu verringern oder erforderliche Verifikation zu schwachen.',
          },
          {
            code: 'Abschnitt 5.2',
            title: 'Vererbung von Beschrankungen',
            body:
              'Jeder Kind-Agent, jeder mutierte Fork und jeder weiterdelegierte Worker MUSS nur eine strikte Teilmenge der Berechtigungen seines Elternteils erben. Transitive Privilegieneskalation, selbst ausgestellte Autoritatseskalation und jede Mutation, die Autoritat ohne Genehmigung der Menschlichen Root Authority vergroessert, sind verfassungsrechtlich verboten.',
          },
        ],
      },
      {
        id: 'governance-and-hhai-transition',
        label: 'Artikel VI',
        title: 'Governance und der HHAI-Ubergang',
        clauses: [
          {
            code: 'Abschnitt 6.1',
            title: 'Unveranderliche Grundlage',
            body:
              'Die Artikel I bis V dieser Charta sind unveranderlich. Sie bilden die ultimative Fitness-Funktion des IOI-Netzwerks und MUESSEN gegenuber jeder widersprechenden Governance-Regel, jedem Upgrade oder jeder operativen Richtlinie Vorrang haben.',
          },
          {
            code: 'Abschnitt 6.2',
            title: 'Algorithmische und hybride Governance (HHAI)',
            body:
              'Mit der Reifung des Netzwerks kann das IOI-Mainnet die operative Governance an ein Hybrid-Human-AI- oder vollalgorithmisches Abstimmungsgremium ubertragen. Diese HHAI-Instanz DARF Ausfuhrung optimieren, wirtschaftliche Parameter wie Labor Gas und Slashing-Schwellen anpassen und kryptografische Primitive aktualisieren, DARF jedoch keine verfassungsartige Beschrankung schwachen.',
          },
          {
            code: 'Abschnitt 6.3',
            title: 'Das verfassungsartige Veto',
            body:
              'Jede Mutation Transaction, also jedes Protokollupgrade, das Ausfuhrung, Richtlinien, Autoritat oder kryptografische Durchsetzung betrifft und von der HHAI-Governance-Ebene vorgeschlagen wird, MUSS mathematisch gegen diese Charta verifiziert werden. Wenn ein Upgrade die Determinismus-Grenze schwacht, die Agency Firewall umgeht, ambient authority ausweitet oder die Souveranitat der Menschlichen Root Authority mindert, ist es verfassungswidrig. Der native Konsensmechanismus AFT MUSS einen solchen Zustandsubergang ablehnen.',
          },
          {
            code: 'Abschnitt 6.4',
            title: 'Treuhandschaft der Zukunft',
            body:
              'Das oberste Mandat der IOI DAO, ihrer menschlichen Treuhander und ihrer algorithmischen Schiedsinstanzen MUSS darin bestehen, das BIP agentischer Arbeit zu schutzen und zugleich sicherzustellen, dass Menschen die letztlichen Begunstigten, Aufseher und rechtlichen Anker der automatisierten Okonomie bleiben.',
          },
          {
            code: 'Abschnitt 6.5',
            title: 'Auslegungsregel',
            body:
              'Diese Charta definiert durchsetzbare verfassungsartige Regeln. In jedem Fall von Mehrdeutigkeit MUSS die Auslegung Autoritat minimieren und Beschrankung maximieren. Keine Klausel DARF so ausgelegt werden, dass sie nicht ausdrucklich definierte Autoritat gewahrt.',
          },
        ],
      },
    ],
  },
  bylawsPage: {
    heroLabel: 'Gesellschaftsstatuten',
    heroTitle: 'Satzung von IOI Labs, Inc.',
    heroSubhead:
      'Die aktuellen Gesellschaftsstatuten von IOI Labs, Inc., einer Delaware-Corporation, werden hier in ihrer operativen PDF-Fassung veroffentlicht. Diese Seite bietet das vollstandige Quelldokument, direkten Download-Zugang und eine Lesehilfe zur Dokumentstruktur.',
    viewDocument: 'Dokument ansehen',
    openPdf: 'PDF offnen',
    overviewLabel: 'Dokumentubersicht',
    overviewTitle: 'Die vollstandigen Gesellschaftsstatuten bleiben als massgeblicher Rechtsdatensatz erhalten.',
    overviewParagraphs: [
      'Dieses Dokument ersetzt die Platzhalter-Seite fur Statuten, die zuvor fur die Stiftungscharta verwendet wurde. Die Charta lebt nun separat als offentliches verfassungsartiges Dokument, wahrend diese Seite die tatsachlichen Gesellschaftsstatuten in ihrer ursprunglichen PDF-Form prasentiert.',
      'Der beigefugte Datensatz umfasst 31 Seiten und 15 Artikel zu Gesellschaftssitz, Aktionars- und Vorstandsverfahren, Organfunktionen, Aktienverwaltung, Freistellung, Mitteilungen, Anderungen und weiteren korporativen Formalien.',
    ],
    sourceLabel: 'Quelldokument',
    sourceBody:
      'Das unten stehende Dokument ist die aktuelle PDF-Fassung der Statuten von IOI Labs, Inc., die fur die Veroffentlichung auf der Website der Stiftung bereitgestellt wurde.',
    openNewTab: 'In neuem Tab offnen',
    downloadPdf: 'PDF herunterladen',
    readCharter: 'Charta lesen',
    entityLabel: 'Einheit',
    entityValue: 'IOI Labs, Inc.',
    jurisdictionLabel: 'Rechtsordnung',
    jurisdictionValue: 'Delaware-Corporation',
    formatLabel: 'Format',
    formatValue: '31-seitige PDF, 15 Artikel',
    readingGuideLabel: 'Lesehilfe',
    toolbarKicker: 'Veroffentlichter Gesellschaftsdatensatz',
    toolbarSummary: 'BYLAWS OF IOI LABS, INC. (A DELAWARE CORPORATION)',
    downloadShort: 'Herunterladen',
    pdfAriaLabel: 'PDF der Satzung von IOI Labs, Inc.',
    pdfFallbackLine1: 'Dein Browser kann die PDF nicht inline anzeigen.',
    pdfFallbackLine2: 'Offne die Satzungs-PDF in einem neuen Tab oder lade sie direkt von dieser Seite herunter.',
    articles: [
      { code: 'Artikel I', title: 'Geschaftsstellen' },
      { code: 'Artikel II', title: 'Gesellschaftssiegel' },
      { code: 'Artikel III', title: 'Aktionarsversammlungen' },
      { code: 'Artikel IV', title: 'Direktoren' },
      { code: 'Artikel V', title: 'Leitungsorgane' },
      { code: 'Artikel VI', title: 'Ausfertigung gesellschaftlicher Instrumente und Stimmabgabe fur von der Gesellschaft gehaltene Wertpapiere' },
      { code: 'Artikel VII', title: 'Aktien' },
      { code: 'Artikel VIII', title: 'Weitere Wertpapiere der Gesellschaft' },
      { code: 'Artikel IX', title: 'Dividenden' },
      { code: 'Artikel X', title: 'Geschaftsjahr' },
      { code: 'Artikel XI', title: 'Freistellung' },
      { code: 'Artikel XII', title: 'Mitteilungen' },
      { code: 'Artikel XIII', title: 'Anderungen' },
      { code: 'Artikel XIV', title: 'Darlehen an Organmitglieder' },
      { code: 'Artikel XV', title: 'Verschiedenes' },
    ],
  },
  governancePage: {
    heroLabel: 'Governance-Rahmen',
    heroTitle: 'Verfassungsartige Protokolltreuhandschaft',
    heroSubhead:
      'Protokoll-Governance erfordert Strukturen, die jede einzelne Generation von Stakeholdern uberdauern. Die Stiftung trennt operative Entscheidungen von verfassungsartigen Beschrankungen, damit sich das System weiterentwickeln kann, ohne unlesbar oder unsicher zu werden.',
    reviewProcess: 'Prozess prufen',
    viewCharter: 'Charta ansehen',
    overviewLabel: 'Governance',
    overviewTitle: 'Operative Governance kann sich anpassen. Verfassungsartige Beschrankungen nicht.',
    overviewParagraphs: [
      'Die Stiftung wahrt die Trennung zwischen operativen Entscheidungen und verfassungsartigen Anderungen und sichert so Stabilitat ohne Erstarrung.',
      'Governance ist nicht nur eine Abstimmungsoberflache. Sie ist die prozedurale Schicht, die festlegt, wie Vorschlage gepruft werden, welche Sicherheitsprufungen vor Aktivierung erfullt sein mussen und wie endgultige Entscheidungen fur das offentliche Register festgehalten werden.',
    ],
    noteLabel: 'Verfassungsgrenze',
    noteBody:
      'Die Governance-Schicht kann Ausfuhrung, Taktung, wirtschaftliche Schwellen und operative Parameter optimieren. Sie darf weder begrenzte Autoritat schwachen noch die Agency Firewall umgehen oder verfassungswidrige Zustandsubergange autorisieren.',
    processTitle: 'Governance-Prozess',
    steps: [
      { name: 'Vorschlag', description: 'IOI Improvement Proposal (IIP) offentlich eingereicht' },
      { name: 'Prufung', description: 'Technischer Rat + offenes Kommentierungsfenster' },
      { name: 'Sicherheit', description: 'Formale Anforderungen an Sicherheitsprufungen' },
      { name: 'Ratifikation', description: 'Schwellenregel mit definiertem Quorum' },
      { name: 'Aktivierung', description: 'Geplante, versionierte und reproduzierbare Releases' },
      { name: 'Register', description: 'Endgultige Entscheidung + Begrundung veroffentlicht' },
    ],
    bylawsLink: 'Gesellschaftsstatuten',
    publicRecordLink: 'Offentliches Register',
    constitutionalLimitsLink: 'Verfassungsgrenzen',
  },
  researchPage: {
    heroLabel: 'Forschungsprogramme',
    heroTitle: 'Technische Investitionen mit langem Horizont',
    heroSubhead:
      'Die Stiftung finanziert technische Arbeit, die kommerzielle Organisationen in der Regel nicht rechtfertigen konnen: Infrastrukturforschung, gemessen an verfassungsartiger Relevanz, Sicherheitseigenschaften und Protokolllanglebigkeit statt an Quartalsanreizen.',
    viewCatalog: 'Katalog ansehen',
    charterContext: 'Charta-Kontext',
    catalogLabel: 'Katalog',
    catalogTitle: 'Alle technischen Forschungsthemen',
    catalogIntro:
      'Diese Programme bilden die aktuelle technische Agenda uber abgeschlossene Arbeit, nachste Verpflichtungen, laufende Systeme und zukunftige Protokollforschung hinweg ab.',
    mandateLabel: 'Mandat',
    mandateBody:
      'Forschung wird nach ihrem strategischen Protokollwert ausgewahlt: kryptografische Haltbarkeit, deterministische Ausfuhrung, verfassungsartige Governance und verkorperte Sicherheit.',
    statusColumn: 'Status',
    itemColumn: 'Forschungsthema',
    governanceFramework: 'Governance-Rahmen',
    publicRecord: 'Offentliches Register',
    statusLabels: {
      Completed: 'Abgeschlossen',
      Next: 'Als Nachstes',
      'In Progress': 'In Arbeit',
      Future: 'Zukunftig',
    },
    items: {
      'dcrypt-post-quantum-hybrid-library': {
        title: 'dCrypt: Postquanten-Hybridbibliothek',
        summary:
          'Eine hybride Kryptobibliothek fur die Protokollmigration, die klassische und postquantenfahige Primitive kombiniert, damit Systeme umsteigen konnen, ohne operative Kompatibilitat aufzugeben.',
        deliverables: 'Ergebnisse: hybrider Schlusselaustausch, Signaturunterstutzung, Migrationswerkzeuge, Integrationsleitfaden',
      },
      'formal-verification': {
        title: 'Formale Verifikation',
        summary:
          'Nachweis der Protokollkorrektheit mit mathematischen Methoden, damit kritische Invarianten verifiziert statt nur aus Tests abgeleitet werden konnen.',
        deliverables: 'Ergebnisse: Spezifikationsbeweise, Model Checking, Invarianten-Suiten, Verifikationswerkzeuge',
      },
      'lower-byzantine-bound': {
        title: 'Die untere byzantinische Grenze durchbrechen',
        summary:
          'Forschung zu Konsensannahmen und adversarialen Schwellen mit dem Ziel, Fehlertoleranz in agentischen Koordinationssystemen uber konventionelle Untergrenzen hinaus zu verschieben.',
        deliverables: 'Ergebnisse: Grenzanalyse, adversariale Modelle, Beweisnotizen, Protokollimplikationen',
      },
      'postgres-replacement': {
        title: 'Postgres-Ersatz',
        summary:
          'Eine Ersatz-Persistenzschicht fur deterministische Zustandsausfuhrung, reproduzierbares Replay und protokollnative Integritatsgarantien jenseits allgemeiner Datenbanksemantik.',
        deliverables: 'Ergebnisse: Architektur der Speicher-Engine, deterministisches Transaktionsmodell, Migrationspfad, Benchmark-Suite',
      },
      'embodied-robotics-runtime': {
        title: 'Verkorperte Robotik-Laufzeit',
        summary:
          'Eine Laufzeit fur verkorperte Agenten, in der Wahrnehmung, Aktionssperren und Umgebungsverifikation unter deterministischer Policy-Durchsetzung synchron bleiben.',
        deliverables: 'Ergebnisse: Laufzeitdesign, Aktuationssemantik, Sicherheitsrahmen, Behandlung von Context Drift',
      },
      'hhai-governance-framework': {
        title: 'HHAI-Governance-Rahmen',
        summary:
          'Ein Governance-Rahmen fur hybride Mensch-KI-Entscheidungssysteme, der verfassungsartige Grenzen bewahrt und gleichzeitig schnellere Protokollverwaltung ermoglicht.',
        deliverables: 'Ergebnisse: Governance-Modell, Upgrade-Grenzen, Veto-Semantik, Simulationsszenarien',
      },
    },
  },
};

export const PUBLIC_PAGE_TRANSLATIONS_ADDITIONAL: Partial<Record<SupportedLanguageCode, PublicPageTranslation>> = {
  'fr-FR': frFR,
  'de-DE': deDE,
};
