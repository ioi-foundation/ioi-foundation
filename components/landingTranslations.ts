import { SupportedLanguageCode } from './publicLanguage';

interface MandateTranslation {
  title: string;
  premise: string;
  bullets: [string, string, string];
  codaTop: string;
  codaBottom: string;
}

interface ResearchTeaserTranslation {
  title: string;
  summary: string;
  deliverables: string;
}

export interface LandingTranslation {
  languageSelector: {
    title: string;
    closeLabel: string;
    searchPlaceholder: string;
    searchAriaLabel: string;
    buttonAriaLabel: string;
    listAriaLabel: string;
    empty: string;
  };
  hero: {
    mark: string;
    subtitle: [string, string, string];
    oneliner: string;
    charterCta: string;
    governanceCta: string;
  };
  mission: {
    label: string;
    title: string;
    subhead: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3BeforeStrong: string;
    paragraph3Strong: string;
    paragraph3AfterStrong: string;
    bounded: MandateTranslation;
    verifiable: MandateTranslation;
    sovereign: MandateTranslation;
    excerpt: string;
  };
  charterBanner: {
    label: string;
    title: string;
    text: string;
    primaryCta: string;
    bylawsLink: string;
    governanceLink: string;
    decisionLogLink: string;
  };
  research: {
    label: string;
    title: string;
    intro: string;
    catalogLabel: string;
    viewAll: string;
    teasers: Record<string, ResearchTeaserTranslation>;
  };
  transparency: {
    label: string;
    title: string;
    intro: string;
    legalEntityTitle: string;
    legalEntityName: string;
    ratifiedStandardsTitle: string;
    recentMinutesTitle: string;
    contactTitle: string;
    securityDisclosure: string;
    fetchingRecords: string;
    versionLabel: string;
    contactEmail: string;
  };
  footer: {
    charter: string;
    bylaws: string;
    governance: string;
    research: string;
    transparency: string;
    login: string;
    copyright: string;
  };
}

