import React from "react";
import { Edit3 } from "lucide-react";
import { SectionContent } from "../../types";
import { SectionCard } from "../components/SectionCard";
import { FieldInput, FieldTextarea } from "../components/FormField";

interface ContentEditorTabProps {
  contentDraft: SectionContent;
  setContentDraft: React.Dispatch<React.SetStateAction<SectionContent>>;
  onSaveSection: (sectionName: string, data: Record<string, unknown>) => void;
}

export const ContentEditorTab: React.FC<ContentEditorTabProps> = ({
  contentDraft,
  setContentDraft,
  onSaveSection,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
          <Edit3 className="w-3.5 h-3.5" />
          <span>Section-by-Section Page Editor (§32)</span>
        </div>
        <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
          Website Content Management
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Per Specification §32: Modify live site section copy and card
          structures. Every Save action alerts and logs to the mock store ready
          for live database wiring.
        </p>
      </div>

      <SectionCard
        title="01. Hero Section"
        saveLabel="Save Hero Draft"
        onSave={() =>
          onSaveSection("Hero", {
            headline: contentDraft.hero.headline,
            subheadline: contentDraft.hero.subheadline,
            supportLine: contentDraft.hero.supportLine,
          })
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldInput
            label="Eyebrow Tagline"
            value={contentDraft.hero.eyebrow}
            onChange={(v) =>
              setContentDraft({
                ...contentDraft,
                hero: { ...contentDraft.hero, eyebrow: v },
              })
            }
          />
          <FieldInput
            label="Main Brand Headline (H1)"
            value={contentDraft.hero.headline}
            onChange={(v) =>
              setContentDraft({
                ...contentDraft,
                hero: { ...contentDraft.hero, headline: v },
              })
            }
          />
        </div>
        <FieldInput
          label="Sub-Headline (Official Slogan)"
          value={contentDraft.hero.subheadline}
          onChange={(v) =>
            setContentDraft({
              ...contentDraft,
              hero: { ...contentDraft.hero, subheadline: v },
            })
          }
        />
        <FieldTextarea
          label="Supporting Paragraph"
          rows={2}
          value={contentDraft.hero.supportLine}
          onChange={(v) =>
            setContentDraft({
              ...contentDraft,
              hero: { ...contentDraft.hero, supportLine: v },
            })
          }
        />
      </SectionCard>

      <SectionCard
        title="02. Trust Section"
        saveLabel="Save Trust Draft"
        onSave={() =>
          onSaveSection("Trust", {
            headline: contentDraft.trust.headline,
            subheadline: contentDraft.trust.subheadline,
          })
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldInput
            label="Headline"
            value={contentDraft.trust.headline}
            onChange={(v) =>
              setContentDraft({
                ...contentDraft,
                trust: { ...contentDraft.trust, headline: v },
              })
            }
          />
          <FieldInput
            label="Sub-headline"
            value={contentDraft.trust.subheadline}
            onChange={(v) =>
              setContentDraft({
                ...contentDraft,
                trust: { ...contentDraft.trust, subheadline: v },
              })
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="03. Flight Enquiry Section"
        saveLabel="Save Flights Draft"
        onSave={() =>
          onSaveSection("FlightEnquiry", {
            headline: contentDraft.flightEnquiry.headline,
            subheadline: contentDraft.flightEnquiry.subheadline,
          })
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldInput
            label="Headline"
            value={contentDraft.flightEnquiry.headline}
            onChange={(v) =>
              setContentDraft({
                ...contentDraft,
                flightEnquiry: { ...contentDraft.flightEnquiry, headline: v },
              })
            }
          />
          <FieldInput
            label="Sub-headline"
            value={contentDraft.flightEnquiry.subheadline}
            onChange={(v) =>
              setContentDraft({
                ...contentDraft,
                flightEnquiry: {
                  ...contentDraft.flightEnquiry,
                  subheadline: v,
                },
              })
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="04. Rwanda Experience Section"
        saveLabel="Save Rwanda Draft"
        onSave={() =>
          onSaveSection("RwandaExperience", {
            headline: contentDraft.rwandaExperience.headline,
            subheadline: contentDraft.rwandaExperience.subheadline,
            description: contentDraft.rwandaExperience.description,
          })
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldInput
            label="Headline"
            value={contentDraft.rwandaExperience.headline}
            onChange={(v) =>
              setContentDraft({
                ...contentDraft,
                rwandaExperience: {
                  ...contentDraft.rwandaExperience,
                  headline: v,
                },
              })
            }
          />
          <FieldInput
            label="Sub-headline"
            value={contentDraft.rwandaExperience.subheadline}
            onChange={(v) =>
              setContentDraft({
                ...contentDraft,
                rwandaExperience: {
                  ...contentDraft.rwandaExperience,
                  subheadline: v,
                },
              })
            }
          />
        </div>
        <FieldTextarea
          label="Narrative Body"
          rows={3}
          value={contentDraft.rwandaExperience.description}
          onChange={(v) =>
            setContentDraft({
              ...contentDraft,
              rwandaExperience: {
                ...contentDraft.rwandaExperience,
                description: v,
              },
            })
          }
        />
      </SectionCard>

      <SectionCard
        title="05. Business & Office Info"
        saveLabel="Save Business Info"
        onSave={() =>
          onSaveSection("BusinessInfo", {
            address: contentDraft.businessInfo.address,
            phone: contentDraft.businessInfo.phonePrimary,
            email: contentDraft.businessInfo.email,
          })
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldInput
            label="Office Address"
            value={contentDraft.businessInfo.address}
            onChange={(v) =>
              setContentDraft({
                ...contentDraft,
                businessInfo: { ...contentDraft.businessInfo, address: v },
              })
            }
          />
          <FieldInput
            label="Support Email"
            value={contentDraft.businessInfo.email}
            onChange={(v) =>
              setContentDraft({
                ...contentDraft,
                businessInfo: { ...contentDraft.businessInfo, email: v },
              })
            }
          />
        </div>
      </SectionCard>
    </div>
  );
};
