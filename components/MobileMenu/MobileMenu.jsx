import NavLink from '../NavLink'
import { LayoutDashboard, MonitorSmartphone, Users, ClipboardList, HelpCircle, LogOut, X } from 'lucide-react'
import "./MobileMenu.scss";
import Logo from '../Logo';


const MobileMenu = ({ className, closeMenu }) => {

    return (
        <div className={`mobile-menu ${className}`}>
            <div className="cont">
                <div className="top-wrapper">
                    <Logo />

                    <X size={32} onClick={closeMenu} className='cursor-pointer' />
                </div>

                <div className="links">
                    <div className="top-links">

                        <NavLink href='/' onClick={closeMenu}>
                            <LayoutDashboard size={32} />
                            <span className="text">Dashboard</span>
                        </NavLink>

                        <NavLink href='/inventory' onClick={closeMenu}>
                            <MonitorSmartphone size={32} />
                            <span className="text">Inventory</span>
                        </NavLink>

                        <NavLink href='/assignments' onClick={closeMenu}>
                            <Users size={32} />
                            <span className="text">Assignments</span>
                        </NavLink>

                        <NavLink href='/logs' onClick={closeMenu}>
                            <ClipboardList size={32} />
                            <span className="text">Logs</span>
                        </NavLink>
                    </div>


                    <div className="bottom-links">
                        <NavLink href='/help' onClick={closeMenu}>
                            <HelpCircle size={32} />
                            <span className="text">Help</span>
                        </NavLink>

                        {/* <button className='navlink' id="logout" onClick={closeMenu}>
                            <LogOut size={32} />
                            <span className="text">Logout</span>
                        </button> */}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default MobileMenu