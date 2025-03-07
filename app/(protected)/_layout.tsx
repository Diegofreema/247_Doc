import { useAuth } from '@/lib/zustand/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
const queryClient = new QueryClient();
const Layout = () => {
  const { id } = useAuth();

  if (!id) {
    return <Redirect href="/" />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
};

export default Layout;
