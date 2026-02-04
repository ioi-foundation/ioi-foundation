export type Role = 'Maintainer' | 'Contributor';

export interface Profile {
  id: string;
  username: string;
  role: Role;
  total_xp: number;
  avatar_url: string;
}

export type SpecStatus = 'Draft' | 'Review' | 'Ratified' | 'Archived';
export type SpecCategory = 'Core' | 'Networking' | 'Consensus' | 'Economic' | 'Meta';

export interface Spec {
  id: string;
  title: string;
  filename: string; 
  category: SpecCategory;
  content: string; // Markdown content
  status: SpecStatus;
  author_id: string;
  updated_at: string;
  version: number;
  target_spec_id?: string; // If this is an ADR, which spec does it modify?
}

export type QuestDifficulty = 1 | 2 | 3 | 5 | 8;
export type QuestStatus = 'Proposed' | 'Open' | 'In Progress' | 'Verification' | 'Completed';

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  assignee_id?: string;
  proposer_id: string;
  tag: string;
  created_at: string;
  last_update_at: string; // For staleness checks
  
  // Governance & Voting
  votes_for: string[]; // List of Profile IDs
  votes_against: string[]; // List of Profile IDs
  block_reason?: string; // Mandatory rationale for blocking/rejecting
  
  // Verification
  pr_link?: string;
  verification_votes_for?: string[];
  verification_votes_against?: string[];
}

export interface Signal {
  id: string;
  user_id: string;
  area: string; // e.g., "DB Schema", "Auth Logic"
  message: string;
  created_at: string;
}

export interface Meeting {
  id: string;
  date: string;
  title: string;
  attendees: string[]; // List of Profile IDs
  summary: string;
  content?: string; // Full markdown minutes
}

export type ContributionType = 'CODE_MERGE' | 'ADR_AUTHOR' | 'MEETING_HOST' | 'MANUAL_BOUNTY';

export interface Contribution {
  id: string;
  user_id: string;
  type: ContributionType;
  reference_link: string;
  weight: number;
  created_at: string;
  description: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'ALERT' | 'ASSIGNMENT' | 'SUCCESS' | 'INFO';
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export type View = 'dashboard' | 'specs' | 'quests' | 'archives' | 'tge' | 'notifications';