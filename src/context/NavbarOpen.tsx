import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const NavbarOpenContext = createContext<{
  navbarOpen: boolean;
  setNavbarOpen: Dispatch<SetStateAction<boolean>>;
}>({ navbarOpen: false, setNavbarOpen: () => {} });

export function NavbarOpenProvider({ children }: { children: ReactNode }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <NavbarOpenContext.Provider value={{ navbarOpen, setNavbarOpen }}>
      {children}
    </NavbarOpenContext.Provider>
  );
}
