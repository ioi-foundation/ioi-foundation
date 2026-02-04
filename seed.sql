-- 1. PROFILES
-- Consolidated to 2 users as requested.
-- 'heath' (Admin/Maintainer) inherits User 1 + User 4 history.
-- 'perfect' (Team Member/Contributor) inherits User 2 + User 3 history.
INSERT INTO profiles (id, username, role, total_xp, avatar_url) VALUES
('user-1', 'heath', 'Maintainer', 650, 'https://ui-avatars.com/api/?name=heath&background=18181b&color=fff'),
('user-2', 'perfect', 'Contributor', 480, 'https://ui-avatars.com/api/?name=perfect&background=3730a3&color=fff');

-- 2. PROFILE SECRETS
INSERT INTO profile_secrets (user_id, access_key) VALUES
('user-1', 'heath123'),
('user-2', 'perfect123');

-- 3. SPECS
INSERT INTO specs (id, title, filename, category, content, status, author_id, updated_at, version, target_spec_id) VALUES
('spec-000', 'The IOI Manifesto', '000-manifesto.md', 'Meta', '# The IOI Manifesto\n\n**Version 1.0**\n\nIOI is not a company. It is a sovereign collective of engineers building the next generation of decentralized infrastructure.\n\n## Principles\n\n1. **Code is Law, Humans are Spirit.**\n2. **Contribution over Speculation.**\n3. **Radical Transparency.**\n\nWe govern ourselves through Proof-of-Contribution (PoC). Every line of code, every ratified specification, and every meeting creates cryptographic evidence of ownership.', 'Ratified', 'user-1', '2023-01-01T10:00:00Z', 1, NULL),

('spec-001', 'Core Network Topology', '001-network-topology.md', 'Networking', '# Core Network Topology\n\n**Status: Stable**\n\nThe IOI Network relies on a randomized mesh topology to ensure redundancy and censorship resistance. Nodes discover peers via a distributed hash table (DHT).\n\n## 1. Node Types\n\n- **Validators:** Propose blocks and maintain the ledger.\n- **Sentinels:** Monitor network health and relay telemetry.\n- **Archives:** Store the full history of the chain.\n\n## 2. Gossip Protocol\n\nWe utilize a modified GossipSub protocol for message propagation, ensuring <500ms latency for block propagation across 95% of the network.', 'Ratified', 'user-1', '2023-10-15T14:00:00Z', 1, NULL),

('spec-002', 'Consensus Mechanism (PoC)', '002-consensus-poc.md', 'Consensus', '# Proof of Contribution (PoC)\n\nUnlike PoS (wealth-based) or PoW (energy-based), IOI uses PoC.\n\n## The XP Token\n\nXP is non-transferable soulbound reputation. It decays over time (halflife: 6 months) to ensure the network is controlled by *active* contributors, not early whales.\n\n## Block Production\n\nThe probability of being selected to propose a block is proportional to your XP relative to the total active XP pool.', 'Ratified', 'user-2', '2023-10-22T16:45:00Z', 2, NULL),

('spec-003', 'Token Economic Model', '003-economics.md', 'Economic', '# Token Economics\n\n## Emission Schedule\n\n(This section is under active revision. See ADR-004)\n\nThe native token is minted per block. 10% goes to the treasury, 90% to the block proposer.\n\n## Staking\n\nValidators must stake a minimum amount to prevent sybil attacks.', 'Ratified', 'user-2', '2023-09-10T09:30:00Z', 1, NULL),

('hist-001', 'Legacy: Proof of Authority', 'ARCHIVE-002-poa-legacy.md', 'Consensus', '# Proof of Authority (Deprecated)\n\nThis was the initial consensus mechanism used in Testnet V0. It relied on 5 trusted keys.', 'Archived', 'user-1', '2022-12-01T00:00:00Z', 0, NULL);

-- Insert ADR after spec-003 exists due to FK
INSERT INTO specs (id, title, filename, category, content, status, author_id, updated_at, version, target_spec_id) VALUES
('adr-004', 'ADR: Dynamic Inflation Curve', 'ADR-004-dynamic-inflation.md', 'Economic', '# Token Economics\n\n## Emission Schedule\n\nThe native token is minted per block using a PID controller based on transaction fees.\n\n- If Fees > Target: Decrease Issuance.\n- If Fees < Target: Increase Issuance.\n\n## Staking\n\nValidators must stake a minimum amount to prevent sybil attacks.', 'Draft', 'user-2', '2023-10-26T12:00:00Z', 0, 'spec-003');

