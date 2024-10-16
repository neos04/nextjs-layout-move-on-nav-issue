import NavLink from "../NavLink";
import {
  LayoutDashboard,
  MonitorSmartphone,
  Users,
  ClipboardList,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import "./MobileMenu.scss";
import Logo from "../Logo";

const MobileMenu = ({ className, closeMenu }) => {
  return (
    <div className={`mobile-menu ${className}`}>
      <div className="cont">
        <div className="top-wrapper">
          <Logo />

          <X size={32} onClick={closeMenu} className="cursor-pointer" />
        </div>

        <div className="links">
          <div className="top-links">
            <NavLink href="/" onClick={closeMenu}>
              <LayoutDashboard size={32} />
              <span className="text">Dashboard</span>
            </NavLink>

            <NavLink href="/inventory" onClick={closeMenu}>
              <MonitorSmartphone size={32} />
              <span className="text">Inventory</span>
            </NavLink>
          </div>

          <div className="bottom-links">
            <NavLink href="/help" onClick={closeMenu}>
              <HelpCircle size={32} />
              <span className="text">Help</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
