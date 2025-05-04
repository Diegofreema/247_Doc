import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/lib/zustand/auth';

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/home" />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default AuthLayout;
