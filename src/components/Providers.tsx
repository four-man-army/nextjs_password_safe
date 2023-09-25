'use client';
import { NavbarOpenProvider } from "@/context/NavbarOpen";
import { PasswordProvider } from "@/context/Password";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const query = new QueryClient();
  return (
    <PasswordProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <QueryClientProvider client={query}>
        <NavbarOpenProvider>{children}</NavbarOpenProvider>
      </QueryClientProvider>
    </PasswordProvider>
  );
};

export default Providers;
