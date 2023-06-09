import { NavbarOpenContext } from "@/context/NavbarOpen";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { FC, useContext } from "react";

interface NavbarToggleProps {}

const NavbarToggle: FC<NavbarToggleProps> = ({}) => {
  const { navbarOpen, setNavbarOpen } = useContext(NavbarOpenContext);
  return (
    <div className="px-6 inline-block h-full">
      <div className="h-full flex">
        {navbarOpen ? (
        <PanelLeftClose onClick={() => setNavbarOpen(false)} className="my-auto cursor-pointer hover:text-blue-500 transition-colors duration-300" />
        ) : (
          <PanelLeftOpen onClick={() => setNavbarOpen(true)} className="my-auto cursor-pointer hover:text-blue-500 transition-colors duration-300" />
        )}
      </div>
    </div>
  );
};

export default NavbarToggle;
