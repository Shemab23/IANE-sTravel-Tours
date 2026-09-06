import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Star, Sparkles, Building2, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const CertificateAwardedSection: React.FC = () => {
  return (
    <section id="credentials" className="py-20 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C7A15A]/15 border border-[#C7A15A]/30 text-xs font-bold text-[#8A6A24] mb-3">
            <Award className="w-4 h-4 text-[#C7A15A]" />
            <span>4th Year Operating Milestone</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight font-heading">
            Celebrating 4 Years of Travel Excellence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Now in our 4th year of operations, IAN'S Travel & Tours is recognized for strict safety standards, reliable flight logistics, and authentic East African hospitality.
          </p>
        </motion.div>

        {/* Certificate Display & Key Milestone Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Beautiful Certificate Plaque / Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FAF8F5] via-white to-[#F6F3EE] border-4 border-[#C7A15A]/40 shadow-2xl overflow-hidden">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#C7A15A]" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#C7A15A]" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#C7A15A]" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#C7A15A]" />

              {/* Watermark Logo / Motif */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-[#C7A15A]/5 pointer-events-none blur-xl" />

              <div className="relative z-10 text-center space-y-4">
                {/* Certificate Header Badge */}
                <div className="flex items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#0B2A4A] text-[#C7A15A] flex items-center justify-center shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8A6A24] block">
                    Official Recognition of Standards
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B2A4A] font-heading mt-1">
                    CERTIFICATE OF OPERATIONAL EXCELLENCE
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Tourism, Air Travel Logistics & Guided Safaris
                  </p>
                </div>

                <div className="h-px w-28 bg-[#C7A15A]/60 mx-auto" />

                <div className="space-y-1.5 py-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Proudly Conferred To
                  </p>
                  <h4 className="text-2xl sm:text-3xl font-black text-[#0B2A4A] font-heading tracking-wide">
                    IAN'S TRAVEL & TOURS
                  </h4>
                  <p className="text-xs font-semibold text-[#556B4A]">
                    Registered Travel & Tour Operator · Kigali, Rwanda
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed italic">
                  "In recognition of entering its <strong>4th Year of continuous operations</strong>, maintaining exemplary standards in traveler assistance, trusted airline bookings, verified safari operations, and adherence to Rwandan tourism regulations."
                </p>

                {/* Verification Seals & Sign-off */}
                <div className="pt-4 border-t border-[#C7A15A]/30 flex flex-wrap items-center justify-between gap-4 text-left">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Operating Milestone
                    </span>
                    <span className="text-xs font-bold text-[#0B2A4A] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C7A15A]" />
                      <span>4th Consecutive Year</span>
                    </span>
                  </div>

                  {/* Gold Ribbon / Seal */}
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C7A15A]/20 border border-[#C7A15A]/40 text-[#735517]">
                    <Sparkles className="w-4 h-4 text-[#C7A15A]" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      Verified Operator
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Registered Headquarters
                    </span>
                    <span className="text-xs font-bold text-[#0B2A4A] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#556B4A]" />
                      <span>Town Center Bldg, Kigali</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Pillars of the 4th Year Journey */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0B2A4A]/5 text-[#0B2A4A] flex items-center justify-center font-black font-heading text-lg">
                  04
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B2A4A] font-heading">
                    Years of Steadfast Service
                  </h4>
                  <p className="text-xs text-slate-500">Founded with a commitment to personalized travel</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operating now in our fourth year, we have built trusted relationships with domestic carriers, international airlines, safari lodges, and the Rwanda Development Board.
              </p>
            </div>

            {/* Checklist of Credentials */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Accreditation & Standards
              </h4>
              <div className="space-y-2.5">
                {[
                  'Registered & Licensed Tourism Enterprise in Rwanda',
                  'Approved Booking Desk for Rwanda National Parks',
                  'Official Global Distribution Flight Booking Capabilities',
                  'Vetted 4x4 Safari Fleet & Certified Local Driver-Guides',
                  '24/7 Ground Emergency Helpline for In-Transit Guests',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#556B4A] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traveler Trust Reassurance */}
            <div className="p-4 rounded-2xl bg-[#556B4A]/10 border border-[#556B4A]/20 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#556B4A] flex-shrink-0" />
              <p className="text-xs text-[#3F4B33] font-medium leading-relaxed">
                Every booking is backed by verified commercial invoices, transparent ticket records, and zero hidden surcharges.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
