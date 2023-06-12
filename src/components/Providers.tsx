import { NavbarOpenProvider } from "@/context/NavbarOpen";
import { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <NavbarOpenProvider>{children}</NavbarOpenProvider>;
};

export default Providers;
