import React from "react";

interface FieldInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const FieldInput: React.FC<FieldInputProps> = ({
  label,
  value,
  onChange,
}) => (
  <div>
    <label className="block text-xs font-bold text-slate-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
    />
  </div>
);

interface FieldTextareaProps extends FieldInputProps {
  rows?: number;
}

export const FieldTextarea: React.FC<FieldTextareaProps> = ({
  label,
  value,
  onChange,
  rows = 3,
}) => (
  <div>
    <label className="block text-xs font-bold text-slate-700 mb-1">
      {label}
    </label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
    />
  </div>
);
