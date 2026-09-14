import React from 'react';
import { X, ShieldAlert, Lock, FileText } from 'lucide-react';

interface LegalModalsProps {
  activeModal: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[85vh] flex flex-col my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            {activeModal === 'disclaimer' && <ShieldAlert className="w-6 h-6 text-amber-500" />}
            {activeModal === 'privacy' && <Lock className="w-6 h-6 text-emerald-500" />}
            {activeModal === 'terms' && <FileText className="w-6 h-6 text-blue-500" />}
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {activeModal === 'disclaimer' && 'Fitness & Safety Disclaimer'}
              {activeModal === 'privacy' && 'Privacy Policy'}
              {activeModal === 'terms' && 'Terms of Use'}
            </h2>
          </div>
          <button
            id="legal-modal-close"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-4 text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed pr-2">
          {activeModal === 'disclaimer' && (
            <>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-sm font-medium">
                “Online Home Workout provides general fitness information and is not a substitute for professional medical advice. If you have an injury, medical condition, are pregnant, or are unsure whether exercise is appropriate for you, consult a qualified healthcare professional before starting or changing an exercise program.”
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">Important Health Warnings</h3>
              <p>
                <strong>Stop exercising and seek appropriate medical advice immediately</strong> if you experience severe pain, chest tightness, dizziness, nausea, shortness of breath, faintness, or unusual symptoms.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">No Medical Claims or Diagnoses</h3>
              <p>
                The exercises and routines provided on this platform are designed solely for educational, conditioning, and recreational purposes for apparently healthy individuals. We do not diagnose injuries, prescribe rehabilitation protocols, or claim that workouts cure diseases.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">Respect Your Limits</h3>
              <p>
                Exercise at your own pace. If a movement causes joint sharp pain or discomfort, use the <strong>"Replace Exercise"</strong> button to pick an easier variation or stop that movement immediately. Never push through acute joint pain.
              </p>
            </>
          )}

          {activeModal === 'privacy' && (
            <>
              <p>
                At <strong>Online Home Workout</strong>, we believe your personal wellness journey should be private, secure, and under your full control.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">1. Local Storage Architecture</h3>
              <p>
                Your workout plans, completed sessions, personal streaks, and preference settings are stored locally in your browser’s LocalStorage. We do not transmit or sell your workout history to third-party advertisers.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">2. No Unsolicited Tracking</h3>
              <p>
                We do not track your location, access your contacts, or share personal profile data. We strictly follow data minimization principles.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">3. Clearing Your Data</h3>
              <p>
                You can reset or wipe your stored data at any time directly through the Progress page controls or by clearing your browser cache.
              </p>
            </>
          )}

          {activeModal === 'terms' && (
            <>
              <p>
                Welcome to Online Home Workout. By accessing or using our interactive home fitness service, you agree to these Terms of Use.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">1. Personal Responsibility</h3>
              <p>
                You acknowledge that physical exercise involves inherent risks of injury. You agree to take full responsibility for ensuring your workout area is clear of hazards, using sturdy furniture for exercises like incline pushups or dips, and listening to your body.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">2. Accurate Input</h3>
              <p>
                You agree to provide accurate inputs regarding your experience level and equipment to receive appropriate and safe exercise selections.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">3. Free & Accessible Core Product</h3>
              <p>
                Our core workout generator, timer, and exercise library remain freely accessible to support healthy, active daily living at home.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-white transition"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};
