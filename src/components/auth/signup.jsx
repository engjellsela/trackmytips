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
            else window.location.replace('/');
            
        }
    }

    return (
        <div className="container mx-auto p-8 my-4 border">
            <FieldSet>
                <FieldLegend>Sign up</FieldLegend>
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
                            <Button type="submit" onClick={SignUp}>Login</Button>
                        </Field>
                        <Field>
                            <FieldLabel>Already have an account?<Link to={"/login"}><Button variant="link">Login</Button></Link></FieldLabel>
                        </Field>
                    </FieldGroup>
            </FieldSet>
        </div>
    )
}