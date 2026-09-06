import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  CalendarCheck,
  PlaneTakeoff,
  CheckCircle2,
} from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Tell Us Your Needs",
      subtitle: "Where, when, and who is traveling",
      desc: "Send an inquiry via WhatsApp, call our office, or submit our online flight/quote forms. Share your budget, preferred dates, passenger details, and dream experiences with zero obligation.",
      icon: MessageSquare,
      image: "/images/needs.jpg",
      tag: "Consultation & Listening",
    },
    {
      num: "02",
      title: "We Find Your Options",
      subtitle: "Comparing routes, lodgings & permits",
      desc: "Our travel desk compares carrier routes, checks hotel availability, and prepares transparent options tailored to your exact budget. We highlight optimal layovers and vetted accommodations.",
      icon: Search,
      image: "/images/option.jpg",
      tag: "Route & Rate Comparison",
    },
    {
      num: "03",
      title: "We Plan Your Journey",
      subtitle: "Ticketing, confirmations & visa checklist",
      desc: "Once you choose your preferred option, we secure flight tickets, finalize lodge bookings, coordinate official park permits, and assist with airport pickup logistics and visa guidelines.",
      icon: CalendarCheck,
      image: "/images/plan.png",
      tag: "Seamless Coordination",
    },
    {
      num: "04",
      title: "You Travel",
      subtitle: "With continuous 24/7 personal support",
      desc: "Step into your journey with peace of mind. We track your flight schedules, coordinate with on-the-ground drivers, and provide 24/7 emergency phone support until you return safely home.",
      icon: PlaneTakeoff,
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      tag: "Safe & Supported Adventure",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-[#F8FAFC] border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3FA9DD] mb-2">
            The Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight font-heading">
            How your journey unfolds.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Four transparent steps from your first idea to a safe, memorable
            return.
          </p>
        </div>

        {/* Interactive Step Navigation & Progress Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isActive
                    ? "bg-white border-[#3FA9DD] shadow-md ring-1 ring-[#3FA9DD]/30"
                    : "bg-white/60 hover:bg-white border-slate-200 text-slate-500"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-black font-heading ${
                      isActive ? "text-[#3FA9DD]" : "text-slate-400"
                    }`}
                  >
                    {step.num}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#0B2A4A]" : "text-slate-400"
                    }`}
                  />
                </div>
                <h4
                  className={`text-xs sm:text-sm font-bold truncate font-heading ${
                    isActive ? "text-[#0B2A4A]" : "text-slate-700"
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {step.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Spotlight Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            {/* Left Narrative */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#0B2A4A]/5 text-xs font-bold text-[#0B2A4A]">
                    Step {steps[activeStep].num}
                  </span>
                  <span className="text-xs font-semibold text-[#556B4A]">
                    • {steps[activeStep].tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2A4A] font-heading mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-xs font-semibold text-[#3FA9DD] mb-4">
                  {steps[activeStep].subtitle}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {steps[activeStep].desc}
                </p>
              </div>

              {/* Progress dots & Step switcher buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      aria-label={`Go to step ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        activeStep === i
                          ? "w-8 bg-[#3FA9DD]"
                          : "w-2 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={activeStep === 0}
                    onClick={() =>
                      setActiveStep((prev) => Math.max(0, prev - 1))
                    }
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStep === steps.length - 1}
                    onClick={() =>
                      setActiveStep((prev) =>
                        Math.min(steps.length - 1, prev + 1),
                      )
                    }
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#0B2A4A] hover:bg-[#12395E] disabled:opacity-40 rounded-lg transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-6 relative min-h-[240px] lg:min-h-full bg-slate-100 overflow-hidden">
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover transform scale-100 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/60 via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
