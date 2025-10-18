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
    }

    return (
        <div className="container mx-auto p-8 my-4 border max-w-lg">
            <FieldSet>
                <FieldLegend>Login</FieldLegend>
                <FieldGroup>
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input type="email" onChange={(e) => setEmail(e.target.value)}  autoComplete="off" placeholder="Email" />
                   </Field>
                    <Field>
                      <FieldLabel>Password</FieldLabel>
                        <Input type="password" onChange={(e) => setPassword(e.target.value)}  autoComplete="off" placeholder="Password" />
                    </Field>
                    <Field orientation="horizontal">
                        <Button type="submit" onClick={Login}>Login</Button>
                    </Field>
                    <Field>
                        <FieldLabel>No account?<Link to={"/signup"}><Button variant="link">Create an account</Button></Link></FieldLabel>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}