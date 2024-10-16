import Sidebar from "@/components/Sidebar/Sidebar";
import Topbar from "@/components/Topbar";

export default async function Layout({ children }) {
  return (
    <div className="flex h-dvh ">
      {/* Sidebar | Left */}
      <Sidebar />
      {/* Main content | Right */}
      <div className="flex h-full w-full flex-1 flex-col">
        {/* Top Bar */}
        <Topbar />
        <main className={`flex-1 overflow-y-auto p-4 md:p-5 lg:p-8`}>
          {children}
        </main>
      </div>
    </div>
  );
}
