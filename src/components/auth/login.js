import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) console.log(error)
        else console.log(data)
    }

    return (
        <div className="container p-4 my-4 border">
            <div class="border-bottom">
                <p class="h4">Login</p>
            </div>

            <div class="my-3">
                <span class="h6">Email</span>
                <input type="email" onChange={(e) => setEmail(e.target.value)} class="form-control" placeholder="Email"  />
            </div>

            <div class="my-3">
                <span class="h6">Password</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" placeholder="Password" />
            </div>
            
            <button type="button" onClick={Login} className="btn btn-success">Login</button>
        </div>
    )
}