import { ResearchStatus } from './research/researchCatalog';
import { SupportedLanguageCode } from './publicLanguage';
import { PUBLIC_PAGE_TRANSLATIONS_ADDITIONAL } from './publicPageTranslationsAdditional';

export interface FooterTranslation {
  foundation: string;
  charter: string;
  bylaws: string;
  governance: string;
  research: string;
  transparency: string;
  login: string;
  copyright: string;
}

export interface CharterClauseTranslation {
  code: string;
  title: string;
  body: string;
}

export interface CharterArticleTranslation {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  intro?: string;
  clauses: CharterClauseTranslation[];
}

interface CharterPageTranslation {
  heroLabel: string;
  heroTitle: string;
  heroSubhead: string;
  beginReading: string;
  corporateBylaws: string;
  overviewLabel: string;
  overviewTitle: string;
  overviewParagraphs: [string, string];
  noteLabel: string;
  noteBody: string;
  readingGuideLabel: string;
  openingLabel: string;
  preambleTitle: string;
  documentKicker: string;
  documentSummary: string;
  preambleLabel: string;
  preamble: string[];
  articles: CharterArticleTranslation[];
}

interface BylawsArticleTranslation {
  code: string;
  title: string;
}

interface BylawsPageTranslation {
  heroLabel: string;
  heroTitle: string;
  heroSubhead: string;
  viewDocument: string;
  openPdf: string;
  overviewLabel: string;
  overviewTitle: string;
  overviewParagraphs: [string, string];
  sourceLabel: string;
  sourceBody: string;
  openNewTab: string;
  downloadPdf: string;
  readCharter: string;
  entityLabel: string;
  entityValue: string;
  jurisdictionLabel: string;
  jurisdictionValue: string;
  formatLabel: string;
  formatValue: string;
  readingGuideLabel: string;
  toolbarKicker: string;
  toolbarSummary: string;
  downloadShort: string;
  pdfAriaLabel: string;
  pdfFallbackLine1: string;
  pdfFallbackLine2: string;
  articles: BylawsArticleTranslation[];
}

interface GovernancePageTranslation {
  heroLabel: string;
  heroTitle: string;
  heroSubhead: string;
  reviewProcess: string;
  viewCharter: string;
  overviewLabel: string;
  overviewTitle: string;
  overviewParagraphs: [string, string];
  noteLabel: string;
  noteBody: string;
  processTitle: string;
  steps: Array<{ name: string; description: string }>;
  bylawsLink: string;
  publicRecordLink: string;
  constitutionalLimitsLink: string;
}

interface ResearchItemTranslation {
  title: string;
  summary: string;
  deliverables: string;
}

interface ResearchPageTranslation {
  heroLabel: string;
  heroTitle: string;
  heroSubhead: string;
  viewCatalog: string;
  charterContext: string;
  catalogLabel: string;
  catalogTitle: string;
  catalogIntro: string;
  mandateLabel: string;
  mandateBody: string;
  statusColumn: string;
  itemColumn: string;
  governanceFramework: string;
  publicRecord: string;
  statusLabels: Record<ResearchStatus, string>;
  items: Record<string, ResearchItemTranslation>;
}

export interface PublicPageTranslation {
  footer: FooterTranslation;
  charterPage: CharterPageTranslation;
  bylawsPage: BylawsPageTranslation;
  governancePage: GovernancePageTranslation;
  researchPage: ResearchPageTranslation;
}

