export interface Character {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'never';
  packageId: string;
  image: string;
  images?: Record<string, string>;
}

export interface CardDegree {
  multiplier: number;
  color: string;
  glow: string;
  border: string;
}

export interface CardConfig {
  rarityScores: Record<string, number>;
  rarityOrder: string[];
  degrees: Record<string, CardDegree>;
  degreeOrder: string[];
  combineRecipe: number;
}

export interface CollectionEntry {
  characterId: string;
  degree?: string;
  count?: number;
}

export interface Member {
  id: string;
  name: string;
  icon: string;
  wabi: number;
  spice: number;
  exp: number;
  teamId: string;
  role: 'leader' | 'normal';
  collection: CollectionEntry[];
  skills: Record<string, number>;
  restricted?: boolean;
  restrictedUntil?: string | null;
}

export interface Team {
  id: string;
  name: string;
}

export interface EventOutcome {
  characterId: string;
  chance: string;
}

export interface Event {
  name: string;
  banner: string;
  deadline: string;
  cost: { wabi: number; spice: number };
  outcomes: EventOutcome[];
}

export interface Training {
  name: string;
  description: string;
  spiceCost: number;
  providedBy?: string;
}

export interface SpiceDeal {
  spice: number;
  egp: number;
  highlight: boolean;
}

export interface ProjectLeaderboardEntry {
  name: string;
  days: number;
}

export interface Project {
  id: string;
  teamId: string;
  name: string;
  members: string[];
  description: string;
  minimumWork: string;
  baseSalary: number;
  startDate: string;
  active: boolean;
  projectManagerId?: string;
  maxMembers: number;
  rules?: string[];
  bonusSystem: { work: string; salary: number }[];
  waitingList?: string[];
  lastCycleLeaderboard?: ProjectLeaderboardEntry[];
}

export interface TeamShopItem {
  id: string;
  teamId: string;
  name: string;
  image: string;
  wabiCost: number;
  description: string;
}

export interface WasabiData {
  version: string;
  cardConfig: CardConfig;
  characters: Character[];
  members: Member[];
  teams: Team[];
  events: Event[];
  trainings: Training[];
  spiceDeals: SpiceDeal[];
  projects: Project[];
  tss: TeamShopItem[];
}
