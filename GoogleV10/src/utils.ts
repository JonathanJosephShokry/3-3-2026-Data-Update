import { WasabiData, Member, Character } from './types';

export function calculateLevel(exp: number): number {
  if (exp === 0) return 1;
  let level = 1, req = 0;
  while (req <= exp) {
    level++;
    req = Math.pow(2, level - 2);
  }
  return level - 1;
}

export function calculateExpProgress(exp: number): number {
  const lvl = calculateLevel(exp);
  const cur = lvl === 1 ? 0 : Math.pow(2, lvl - 2);
  const nxt = Math.pow(2, lvl - 1);
  return ((exp - cur) / (nxt - cur)) * 100;
}

export function calcHiddenScore(characterId: string, degree: string, data: WasabiData): number {
  const char = data.characters.find(c => c.id === characterId);
  if (!char) return 0;

  // Dynamic pack score calculation (Update 12)
  // We'll use a fixed base score for packs since the packages array is removed.
  // Or we can derive it from the packageId.
  const packScores: Record<string, number> = {
    "gumball_pack": 5,
    "kungfu_pack": 8,
    "wbb_pack": 2,
    "ben10_pack": 7
  };
  const packScore = packScores[char.packageId] || 5;

  const rarityScore = data.cardConfig.rarityScores[char.rarity] || 0;
  const degKey = degree || 'iron';
  const mult = data.cardConfig.degrees[degKey]?.multiplier || 1;

  return packScore * rarityScore * mult;
}

export function getMemberTotalScore(member: Member, data: WasabiData): number {
  if (!member.collection || member.collection.length === 0) return 0;
  return member.collection.reduce((sum, entry) => {
    return sum + calcHiddenScore(entry.characterId, entry.degree || 'iron', data) * (entry.count || 1);
  }, 0);
}

export function getProjectAge(startDate: string): string {
  const start = new Date(startDate.split('-').reverse().join('-'));
  const now = new Date("2026-03-02T06:21:21-08:00");
  const diffMs = now.getTime() - start.getTime();
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;
  
  const months = Math.floor(days / 30.44);
  if (months < 12) return `${months}mo`;
  
  const years = Math.floor(days / 365.25);
  return `${years}y`;
}

export function getProjectTheme(startDate: string): { theme: string, visual: string } {
  const start = new Date(startDate.split('-').reverse().join('-'));
  const now = new Date("2026-03-02T06:21:21-08:00");
  const diffMs = now.getTime() - start.getTime();
  const days = diffMs / (1000 * 60 * 60 * 24);

  if (days < 1) return { theme: "Just Born", visual: "🐛" };
  if (days < 7) return { theme: "New", visual: "🦎" };
  if (days < 30) return { theme: "Surviving", visual: "🐊" };
  if (days < 365) return { theme: "Old", visual: "🦖" };
  return { theme: "Ancient", visual: "🐉" };
}

export function formatRarity(rarity: string): string {
  if (rarity === 'epic') return 'Epic';
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}

export function formatDegree(degree: string): string {
  return degree.charAt(0).toUpperCase() + degree.slice(1);
}
