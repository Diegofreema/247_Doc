import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  ref: string;
};
type Props = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuth = create<Props>()(
  persist(
    (set) => ({
      user: null,
      setUser: (value) => {
        set({ user: value });
      },
      clearUser: async () => {
        set({ user: null });
      },
    }),
    { name: 'user', storage: createJSONStorage(() => AsyncStorage) }
  )
);
