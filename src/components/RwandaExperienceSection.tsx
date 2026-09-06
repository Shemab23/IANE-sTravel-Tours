import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Mountain, Trees, Compass } from 'lucide-react';

interface RwandaExperienceSectionProps {
  onExploreRwandaClick: () => void;
}

export const RwandaExperienceSection: React.FC<RwandaExperienceSectionProps> = ({
  onExploreRwandaClick,
}) => {
  const [activeTab, setActiveTab] = useState<'volcanoes' | 'akagera' | 'kivu' | 'nyungwe'>('volcanoes');

  const rwandaHighlights = {
    volcanoes: {
      title: 'Volcanoes National Park & Gorillas',
      tagline: 'Mist, bamboo forests & rare mountain primates',
      desc: 'Trek with certified Rwanda Development Board (RDB) rangers into the lush Virunga slopes. IAN’S assists with official permit logistics, luxury base lodges in Musanze, and seamless private transfers.',
      image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1200&q=80',
      badge: 'Iconic Wildlife',
      features: ['Official permit securing assistance', 'Golden monkey tracking option', 'Luxury eco-lodge bookings', 'Musanze cultural encounters'],
    },
    akagera: {
      title: 'Akagera Savanna & Lake Safari',
      tagline: 'Central Africa’s largest protected wetland',
      desc: 'Experience classic African savanna landscapes alive with lions, rhinos, giraffes, zebras, and vast herds of elephants, paired with a peaceful boat cruise on Lake Ihema.',
      image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
      badge: 'The Big Five',
      features: ['4x4 Safari vehicle with pop-up roof', 'Lake Ihema sunset boat cruise', 'Night safari game drives', 'Campfire lodge hospitality'],
    },
    kivu: {
      title: 'Lake Kivu & Rubavu Shoreline',
      tagline: 'Tranquil inland sea surrounded by emerald hills',
      desc: 'Relax on clean freshwater beaches, paddle along the peaceful shoreline by kayak, discover the Congo Nile Trail, and experience rich coffee harvesting traditions.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      badge: 'Lakeside Serenity',
      features: ['Sunset island kayaking', 'Specialty Rwandan coffee tasting', 'Resort relaxation in Gisenyi/Rubavu', 'Fresh local gastronomy'],
    },
    nyungwe: {
      title: 'Nyungwe Rainforest & Canopy Walkway',
      tagline: 'Ancient montane rainforest & chimpanzee habitat',
      desc: 'Suspended 70 meters in the clouds on East Africa’s canopy walkway. Walk among giant tree ferns, observe troops of chimpanzees and colobus monkeys, and hike misty waterfalls.',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      badge: 'Highland Canopy',
      features: ['Suspension canopy walkway', 'Chimpanzee tracking permits', 'Kamiranzovu swamp trail', 'Tea estate plantation tours'],
    },
  };

  const current = rwandaHighlights[activeTab];

  return (
    <section id="rwanda" className="py-24 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#556B4A]/10 text-xs font-bold uppercase tracking-wider text-[#556B4A] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Land of a Thousand Hills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2A4A] tracking-tight font-heading">
            Discover Rwanda differently.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            From the clean streets of Kigali to misty volcanic peaks, ancient rainforests, and sunlit lakes — experience bespoke Rwandan journeys shaped around your comfort.
          </p>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('volcanoes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'volcanoes'
                ? 'bg-[#0B2A4A] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Mountain className="w-3.5 h-3.5" />
            <span>Volcanoes & Gorillas</span>
          </button>
          <button
            onClick={() => setActiveTab('akagera')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'akagera'
                ? 'bg-[#0B2A4A] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Akagera Big Five</span>
          </button>
          <button
            onClick={() => setActiveTab('kivu')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'kivu'
                ? 'bg-[#0B2A4A] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lake Kivu Shoreline</span>
          </button>
          <button
            onClick={() => setActiveTab('nyungwe')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'nyungwe'
                ? 'bg-[#0B2A4A] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Nyungwe Rainforest</span>
          </button>
        </div>

        {/* Feature Display Container (expanding interactive showcase) */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-[#0B2A4A] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Left Content Area */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6 z-10 bg-gradient-to-r from-[#0B2A4A] via-[#0B2A4A]/95 to-transparent">
              <div>
                <span className="inline-block px-3 py-1 bg-[#556B4A] text-white text-[11px] font-bold rounded-full mb-3 uppercase tracking-wider">
                  {current.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-2">
                  {current.title}
                </h3>
                <p className="text-xs font-semibold text-[#7EC8E3] italic mb-4">
                  "{current.tagline}"
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {current.desc}
                </p>

                {/* Features list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#7EC8E3] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  id="explore-rwanda-cta"
                  onClick={onExploreRwandaClick}
                  className="px-6 py-3 bg-[#3FA9DD] hover:bg-[#7EC8E3] text-[#0B2A4A] font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Explore Rwanda With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-400">Custom dates & group sizes</span>
              </div>
            </div>

            {/* Right Photo Area */}
            <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-full overflow-hidden">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A] via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
