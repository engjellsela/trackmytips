import { supabase } from "../supabaseClient"

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
        <nav className="container pt-4">
            <div className="row p-0">
                <div className="col-6"><button type="button" onClick={dashboardRedirect} className="btn btn-secondary btn-sm">Dashboard</button></div>
                <div className="col-6">
                    <button type="button" onClick={logout} className="btn btn-danger btn-sm float-end">Logout</button>
                </div>
            </div>
        </nav>
    )   
}