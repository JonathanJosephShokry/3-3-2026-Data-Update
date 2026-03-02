import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { WasabiData, Team, Member } from '../types';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  data: WasabiData;
}

export const Home: React.FC<HomeProps> = ({ data }) => {
  const calcTeamCollectionCount = (teamId: string) => {
    const members = data.members.filter(m => m.teamId === teamId);
    const uniqueIds = new Set();
    members.forEach(m => {
      m.collection.forEach(entry => {
        uniqueIds.add(entry.characterId);
      });
    });
    return uniqueIds.size;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#6B5435] via-[#8B6F47] to-[#9FD356] min-h-[60vh] flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(159,211,86,0.25)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="container mx-auto px-5">
          <motion.h1 
            initial={{ opacity: 0, y: 18 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.9 }}
            className="text-6xl md:text-8xl font-bold text-white mb-5 tracking-widest drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          >
            Wasabi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 18 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light tracking-wide"
          >
            Transform discipline into growth. Build skills that last.
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold text-[#6B5435] text-center mb-10">About Wasabi</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-[#666666] mb-10">
              Wasabi is a system designed to transform mindsets and behaviors through structured accountability and measurable progress.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-[#FAFAFA] p-8 rounded-2xl border-2 border-[#E0E0E0] flex items-center justify-center gap-5 text-xl">
                <span className="text-[#666666] line-through">Consumer</span>
                <span className="text-[#9FD356] font-bold">→</span>
                <span className="text-[#6B5435] font-bold">Producer</span>
              </div>
              <div className="bg-[#FAFAFA] p-8 rounded-2xl border-2 border-[#E0E0E0] flex items-center justify-center gap-5 text-xl">
                <span className="text-[#666666] line-through">Low Delayer</span>
                <span className="text-[#9FD356] font-bold">→</span>
                <span className="text-[#6B5435] font-bold">High Delayer</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {['Discipline', 'Long-term Thinking', 'Skill Building', 'Execution Over Comfort'].map(area => (
                <span key={area} className="bg-[#9FD356] text-white px-6 py-3 rounded-full font-semibold transition-all hover:bg-[#8B6F47] hover:-translate-y-0.5">
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/about" className="text-[#9FD356] font-bold hover:underline">Learn more about the Wasabi System →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold text-[#6B5435] text-center mb-10">Wasabi Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.events.map((event, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border-2 border-[#E0E0E0] transition-all hover:-translate-y-1.5 hover:shadow-xl hover:border-[#C8E6A0]">
                <img src={`/icons/${event.banner}`} alt={event.name} className="w-full h-48 object-cover bg-gradient-to-br from-[#9FD356] to-[#C8E6A0]" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#6B5435] mb-4">{event.name}</h3>
                  <div className="text-xs text-[#666666] italic mb-2 opacity-85">⏰ Ends on {new Date(event.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</div>
                  <div className="flex gap-4 items-center mb-5">
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#9FD356]/10 text-[#9FD356] border-2 border-[#9FD356]/35 rounded-full font-bold">
                      <img src="/icons/wabi-icon.png" alt="Wabi" className="w-5 h-5" />
                      <span>{event.cost.wabi}</span>
                    </div>
                    <span className="text-xs text-[#666666] font-medium">or</span>
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8631A]/10 text-[#E8631A] border-2 border-[#E8631A]/30 rounded-full font-bold">
                      <img src="/icons/spice-icon.png" alt="Spice" className="w-5 h-5" />
                      <span>{event.cost.spice}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-bold mb-3">Possible Outcomes:</div>
                    <div className="grid gap-2.5">
                      {event.outcomes.map((outcome, j) => {
                        const char = data.characters.find(c => c.id === outcome.characterId);
                        if (!char) return null;
                        return (
                          <div key={j} className={`flex items-center gap-3 p-2.5 bg-[#FAFAFA] rounded-lg border-l-4 transition-all hover:bg-[#F0F0F0] ${
                            char.rarity === 'common' ? 'border-l-[#9E9E9E]' :
                            char.rarity === 'rare' ? 'border-l-[#4A90E2]' :
                            char.rarity === 'epic' ? 'border-l-[#9B59B6]' :
                            char.rarity === 'legendary' ? 'border-l-[#FF9800]' : 'border-l-[#E91E63]'
                          }`}>
                            <img src={`/icons/${char.image}`} alt={char.name} className="w-12 h-12 rounded-lg object-cover bg-[#E0E0E0]" />
                            <div className="flex-1">
                              <div className="font-bold text-sm">{char.name}</div>
                              <div className="flex gap-1 mt-1">
                                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                                  char.rarity === 'common' ? 'bg-[#9E9E9E]/15 text-[#9E9E9E] border-[#9E9E9E]/30' :
                                  char.rarity === 'rare' ? 'bg-[#4A90E2]/15 text-[#4A90E2] border-[#4A90E2]/30' :
                                  char.rarity === 'epic' ? 'bg-[#9B59B6]/15 text-[#9B59B6] border-[#9B59B6]/30' :
                                  char.rarity === 'legendary' ? 'bg-[#FF9800]/15 text-[#FF9800] border-[#FF9800]/30' : 'bg-[#E91E63]/15 text-[#E91E63] border-[#E91E63]/30'
                                }`}>{char.rarity}</span>
                              </div>
                            </div>
                            <div className="text-xs text-[#666666]">{outcome.chance}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold text-[#6B5435] text-center mb-10">Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.teams.map((team, i) => {
              const members = data.members.filter(m => m.teamId === team.id);
              const collectionCount = calcTeamCollectionCount(team.id);
              return (
                <Link key={team.id} to={`/team/${team.id}`} className="block group">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border-2 border-[#E0E0E0] rounded-[22px] p-8 cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-[#C8E6A0] relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9FD356] to-[#8B6F47] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="text-2xl font-extrabold text-[#6B5435] tracking-tight">{team.name}</div>
                      <ArrowRight className="text-[#9FD356] transition-transform group-hover:translate-x-1.5" />
                    </div>
                    <div className="flex items-center gap-1.5 mb-6 flex-wrap">
                      {members.slice(0, 5).map(m => (
                        <img key={m.id} src={`/icons/${m.icon}`} alt={m.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md transition-all hover:scale-110 hover:-translate-y-0.5 hover:z-10 bg-[#C8E6A0]" title={m.name} />
                      ))}
                      {members.length > 5 && (
                        <div className="w-12 h-12 rounded-full bg-[#8B6F47] text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-md">+{members.length - 5}</div>
                      )}
                    </div>
                    <div className="flex items-center pt-5 border-t-2 border-[#E0E0E0]">
                      <div className="flex-1 text-center flex flex-col gap-1">
                        <span className="text-2xl font-extrabold text-[#6B5435]">{members.length}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#666666]">Members</span>
                      </div>
                      <div className="w-px h-10 bg-[#E0E0E0]"></div>
                      <div className="flex-1 text-center flex flex-col gap-1">
                        <span className="text-2xl font-extrabold text-[#6B5435]">{collectionCount}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#666666]">Collection</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold text-[#6B5435] text-center mb-10">Wasabi Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.trainings.map((t, i) => (
              <div key={i} className="bg-white border-2 border-[#E0E0E0] rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8631A] to-[#9FD356] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FDDDC7] to-[#E8631A]/15 flex items-center justify-center mx-auto mb-5 text-3xl border-2 border-[#E8631A]/25 transition-all group-hover:border-[#E8631A]">
                  {t.name.toLowerCase().includes('python') ? '🐍' : t.name.toLowerCase().includes('chess') ? '♟️' : t.name.toLowerCase().includes('language') ? '📖' : t.name.toLowerCase().includes('drums') ? '🥁' : t.name.toLowerCase().includes('singing') ? '🎤' : '⚡'}
                </div>
                <div className="text-xl font-bold text-[#6B5435] mb-2">{t.name}</div>
                {t.providedBy && (
                  <div className="text-[10px] text-[#666666]/60 font-semibold uppercase tracking-wider mb-2">
                    {t.name.toLowerCase().includes('singing') || t.name.toLowerCase().includes('drums') || t.name.toLowerCase().includes('language') ? 'Course provided by ' : 'Powered by '}{t.providedBy}
                  </div>
                )}
                <p className="text-sm text-[#666666] mb-6 leading-relaxed">{t.description}</p>
                <div className="inline-flex items-center gap-2 bg-[#E8631A]/10 text-[#E8631A] border-2 border-[#E8631A]/25 px-5 py-2 rounded-full font-bold text-lg transition-all group-hover:bg-[#E8631A]/20 group-hover:border-[#E8631A]">
                  <img src="/icons/spice-icon.png" alt="Spice" className="w-5 h-5" />
                  <span>{t.spiceCost} Spice</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spice Deals Section */}
      <section className="py-20 bg-gradient-to-br from-[#FAFAFA] to-[#FDDDC7] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(232,99,26,0.08)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold text-[#6B5435] text-center mb-10">Spice Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {data.spiceDeals.map((deal, i) => (
              <div key={i} className={`bg-white border-2 rounded-[22px] p-10 text-center transition-all hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden ${deal.highlight ? 'border-[#E8631A] bg-gradient-to-br from-white via-white to-[#FDDDC7] shadow-[0_6px_24px_rgba(232,99,26,0.18)]' : 'border-[#E0E0E0]'}`}>
                {deal.highlight && (
                  <div className="absolute top-3.5 -right-5.5 bg-[#E8631A] text-white text-[10px] font-extrabold uppercase tracking-widest px-8 py-1.5 rotate-[35deg] shadow-[0_2px_8px_rgba(232,99,26,0.4)]">Best Value</div>
                )}
                <div className="flex items-center justify-center gap-2.5 text-5xl font-extrabold text-[#E8631A] mb-2 transition-all hover:scale-105">
                  <img src="/icons/spice-icon.png" alt="Spice" className="w-12 h-12" />
                  <span>{deal.spice}</span>
                </div>
                <div className="text-base text-[#666666] font-semibold mb-5 tracking-wide">Spice</div>
                <div className={`inline-block px-7 py-3 rounded-full text-xl font-extrabold tracking-wide transition-all shadow-md ${deal.highlight ? 'bg-gradient-to-br from-[#E8631A] to-[#c0430e] text-white shadow-[0_4px_16px_rgba(232,99,26,0.4)]' : 'bg-[#E8631A] text-white hover:bg-[#6B5435] hover:shadow-lg'}`}>
                  {deal.egp} EGP
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wasabi Cards Section */}
      <section className="py-20 bg-gradient-to-br from-[#0d1117] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(159,211,86,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_30%,rgba(185,242,255,0.08)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="container mx-auto px-5">
          <div className="text-center mb-12 relative">
            <div className="text-6xl mb-4 drop-shadow-[0_0_16px_rgba(159,211,86,0.4)]">🃏</div>
            <h2 className="text-5xl font-black text-white mb-4 tracking-widest drop-shadow-[0_0_24px_rgba(159,211,86,0.3)]">Wasabi Cards</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">Collect powerful cards, combine duplicates to upgrade degrees, and climb the leaderboard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto relative">
            <Link to="/cards?view=packs" className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-white/80 transition-all hover:border-[#9FD356]/60 hover:text-[#9FD356] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(159,211,86,0.2)] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9FD356]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-3xl shrink-0">🎴</span>
              <span className="flex-1 font-bold text-lg">Card Packs</span>
              <ArrowRight className="opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
            </Link>
            <Link to="/cards?view=all" className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-white/80 transition-all hover:border-[#9FD356]/60 hover:text-[#9FD356] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(159,211,86,0.2)] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9FD356]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-3xl shrink-0">📚</span>
              <span className="flex-1 font-bold text-lg">All Cards</span>
              <ArrowRight className="opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
            </Link>
            <Link to="/cards?view=leaderboard" className="flex items-center gap-4 p-6 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl text-white/80 transition-all hover:border-[#D4AF37]/70 hover:text-[#D4AF37] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(212,175,55,0.25)] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-3xl shrink-0">🏆</span>
              <span className="flex-1 font-bold text-lg">Global Leaderboard</span>
              <ArrowRight className="opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
