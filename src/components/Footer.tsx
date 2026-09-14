import React from 'react';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'workouts' | 'exercises' | 'progress' | 'about') => void;
  onOpenLegal: (modal: 'privacy' | 'terms' | 'disclaimer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm">
                HW
              </div>
              <span className="text-xl font-black tracking-tight text-white">Online Home Workout</span>
            </div>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              Your workout. Your home. Your schedule. Get a realistic routine tailored to your goal, fitness level, available time, and equipment without gym memberships or intimidation.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Train smart. Stay consistent.
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-workouts"
                  onClick={() => onNavigate('workouts')}
                  className="hover:text-emerald-400 transition"
                >
                  Workouts Generator
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-exercises"
                  onClick={() => onNavigate('exercises')}
                  className="hover:text-emerald-400 transition"
                >
                  Exercise Library
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-progress"
                  onClick={() => onNavigate('progress')}
                  className="hover:text-emerald-400 transition"
                >
                  Progress Tracker
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition"
                >
                  About Our Method
                </button>
              </li>
            </ul>
          </div>

          {/* Trust, Safety & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Safety & Policies</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-disclaimer-btn"
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Fitness & Medical Disclaimer
                </button>
              </li>
              <li>
                <button
                  id="footer-privacy-btn"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  id="footer-terms-btn"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Terms of Use
                </button>
              </li>
              <li className="pt-2 text-xs text-slate-300">
                Data saved privately on your device.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Online Home Workout. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> for healthy habits
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition"
              aria-label="Scroll to top"
            >
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
