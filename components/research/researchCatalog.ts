export type ResearchStatus = 'Completed' | 'Next' | 'In Progress' | 'Future';

export interface ResearchItem {
  slug: string;
  title: string;
  status: ResearchStatus;
  summary: string;
  deliverables: string;
}

export const researchItems: ResearchItem[] = [
  {
    slug: 'dcrypt-post-quantum-hybrid-library',
    title: 'dCrypt: Post-Quantum Hybrid Crypto Library',
    status: 'Completed',
    summary: 'A hybrid cryptography library for protocol migration, combining classical and post-quantum primitives so systems can transition without sacrificing operational compatibility.',
    deliverables: 'Deliverables: Hybrid key exchange primitives, signature support, migration utilities, integration guidance',
  },
  {
    slug: 'formal-verification',
    title: 'Formal Verification',
    status: 'Next',
    summary: 'Proving protocol correctness through mathematical methods so critical invariants can be verified rather than inferred from testing alone.',
    deliverables: 'Deliverables: Spec proofs, model checking, invariant suites, verification tooling',
  },
  {
    slug: 'lower-byzantine-bound',
    title: 'Breaking the Lower Byzantine Bound',
    status: 'Completed',
    summary: 'Research into consensus assumptions and adversarial thresholds aimed at pushing fault-tolerance past conventional lower-bound expectations in agentic coordination systems.',
    deliverables: 'Deliverables: Bound analysis, adversarial models, proof notes, protocol implications',
  },
  {
    slug: 'postgres-replacement',
    title: 'Postgres Replacement',
    status: 'In Progress',
    summary: 'A replacement persistence layer designed for deterministic state execution, reproducible replay, and protocol-native integrity guarantees beyond general-purpose database semantics.',
    deliverables: 'Deliverables: Storage engine architecture, deterministic transaction model, migration path, benchmark suite',
  },
  {
    slug: 'embodied-robotics-runtime',
    title: 'Embodied Robotics Runtime',
    status: 'Future',
    summary: 'A runtime for embodied agents where perception, action gating, and environmental verification remain synchronized under deterministic policy enforcement.',
    deliverables: 'Deliverables: Runtime design, actuation semantics, safety envelope, context-drift handling',
  },
  {
    slug: 'hhai-governance-framework',
    title: 'HHAI Governance Framework',
    status: 'Future',
    summary: 'A governance framework for Hybrid Human-AI decision systems that preserves constitutional limits while enabling higher-speed protocol administration.',
    deliverables: 'Deliverables: Governance model, upgrade boundaries, veto semantics, simulation scenarios',
  },
];
