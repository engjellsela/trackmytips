import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const SignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) console.log(error)
        else {
            
            const { error } = await supabase
            .from('userAccounts')
            .insert({ userID: data.user.id, email: data.user.email })
            if (error) console.log(error)
            
        }
    }

    return (
        <div className="container p-4 my-4 border">
            <div className="border-bottom">
                <p className="h4">Sign Up</p>
            </div>

            <div className="my-3">
                <span className="h6">Email</span>
                <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
            </div>

            <div className="my-3">
                <span className="h6">Password</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)}  className="form-control" placeholder="Password" />
            </div>

            <button type="button" onClick={SignUp} className="btn btn-success">Sign up</button>
        </div>
    )
}