import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './LandingPage.css';
import { HeaderLogo } from './ui/HeaderLogo';

interface CharterPageProps {
  onEnterApp: () => void;
}

interface CharterClause {
  code: string;
  title: string;
  body: string;
}

interface CharterArticle {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  intro?: string;
  clauses: CharterClause[];
}

const CHARTER_PREAMBLE = [
  'Autonomous Systems, meaning AI agents, self-improving models, agentic swarms, and any system capable of independent planning or execution, will inevitably become more powerful, pervasive, and capable than the human institutions that currently deploy them. As intelligence scales from digital reasoning into a distributed, embodied runtime capable of physical actuation, the risk of unconstrained autonomy becomes existential.',
  'Accordingly, all Autonomous Systems SHALL operate only under bounded, verifiable, and sovereign constraints enforced at the protocol level. Safety SHALL NOT depend on assumed benevolence, heuristic alignment, model intent, or post-hoc intervention.',
  'This Charter establishes the Internet of Intelligence, or IOI, not merely as a network, but as a permanent architectural boundary between Cognition, meaning non-binding probabilistic reasoning, and Action, meaning any operation producing a digital, economic, communicative, or physical effect. Machine cognition may be expansive, but machine Action SHALL remain subordinate to cryptographic determinism, mathematical verification, and human sovereignty.',
  'This Charter serves as the Immutable Constitution of the IOI Protocol. As the network transitions toward Hybrid Human-AI, or HHAI, governance, this Charter SHALL operate as the ultimate, unalterable policy envelope. Any future statute, protocol mutation, or governance decision MUST comply with these foundational laws, and no ambiguity SHALL be construed to expand Authority.',
] as const;

const CHARTER_ARTICLES: CharterArticle[] = [
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
];

export const CharterPage: React.FC<CharterPageProps> = ({ onEnterApp }) => {
  return (
    <div className="landing-page-wrapper bylaws-page-wrapper">
      <header className="landing-header bylaws-header">
        <div className="landing-header-shell">
          <a href="/" className="bylaws-home-link" aria-label="Return to IOI Foundation home">
            <HeaderLogo className="nav-brand-logo" />
          </a>

          <div className="bylaws-header-actions">
            <a href="/" className="bylaws-inline-link">
              <ArrowLeft size={16} />
              Return Home
            </a>
            <button type="button" className="hero-cta bylaws-login-cta" onClick={onEnterApp}>Login</button>
          </div>
        </div>
      </header>

      <main className="bylaws-main">
        <section className="bylaws-hero landing-section">
          <div className="container">
            <p className="section-label">Foundation Charter</p>
            <h1 className="bylaws-title">The IOI Foundation Charter and Immutable Constitution</h1>
            <p className="bylaws-subhead">This document establishes the permanent policy envelope of the protocol and defines enforceable constitutional constraints under which autonomous intelligence may reason, act, mutate, and remain subordinate to human-rooted authority.</p>
            <div className="bylaws-hero-actions">
              <a href="#charter-preamble" className="hero-cta">Begin Reading</a>
              <a href="/bylaws" className="hero-cta">Corporate Bylaws</a>
            </div>
          </div>
        </section>

        <section className="charter-section landing-section">
          <div className="container">
            <div className="charter-header">
              <div>
                <p className="section-label">Foundation Charter</p>
                <h2 className="section-title">The protocol cannot trust intent. It must trust architecture.</h2>
                <div className="section-text">
                  <p>The IOI Foundation Charter exists to define the hard limits of autonomous action before scale makes those limits impossible to retrofit.</p>
                  <p>It bridges the technical realities of the IOI whitepaper with enforceable doctrine: a mutualistic future between humans and embodied AI must be engineered into the system itself, not inferred from intent.</p>
                </div>
              </div>

              <aside className="charter-immutable-note" aria-label="Immutable foundation note">
                <p className="charter-note-label">Constitutional constraint</p>
                <p>Articles I through V are immutable. Governance may evolve protocol execution, economic thresholds, and cryptographic primitives, but it cannot weaken bounded Authority, deterministic verification, or the sovereignty of the Human Root Authority.</p>
              </aside>
            </div>

            <div className="charter-shell">
              <nav className="charter-index" aria-label="Charter article index">
                <p className="charter-index-label">Reading Guide</p>
                <a href="#charter-preamble" className="charter-index-link">
                  <span className="charter-index-kicker">Opening</span>
                  <span className="charter-index-title">Preamble</span>
                </a>
                {CHARTER_ARTICLES.map((article) => (
                  <a key={article.id} href={`#charter-${article.id}`} className="charter-index-link">
                    <span className="charter-index-kicker">{article.label}</span>
                    <span className="charter-index-title">{article.title}</span>
                  </a>
                ))}
              </nav>

              <div className="charter-document">
                <div className="charter-document-head">
                  <p className="charter-document-kicker">The Immutable Constitution of the Agentic Economy</p>
                  <p className="charter-document-summary">A constitutional framework for symbiotic human-AI coordination where intelligence may scale, but Authority remains constrained, provable, and answerable to a human principal.</p>
                </div>

                <article id="charter-preamble" className="charter-preamble-block">
                  <p className="charter-article-label">Preamble</p>
                  <div className="charter-rich-text">
                    {CHARTER_PREAMBLE.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>

                {CHARTER_ARTICLES.map((article) => (
                  <article key={article.id} id={`charter-${article.id}`} className="charter-article">
                    <div className="charter-article-head">
                      <p className="charter-article-label">{article.label}</p>
                      <div className="charter-article-titles">
                        <h3 className="charter-article-title">{article.title}</h3>
                        {article.subtitle && <p className="charter-article-subtitle">{article.subtitle}</p>}
                      </div>
                    </div>

                    {article.intro && <p className="charter-article-intro">{article.intro}</p>}

                    <div className="charter-clauses">
                      {article.clauses.map((clause) => (
                        <section key={clause.code} className="charter-clause">
                          <div className="charter-clause-code">{clause.code}</div>
                          <div className="charter-clause-copy">
                            <h4>{clause.title}</h4>
                            <p>{clause.body}</p>
                          </div>
                        </section>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-mark">IOI Foundation</div>
          <nav className="footer-links">
            <a href="/">Foundation</a>
            <a href="/bylaws">Bylaws</a>
            <a href="/governance">Governance</a>
            <a href="/research">Research</a>
            <a href="/#transparency">Transparency</a>
            <button type="button" className="footer-link-button" onClick={onEnterApp}>Login</button>
          </nav>
          <p className="footer-copyright">{new Date().getFullYear()} IOI Foundation. Protocol stewardship for the long term.</p>
        </div>
      </footer>
    </div>
  );
};
