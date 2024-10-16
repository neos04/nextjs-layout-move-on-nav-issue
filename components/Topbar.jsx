"use client"

import { Menu } from 'lucide-react';
import { useState } from 'react';


import Image from 'next/image';
import MobileMenu from './MobileMenu/MobileMenu';
import ProfileDropdown from './ProfileDropdown';


const Topbar = ({ userInfo }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };


    return (
        <div className='topbar | relative h-[72px] border-border border-b py-3 px-4 sm:px-5 lg:px-8'>
            <div className="cont | h-full flex items-center justify-between">

                <div className="left | flex items-center gap-6 w-full md:hidden">
                    <Menu size={32} className='shrink-0 cursor-pointer' onClick={openMenu} />

                    <Image
                        src="/assets/logo.svg"
                        alt="Logo"
                        width={48}
                        height={48}
                        priority={true}
                    // className=""
                    />
                </div>

                <div className="right | flex items-center justify-end w-full gap-8">
                    {/* Theme Mode Toggle */}

                    <ProfileDropdown userInfo={userInfo} />
                </div>
            </div>

            <MobileMenu className={isMenuOpen ? "open" : ""} closeMenu={closeMenu} />
        </div>
    )
}

export default Topbar