export const LANDING_TRANSLATIONS: Record<SupportedLanguageCode, LandingTranslation> = {
  'en-US': {
    languageSelector: {
      title: 'Select language',
      closeLabel: 'Close language selector',
      searchPlaceholder: 'Search',
      searchAriaLabel: 'Search languages by name or region',
      buttonAriaLabel: 'Select site language',
      listAriaLabel: 'Language selector',
      empty: 'No supported languages match your search.',
    },
    hero: {
      mark: 'Charter · Public Stewardship',
      subtitle: ['Governance', 'Research', 'Protocol Integrity'],
      oneliner: 'A public institution for protocol neutrality, research funding, and long-horizon security.',
      charterCta: 'Read the Charter',
      governanceCta: 'Governance Process',
    },
    mission: {
      label: 'Mission',
      title: 'Autonomous systems will become more powerful than the institutions that deploy them.',
      subhead: 'The only viable path forward is to make that power bounded, verifiable, and sovereign by design.',
      paragraph1: "Autonomous systems are already capable. What's missing is trust.",
      paragraph2: 'As agents gain the ability to act independently across code, infrastructure, and real-world systems, the risk is no longer theoretical. Systems that can act without constraint cannot be safely deployed at scale.',
      paragraph3BeforeStrong: 'IOI defines a new category:',
      paragraph3Strong: 'sovereign agent infrastructure',
      paragraph3AfterStrong: 'where every actor operates within explicit, enforceable authority boundaries, and every action is provably within bounds.',
      bounded: {
        title: 'Bounded',
        premise: 'Autonomy must be constrained by design, not intent.',
        bullets: [
          'Capability-scoped execution and explicit authority boundaries',
          'Dynamic constraints that scale with trust, not static limits on intelligence',
          'Actors cannot exceed their delegated permissions, regardless of model behavior',
        ],
        codaTop: 'Unbounded autonomy is unsafe.',
        codaBottom: 'Bounded autonomy is an engineering discipline.',
      },
      verifiable: {
        title: 'Verifiable',
        premise: 'Trust cannot depend on the platform. It must be independently provable.',
        bullets: [
          'Cryptographic receipts and auditable execution',
          'Deterministic policy enforcement and replayable outcomes',
          'Evidence that an action was valid, not just logs that it happened',
        ],
        codaTop: 'If a system cannot prove what it did,',
        codaBottom: 'it cannot be trusted with real authority.',
      },
      sovereign: {
        title: 'Sovereign',
        premise: 'Authority must belong to the user, not the system, not the platform.',
        bullets: [
          'Capability ownership, revocation, and delegation under user control',
          'Portable identity and policy across environments and providers',
          'Verification that does not depend on a single institution',
        ],
        codaTop: 'Autonomous systems should carry their authority,',
        codaBottom: 'and their constraints, with them.',
      },
      excerpt: '"Without a shared framework for bounded and verifiable execution, one system\'s autonomy becomes another system\'s risk. IOI provides that framework."',
    },
    charterBanner: {
      label: 'Charter',
      title: 'The Foundation Charter',
      text: 'Enforceable constitutional constraints on protocol action, mutation, and governance, designed to outlast market cycles and keep stewardship legible to the public.',
      primaryCta: 'Read the Charter',
      bylawsLink: 'Corporate Bylaws',
      governanceLink: 'Governance Framework',
      decisionLogLink: 'Decision Log',
    },
    research: {
      label: 'Research Programs',
      title: 'Long-Horizon Technical Investment',
      intro: 'The Foundation funds research that commercial entities cannot justify, work measured in decades, not quarters.',
      catalogLabel: 'Research Catalog',
      viewAll: 'View All',
      teasers: {
        'dcrypt-post-quantum-hybrid-library': {
          title: 'dCrypt: Post-Quantum Hybrid Crypto Library',
          summary: 'A hybrid cryptography library for protocol migration, combining classical and post-quantum primitives so systems can transition without sacrificing operational compatibility.',
          deliverables: 'Deliverables: Hybrid key exchange primitives, signature support, migration utilities, integration guidance',
        },
        'formal-verification': {
          title: 'Formal Verification',
          summary: 'Proving protocol correctness through mathematical methods so critical invariants can be verified rather than inferred from testing alone.',
          deliverables: 'Deliverables: Spec proofs, model checking, invariant suites, verification tooling',
        },
        'lower-byzantine-bound': {
          title: 'Breaking the Lower Byzantine Bound',
          summary: 'Research into consensus assumptions and adversarial thresholds aimed at pushing fault-tolerance past conventional lower-bound expectations in agentic coordination systems.',
          deliverables: 'Deliverables: Bound analysis, adversarial models, proof notes, protocol implications',
        },
      },
    },
    transparency: {
      label: 'Public Record',
      title: 'Transparency',
      intro: 'Foundations are judged by their records. We publish decisions, governance outcomes, and financial summaries as a matter of institutional duty.',
      legalEntityTitle: 'Legal Entity',
      legalEntityName: 'IOI Labs, Inc.',
      ratifiedStandardsTitle: 'Ratified Standards',
      recentMinutesTitle: 'Recent Minutes',
      contactTitle: 'Contact',
      securityDisclosure: 'Security Disclosure',
      fetchingRecords: 'Fetching records...',
      versionLabel: 'Version',
      contactEmail: 'foundation at ioi.ai',
    },
    footer: {
      charter: 'Charter',
      bylaws: 'Bylaws',
      governance: 'Governance',
      research: 'Research',
      transparency: 'Transparency',
      login: 'Login',
      copyright: 'IOI Foundation. Protocol stewardship for the long term.',
    },
  },
  'es-ES': {
    languageSelector: {
      title: 'Seleccionar idioma',
      closeLabel: 'Cerrar selector de idioma',
      searchPlaceholder: 'Buscar',
      searchAriaLabel: 'Buscar idiomas por nombre o región',
      buttonAriaLabel: 'Seleccionar idioma del sitio',
      listAriaLabel: 'Selector de idioma',
      empty: 'Ningún idioma compatible coincide con tu búsqueda.',
    },
    hero: {
      mark: 'Carta · Custodia Pública',
      subtitle: ['Gobernanza', 'Investigación', 'Integridad del Protocolo'],
      oneliner: 'Una institución pública para la neutralidad del protocolo, la financiación de la investigación y la seguridad de largo plazo.',
      charterCta: 'Leer la Carta',
      governanceCta: 'Proceso de Gobernanza',
    },
    mission: {
      label: 'Misión',
      title: 'Los sistemas autónomos serán más poderosos que las instituciones que los despliegan.',
      subhead: 'La única vía viable es hacer que ese poder sea limitado, verificable y soberano por diseño.',
      paragraph1: 'Los sistemas autónomos ya son capaces. Lo que falta es confianza.',
      paragraph2: 'A medida que los agentes adquieren la capacidad de actuar de forma independiente en código, infraestructura y sistemas del mundo real, el riesgo deja de ser teórico. Los sistemas que pueden actuar sin restricciones no pueden desplegarse con seguridad a gran escala.',
      paragraph3BeforeStrong: 'IOI define una nueva categoría:',
      paragraph3Strong: 'infraestructura soberana para agentes',
      paragraph3AfterStrong: 'donde cada actor opera dentro de límites de autoridad explícitos y exigibles, y cada acción puede demostrarse dentro de esos límites.',
      bounded: {
        title: 'Limitado',
        premise: 'La autonomía debe estar restringida por diseño, no por intención.',
        bullets: [
          'Ejecución con capacidades acotadas y límites de autoridad explícitos',
          'Restricciones dinámicas que escalan con la confianza, no límites estáticos a la inteligencia',
          'Los actores no pueden exceder sus permisos delegados, sin importar el comportamiento del modelo',
        ],
        codaTop: 'La autonomía sin límites es insegura.',
        codaBottom: 'La autonomía acotada es una disciplina de ingeniería.',
      },
      verifiable: {
        title: 'Verificable',
        premise: 'La confianza no puede depender de la plataforma. Debe poder demostrarse de forma independiente.',
        bullets: [
          'Recibos criptográficos y ejecución auditable',
          'Aplicación determinista de políticas y resultados reproducibles',
          'Evidencia de que una acción fue válida, no solo registros de que ocurrió',
        ],
        codaTop: 'Si un sistema no puede demostrar lo que hizo,',
        codaBottom: 'no puede recibir autoridad real.',
      },
      sovereign: {
        title: 'Soberano',
        premise: 'La autoridad debe pertenecer al usuario, no al sistema ni a la plataforma.',
        bullets: [
          'Propiedad de capacidades, revocación y delegación bajo control del usuario',
          'Identidad y política portables entre entornos y proveedores',
          'Verificación que no dependa de una sola institución',
        ],
        codaTop: 'Los sistemas autónomos deben llevar consigo su autoridad',
        codaBottom: 'y también sus restricciones.',
      },
      excerpt: '"Sin un marco compartido para una ejecución limitada y verificable, la autonomía de un sistema se convierte en el riesgo de otro. IOI proporciona ese marco."',
    },
    charterBanner: {
      label: 'Carta',
      title: 'La Carta de la Fundación',
      text: 'Restricciones constitucionales exigibles sobre la acción, la mutación y la gobernanza del protocolo, diseñadas para sobrevivir a los ciclos del mercado y mantener la custodia legible para el público.',
      primaryCta: 'Leer la Carta',
      bylawsLink: 'Estatutos corporativos',
      governanceLink: 'Marco de gobernanza',
      decisionLogLink: 'Registro de decisiones',
    },
    research: {
      label: 'Programas de Investigación',
      title: 'Inversión Técnica de Largo Horizonte',
      intro: 'La Fundación financia investigación que las entidades comerciales no pueden justificar, trabajo medido en décadas y no en trimestres.',
      catalogLabel: 'Catálogo de investigación',
      viewAll: 'Ver todo',
      teasers: {
        'dcrypt-post-quantum-hybrid-library': {
          title: 'dCrypt: Biblioteca híbrida poscuántica',
          summary: 'Una biblioteca criptográfica híbrida para la migración del protocolo, que combina primitivas clásicas y poscuánticas para permitir la transición sin sacrificar la compatibilidad operativa.',
          deliverables: 'Entregables: intercambio de claves híbrido, soporte de firmas, utilidades de migración, guía de integración',
        },
        'formal-verification': {
          title: 'Verificación formal',
          summary: 'Demostrar la corrección del protocolo mediante métodos matemáticos para que los invariantes críticos puedan verificarse en lugar de inferirse solo a partir de pruebas.',
          deliverables: 'Entregables: pruebas de especificación, model checking, suites de invariantes, herramientas de verificación',
        },
        'lower-byzantine-bound': {
          title: 'Romper la cota bizantina inferior',
          summary: 'Investigación sobre supuestos de consenso y umbrales adversariales orientada a llevar la tolerancia a fallos más allá de los límites convencionales en sistemas de coordinación agéntica.',
          deliverables: 'Entregables: análisis de cotas, modelos adversariales, notas de prueba, implicaciones de protocolo',
        },
      },
    },
    transparency: {
      label: 'Registro Público',
      title: 'Transparencia',
      intro: 'Las fundaciones se juzgan por su historial. Publicamos decisiones, resultados de gobernanza y resúmenes financieros como deber institucional.',
      legalEntityTitle: 'Entidad legal',
      legalEntityName: 'IOI Labs, Inc.',
      ratifiedStandardsTitle: 'Estándares ratificados',
      recentMinutesTitle: 'Actas recientes',
      contactTitle: 'Contacto',
      securityDisclosure: 'Divulgación de seguridad',
      fetchingRecords: 'Cargando registros...',
      versionLabel: 'Versión',
      contactEmail: 'foundation at ioi.ai',
    },
    footer: {
      charter: 'Carta',
      bylaws: 'Estatutos',
      governance: 'Gobernanza',
      research: 'Investigación',
      transparency: 'Transparencia',
      login: 'Acceder',
      copyright: 'IOI Foundation. Custodia del protocolo para el largo plazo.',
    },
  },
  'fr-FR': {
    languageSelector: {
      title: 'Choisir la langue',
      closeLabel: 'Fermer le sélecteur de langue',
      searchPlaceholder: 'Rechercher',
      searchAriaLabel: 'Rechercher des langues par nom ou région',
      buttonAriaLabel: 'Choisir la langue du site',
      listAriaLabel: 'Sélecteur de langue',
      empty: 'Aucune langue prise en charge ne correspond à votre recherche.',
    },
    hero: {
      mark: 'Charte · Garde publique',
      subtitle: ['Gouvernance', 'Recherche', 'Intégrité du protocole'],
      oneliner: 'Une institution publique pour la neutralité du protocole, le financement de la recherche et la sécurité de long terme.',
      charterCta: 'Lire la charte',
      governanceCta: 'Processus de gouvernance',
    },
    mission: {
      label: 'Mission',
      title: 'Les systèmes autonomes deviendront plus puissants que les institutions qui les déploient.',
      subhead: 'La seule voie viable consiste à rendre cette puissance bornée, vérifiable et souveraine par conception.',
      paragraph1: 'Les systèmes autonomes sont déjà capables. Ce qui manque, c’est la confiance.',
      paragraph2: 'À mesure que les agents acquièrent la capacité d’agir de façon indépendante à travers le code, l’infrastructure et les systèmes du monde réel, le risque n’est plus théorique. Les systèmes capables d’agir sans contrainte ne peuvent pas être déployés en toute sécurité à grande échelle.',
      paragraph3BeforeStrong: 'IOI définit une nouvelle catégorie :',
      paragraph3Strong: 'infrastructure souveraine pour agents',
      paragraph3AfterStrong: 'où chaque acteur opère dans des limites d’autorité explicites et exécutoires, et où chaque action est prouvée comme étant dans les limites.',
      bounded: {
        title: 'Borné',
        premise: 'L’autonomie doit être contrainte par conception, pas par intention.',
        bullets: [
          'Exécution limitée par les capacités et frontières d’autorité explicites',
          'Contraintes dynamiques qui évoluent avec la confiance, non des plafonds statiques de l’intelligence',
          'Les acteurs ne peuvent pas dépasser leurs permissions déléguées, quel que soit le comportement du modèle',
        ],
        codaTop: 'L’autonomie sans borne est dangereuse.',
        codaBottom: 'L’autonomie bornée est une discipline d’ingénierie.',
      },
      verifiable: {
        title: 'Vérifiable',
        premise: 'La confiance ne peut pas dépendre de la plateforme. Elle doit être démontrable indépendamment.',
        bullets: [
          'Reçus cryptographiques et exécution vérifiable',
          'Application déterministe des politiques et résultats rejouables',
          'Preuve qu’une action était valide, et pas seulement trace de son exécution',
        ],
        codaTop: 'Si un système ne peut pas prouver ce qu’il a fait,',
        codaBottom: 'il ne peut pas recevoir d’autorité réelle.',
      },
      sovereign: {
        title: 'Souverain',
        premise: 'L’autorité doit appartenir à l’utilisateur, pas au système ni à la plateforme.',
        bullets: [
          'Possession des capacités, révocation et délégation sous contrôle de l’utilisateur',
          'Identité et politique portables entre environnements et fournisseurs',
          'Vérification indépendante d’une institution unique',
        ],
        codaTop: 'Les systèmes autonomes doivent emporter avec eux leur autorité',
        codaBottom: 'ainsi que leurs contraintes.',
      },
      excerpt: '"Sans cadre partagé pour une exécution bornée et vérifiable, l’autonomie d’un système devient le risque d’un autre. IOI fournit ce cadre."',
    },
    charterBanner: {
      label: 'Charte',
      title: 'La charte de la Fondation',
      text: 'Des contraintes constitutionnelles exécutoires sur l’action, la mutation et la gouvernance du protocole, conçues pour survivre aux cycles de marché et rendre la garde lisible au public.',
      primaryCta: 'Lire la charte',
      bylawsLink: 'Statuts de la société',
      governanceLink: 'Cadre de gouvernance',
      decisionLogLink: 'Journal des décisions',
    },
    research: {
      label: 'Programmes de recherche',
      title: 'Investissement technique de long horizon',
      intro: 'La Fondation finance une recherche que les entités commerciales ne peuvent pas justifier, un travail mesuré en décennies plutôt qu’en trimestres.',
      catalogLabel: 'Catalogue de recherche',
      viewAll: 'Tout voir',
      teasers: {
        'dcrypt-post-quantum-hybrid-library': {
          title: 'dCrypt : bibliothèque hybride post-quantique',
          summary: 'Une bibliothèque cryptographique hybride pour la migration du protocole, combinant primitives classiques et post-quantiques afin de permettre la transition sans sacrifier la compatibilité opérationnelle.',
          deliverables: 'Livrables : échange de clés hybride, prise en charge des signatures, outils de migration, guide d’intégration',
        },
        'formal-verification': {
          title: 'Vérification formelle',
          summary: 'Prouver la correction du protocole par des méthodes mathématiques afin que les invariants critiques puissent être vérifiés plutôt qu’inférés à partir des seuls tests.',
          deliverables: 'Livrables : preuves de spécification, model checking, suites d’invariants, outillage de vérification',
        },
        'lower-byzantine-bound': {
          title: 'Dépasser la borne byzantine inférieure',
          summary: 'Une recherche sur les hypothèses de consensus et les seuils adverses visant à pousser la tolérance aux fautes au-delà des bornes conventionnelles dans les systèmes de coordination agentique.',
          deliverables: 'Livrables : analyse des bornes, modèles adverses, notes de preuve, implications protocolaires',
        },
      },
    },
    transparency: {
      label: 'Registre public',
      title: 'Transparence',
      intro: 'Les fondations sont jugées sur leurs archives. Nous publions les décisions, les résultats de gouvernance et les synthèses financières comme un devoir institutionnel.',
      legalEntityTitle: 'Entité juridique',
      legalEntityName: 'IOI Labs, Inc.',
      ratifiedStandardsTitle: 'Normes ratifiées',
      recentMinutesTitle: 'Procès-verbaux récents',
      contactTitle: 'Contact',
      securityDisclosure: 'Divulgation de sécurité',
      fetchingRecords: 'Chargement des archives...',
      versionLabel: 'Version',
      contactEmail: 'foundation at ioi.ai',
    },
    footer: {
      charter: 'Charte',
      bylaws: 'Statuts',
      governance: 'Gouvernance',
      research: 'Recherche',
      transparency: 'Transparence',
      login: 'Connexion',
      copyright: 'IOI Foundation. Garde du protocole sur le long terme.',
    },
  },
  'de-DE': {
    languageSelector: {
      title: 'Sprache wählen',
      closeLabel: 'Sprachauswahl schließen',
      searchPlaceholder: 'Suchen',
      searchAriaLabel: 'Sprachen nach Name oder Region suchen',
      buttonAriaLabel: 'Seitensprache wählen',
      listAriaLabel: 'Sprachauswahl',
      empty: 'Keine unterstützte Sprache entspricht deiner Suche.',
    },
    hero: {
      mark: 'Charta · Öffentliche Treuhandschaft',
      subtitle: ['Governance', 'Forschung', 'Protokollintegrität'],
      oneliner: 'Eine öffentliche Institution für Protokollneutralität, Forschungsfinanzierung und langfristige Sicherheit.',
      charterCta: 'Charta lesen',
      governanceCta: 'Governance-Prozess',
    },
    mission: {
      label: 'Mission',
      title: 'Autonome Systeme werden mächtiger sein als die Institutionen, die sie einsetzen.',
      subhead: 'Der einzige tragfähige Weg besteht darin, diese Macht von Anfang an begrenzt, verifizierbar und souverän zu gestalten.',
      paragraph1: 'Autonome Systeme sind bereits leistungsfähig. Was fehlt, ist Vertrauen.',
      paragraph2: 'Je mehr Agenten unabhängig über Code, Infrastruktur und reale Systeme handeln können, desto weniger theoretisch wird das Risiko. Systeme, die ohne Begrenzung handeln können, lassen sich nicht sicher in großem Maßstab einsetzen.',
      paragraph3BeforeStrong: 'IOI definiert eine neue Kategorie:',
      paragraph3Strong: 'souveräne Agenteninfrastruktur',
      paragraph3AfterStrong: 'in der jeder Akteur innerhalb expliziter, durchsetzbarer Autoritätsgrenzen operiert und jede Aktion nachweisbar innerhalb dieser Grenzen bleibt.',
      bounded: {
        title: 'Begrenzt',
        premise: 'Autonomie muss durch Design begrenzt werden, nicht durch Absicht.',
        bullets: [
          'Fähigkeitsgebundene Ausführung und explizite Autoritätsgrenzen',
          'Dynamische Beschränkungen, die mit Vertrauen wachsen, nicht statische Grenzen für Intelligenz',
          'Akteure können ihre delegierten Berechtigungen unabhängig vom Modellverhalten nicht überschreiten',
        ],
        codaTop: 'Unbegrenzte Autonomie ist unsicher.',
        codaBottom: 'Begrenzte Autonomie ist eine Ingenieursdisziplin.',
      },
      verifiable: {
        title: 'Verifizierbar',
        premise: 'Vertrauen darf nicht von der Plattform abhängen. Es muss unabhängig belegbar sein.',
        bullets: [
          'Kryptografische Belege und auditierbare Ausführung',
          'Deterministische Richtliniendurchsetzung und reproduzierbare Ergebnisse',
          'Belege dafür, dass eine Aktion gültig war, nicht nur Protokolle darüber, dass sie stattfand',
        ],
        codaTop: 'Wenn ein System nicht beweisen kann, was es getan hat,',
        codaBottom: 'darf es keine echte Autorität erhalten.',
      },
      sovereign: {
        title: 'Souverän',
        premise: 'Autorität muss dem Nutzer gehören, nicht dem System und nicht der Plattform.',
        bullets: [
          'Fähigkeitsbesitz, Widerruf und Delegation unter Kontrolle des Nutzers',
          'Portable Identität und Richtlinien über Umgebungen und Anbieter hinweg',
          'Verifikation, die nicht von einer einzelnen Institution abhängt',
        ],
        codaTop: 'Autonome Systeme sollten ihre Autorität mit sich tragen',
        codaBottom: 'und ebenso ihre Beschränkungen.',
      },
      excerpt: '"Ohne einen gemeinsamen Rahmen für begrenzte und verifizierbare Ausführung wird die Autonomie des einen Systems zum Risiko eines anderen. IOI liefert diesen Rahmen."',
    },
    charterBanner: {
      label: 'Charta',
      title: 'Die Charta der Stiftung',
      text: 'Durchsetzbare verfassungsartige Grenzen für Protokollaktion, Mutation und Governance, ausgelegt darauf, Marktzyklen zu überdauern und öffentliche Treuhandschaft nachvollziehbar zu halten.',
      primaryCta: 'Charta lesen',
      bylawsLink: 'Gesellschaftsstatuten',
      governanceLink: 'Governance-Rahmen',
      decisionLogLink: 'Entscheidungsprotokoll',
    },
    research: {
      label: 'Forschungsprogramme',
      title: 'Technische Investitionen mit langem Horizont',
      intro: 'Die Stiftung finanziert Forschung, die kommerzielle Akteure nicht rechtfertigen können, Arbeit, die in Jahrzehnten statt in Quartalen gemessen wird.',
      catalogLabel: 'Forschungskatalog',
      viewAll: 'Alle anzeigen',
      teasers: {
        'dcrypt-post-quantum-hybrid-library': {
          title: 'dCrypt: Postquanten-Hybridbibliothek',
          summary: 'Eine hybride Kryptobibliothek für die Protokollmigration, die klassische und postquantenfähige Primitive kombiniert, damit Systeme wechseln können, ohne operative Kompatibilität zu verlieren.',
          deliverables: 'Ergebnisse: hybrider Schlüsselaustausch, Signaturunterstützung, Migrationswerkzeuge, Integrationsleitfaden',
        },
        'formal-verification': {
          title: 'Formale Verifikation',
          summary: 'Nachweis der Protokollkorrektheit mit mathematischen Methoden, damit kritische Invarianten verifiziert statt nur aus Tests abgeleitet werden.',
          deliverables: 'Ergebnisse: Spezifikationsbeweise, Model Checking, Invariantensuiten, Verifikationswerkzeuge',
        },
        'lower-byzantine-bound': {
          title: 'Die untere byzantinische Grenze durchbrechen',
          summary: 'Forschung zu Konsensannahmen und adversarialen Schwellenwerten mit dem Ziel, Fehlertoleranz in agentischen Koordinationssystemen über konventionelle Untergrenzen hinaus zu treiben.',
          deliverables: 'Ergebnisse: Grenzanalyse, adversariale Modelle, Beweisnotizen, Protokollimplikationen',
        },
      },
    },
    transparency: {
      label: 'Öffentliches Register',
      title: 'Transparenz',
      intro: 'Stiftungen werden an ihren Aufzeichnungen gemessen. Wir veröffentlichen Entscheidungen, Governance-Ergebnisse und Finanzzusammenfassungen als institutionelle Pflicht.',
      legalEntityTitle: 'Rechtsträger',
      legalEntityName: 'IOI Labs, Inc.',
      ratifiedStandardsTitle: 'Ratifizierte Standards',
      recentMinutesTitle: 'Aktuelle Protokolle',
      contactTitle: 'Kontakt',
      securityDisclosure: 'Sicherheitsmeldung',
      fetchingRecords: 'Einträge werden geladen...',
      versionLabel: 'Version',
      contactEmail: 'foundation at ioi.ai',
    },
    footer: {
      charter: 'Charta',
      bylaws: 'Statuten',
      governance: 'Governance',
      research: 'Forschung',
      transparency: 'Transparenz',
      login: 'Anmelden',
      copyright: 'IOI Foundation. Protokolltreuhandschaft auf lange Sicht.',
    },
  },
};
