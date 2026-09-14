import React, { useState } from 'react';
import { Menu, X, Play, Volume2, VolumeX, Globe } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentTab: 'home' | 'workouts' | 'exercises' | 'progress' | 'about';
  onNavigate: (tab: 'home' | 'workouts' | 'exercises' | 'progress' | 'about') => void;
  onStartWorkoutClick: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onStartWorkoutClick,
  soundEnabled,
  onToggleSound
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems: Array<{ id: 'home' | 'workouts' | 'exercises' | 'progress' | 'about'; label: string }> = [
    { id: 'home', label: t('navHome') },
    { id: 'workouts', label: t('navWorkouts') },
    { id: 'exercises', label: t('navExercises') },
    { id: 'progress', label: t('navProgress') },
    { id: 'about', label: t('navAbout') }
  ];

  const handleNavClick = (tab: 'home' | 'workouts' | 'exercises' | 'progress' | 'about') => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:bg-slate-900/90 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg group"
        >
          {/* Fitness + Home Emblem */}
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 flex items-center justify-center p-2 shadow-xs group-hover:bg-emerald-900/50 transition">
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
              {/* Home Roof contour */}
              <path d="M8 20 L20 10 L32 20" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {/* Central athlete core dot */}
              <circle cx="20" cy="18" r="2.5" fill="#F8FAFC" />
              {/* Ground barbell */}
              <rect x="12" y="28" width="16" height="2.5" rx="1.25" fill="#10B981" />
              <rect x="10" y="26" width="3" height="6.5" rx="1" fill="#34D399" />
              <rect x="27" y="26" width="3" height="6.5" rx="1" fill="#34D399" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-950 dark:text-white flex items-center gap-1.5">
              Online Home Workout
            </span>
            <span className="hidden sm:block text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-none">
              {t('brandTagline')}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Language Selector Button */}
          <LanguageSelector idPrefix="nav-lang" />

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition"
            title={soundEnabled ? t('audioEnabled') : t('audioMuted')}
            aria-label={soundEnabled ? t('audioMuted') : t('audioEnabled')}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton className="hidden sm:inline-flex" />

          {/* Primary CTA */}
          <button
            id="nav-primary-cta"
            onClick={onStartWorkoutClick}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs hover:shadow transition transform active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span className="whitespace-nowrap">{t('startWorkout')}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
            {/* Mobile Language Selector Row */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {t('languageButtonLabel')}
              </span>
              <LanguageSelector idPrefix="mobile-lang" variant="full" />
            </div>

            <PWAInstallButton className="w-full justify-center py-2.5" />
            <button
              id="mobile-drawer-start"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartWorkoutClick();
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{t('startMyWorkout')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
