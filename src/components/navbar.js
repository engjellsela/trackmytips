import { supabase } from "../supabaseClient"

export default function Navbar() {
    const logout = async () => {
        let { error } = await supabase.auth.signOut()
        if (error) alert(error);
        else window.location.href = "/login";
    };

    return (
        <nav className="container p-4">
            <button type="button" onClick={logout} className="btn btn-danger btn-sm float-end">Logout</button>
        </nav>
    )   
}