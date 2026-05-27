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
        <nav className="border-b py-4 px-2 md:px-0">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div><Button variant="outline" onClick={dashboardRedirect}>Dashboard</Button></div>

                    <div><Button variant="outline" onClick={logout}>Logout</Button></div>
                </div>
            </div>
        </nav>
    );
};