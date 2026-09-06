import React from "react";
import { CheckCircle2, ShieldCheck, Building2 } from "lucide-react";
import { motion } from "motion/react";

/**
 * Concentric ring text for the central seal, drawn along an SVG circle path.
 * This is the classic "official seal" convention: a repeating motto running
 * around the rim of an emblem, rather than a flat icon-in-a-badge.
 */
const SealRingText: React.FC<{ id: string; text: string; radius: number }> = ({
  id,
  text,
  radius,
}) => (
  <>
    <defs>
      <path
        id={id}
        d={`M 100,100 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
      />
    </defs>
    <text fontSize="7.2" letterSpacing="2.5" fill="#F3E7C9" fontWeight={700}>
      <textPath href={`#${id}`} startOffset="0%">
        {text}
      </textPath>
    </text>
  </>
);

const CornerFlourish: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <path d="M2 2 H30 M2 2 V30" stroke="#C7A15A" strokeWidth="1.5" />
    <path
      d="M2 2 C 20 2, 20 20, 38 20"
      stroke="#C7A15A"
      strokeWidth="1"
      opacity="0.6"
    />
    <circle cx="2" cy="2" r="2.5" fill="#C7A15A" />
    <circle cx="38" cy="2" r="1.3" fill="#C7A15A" opacity="0.7" />
    <circle cx="2" cy="38" r="1.3" fill="#C7A15A" opacity="0.7" />
  </svg>
);

export const CertificateAwardedSection: React.FC = () => {
  return (
    <section
      id="credentials"
      className="py-20 bg-[#F4F1E9] border-t border-[#0B2A4A]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-bold text-[#8A6A24] mb-2">
            Fourth year of operation
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight font-heading">
            The credentials behind every booking
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            IAN'S Travel & Tours operates as a registered tour and travel
            enterprise in Kigali, with standing agreements across domestic and
            international carriers, safari lodges, and the national parks
            authority.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: the certificate itself */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="relative bg-[#FBF8F3] shadow-[0_20px_50px_-15px_rgba(11,42,74,0.35)]">
              {/* Outer engraved double-rule border */}
              <div className="absolute inset-3 border border-[#0B2A4A]/70 pointer-events-none" />
              <div className="absolute inset-[18px] border border-[#C7A15A]/60 pointer-events-none" />

              {/* Corner flourishes */}
              <CornerFlourish className="absolute top-3 left-3 w-9 h-9" />
              <CornerFlourish className="absolute top-3 right-3 w-9 h-9 -scale-x-100" />
              <CornerFlourish className="absolute bottom-3 left-3 w-9 h-9 -scale-y-100" />
              <CornerFlourish className="absolute bottom-3 right-3 w-9 h-9 -scale-x-100 -scale-y-100" />

              {/* Faint diagonal watermark, tiled */}
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-32deg, transparent, transparent 90px, #0B2A4A 90px, #0B2A4A 91px)",
                }}
              />

              <div className="relative px-8 sm:px-14 pt-12 pb-10 text-center">
                <p className="text-[10px] tracking-[0.35em] text-[#8A6A24] font-bold">
                  REPUBLIC OF RWANDA &middot; PROVINCE OF KIGALI
                </p>
                <h3 className="mt-3 text-2xl sm:text-[28px] leading-tight font-black text-[#0B2A4A] font-heading tracking-wide">
                  Certificate of Registered
                  <br />
                  Tour &amp; Travel Operation
                </h3>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <span className="h-px w-14 bg-[#C7A15A]/70" />
                  <span className="text-[10px] tracking-[0.3em] text-slate-400 font-semibold">
                    No. 04
                  </span>
                  <span className="h-px w-14 bg-[#C7A15A]/70" />
                </div>

                <p className="mt-6 text-xs text-slate-500 uppercase tracking-widest">
                  This is to certify that
                </p>
                <h4 className="mt-1 text-3xl sm:text-4xl font-black text-[#0B2A4A] font-heading">
                  IAN'S Travel &amp; Tours
                </h4>
                <p className="mt-1 text-xs font-semibold text-[#556B4A]">
                  Town Center Building, Kigali &middot; Registered Travel &amp;
                  Tour Operator
                </p>

                <p className="mt-6 max-w-md mx-auto text-[13px] text-slate-600 leading-relaxed">
                  is in its fourth consecutive year of continuous operation,
                  having maintained adherence to national tourism regulations,
                  verified flight ticketing practices, and supervised safari
                  conduct throughout the period of registration.
                </p>

                {/* Seal + signatures row */}
                <div className="mt-9 grid grid-cols-3 items-end gap-4">
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">
                      Certificate No.
                    </p>
                    <p className="text-sm font-bold text-[#0B2A4A] font-mono">
                      RTB-KGL-0004
                    </p>
                    <div className="mt-3 h-px bg-slate-300" />
                    <p className="mt-1 text-[10px] text-slate-500">
                      Managing Director
                    </p>
                  </div>

                  {/* Seal */}
                  <div className="flex justify-center">
                    <svg
                      viewBox="0 0 200 200"
                      className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md"
                    >
                      <circle cx="100" cy="100" r="94" fill="#0B2A4A" />
                      <circle
                        cx="100"
                        cy="100"
                        r="94"
                        fill="none"
                        stroke="#C7A15A"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="82"
                        fill="none"
                        stroke="#C7A15A"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      <SealRingText
                        id="sealRing"
                        text="TOURISM • AIR TRAVEL • SAFARIS • EST. "
                        radius={70}
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="46"
                        fill="none"
                        stroke="#C7A15A"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                      <text
                        x="100"
                        y="94"
                        textAnchor="middle"
                        fontSize="30"
                        fontWeight={900}
                        fill="#F3E7C9"
                        fontFamily="serif"
                      >
                        4
                      </text>
                      <text
                        x="100"
                        y="114"
                        textAnchor="middle"
                        fontSize="9"
                        letterSpacing="1.5"
                        fill="#C7A15A"
                        fontWeight={700}
                      >
                        YEARS
                      </text>
                    </svg>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">
                      Date Issued
                    </p>
                    <p className="text-sm font-bold text-[#0B2A4A]">2026</p>
                    <div className="mt-3 h-px bg-slate-300" />
                    <p className="mt-1 text-[10px] text-slate-500">
                      Compliance Officer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: supporting detail */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-sm font-bold text-[#0B2A4A] font-heading">
                Four years of steadfast service
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We've built working relationships with domestic carriers,
                international airlines, safari lodges, and the Rwanda
                Development Board over four years of continuous operation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Accreditation &amp; standards
              </h4>
              <div className="space-y-2.5">
                {[
                  "Registered & licensed tourism enterprise in Rwanda",
                  "Approved booking desk for Rwanda National Parks",
                  "Global distribution system flight booking access",
                  "Vetted 4x4 safari fleet with certified driver-guides",
                  "24/7 ground emergency helpline for in-transit guests",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-xs text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#556B4A] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#556B4A]/10 border border-[#556B4A]/20 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#556B4A] flex-shrink-0" />
              <p className="text-xs text-[#3F4B33] font-medium leading-relaxed">
                Every booking is backed by verified commercial invoices,
                transparent ticket records, and no hidden surcharges.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 px-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Registered headquarters — Town Center Bldg, Kigali</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