-- 3. QUESTS
-- Redistributed votes and assignments to user-1 and user-2 only
INSERT INTO quests (id, title, description, difficulty, status, assignee_id, proposer_id, tag, created_at, last_update_at, votes_for, votes_against, pr_link, verification_votes_for, verification_votes_against) VALUES
('101', 'Launch Alpha Kernel', 'Deploy the initial kernel to the testnet environment.', 8, 'In Progress', 'user-1', 'user-1', 'Milestone', NOW() - interval '2 days', NOW() - interval '1 day', '{user-1,user-2}', '{}', NULL, '{}', '{}'),

('102', 'Fix UI Typo in Header', 'The header says "IOI Nexux" instead of "Nexus".', 1, 'Open', NULL, 'user-2', 'Good First Issue', NOW() - interval '5 days', NOW() - interval '5 days', '{user-2,user-1}', '{}', NULL, '{}', '{}'),

('103', 'Implement Dark Mode Toggle', 'Allow users to switch themes, though we prefer dark only.', 3, 'Completed', 'user-2', 'user-2', 'Feature', '2023-10-15T10:00:00Z', '2023-10-16T10:00:00Z', '{user-1,user-2}', '{}', 'github.com/ioi/core/pull/99', '{user-1,user-2}', '{}'),

('104', 'Optimize DB Queries', 'Reduce load time for the contribution ledger.', 5, 'In Progress', 'user-2', 'user-2', 'Performance', NOW() - interval '10 days', NOW() - interval '6 days', '{user-2,user-1}', '{}', NULL, '{}', '{}'),

('106', 'Integrate IPFS', 'Storage layer for spec backups.', 5, 'In Progress', 'user-2', 'user-1', 'Infra', NOW() - interval '4 days', NOW() - interval '4 days', '{user-1,user-2}', '{}', NULL, '{}', '{}'),

('105', 'Write Tests for Auth', 'Ensure RBAC is working correctly.', 3, 'Verification', 'user-2', 'user-1', 'Testing', '2023-10-22T10:00:00Z', '2023-10-23T10:00:00Z', '{user-1,user-2}', '{}', 'github.com/ioi/core/pull/105', '{user-2}', '{}');

-- 4. SIGNALS
INSERT INTO signals (id, user_id, area, message, created_at) VALUES
('sig-1', 'user-2', 'auth/middleware.ts', 'Refactoring JWT validation. Do not touch auth routes.', NOW() - interval '30 minutes'),
('sig-2', 'user-1', 'kernel/boot.rs', 'Deploying hotfix for genesis block.', NOW() - interval '2 hours');

-- 5. MEETINGS
INSERT INTO meetings (id, date, title, attendees, summary, content) VALUES
('m-1', '2023-10-25T10:00:00Z', 'Weekly Sync #42', '{user-1,user-2}', 'Discussed Issue #101 timeline. Agreed to freeze features by Friday.', '# Weekly Sync #42\n\n**Date:** Oct 25, 2023\n**Attendees:** @heath, @perfect\n\n## Agenda\n\n1. Alpha Kernel Launch Status\n2. Feature Freeze Timeline\n\n## Decisions\n\n- **Feature Freeze:** Agreed to freeze all non-critical feature work by Friday 5PM UTC.\n- **Testing:** @perfect will lead the QA sprint on the weekend.\n\n## Action Items\n\n- [ ] @heath to merge PR #101 by Thursday.\n- [ ] @perfect to draft the release notes.'),
('m-2', '2023-10-18T10:00:00Z', 'Governance Workshop', '{user-1,user-2}', 'Ratified 001-network-topology.md. Debated the inflation rate for ADR-004.', '# Governance Workshop\n\n**Date:** Oct 18, 2023\n**Attendees:** @heath, @perfect\n\n## Ratifications\n\n- **001-network-topology.md:** Ratified with unanimous support.\n\n## Debates\n\n### ADR-004 (Inflation)\n\n@heath proposed a static 5% inflation.\n@perfect argued for dynamic inflation based on fee volume.\n\n**Conclusion:** We will proceed with drafting the dynamic model for review next week.');

-- 6. CONTRIBUTIONS
INSERT INTO contributions (id, user_id, type, reference_link, weight, created_at, description) VALUES
('c-1', 'user-1', 'CODE_MERGE', 'PR #102', 8, '2023-10-26T11:00:00Z', 'Merged PR: Core Kernel V1'),
('c-2', 'user-2', 'CODE_MERGE', 'PR #99', 3, '2023-10-25T15:30:00Z', 'Merged PR: Dark Mode Logic'),
('c-3', 'user-1', 'ADR_AUTHOR', 'Spec 3.1', 50, '2023-10-24T09:00:00Z', 'Ratified Spec: Network Topology'),
('c-4', 'user-2', 'MEETING_HOST', 'Meeting #42', 5, '2023-10-25T11:00:00Z', 'Attended Weekly Sync'),
('c-5', 'user-1', 'MANUAL_BOUNTY', 'Discord Help', 2, '2023-10-23T14:00:00Z', 'Helped new dev set up environment');