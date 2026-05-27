import { supabase } from "../supabaseClient";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const logout = async () => {
        let { error } = await supabase.auth.signOut()
        if (error) alert(error);
        else window.location.href = "/login";
    };

    const dashboardRedirect = () => {
        window.location.href = "/";
    };

    return (
        <nav className="border-b py-4 px-2 md:px-0 bg-indigo-500">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div><Button variant="link" className="text-white font-semibold hover:no-underline hover:bg-indigo-600 hover:cursor-pointer" onClick={dashboardRedirect}>Dashboard</Button></div>

                    <div><Button variant="link" className="text-white font-semibold hover:no-underline hover:bg-indigo-600 hover:cursor-pointer" onClick={logout}>Logout</Button></div>
                </div>
            </div>
        </nav>
    );
};