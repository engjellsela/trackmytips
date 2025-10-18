import { supabase } from "../supabaseClient"
import { Button } from "@/components/ui/button"

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
        <nav className="container mx-auto py-4">

            <div className="flex justify-between">
                <div><Button size="sm" variant="outline" onClick={dashboardRedirect}>Dashboard</Button></div>

                <div><Button size="sm" variant="outline" onClick={logout}>Logout</Button></div>
            </div>
        </nav>
    )   
}