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
  
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) alert(error)
        else window.location.replace('/');
    };

    return (
        <div className="container mx-auto border max-w-lg bg-white p-8 mt-10">
            <FieldSet>
                <FieldLegend>Login</FieldLegend>
                <FieldGroup>
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input type="email" className="focus-visible:ring-indigo-200 focus-visible:border-indigo-400" onChange={(e) => setEmail(e.target.value)}  autoComplete="off" placeholder="Email" />
                   </Field>
                    <Field>
                      <FieldLabel>Password</FieldLabel>
                        <Input type="password" className="focus-visible:ring-indigo-200 focus-visible:border-indigo-400" onChange={(e) => setPassword(e.target.value)}  autoComplete="off" placeholder="Password" />
                    </Field>
                    <Field>
                        <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600" onClick={Login}>Login</Button>
                    </Field>
                    <p className="text-sm"><Link className="hover:underline hover:underline-offset-2" to={"/signup"}>No account? Create an account</Link></p>
                </FieldGroup>
            </FieldSet>
        </div>
    );
};