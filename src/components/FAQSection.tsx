import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Clock,
  Luggage,
  Compass,
  CreditCard,
  PhoneCall,
  Search,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { initialBusinessInfo } from '../data/mockData';
import { buildWhatsAppUrl } from '../data/storage';

interface FAQItem {
  id: string;
  category: 'Visas' | 'Timelines' | 'Luggage' | 'Safaris' | 'Payments';
  question: string;
  answer: string;
  keyPoints?: string[];
}

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
  });

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'Visas',
      question: 'What are the visa processing times for Rwanda, East Africa, Dubai, and Europe?',
      answer:
        'Visa requirements depend on your nationality and destination. For Rwanda, most international travelers receive a 30-day tourist visa on arrival or apply online via Irembo/DGI with processing in 3–5 working days. The East Africa Tourist Visa (covering Rwanda, Uganda, and Kenya) takes 4–7 business days. Dubai tourist visas take 48–72 hours. For Europe (Schengen) and international destinations, we recommend starting the paperwork 3 to 6 weeks in advance of travel.',
      keyPoints: [
        'Rwanda: 30-day visa on arrival for AU, Commonwealth & Francophonie citizens',
        'East Africa Visa: One sticker valid for Rwanda, Uganda & Kenya',
        'Dubai: Express 48–72 hour electronic processing',
        'Schengen/UK/US: Apply 3–6 weeks ahead (we provide itinerary & hotel proof)',
      ],
    },
    {
      id: 'faq-2',
      category: 'Timelines',
      question: 'How far in advance should I book my flights, gorilla permits, and safaris?',
      answer:
        'For Rwanda Gorilla Trekking in Volcanoes National Park, booking 3 to 6 months in advance is strongly recommended because the Rwanda Development Board (RDB) strictly caps daily permits to preserve primate habitats. For international airfares, booking 4 to 8 weeks ahead yields the best rates. For holiday safari lodges (especially Akagera and Lake Kivu during July–August and December), 2 months notice is ideal. However, our Kigali desk also accommodates last-minute urgent departures within 24–48 hours.',
      keyPoints: [
        'Gorilla permits: 3–6 months in advance (strictly capped permits)',
        'International flights: 4–8 weeks ahead for optimal fare classes',
        'Safari lodges: 2–3 months ahead for peak seasons',
        'Urgent/Business trips: 24/7 expedited turnaround available',
      ],
    },
    {
      id: 'faq-3',
      category: 'Luggage',
      question: 'What are the baggage allowances for international flights and local safaris?',
      answer:
        'Most international commercial carriers flying into Kigali (e.g. RwandAir, Qatar Airways, KLM, Ethiopian Airlines, Turkish Airlines) permit two checked bags (23 kg / 50 lbs each) plus one carry-on (7–8 kg). For Rwanda 4x4 safaris and domestic bush transfers, we strongly advise soft-sided duffel bags rather than hard-shell suitcases, as vehicle luggage racks and small aircraft (15 kg maximum) fit soft luggage far more easily.',
      keyPoints: [
        'International flights: 2x 23kg checked bags + 7kg cabin bag standard',
        'Safari vehicles (4x4): Soft duffels recommended for optimal vehicle fit',
        'Domestic light aircraft: 15 kg limit in soft bags',
        'Complimentary luggage storage available at our Kigali office while on tour',
      ],
    },
    {
      id: 'faq-4',
      category: 'Safaris',
      question: 'What should I pack for a Rwanda gorilla trek and Nyungwe rainforest hike?',
      answer:
        'Volcanoes and Nyungwe are high-altitude rainforests with misty, cool weather. Essential items include sturdy, waterproof hiking boots with good grip, lightweight rain jacket, garden gloves (for gripping vegetation during treks), long wool/hiking socks, quick-dry trousers, insect repellent, and a small backpack. We provide walking sticks and coordinate with experienced local porters.',
      keyPoints: [
        'Waterproof hiking boots and thick hiking socks',
        'Lightweight rain poncho and fleece layers',
        'Trekking gloves and neutral, muted clothing colors',
        'Reusable water bottle and camera with extra batteries',
      ],
    },
    {
      id: 'faq-5',
      category: 'Payments',
      question: 'What payment methods do you accept and how are quotes finalized?',
      answer:
        'We provide transparent, itemized quotations with zero hidden booking fees. Payments can be completed securely via international bank wire transfer, major credit/debit cards, or Rwandan Mobile Money (MoMo). Official e-tickets, lodge vouchers, and RDB permits are issued immediately once payment is confirmed.',
      keyPoints: [
        'Accepted: Bank Wire, Credit/Debit Cards, MTN/Airtel Mobile Money',
        'Currencies: USD, EUR, and Rwandan Francs (RWF)',
        'Full itemized receipts and booking reference vouchers provided',
      ],
    },
    {
      id: 'faq-6',
      category: 'Timelines',
      question: 'What happens if my flight is delayed, rescheduled, or cancelled?',
      answer:
        'Our dedicated ticketing and operations team tracks live flight statuses. If an airline modifies your schedule, we immediately assist with rebooking, seat protection, and update your airport pickup driver in Kigali so you are never left waiting or stranded.',
      keyPoints: [
        '24/7 flight monitoring desk',
        'Direct coordination with carrier ticketing desks',
        'Synchronized airport transfer adjustments',
      ],
    },
  ];

  const categories = ['All', 'Visas', 'Timelines', 'Luggage', 'Safaris', 'Payments'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleWhatsAppHelp = () => {
    const url = buildWhatsAppUrl(
      initialBusinessInfo.whatsappPrimary,
      "Hello IAN'S Travel & Tours, I have a specific question about travel arrangements."
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B2A4A]/5 text-xs font-bold uppercase tracking-wider text-[#0B2A4A] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#3FA9DD]" />
            <span>Travel Advice & Practicalities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Clear, honest answers about visa processing, booking timelines, luggage guidelines, and our East African journeys.
          </p>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 mb-10"
        >
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search visa, luggage, permits, timelines..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0B2A4A] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              No questions matched your search criteria. Please feel free to message our desk on WhatsApp directly.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = !!openIds[faq.id];
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:border-[#3FA9DD]/50 transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-[#556B4A] uppercase tracking-wider">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#0B2A4A] font-heading leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="p-1 rounded-lg bg-slate-100 text-slate-500 flex-shrink-0 mt-0.5">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 space-y-3">
                          <p>{faq.answer}</p>

                          {faq.keyPoints && faq.keyPoints.length > 0 && (
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                Quick Facts:
                              </span>
                              {faq.keyPoints.map((point, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#3FA9DD]" />
                                  <span>{point}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* WhatsApp Help Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#1E7E34] flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 fill-[#25D366] text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                Have a specific question not listed here?
              </h4>
              <p className="text-xs text-emerald-800">
                Our Kigali travel consultants respond within minutes on WhatsApp.
              </p>
            </div>
          </div>

          <button
            onClick={handleWhatsAppHelp}
            className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 active:scale-95 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Ask Us Directly</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
