import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  id: string;
  setId: (id: string) => void;
  clearId: () => void;
};

export const useAuth = create<Props>()(
  persist(
    (set) => ({
      id: '',
      setId: (id: string) => {
        set({ id: id });
      },
      clearId: async () => {
        set({ id: '' });
      },
    }),
    { name: 'id', storage: createJSONStorage(() => AsyncStorage) }
  )
);
