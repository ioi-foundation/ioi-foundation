# IOI Foundation: DAO Governance Interface

> **System Status:** Phase 0 (Bootstrap / Centralized)  
> **Type:** DAO Management & Project Coordination Platform  
> **Operator:** IOI Foundation  

The **IOI Foundation** portal is the internal operating system for the core team building the **Internet of Intelligence**.

**Crucial Distinction:**  
This is **NOT** the IOI Protocol (the decentralized Rust/WASM hypervisor described in the whitepaper).  
This **IS** the administrative dashboard used by the Foundation to manage the *development* of that Kernel, ratify the specifications that define it, and track the human labor required to launch the network.

Think of the Protocol as the "Product" and this Dashboard as the "Company HQ."

---

## 🏗 Relationship to the IOI Protocol

This platform applies the *philosophy* of the whitepaper to human governance, without running the actual decentralized machinery yet.

| Feature | In IOI Protocol (The Network) | In IOI Foundation (This Dashboard) |
| :--- | :--- | :--- |
| **Identity** | Cryptographic DIDs / Guardians | Database Profiles (Supabase) |
| **Work** | Automated Agent Swarms (Mode 1) | Human Engineering Tasks ("Quests") |
| **Governance** | On-chain Voting & Slashing | Maintainer Ratification of Specs |
| **Consensus** | A-DMFT / Proof-of-Divergence | Team Consensus (ACK/NACK Voting) |
| **History** | Merkle Accumulators | SQL Archives & JSON Logs |

---

## 🏛 Core Modules

### 1. Specification Registry (The Constitution)
*Codebase: `components/SpecViewer`*
The central repository for the "Laws of the Network." Before code is written for the Kernel, it must exist here as a ratified specification.
*   **Drafting & Review:** Contributors propose **ADRs** (Architecture Decision Records) defining protocol mechanics (e.g., "A-DMFT Consensus").
*   **Maintainer Ratification:** "Maintainers" (Admins) cryptographically sign off on specs, moving them from `Draft` to `Ratified`.
*   **Visual Diffs:** Tracks the evolution of the protocol's definition over time.

### 2. Quest Board (Task Coordination)
*Codebase: `components/QuestBoard`*
A Kanban-style interface for managing the human labor required to build the IOI Kernel.
*   **Quest Lifecycle:** Tasks are proposed, ratified (approved for work), claimed by contributors, and submitted for verification.
*   **Verification Boundary:** Mimicking the protocol's "Level 1 Audit," tasks require a second party to verify the outcome (e.g., a merged PR) before the Quest is marked complete.
*   **Signals:** A coordination mechanism for developers to broadcast "locks" on sensitive files (e.g., "I am refactoring the auth module"), preventing merge conflicts.

### 3. TGE Attribution Engine (The Ledger)
*Codebase: `components/TGEDashboard`*
Tracks the **GDP of Engineering Labor** to prepare for the Token Generation Event.
*   **Contribution Weighting:** Assigns distinct weights to different labor types (e.g., `CODE_MERGE` > `MEETING_HOST`).
*   **Attribution Simulation:** Models the future token distribution based on the `Total XP` accumulated by contributors via completed Quests.
*   **Evidence Log:** A raw, immutable table of every contribution event, ensuring the TGE allocation is auditable.

### 4. The Archives (Tribal Knowledge)
*Codebase: `components/Archives`*
Stores the meeting minutes and decision logs of the Foundation.
*   Provides a structured history of *why* decisions were made, acting as the "Sovereign Memory" for the human organization.

---

## 🛠 Architecture & Stack

This application acts as a centralized "Stub" for the future DAO.

*   **Frontend:** React 19 + TypeScript + Vite.
*   **UI System:** Tailwind CSS + Lucide (styling reflects the "Cyberpunk/Terminal" aesthetic of the brand).
*   **Backend:** Supabase (PostgreSQL).
    *   **RPC Auth:** Uses custom PostgreSQL functions (`login_user`) to simulate the feel of a key-based login system while using standard DB practices.
    *   **Row Level Security (RLS):** Enforces access control between "Maintainers" and "Contributors."

---

## ⚡️ Developer Quickstart

### Prerequisites
*   Node.js 20+
*   Supabase Project (Free Tier is sufficient)

### 1. Database Provisioning
1.  Go to your Supabase **SQL Editor**.
2.  Run the contents of `schema.sql`. This sets up the governance tables (`quests`, `specs`, `profiles`) and RLS policies.
3.  Run the contents of `seed.sql`. This populates the dashboard with "Genesis" data (e.g., the initial "IOI Manifesto" spec) and creates initial accounts.

### 2. Environment Configuration
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

### 3. Launch
```bash
npm install
npm run dev
```

---


## 🗺 Roadmap

1.  **Phase 0 (Current):** Centralized Foundation Management.
2.  **Phase 1 (The Bridge):** Mirroring Foundation data (Specs/Quests) to IPFS to test the protocol's *Resolution* logic.
3.  **Phase 2 (Obsolescence):** As the IOI Mainnet launches, this centralized portal will be deprecated. Governance will move to on-chain **Service NFTs** and **Arbitration Nodes**, using the very protocol we are building.