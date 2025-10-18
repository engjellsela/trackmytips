import { useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "./navbar";
import { useAuth } from "../context/AuthContext";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
  } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewJob() {
    const { userId } = useAuth();
    const [name, setName] = useState('');
    const [hourlyRate, setHourlyRate] = useState(0);

    const insertJob = async () => {
        const { data, error } = await supabase
        .from('job')
        .insert({ name: name, hourlyRate: hourlyRate, userFK: userId })
        if (error) console.log(error)
        else window.location.href="/";
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-8 my-4 border">
                <FieldSet>
                    <FieldLegend>New Job</FieldLegend>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Job name</FieldLabel>
                            <Input onChange={(e) => setName(e.target.value)}  autoComplete="off" placeholder="Name" />
                       </Field>
                        <Field>
                            <FieldLabel htmlFor="username">Hourly rate</FieldLabel>
                            <Input type="number" onChange={(e) => setHourlyRate(e.target.value)}  autoComplete="off" placeholder="Name" />
                        </Field>
                        <Field orientation="horizontal">
                            <Button type="submit" onClick={insertJob}>Submit</Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </div>
        </div>
    )
}