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
    }

    const test = async () => {
        const { data, error } = await supabase
        .from('job')
        .insert({ id: '262fe25b-2e08-438e-b247-79986ca584b1', name: 'test', hourlyRate: 10, userFK: '262fe25b-2e08-438e-b247-79986ca584b1' })
        if (error) console.log(error)
        else console.log(data)
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
                            <Button type="submit" onClick={test}>Test acc</Button>
                        </Field>
                        <Field>
                            <FieldLabel>Already have an account?<Link to={"/login"}><Button variant="link">Login</Button></Link></FieldLabel>
                        </Field>
                    </FieldGroup>
            </FieldSet>
        </div>
    )
}