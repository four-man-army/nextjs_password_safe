"use client";
import { trpc } from "@/app/_trpc/client";
import { NavbarOpenProvider } from "@/context/NavbarOpen";
import { PasswordProvider } from "@/context/Password";
import { absoluteUrl } from "@/lib/utils";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { FC, ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl("/api/trpc"),
        }),
      ],
    })
  );

  return (
    <PasswordProvider>
      <NextUIProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <NavbarOpenProvider>{children}</NavbarOpenProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </NextUIProvider>
    </PasswordProvider>
  );
};

export default Providers;
