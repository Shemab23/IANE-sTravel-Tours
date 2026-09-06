import React from 'react';
import { UserCheck, ShieldCheck, BadgePercent, HeartHandshake, Headphones, Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      icon: UserCheck,
      title: 'Personalized service',
      desc: 'Trips, flights, and accommodations tailored around your specific schedule, preferences, and budget.',
    },
    {
      icon: ShieldCheck,
      title: 'Reliable travel assistance',
      desc: 'Expert guidance with visa appointments, flight connections, baggage policies, and paperwork.',
    },
    {
      icon: BadgePercent,
      title: 'Competitive travel options',
      desc: 'Direct comparisons across domestic, regional, and international carriers to secure fair rates.',
    },
    {
      icon: HeartHandshake,
      title: 'Support throughout your journey',
      desc: 'You are never on your own. From departure through transit and safe return, our team is accessible.',
    },
    {
      icon: Headphones,
      title: '24/7 phone support',
      desc: 'Emergency assistance available at any hour: +250 783 553 278 and +250 788 724 724.',
    },
  ];

  return (
    <section id="trust" className="py-16 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4th Year Milestone Ribbon Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0B2A4A] via-[#12395E] to-[#0B2A4A] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md border border-[#C7A15A]/30"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#C7A15A]/20 border border-[#C7A15A]/40 flex items-center justify-center text-[#C7A15A] flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs font-black uppercase tracking-wider text-[#C7A15A]">
                  4th Operating Year Milestone
                </span>
                <span className="hidden md:inline px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-slate-200">
                  Certified & Registered Operator
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5">
                Now in our 4th continuous year providing reliable flights, hotel bookings, and Rwanda safaris.
              </p>
            </div>
          </div>

          <a
            href="#credentials"
            className="px-3.5 py-1.5 rounded-xl bg-[#C7A15A] hover:bg-[#b58f4a] text-slate-950 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>View Certificate & Standards</span>
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#556B4A] mb-2">
            Why Travel With IAN'S
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A4A] font-heading">
            Travel with confidence.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Transparent support, personalized itineraries, and attentive assistance at every stage of your trip.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trustPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-[#3FA9DD]/40 hover:shadow-md transition-all duration-300 group text-center sm:text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0B2A4A]/5 group-hover:bg-[#3FA9DD]/10 flex items-center justify-center text-[#0B2A4A] group-hover:text-[#3FA9DD] transition-colors mb-4 mx-auto sm:mx-0">
                    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B2A4A] font-heading mb-1.5">
                    {point.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center gap-1 text-[11px] font-semibold text-[#556B4A]">
                  <span>0{idx + 1}</span>
                  <span className="h-0.5 w-4 bg-[#556B4A]/30 rounded" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
