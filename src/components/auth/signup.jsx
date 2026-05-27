import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
  } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { da } from "date-fns/locale/da";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) alert(error)
        else {            
            const { error } = await supabase
            .from('userAccounts')
            .insert({ userID: data.user.id, email: data.user.email })
            if (error) console.log(error)
        }
    };

    return (
        <div className="container mx-auto bg-white border max-w-lg p-8 mt-10">
            <FieldSet>
                <FieldLegend>Create an account</FieldLegend>
                    <FieldGroup>
                        <Field>
                          <FieldLabel>Email</FieldLabel>
                          <Input type="email" className='focus-visible:ring-indigo-200 focus-visible:border-indigo-400' onChange={(e) => setEmail(e.target.value)}  autoComplete="off" placeholder="Email" />
                       </Field>
                        <Field>
                          <FieldLabel>Password</FieldLabel>
                          <Input type="password" className='focus-visible:ring-indigo-200 focus-visible:border-indigo-400' onChange={(e) => setPassword(e.target.value)}  autoComplete="off" placeholder="Password" />
                        </Field>
                        <Field>
                            <Button type="submit" className='bg-indigo-500 hover:bg-indigo-600' onClick={SignUp}>Sign up</Button>
                        </Field>
                        <p className="text-sm hover:underline hover:underline-offset-2"><Link to={"/login"}>Already have an account? Login</Link></p>
                    </FieldGroup>
            </FieldSet>
        </div>
    )
};