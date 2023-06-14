import { NavbarOpenProvider } from "@/context/NavbarOpen";
import { PasswordProvider } from "@/context/Password";
import { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <PasswordProvider>
      <NavbarOpenProvider>{children}</NavbarOpenProvider>
    </PasswordProvider>
  );
};

export default Providers;
