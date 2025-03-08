import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Store = {
  isFirst: boolean;
  setIsFirst: () => void;
};

export const useFirst = create<Store>()(
  persist(
    (set) => ({
      isFirst: true,
      setIsFirst: () => set({ isFirst: false }),
    }),
    {
      name: 'isFirst',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
