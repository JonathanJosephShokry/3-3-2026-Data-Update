import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { WasabiData, Member, Character } from '../types';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { calculateLevel, calculateExpProgress, calcHiddenScore, getMemberTotalScore, formatRarity, formatDegree } from '../utils';

interface MemberProfileProps {
  data: WasabiData;
}

export const MemberProfile: React.FC<MemberProfileProps> = ({ data }) => {
  const { memberId } = useParams<{ memberId: string }>();
  const member = data.members.find(m => m.id === memberId);

  if (!member) return <div className="p-20 text-center">Member not found</div>;

  const level = calculateLevel(member.exp);
  const expProgress = calculateExpProgress(member.exp);
  const totalScore = getMemberTotalScore(member, data);

  const isMemberRestricted = () => {
    if (!member.restricted) return false;
    if (!member.restrictedUntil) return member.restricted;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const until = new Date(member.restrictedUntil + 'T00:00:00');
    return today <= until;
  };

  const restrictionDaysRemaining = () => {
    if (!member.restrictedUntil) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const until = new Date(member.restrictedUntil + 'T00:00:00');
    const diff = Math.ceil((until.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const restricted = isMemberRestricted();
  const daysLeft = restrictionDaysRemaining();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#FAFAFA] min-h-screen pb-20">
      <div className="bg-white border-b-2 border-[#E0E0E0] p-5">
        <Link to={`/team/${member.teamId}`} className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#9FD356] text-white no-underline rounded-lg font-semibold transition-all hover:bg-[#8B6F47] hover:-translate-x-1">
          <ArrowLeft size={20} />
          Back to Team
        </Link>
      </div>

      <div className="container mx-auto px-5 mt-10">
        {/* Profile Header Card */}
        <div className="bg-white p-10 rounded-2xl border-2 border-[#E0E0E0] flex flex-col md:flex-row gap-10 items-center shadow-md mb-10">
          <div className="relative">
            <img 
              src={`/icons/${member.icon}`} 
              alt={member.name} 
              className={`w-40 h-40 rounded-full object-cover border-4 transition-all hover:scale-105 ${
                member.role === 'leader' ? 'border-[#F59E0B]' : 'border-[#9FD356]'
              } ${restricted ? 'grayscale opacity-75' : ''}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22150%22%3E%3Crect fill=%22%239FD356%22 width=%22150%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2260%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22%3E${member.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
              }}
            />
            {restricted && <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-white animate-pulse"></div>}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#6B5435] mb-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              {member.name}
              {restricted && (
                <span className="text-2xl cursor-help" title={`Restricted from joining projects${daysLeft > 0 ? ` for ${daysLeft} more day${daysLeft !== 1 ? 's' : ''}` : ''}`}>⚠️</span>
              )}
            </h1>
            
            {member.role === 'leader' && (
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-[#1a1a1a] font-black rounded-full text-sm uppercase tracking-wider mb-4 shadow-sm">
                <Star size={14} /> Leader
              </div>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-10 mb-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#666666] uppercase tracking-widest">Level</span>
                <span className="text-3xl font-bold text-[#6B5435]">{level}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#666666] uppercase tracking-widest">Wabi</span>
                <div className="flex items-center gap-2 text-[#9FD356]">
                  <img src="/icons/wabi-icon.png" alt="Wabi" className="w-6 h-6" />
                  <span className="text-3xl font-bold">{member.wabi}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#666666] uppercase tracking-widest">Spice</span>
                <div className="flex items-center gap-2 text-[#E8631A]">
                  <img src="/icons/spice-icon.png" alt="Spice" className="w-6 h-6" />
                  <span className="text-3xl font-bold">{member.spice}</span>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs font-bold text-[#666666] mb-2 uppercase tracking-widest">Experience Progress</div>
              <div className="bg-[#E0E0E0] rounded-full h-3 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${expProgress}%` }} transition={{ duration: 1.2 }} className="h-full bg-gradient-to-r from-[#9FD356] to-[#8B6F47]"></motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        {Object.keys(member.skills).length > 0 && (
          <div className="bg-white p-10 rounded-2xl border-2 border-[#E0E0E0] shadow-md mb-10">
            <h2 className="text-3xl font-bold text-[#6B5435] mb-8">Skills</h2>
            <div className="flex flex-wrap gap-4">
              {Object.entries(member.skills).filter(([, v]) => (v as number) > 0).map(([name, pts], i) => (
                <motion.div 
                  key={name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-[#FDDDC7] to-[#E8631A]/5 border-2 border-[#E8631A]/20 rounded-full transition-all hover:-translate-y-1 hover:bg-gradient-to-br hover:from-[#E8631A]/18 hover:to-[#FDDDC7] hover:border-[#E8631A] hover:shadow-md"
                >
                  <span className="font-bold text-[#6B5435] capitalize">{name}</span>
                  <span className="bg-[#E8631A] text-white px-2.5 py-0.5 rounded-xl text-xs font-black">{pts} {pts === 1 ? 'pt' : 'pts'}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Collection Section */}
        <div className="bg-white p-10 rounded-2xl border-2 border-[#E0E0E0] shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-[#6B5435]">Collection</h2>
            <div className="flex items-center gap-2 bg-gradient-to-br from-[#9FD356]/12 to-[#9FD356]/5 border-2 border-[#9FD356]/40 px-5 py-2 rounded-full">
              <Trophy size={20} className="text-[#9FD356]" />
              <span className="text-sm font-bold text-[#666666]">Total Score:</span>
              <span className="text-2xl font-black text-[#9FD356]">{totalScore.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {member.collection.length === 0 ? (
              <p className="text-center text-[#666666] col-span-full py-10">No items in collection yet.</p>
            ) : (
              member.collection.map((entry, i) => {
                const char = data.characters.find(c => c.id === entry.characterId);
                if (!char) return null;
                const degree = entry.degree || 'iron';
                const count = entry.count || 1;
                const degColors = data.cardConfig.degrees[degree] || data.cardConfig.degrees.iron;
                const score = calcHiddenScore(entry.characterId, degree, data);
                const imgSrc = char.images?.[degree] || char.images?.iron || char.image;

                return (
                  <div key={i} className="relative group">
                    <div className={`bg-[#FAFAFA] rounded-xl overflow-hidden border-3 transition-all hover:-translate-y-1.5 hover:shadow-xl ${
                      char.rarity === 'common' ? 'border-[#9E9E9E]' :
                      char.rarity === 'rare' ? 'border-[#4A90E2]' :
                      char.rarity === 'epic' ? 'border-l-[#9B59B6]' :
                      char.rarity === 'legendary' ? 'border-[#FF9800]' : 'border-[#E91E63]'
                    }`} style={{ borderColor: degColors.border, boxShadow: degree !== 'iron' ? `0 0 18px ${degColors.glow}50, 0 4px 20px rgba(0,0,0,0.1)` : '' }}>
                      <div className="h-48 overflow-hidden bg-gradient-to-br from-[#C8E6A0] to-[#9FD356]">
                        <img src={`/icons/${imgSrc}`} alt={char.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div className="p-4">
                        <div className="font-bold text-[#2C2C2C] text-sm mb-1.5 truncate">{char.name}</div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <span className={`px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-wider border ${
                            char.rarity === 'common' ? 'bg-[#9E9E9E]/15 text-[#9E9E9E] border-[#9E9E9E]/30' :
                            char.rarity === 'rare' ? 'bg-[#4A90E2]/15 text-[#4A90E2] border-[#4A90E2]/30' :
                            char.rarity === 'epic' ? 'bg-[#9B59B6]/15 text-[#9B59B6] border-[#9B59B6]/30' :
                            char.rarity === 'legendary' ? 'bg-[#FF9800]/15 text-[#FF9800] border-[#FF9800]/30' : 'bg-[#E91E63]/15 text-[#E91E63] border-[#E91E63]/30'
                          }`}>{char.rarity}</span>
                          {degree !== 'iron' && (
                            <span className="px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-wider border" style={{ borderColor: degColors.border, color: degColors.color }}>{formatDegree(degree)}</span>
                          )}
                        </div>
                        <div className="text-[10px] font-bold text-[#666666]">Score: {score.toLocaleString()}</div>
                      </div>
                    </div>
                    {count >= 2 && (
                      <div className="absolute -top-2 -right-2 min-w-[30px] h-7.5 bg-[#4B4B4B] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-md z-20 px-1.5" style={{ backgroundColor: degColors.color }}>
                        ×{count >= 100 ? '99+' : count}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
