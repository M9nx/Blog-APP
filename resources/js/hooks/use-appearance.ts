import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Appearance } from '../types';

const getSystemTheme = (): 'dark' | 'light' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (appearance: Appearance): void => {
  const theme = appearance === 'system' ? getSystemTheme() : appearance;
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

interface AppearanceStore {
  appearance: Appearance;
  updateAppearance: (mode: Appearance) => void;
}

export const useAppearanceStore = create<AppearanceStore>()(
  persist(
    (set) => ({
      appearance: 'system',
      updateAppearance: (mode: Appearance) => set({ appearance: mode }),
    }),
    {
      name: 'appearance-storage',
    }
  )
);

export const initializeTheme = (): void => {
  const { appearance } = useAppearanceStore.getState();
  applyTheme(appearance);

  // Watch for system theme changes
  if (appearance === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      applyTheme('system');
    });
  }
};

export const useAppearance = () => {
  const { appearance, updateAppearance } = useAppearanceStore();

  const setAppearance = (mode: Appearance) => {
    updateAppearance(mode);
    applyTheme(mode);
  };

  return { appearance, setAppearance };
};
