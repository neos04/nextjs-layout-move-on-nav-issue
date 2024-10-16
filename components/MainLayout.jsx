"use client"
import Sidebar from "@/components/Sidebar/Sidebar";
import Topbar from "@/components/Topbar";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }) => {
    const pathname = usePathname();

    const noNavPages = ["/login", "/request-account", "/payments"];

    return (
        <>
            {/* Layout */}
            <div className="flex h-screen ">
                {/* Sidebar | Left */}
                {!noNavPages.includes(pathname) && <Sidebar />}

                {/* Main content | Right */}
                <div className="flex-1 w-full h-full">
                    {/* Top Bar */}
                    {!noNavPages.includes(pathname) && <Topbar />}

                    <main className={`p-4 md:p-5 lg:p-8 overflow-y-auto ${!noNavPages.includes(pathname) ? 'h-[calc(100%-72px)]' : 'h-full'}`}>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default MainLayout