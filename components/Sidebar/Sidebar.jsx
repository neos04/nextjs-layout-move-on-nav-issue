"use client";

import NavLink from "../NavLink";
import {
  LayoutDashboard,
  MonitorSmartphone,
  Users,
  ClipboardList,
  HelpCircle,
  LogOut,
  ChevronsRight,
} from "lucide-react";
import "./Sidebar.scss";
import { useState, useEffect } from "react";
import Logo from "../Logo";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Get the stored value from local storage
    const storedIsExpanded = localStorage.getItem("sidebarIsExpanded");

    // Check if the stored value is different from the current state
    if (storedIsExpanded && storedIsExpanded !== JSON.stringify(isExpanded)) {
      // console.log('Stored value:', storedIsExpanded);
      // Set the initial state based on the stored value
      setIsExpanded(storedIsExpanded === "false" ? false : true);
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever the state changes
    localStorage.setItem("sidebarIsExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`sidebar ${isExpanded ? "is-expanded" : ""}`}>
      <div className="cont inner">
        <Logo noText={!isExpanded} />
        {/* <h3 className=" text-[28px] font-bold leading-[120%]">LOGO</h3> */}

        <div className="links">
          <div className="top-links">
            {/* expansion toggle */}
            <div className="menu-toggle-wrap">
              <button className="menu-toggle" onClick={toggleSidebar}>
                <ChevronsRight size={28} className="icon" />
              </button>
            </div>

            <NavLink href="/">
              <LayoutDashboard size={32} />
              <span className="text">Dashboard</span>
            </NavLink>

            <NavLink href="/inventory">
              <MonitorSmartphone size={32} />
              <span className="text">Inventory</span>
            </NavLink>

            {/* <NavLink href="/assignments">
              <Users size={32} />
              <span className="text">Assignments</span>
            </NavLink>

            <NavLink href="/logs">
              <ClipboardList size={32} />
              <span className="text">Logs</span>
            </NavLink> */}
          </div>

          <div className="bottom-links">
            <NavLink href="/help">
              <HelpCircle size={32} />
              <span className="text">Help</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
