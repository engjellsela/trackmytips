import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) console.log(error)
        else window.location.replace('/');
    }

    return (
        <div className="container p-4 my-4 border">
            <div className="border-bottom">
                <p className="h4">Login</p>
            </div>

            <div className="my-3">
                <span className="h6">Email</span>
                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email"  />
            </div>

            <div className="my-3">
                <span className="h6">Password</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
            </div>
            
            <button type="button" onClick={Login} className="btn btn-success">Login</button>
        </div>
    )
}