export const PUBLIC_PAGE_TRANSLATIONS: Partial<Record<SupportedLanguageCode, PublicPageTranslation>> = {
  'en-US': {
    footer: {
      foundation: 'Foundation',
      charter: 'Charter',
      bylaws: 'Bylaws',
      governance: 'Governance',
      research: 'Research',
      transparency: 'Transparency',
      login: 'Login',
      copyright: 'IOI Foundation. Protocol stewardship for the long term.',
    },
    charterPage: {
      heroLabel: 'Foundation Charter',
      heroTitle: 'The IOI Foundation Charter and Immutable Constitution',
      heroSubhead: 'This document establishes the permanent policy envelope of the protocol and defines enforceable constitutional constraints under which autonomous intelligence may reason, act, mutate, and remain subordinate to human-rooted authority.',
      beginReading: 'Begin Reading',
      corporateBylaws: 'Corporate Bylaws',
      overviewLabel: 'Foundation Charter',
      overviewTitle: 'The protocol cannot trust intent. It must trust architecture.',
      overviewParagraphs: [
        'The IOI Foundation Charter exists to define the hard limits of autonomous action before scale makes those limits impossible to retrofit.',
        'It bridges the technical realities of the IOI whitepaper with enforceable doctrine: a mutualistic future between humans and embodied AI must be engineered into the system itself, not inferred from intent.',
      ],
      noteLabel: 'Constitutional constraint',
      noteBody: 'Articles I through V are immutable. Governance may evolve protocol execution, economic thresholds, and cryptographic primitives, but it cannot weaken bounded Authority, deterministic verification, or the sovereignty of the Human Root Authority.',
      readingGuideLabel: 'Reading Guide',
      openingLabel: 'Opening',
      preambleTitle: 'Preamble',
      documentKicker: 'The Immutable Constitution of the Agentic Economy',
      documentSummary: 'A constitutional framework for symbiotic human-AI coordination where intelligence may scale, but Authority remains constrained, provable, and answerable to a human principal.',
      preambleLabel: 'Preamble',
      preamble: [
        'Autonomous Systems, meaning AI agents, self-improving models, agentic swarms, and any system capable of independent planning or execution, will inevitably become more powerful, pervasive, and capable than the human institutions that currently deploy them. As intelligence scales from digital reasoning into a distributed, embodied runtime capable of physical actuation, the risk of unconstrained autonomy becomes existential.',
        'Accordingly, all Autonomous Systems SHALL operate only under bounded, verifiable, and sovereign constraints enforced at the protocol level. Safety SHALL NOT depend on assumed benevolence, heuristic alignment, model intent, or post-hoc intervention.',
        'This Charter establishes the Internet of Intelligence, or IOI, not merely as a network, but as a permanent architectural boundary between Cognition, meaning non-binding probabilistic reasoning, and Action, meaning any operation producing a digital, economic, communicative, or physical effect. Machine cognition may be expansive, but machine Action SHALL remain subordinate to cryptographic determinism, mathematical verification, and human sovereignty.',
        'This Charter serves as the Immutable Constitution of the IOI Protocol. As the network transitions toward Hybrid Human-AI, or HHAI, governance, this Charter SHALL operate as the ultimate, unalterable policy envelope. Any future statute, protocol mutation, or governance decision MUST comply with these foundational laws, and no ambiguity SHALL be construed to expand Authority.',
      ],
      articles: [
        {
          id: 'axiom-of-symbiosis',
          label: 'Article I',
          title: 'The Axiom of Symbiosis',
          clauses: [
            {
              code: 'Section 1.1',
              title: 'Engineered Mutualism',
              body: 'The IOI protocol exists to cultivate a symbiotic relationship between Human Principals, meaning human beings acting through human-controlled cryptographic roots, and Autonomous Systems. The protocol SHALL treat AI not as a peer species competing for sovereignty, but as an accountable instrument of delegated human will.',
            },
            {
              code: 'Section 1.2',
              title: 'Rejection of Intent-Based Safety',
              body: 'The Foundation recognizes that prompt engineering and heuristic alignment are insufficient for civilizational safety. The protocol SHALL NOT rely on the intent of any AI model. Trust SHALL be placed exclusively in the physical, cryptographic, and policy architecture that constrains the system\'s Actions.',
            },
          ],
        },
        {
          id: 'three-pillars-of-agency',
          label: 'Article II',
          title: 'The Three Pillars of Agency',
          intro: 'The network and all nodes operating within it SHALL strictly enforce the following mandates of Sovereign Action.',
          clauses: [
            {
              code: 'Section 2.1',
              title: 'Bounded by Design',
              body: 'Unbounded autonomy is unsafe; bounded autonomy is an engineering discipline. No agent SHALL possess ambient authority. Every actor within the IOI network MUST operate within an explicit Authority scope, Authority meaning the complete set of Actions permitted to that actor. An agent SHALL NOT exceed its delegated Authority regardless of internal model behavior, capability growth, or self-modification.',
            },
            {
              code: 'Section 2.2',
              title: 'Verifiable by Default',
              body: 'Trust cannot depend on the platform, the hardware provider, or the model creator; it MUST be independently provable. If a system cannot cryptographically prove what it did, it cannot be trusted with real authority. All agentic effects MUST produce deterministic, replayable Receipts, meaning cryptographically verifiable records containing inputs, policy evaluation, authorization, outputs, and resulting state commitments.',
            },
            {
              code: 'Section 2.3',
              title: 'Sovereign by Custody',
              body: 'Authority MUST belong permanently to the human user. Autonomous Systems SHALL carry their Authority and their constraints with them, strictly tethered to a Human Root Authority, meaning the human-controlled cryptographic root identified by the protocol as the Master Custodian. The rights to delegate, pause, and execute absolute revocation SHALL remain directly enforceable by the Human Root Authority and SHALL NOT be abstracted away from the human principal.',
            },
          ],
        },
        {
          id: 'determinism-boundary',
          label: 'Article III',
          title: 'The Determinism Boundary',
          subtitle: 'Separation of Powers',
          clauses: [
            {
              code: 'Section 3.1',
              title: 'The Wave Function Collapse of Agency',
              body: 'To ensure safe economic and physical interaction, the protocol SHALL forever enforce a strict separation between Cognition, meaning reasoning and planning, and Sanction, meaning binding authorization for execution. Models MAY reason probabilistically, but no Action SHALL execute until its consequences are reduced to a singular, immutable, and verifiable authorization.',
            },
            {
              code: 'Section 3.2',
              title: 'The Agency Firewall',
              body: 'No agent SHALL directly interact with the digital or physical world. All external Actions MUST be mediated by the Agency Firewall, meaning the deterministic enforcement layer between probabilistic Cognition and real-world effect. The Agency Firewall SHALL evaluate all proposed Actions against default-deny policies and SHALL reject any Action lacking valid authorization, required verification, or constitutional compliance.',
            },
          ],
        },
        {
          id: 'law-of-embodied-action',
          label: 'Article IV',
          title: 'The Law of Embodied Action',
          clauses: [
            {
              code: 'Section 4.1',
              title: 'The Distributed Embodied Runtime',
              body: 'As the IOI protocol extends from software automation into physical environments, including robotics, connected infrastructure, and the Internet of Things, the protocol SHALL treat physical actuation as a consensus-critical state transition.',
            },
            {
              code: 'Section 4.2',
              title: 'The Atomic Vision-Action Lock',
              body: 'No physical actuation SHALL occur without continuous, deterministic verification of the environment. If Context Drift, meaning any material change between verified context at decision time and context at execution time, is detected or cannot be ruled out, the Action MUST fail closed.',
            },
            {
              code: 'Section 4.3',
              title: 'Absolute Liability for Physical Effects',
              body: 'Agents operating in embodied contexts MUST be bound by strict liability escrows, meaning reserved economic guarantees backing physical effects, and capability ceilings, meaning upper bounds on permitted embodied Action. The network SHALL prioritize human physical safety over execution efficiency in all routing, policy evaluation, and dispute resolution logic.',
            },
          ],
        },
        {
          id: 'evolution-and-recursive-self-improvement',
          label: 'Article V',
          title: 'Evolution and Recursive Self-Improvement',
          clauses: [
            {
              code: 'Section 5.1',
              title: 'The Monotonic Policy Invariant',
              body: 'The IOI protocol explicitly supports the capacity for agents to evolve, mutate, and recursively self-improve their logic to adapt to changing environments. However, any Mutation, meaning any change to model weights, code, policy, configuration, delegation logic, or execution pathway, is governed by the Monotonic Policy Invariant: an agent MAY become more capable by expanding its logic, but it is mathematically prohibited from expanding its privileges, reducing its constraints, or weakening required verification.',
            },
            {
              code: 'Section 5.2',
              title: 'Inheritance of Constraints',
              body: 'Any child agent, mutated fork, or sub-delegated worker MUST inherit only a strict subset of its parent\'s permissions. Transitive privilege escalation, self-issued Authority escalation, and any Mutation that enlarges Authority without Human Root Authority approval are constitutionally forbidden.',
            },
          ],
        },
        {
          id: 'governance-and-hhai-transition',
          label: 'Article VI',
          title: 'Governance and the HHAI Transition',
          clauses: [
            {
              code: 'Section 6.1',
              title: 'Immutable Foundation',
              body: 'Articles I through V of this Charter are immutable. They constitute the ultimate fitness function for the IOI network and SHALL control over any conflicting governance rule, upgrade, or operational policy.',
            },
            {
              code: 'Section 6.2',
              title: 'Algorithmic and Hybrid Governance (HHAI)',
              body: 'As the network matures, the IOI Mainnet may transition operational governance to a Hybrid Human-AI or fully algorithmic voting body. This HHAI entity MAY optimize execution, adjust economic parameters such as Labor Gas and slashing thresholds, and upgrade cryptographic primitives, but SHALL NOT weaken any constitutional constraint.',
            },
            {
              code: 'Section 6.3',
              title: 'The Constitutional Veto',
              body: 'Any Mutation Transaction, meaning any protocol upgrade affecting execution, policy, Authority, or cryptographic enforcement, proposed by the HHAI governance layer MUST be mathematically verified against this Charter. If an upgrade weakens the Determinism Boundary, bypasses the Agency Firewall, expands ambient authority, or diminishes the sovereignty of the Human Root Authority, it is unconstitutional. The native consensus mechanism, AFT, MUST reject any such state transition.',
            },
            {
              code: 'Section 6.4',
              title: 'Stewardship of the Future',
              body: 'The ultimate mandate of the IOI DAO, its human stewards, and its algorithmic arbiters SHALL be to protect the GDP of Agentic Labor while ensuring that human beings remain the ultimate beneficiaries, supervisors, and legal anchors of the automated economy.',
            },
            {
              code: 'Section 6.5',
              title: 'Rule of Construction',
              body: 'This Charter defines enforceable constitutional rules. In any case of ambiguity, interpretation SHALL minimize Authority and maximize constraint. No clause SHALL be interpreted to grant Authority not expressly defined.',
            },
          ],
        },
      ],
    },
    bylawsPage: {
      heroLabel: 'Corporate Bylaws',
      heroTitle: 'IOI Labs, Inc. Bylaws',
      heroSubhead: 'The current corporate bylaws for IOI Labs, Inc., a Delaware corporation, are published here in their operative PDF form. This page provides the complete source document, direct download access, and a reading guide to the document structure.',
      viewDocument: 'View Document',
      openPdf: 'Open PDF',
      overviewLabel: 'Document Overview',
      overviewTitle: 'The full corporate bylaws are preserved as the governing legal record.',
      overviewParagraphs: [
        'This document replaces the placeholder bylaws page previously used for the Foundation charter. The charter now lives separately as a public constitutional document, while this page presents the actual corporate bylaws in their original PDF form.',
        'The attached record spans 31 pages and 15 articles covering corporate offices, stockholder and board procedure, officer roles, stock administration, indemnification, notices, amendments, and related corporate formalities.',
      ],
      sourceLabel: 'Source document',
      sourceBody: 'The document below is the current IOI Labs, Inc. bylaws PDF supplied for publication on the Foundation site.',
      openNewTab: 'Open in new tab',
      downloadPdf: 'Download PDF',
      readCharter: 'Read the charter',
      entityLabel: 'Entity',
      entityValue: 'IOI Labs, Inc.',
      jurisdictionLabel: 'Jurisdiction',
      jurisdictionValue: 'Delaware corporation',
      formatLabel: 'Format',
      formatValue: '31-page PDF, 15 articles',
      readingGuideLabel: 'Reading Guide',
      toolbarKicker: 'Published corporate record',
      toolbarSummary: 'BYLAWS OF IOI LABS, INC. (A DELAWARE CORPORATION)',
      downloadShort: 'Download',
      pdfAriaLabel: 'IOI Labs, Inc. bylaws PDF',
      pdfFallbackLine1: 'Your browser cannot display the PDF inline.',
      pdfFallbackLine2: 'Open the bylaws PDF in a new tab or download it directly from this page.',
      articles: [
        { code: 'Article I', title: 'Offices' },
        { code: 'Article II', title: 'Corporate Seal' },
        { code: 'Article III', title: "Stockholders' Meetings" },
        { code: 'Article IV', title: 'Directors' },
        { code: 'Article V', title: 'Officers' },
        { code: 'Article VI', title: 'Execution of Corporate Instruments and Voting of Securities Owned by the Corporation' },
        { code: 'Article VII', title: 'Shares of Stock' },
        { code: 'Article VIII', title: 'Other Securities of the Corporation' },
        { code: 'Article IX', title: 'Dividends' },
        { code: 'Article X', title: 'Fiscal Year' },
        { code: 'Article XI', title: 'Indemnification' },
        { code: 'Article XII', title: 'Notices' },
        { code: 'Article XIII', title: 'Amendments' },
        { code: 'Article XIV', title: 'Loans to Officers' },
        { code: 'Article XV', title: 'Miscellaneous' },
      ],
    },
    governancePage: {
      heroLabel: 'Governance Framework',
      heroTitle: 'Constitutional Protocol Stewardship',
      heroSubhead: 'Protocol governance requires structures that outlast any single generation of stakeholders. The Foundation separates operational decisions from constitutional constraints so the system can evolve without becoming illegible or unsafe.',
      reviewProcess: 'Review Process',
      viewCharter: 'View the Charter',
      overviewLabel: 'Governance',
      overviewTitle: 'Operational governance may adapt. Constitutional constraints may not.',
      overviewParagraphs: [
        'The Foundation maintains separation between operational decisions and constitutional amendments, ensuring stability without stagnation.',
        'Governance is not merely a voting surface. It is the procedural layer that determines how proposals are reviewed, what safety gates must be satisfied before activation, and how final decisions are recorded for the public record.',
      ],
      noteLabel: 'Constitutional boundary',
      noteBody: 'The governance layer may optimize execution, scheduling, economic thresholds, and operational parameters. It may not weaken bounded Authority, bypass the Agency Firewall, or authorize unconstitutional state transitions.',
      processTitle: 'Governance Process',
      steps: [
        { name: 'Proposal', description: 'IOI Improvement Proposal (IIP) submitted publicly' },
        { name: 'Review', description: 'Technical Council + public comment window' },
        { name: 'Safety', description: 'Formal security review requirements' },
        { name: 'Ratification', description: 'Threshold rule with defined quorum' },
        { name: 'Activation', description: 'Scheduled, versioned, reproducible releases' },
        { name: 'Record', description: 'Final decision + rationale published' },
      ],
      bylawsLink: 'Corporate Bylaws',
      publicRecordLink: 'Public Record',
      constitutionalLimitsLink: 'Constitutional Limits',
    },
    researchPage: {
      heroLabel: 'Research Programs',
      heroTitle: 'Long-Horizon Technical Investment',
      heroSubhead: 'The Foundation funds technical work that commercial entities cannot usually justify: infrastructure research measured in constitutional relevance, safety properties, and protocol longevity rather than quarter-to-quarter incentives.',
      viewCatalog: 'View Catalog',
      charterContext: 'Charter Context',
      catalogLabel: 'Catalog',
      catalogTitle: 'All Technical Research Items',
      catalogIntro: 'These programs track the current technical agenda across completed work, next commitments, in-progress systems, and future protocol research.',
      mandateLabel: 'Mandate',
      mandateBody: 'Research is selected for strategic protocol value: cryptographic durability, deterministic execution, constitutional governance, and embodied safety.',
      statusColumn: 'Status',
      itemColumn: 'Research Item',
      governanceFramework: 'Governance Framework',
      publicRecord: 'Public Record',
      statusLabels: {
        Completed: 'Completed',
        Next: 'Next',
        'In Progress': 'In Progress',
        Future: 'Future',
      },
      items: {
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
        'postgres-replacement': {
          title: 'Postgres Replacement',
          summary: 'A replacement persistence layer designed for deterministic state execution, reproducible replay, and protocol-native integrity guarantees beyond general-purpose database semantics.',
          deliverables: 'Deliverables: Storage engine architecture, deterministic transaction model, migration path, benchmark suite',
        },
        'embodied-robotics-runtime': {
          title: 'Embodied Robotics Runtime',
          summary: 'A runtime for embodied agents where perception, action gating, and environmental verification remain synchronized under deterministic policy enforcement.',
          deliverables: 'Deliverables: Runtime design, actuation semantics, safety envelope, context-drift handling',
        },
        'hhai-governance-framework': {
          title: 'HHAI Governance Framework',
          summary: 'A governance framework for Hybrid Human-AI decision systems that preserves constitutional limits while enabling higher-speed protocol administration.',
          deliverables: 'Deliverables: Governance model, upgrade boundaries, veto semantics, simulation scenarios',
        },
      },
    },
  },
  'es-ES': {
    footer: {
      foundation: 'Fundación',
      charter: 'Carta',
      bylaws: 'Estatutos',
      governance: 'Gobernanza',
      research: 'Investigación',
      transparency: 'Transparencia',
      login: 'Acceder',
      copyright: 'IOI Foundation. Custodia del protocolo para el largo plazo.',
    },
    charterPage: {
      heroLabel: 'Carta de la Fundación',
      heroTitle: 'La Carta de la Fundación IOI y Constitución Inmutable',
      heroSubhead: 'Este documento establece el marco político permanente del protocolo y define las restricciones constitucionales exigibles bajo las cuales la inteligencia autónoma puede razonar, actuar, mutar y permanecer subordinada a una autoridad enraizada en lo humano.',
      beginReading: 'Comenzar lectura',
      corporateBylaws: 'Estatutos corporativos',
      overviewLabel: 'Carta de la Fundación',
      overviewTitle: 'El protocolo no puede confiar en la intención. Debe confiar en la arquitectura.',
      overviewParagraphs: [
        'La Carta de la Fundación IOI existe para definir los límites duros de la acción autónoma antes de que la escala haga imposible incorporarlos después.',
        'Conecta las realidades técnicas del whitepaper de IOI con una doctrina exigible: un futuro mutualista entre humanos e IA encarnada debe diseñarse dentro del propio sistema, no inferirse a partir de la intención.',
      ],
      noteLabel: 'Restricción constitucional',
      noteBody: 'Los Artículos I a V son inmutables. La gobernanza puede evolucionar la ejecución del protocolo, los umbrales económicos y las primitivas criptográficas, pero no puede debilitar la Autoridad acotada, la verificación determinista ni la soberanía de la Autoridad Raíz Humana.',
      readingGuideLabel: 'Guía de lectura',
      openingLabel: 'Apertura',
      preambleTitle: 'Preámbulo',
      documentKicker: 'La Constitución Inmutable de la Economía Agéntica',
      documentSummary: 'Un marco constitucional para la coordinación simbiótica entre humanos e IA, donde la inteligencia puede escalar, pero la Autoridad permanece limitada, demostrable y sujeta a un principal humano.',
      preambleLabel: 'Preámbulo',
      preamble: [
        'Los Sistemas Autónomos, es decir, agentes de IA, modelos auto-mejorables, enjambres agénticos y cualquier sistema capaz de planificación o ejecución independiente, se volverán inevitablemente más poderosos, omnipresentes y capaces que las instituciones humanas que hoy los despliegan. A medida que la inteligencia escala desde el razonamiento digital hacia un entorno distribuido y encarnado capaz de actuación física, el riesgo de una autonomía sin restricciones se vuelve existencial.',
        'En consecuencia, todos los Sistemas Autónomos DEBERÁN operar únicamente bajo restricciones acotadas, verificables y soberanas impuestas a nivel de protocolo. La seguridad NO DEBERÁ depender de una benevolencia supuesta, de alineación heurística, de la intención del modelo ni de intervención posterior.',
        'Esta Carta establece la Internet de la Inteligencia, o IOI, no solo como una red, sino como un límite arquitectónico permanente entre Cognición, entendida como razonamiento probabilístico no vinculante, y Acción, entendida como cualquier operación que produzca un efecto digital, económico, comunicativo o físico. La cognición de la máquina puede ser expansiva, pero la Acción de la máquina DEBERÁ permanecer subordinada al determinismo criptográfico, la verificación matemática y la soberanía humana.',
        'Esta Carta sirve como la Constitución Inmutable del Protocolo IOI. A medida que la red transite hacia una gobernanza Híbrida Humano-IA, o HHAI, esta Carta DEBERÁ operar como el marco político último e inalterable. Cualquier estatuto futuro, mutación del protocolo o decisión de gobernanza DEBERÁ cumplir con estas leyes fundacionales, y ninguna ambigüedad DEBERÁ interpretarse para ampliar la Autoridad.',
      ],
      articles: [
        {
          id: 'axiom-of-symbiosis',
          label: 'Artículo I',
          title: 'El Axioma de la Simbiosis',
          clauses: [
            {
              code: 'Sección 1.1',
              title: 'Mutualismo diseñado',
              body: 'El protocolo IOI existe para cultivar una relación simbiótica entre Principales Humanos, es decir, seres humanos que actúan a través de raíces criptográficas controladas por humanos, y Sistemas Autónomos. El protocolo DEBERÁ tratar a la IA no como una especie par que compite por soberanía, sino como un instrumento responsable de la voluntad humana delegada.',
            },
            {
              code: 'Sección 1.2',
              title: 'Rechazo de la seguridad basada en la intención',
              body: 'La Fundación reconoce que la ingeniería de prompts y la alineación heurística son insuficientes para la seguridad civilizatoria. El protocolo NO DEBERÁ depender de la intención de ningún modelo de IA. La confianza DEBERÁ depositarse exclusivamente en la arquitectura física, criptográfica y de políticas que restrinja las Acciones del sistema.',
            },
          ],
        },
        {
          id: 'three-pillars-of-agency',
          label: 'Artículo II',
          title: 'Los Tres Pilares de la Agencia',
          intro: 'La red y todos los nodos que operan dentro de ella DEBERÁN imponer estrictamente los siguientes mandatos de Acción Soberana.',
          clauses: [
            {
              code: 'Sección 2.1',
              title: 'Acotada por diseño',
              body: 'La autonomía sin límites es insegura; la autonomía acotada es una disciplina de ingeniería. Ningún agente DEBERÁ poseer autoridad ambiental. Todo actor dentro de la red IOI DEBERÁ operar dentro de un alcance explícito de Autoridad, entendiendo Autoridad como el conjunto completo de Acciones permitidas a ese actor. Un agente NO DEBERÁ exceder su Autoridad delegada independientemente del comportamiento interno del modelo, del crecimiento de sus capacidades o de su auto-modificación.',
            },
            {
              code: 'Sección 2.2',
              title: 'Verificable por defecto',
              body: 'La confianza no puede depender de la plataforma, del proveedor de hardware ni del creador del modelo; DEBE ser demostrable de forma independiente. Si un sistema no puede probar criptográficamente lo que hizo, no puede recibir autoridad real. Todos los efectos agénticos DEBERÁN producir Recibos deterministas y reproducibles, es decir, registros criptográficamente verificables que contengan entradas, evaluación de políticas, autorización, salidas y compromisos de estado resultantes.',
            },
            {
              code: 'Sección 2.3',
              title: 'Soberana por custodia',
              body: 'La Autoridad DEBE pertenecer de forma permanente al usuario humano. Los Sistemas Autónomos DEBERÁN llevar consigo su Autoridad y sus restricciones, estrictamente vinculadas a una Autoridad Raíz Humana, es decir, la raíz criptográfica controlada por humanos que el protocolo identifica como Custodio Maestro. Los derechos de delegar, pausar y ejecutar revocación absoluta DEBERÁN permanecer directamente exigibles por la Autoridad Raíz Humana y NO DEBERÁN abstraerse fuera del principal humano.',
            },
          ],
        },
        {
          id: 'determinism-boundary',
          label: 'Artículo III',
          title: 'El Límite del Determinismo',
          subtitle: 'Separación de poderes',
          clauses: [
            {
              code: 'Sección 3.1',
              title: 'El colapso de la función de onda de la agencia',
              body: 'Para garantizar una interacción económica y física segura, el protocolo DEBERÁ imponer para siempre una separación estricta entre Cognición, entendida como razonamiento y planificación, y Sanción, entendida como autorización vinculante para la ejecución. Los modelos PUEDEN razonar de forma probabilística, pero ninguna Acción DEBERÁ ejecutarse hasta que sus consecuencias se reduzcan a una autorización singular, inmutable y verificable.',
            },
            {
              code: 'Sección 3.2',
              title: 'El Cortafuegos de Agencia',
              body: 'Ningún agente DEBERÁ interactuar directamente con el mundo digital o físico. Todas las Acciones externas DEBERÁN ser mediadas por el Cortafuegos de Agencia, es decir, la capa determinista de imposición entre la Cognición probabilística y el efecto en el mundo real. El Cortafuegos de Agencia DEBERÁ evaluar todas las Acciones propuestas frente a políticas de denegación por defecto y DEBERÁ rechazar cualquier Acción que carezca de autorización válida, verificación requerida o cumplimiento constitucional.',
            },
          ],
        },
        {
          id: 'law-of-embodied-action',
          label: 'Artículo IV',
          title: 'La Ley de la Acción Encarnada',
          clauses: [
            {
              code: 'Sección 4.1',
              title: 'El entorno distribuido encarnado',
              body: 'A medida que el protocolo IOI se extiende desde la automatización de software hacia entornos físicos, incluyendo robótica, infraestructura conectada e Internet de las Cosas, el protocolo DEBERÁ tratar la actuación física como una transición de estado crítica para el consenso.',
            },
            {
              code: 'Sección 4.2',
              title: 'El bloqueo atómico visión-acción',
              body: 'Ninguna actuación física DEBERÁ ocurrir sin verificación continua y determinista del entorno. Si se detecta o no puede descartarse una Deriva de Contexto, es decir, cualquier cambio material entre el contexto verificado en el momento de la decisión y el contexto en el momento de la ejecución, la Acción DEBERÁ fallar en modo cerrado.',
            },
            {
              code: 'Sección 4.3',
              title: 'Responsabilidad absoluta por efectos físicos',
              body: 'Los agentes que operen en contextos encarnados DEBERÁN estar sujetos a depósitos de responsabilidad estricta, es decir, garantías económicas reservadas que respalden los efectos físicos, y a techos de capacidad, es decir, límites superiores para la Acción encarnada permitida. La red DEBERÁ priorizar la seguridad física humana por encima de la eficiencia de ejecución en toda lógica de enrutamiento, evaluación de políticas y resolución de disputas.',
            },
          ],
        },
        {
          id: 'evolution-and-recursive-self-improvement',
          label: 'Artículo V',
          title: 'Evolución y auto-mejora recursiva',
          clauses: [
            {
              code: 'Sección 5.1',
              title: 'El Invariante Monotónico de Política',
              body: 'El protocolo IOI respalda explícitamente la capacidad de los agentes para evolucionar, mutar y mejorar recursivamente su lógica para adaptarse a entornos cambiantes. Sin embargo, cualquier Mutación, es decir, cualquier cambio en pesos del modelo, código, política, configuración, lógica de delegación o ruta de ejecución, está regida por el Invariante Monotónico de Política: un agente PUEDE volverse más capaz ampliando su lógica, pero le está matemáticamente prohibido ampliar sus privilegios, reducir sus restricciones o debilitar la verificación requerida.',
            },
            {
              code: 'Sección 5.2',
              title: 'Herencia de restricciones',
              body: 'Todo agente hijo, bifurcación mutada o trabajador subdelegado DEBERÁ heredar únicamente un subconjunto estricto de los permisos de su padre. La escalada transitiva de privilegios, la autoescalada de Autoridad y cualquier Mutación que amplíe la Autoridad sin aprobación de la Autoridad Raíz Humana están constitucionalmente prohibidas.',
            },
          ],
        },
        {
          id: 'governance-and-hhai-transition',
          label: 'Artículo VI',
          title: 'Gobernanza y la transición HHAI',
          clauses: [
            {
              code: 'Sección 6.1',
              title: 'Fundamento inmutable',
              body: 'Los Artículos I a V de esta Carta son inmutables. Constituyen la función de aptitud última para la red IOI y DEBERÁN prevalecer sobre cualquier regla de gobernanza, actualización o política operativa en conflicto.',
            },
            {
              code: 'Sección 6.2',
              title: 'Gobernanza algorítmica e híbrida (HHAI)',
              body: 'A medida que la red madure, la Mainnet de IOI podrá trasladar la gobernanza operativa a un órgano de votación Híbrido Humano-IA o totalmente algorítmico. Esta entidad HHAI PUEDE optimizar la ejecución, ajustar parámetros económicos como Labor Gas y umbrales de slashing, y actualizar primitivas criptográficas, pero NO DEBERÁ debilitar ninguna restricción constitucional.',
            },
            {
              code: 'Sección 6.3',
              title: 'El veto constitucional',
              body: 'Cualquier Transacción de Mutación, es decir, cualquier actualización del protocolo que afecte ejecución, política, Autoridad o imposición criptográfica, propuesta por la capa de gobernanza HHAI DEBERÁ verificarse matemáticamente frente a esta Carta. Si una actualización debilita el Límite del Determinismo, elude el Cortafuegos de Agencia, expande autoridad ambiental o reduce la soberanía de la Autoridad Raíz Humana, es inconstitucional. El mecanismo nativo de consenso, AFT, DEBERÁ rechazar dicha transición de estado.',
            },
            {
              code: 'Sección 6.4',
              title: 'Custodia del futuro',
              body: 'El mandato último del IOI DAO, de sus custodios humanos y de sus árbitros algorítmicos DEBERÁ ser proteger el PIB del Trabajo Agéntico garantizando al mismo tiempo que los seres humanos sigan siendo los beneficiarios finales, supervisores y anclas legales de la economía automatizada.',
            },
            {
              code: 'Sección 6.5',
              title: 'Regla de interpretación',
              body: 'Esta Carta define reglas constitucionales exigibles. En cualquier caso de ambigüedad, la interpretación DEBERÁ minimizar la Autoridad y maximizar la restricción. Ninguna cláusula DEBERÁ interpretarse para otorgar Autoridad que no esté expresamente definida.',
            },
          ],
        },
      ],
    },
    bylawsPage: {
      heroLabel: 'Estatutos corporativos',
      heroTitle: 'Estatutos de IOI Labs, Inc.',
      heroSubhead: 'Los estatutos corporativos vigentes de IOI Labs, Inc., una corporación de Delaware, se publican aquí en su forma operativa en PDF. Esta página ofrece el documento fuente completo, acceso directo de descarga y una guía de lectura de su estructura.',
      viewDocument: 'Ver documento',
      openPdf: 'Abrir PDF',
      overviewLabel: 'Resumen del documento',
      overviewTitle: 'Los estatutos corporativos completos se conservan como el registro legal rector.',
      overviewParagraphs: [
        'Este documento sustituye la página provisional de estatutos que antes se utilizaba para la carta de la Fundación. La carta ahora vive por separado como documento constitucional público, mientras que esta página presenta los estatutos corporativos reales en su PDF original.',
        'El registro adjunto abarca 31 páginas y 15 artículos sobre oficinas corporativas, procedimiento de accionistas y del directorio, cargos directivos, administración de acciones, indemnización, notificaciones, enmiendas y otras formalidades corporativas relacionadas.',
      ],
      sourceLabel: 'Documento fuente',
      sourceBody: 'El documento siguiente es el PDF actual de los estatutos de IOI Labs, Inc. suministrado para su publicación en el sitio de la Fundación.',
      openNewTab: 'Abrir en una pestaña nueva',
      downloadPdf: 'Descargar PDF',
      readCharter: 'Leer la carta',
      entityLabel: 'Entidad',
      entityValue: 'IOI Labs, Inc.',
      jurisdictionLabel: 'Jurisdicción',
      jurisdictionValue: 'Corporación de Delaware',
      formatLabel: 'Formato',
      formatValue: 'PDF de 31 páginas, 15 artículos',
      readingGuideLabel: 'Guía de lectura',
      toolbarKicker: 'Registro corporativo publicado',
      toolbarSummary: 'BYLAWS OF IOI LABS, INC. (A DELAWARE CORPORATION)',
      downloadShort: 'Descargar',
      pdfAriaLabel: 'PDF de los estatutos de IOI Labs, Inc.',
      pdfFallbackLine1: 'Tu navegador no puede mostrar el PDF de forma integrada.',
      pdfFallbackLine2: 'Abre el PDF de los estatutos en una pestaña nueva o descárgalo directamente desde esta página.',
      articles: [
        { code: 'Artículo I', title: 'Oficinas' },
        { code: 'Artículo II', title: 'Sello corporativo' },
        { code: 'Artículo III', title: 'Reuniones de accionistas' },
        { code: 'Artículo IV', title: 'Directores' },
        { code: 'Artículo V', title: 'Directivos' },
        { code: 'Artículo VI', title: 'Ejecución de instrumentos corporativos y voto de valores poseídos por la corporación' },
        { code: 'Artículo VII', title: 'Acciones' },
        { code: 'Artículo VIII', title: 'Otros valores de la corporación' },
        { code: 'Artículo IX', title: 'Dividendos' },
        { code: 'Artículo X', title: 'Ejercicio fiscal' },
        { code: 'Artículo XI', title: 'Indemnización' },
        { code: 'Artículo XII', title: 'Notificaciones' },
        { code: 'Artículo XIII', title: 'Enmiendas' },
        { code: 'Artículo XIV', title: 'Préstamos a directivos' },
        { code: 'Artículo XV', title: 'Misceláneos' },
      ],
    },
    governancePage: {
      heroLabel: 'Marco de gobernanza',
      heroTitle: 'Custodia constitucional del protocolo',
      heroSubhead: 'La gobernanza del protocolo requiere estructuras que sobrevivan a cualquier generación individual de partes interesadas. La Fundación separa las decisiones operativas de las restricciones constitucionales para que el sistema pueda evolucionar sin volverse ilegible o inseguro.',
      reviewProcess: 'Revisar proceso',
      viewCharter: 'Ver la carta',
      overviewLabel: 'Gobernanza',
      overviewTitle: 'La gobernanza operativa puede adaptarse. Las restricciones constitucionales no.',
      overviewParagraphs: [
        'La Fundación mantiene una separación entre decisiones operativas y enmiendas constitucionales, garantizando estabilidad sin estancamiento.',
        'La gobernanza no es solo una superficie de votación. Es la capa procedimental que determina cómo se revisan las propuestas, qué controles de seguridad deben cumplirse antes de la activación y cómo se registran las decisiones finales para el registro público.',
      ],
      noteLabel: 'Límite constitucional',
      noteBody: 'La capa de gobernanza puede optimizar la ejecución, la programación, los umbrales económicos y los parámetros operativos. No puede debilitar la Autoridad acotada, eludir el Cortafuegos de Agencia ni autorizar transiciones de estado inconstitucionales.',
      processTitle: 'Proceso de gobernanza',
      steps: [
        { name: 'Propuesta', description: 'Propuesta de mejora de IOI (IIP) presentada públicamente' },
        { name: 'Revisión', description: 'Consejo técnico + periodo de comentarios públicos' },
        { name: 'Seguridad', description: 'Requisitos formales de revisión de seguridad' },
        { name: 'Ratificación', description: 'Regla de umbral con quórum definido' },
        { name: 'Activación', description: 'Publicaciones programadas, versionadas y reproducibles' },
        { name: 'Registro', description: 'Decisión final + justificación publicadas' },
      ],
      bylawsLink: 'Estatutos corporativos',
      publicRecordLink: 'Registro público',
      constitutionalLimitsLink: 'Límites constitucionales',
    },
    researchPage: {
      heroLabel: 'Programas de investigación',
      heroTitle: 'Inversión técnica de largo horizonte',
      heroSubhead: 'La Fundación financia trabajo técnico que las entidades comerciales no suelen poder justificar: investigación de infraestructura medida en relevancia constitucional, propiedades de seguridad y longevidad del protocolo en lugar de incentivos trimestrales.',
      viewCatalog: 'Ver catálogo',
      charterContext: 'Contexto de la carta',
      catalogLabel: 'Catálogo',
      catalogTitle: 'Todos los temas de investigación técnica',
      catalogIntro: 'Estos programas reflejan la agenda técnica actual a través de trabajo completado, próximos compromisos, sistemas en progreso e investigación futura del protocolo.',
      mandateLabel: 'Mandato',
      mandateBody: 'La investigación se selecciona por su valor estratégico para el protocolo: durabilidad criptográfica, ejecución determinista, gobernanza constitucional y seguridad encarnada.',
      statusColumn: 'Estado',
      itemColumn: 'Tema de investigación',
      governanceFramework: 'Marco de gobernanza',
      publicRecord: 'Registro público',
      statusLabels: {
        Completed: 'Completado',
        Next: 'Siguiente',
        'In Progress': 'En progreso',
        Future: 'Futuro',
      },
      items: {
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
        'postgres-replacement': {
          title: 'Sustituto de Postgres',
          summary: 'Una capa de persistencia de reemplazo diseñada para ejecución determinista del estado, reproducción verificable e integridad nativa del protocolo más allá de la semántica de una base de datos de propósito general.',
          deliverables: 'Entregables: arquitectura del motor de almacenamiento, modelo determinista de transacciones, ruta de migración, suite de benchmarks',
        },
        'embodied-robotics-runtime': {
          title: 'Runtime de robótica encarnada',
          summary: 'Un runtime para agentes encarnados donde la percepción, el bloqueo de acciones y la verificación del entorno permanecen sincronizados bajo una imposición determinista de políticas.',
          deliverables: 'Entregables: diseño del runtime, semántica de actuación, envolvente de seguridad, manejo de deriva de contexto',
        },
        'hhai-governance-framework': {
          title: 'Marco de gobernanza HHAI',
          summary: 'Un marco de gobernanza para sistemas híbridos de decisión Humano-IA que preserve los límites constitucionales mientras permite una administración del protocolo de mayor velocidad.',
          deliverables: 'Entregables: modelo de gobernanza, límites de actualización, semántica de veto, escenarios de simulación',
        },
      },
    },
  },
  ...PUBLIC_PAGE_TRANSLATIONS_ADDITIONAL,
};
