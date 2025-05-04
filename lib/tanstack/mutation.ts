import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useAuth } from '../zustand/auth';
import { useRouter } from 'expo-router';
import { api } from '../utils';
import { toast } from 'sonner-native';

export const useDeleteProfile = () => {
  const { clearUser, user } = useAuth();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${api}?api=deleteaccount&patientref=${user?.ref}`
      );
      return data;
    },
    onSuccess: () => {
      clearUser();
      router.push('/');
      toast.success('Hate to see you leave 😔', {
        description: 'Profile Deleted Successfully',
      });
    },
    onError: () => {
      toast.error('Failed to delete profile', {
        description: 'Something went wrong, try again',
      });
    },
  });
};
