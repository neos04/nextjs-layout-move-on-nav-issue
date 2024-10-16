import getAuthUser from "@/lib/supabase/auth/getAuthUser";
import { redirect } from "@/node_modules/next/navigation";

export default async function Layout({ children }) {
    const { isLoggedIn } = await getAuthUser();

    if (isLoggedIn) {
        redirect('/');
    }

    return (
        <main className="p-4 md:p-5 lg:p-8 h-dvh">
            {children}
        </main>
    )
}
