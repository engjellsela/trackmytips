import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
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
        <div>
            <h1>Login</h1>

            <div>
                <label>Email</label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <br />

            <div>
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <br />
            
            <button onClick={Login}>Login</button>
        </div>
    )
}