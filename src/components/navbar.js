import { supabase } from "../supabaseClient"

export default function Navbar() {
    const logout = async () => {
        let { error } = await supabase.auth.signOut()
        if (error) alert(error);
    };

    return (
        <nav class="container p-4">
            <button type="button" onClick={logout} class="btn btn-danger btn-sm float-end">Logout</button>
        </nav>
    )   
}