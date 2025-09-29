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
        <div>
            <h1>Sign up</h1>
        
            <div>
                <label>Email: </label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <br />

            <div>
                <label>Password: </label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <br />

            <button onClick={SignUp}>Sign up</button>
        </div>
    )
}