import React, { useState } from 'react';
import { Lock, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { StorageService } from '../data/storage';

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPasswordModal: React.FC<AdminPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  /**
   * MVP ACCESS GATE NOTICE (per Specification §24):
   * This is an MVP convenience gate for client demonstration and evaluation.
   * A real deployment must move authentication server-side (e.g., Firebase Auth
   * restricted to shema...@gmail.com) before public launch.
   */
  const validPasswords = ['ians2024', 'admin2024', 'rwanda2024'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      if (validPasswords.includes(password.trim())) {
        setIsSubmitting(false);
        setPassword('');
        StorageService.setAdminAuthenticated(true);
        onSuccess();
      } else {
        setIsSubmitting(false);
        setError('Incorrect password. Access denied.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm p-6 bg-white rounded-2xl shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#0B2A4A]/5 flex items-center justify-center text-[#0B2A4A]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0B2A4A] font-heading">
              Restricted Admin Console
            </h3>
            <p className="text-xs text-slate-500">Authorized: Shemab71@gmail.com</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="admin-passcode"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
              >
                Passcode
              </label>
              <button
                type="button"
                onClick={() => setPassword('ians2024')}
                className="text-[11px] text-[#3FA9DD] hover:underline font-medium"
              >
                Auto-fill (ians2024)
              </button>
            </div>
            <input
              id="admin-passcode"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter management passcode"
              autoFocus
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] focus:border-transparent text-slate-800"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400 font-mono">
              MVP default: <code className="text-[#3FA9DD]">ians2024</code>
            </span>
            <button
              type="submit"
              disabled={isSubmitting || !password.trim()}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0B2A4A] hover:bg-[#12395E] rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying...' : 'Unlock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
