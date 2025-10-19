import { useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function NewShift({ jobId, jobHourlyRate }) {
  const [hoursWorked, setHoursWorked] = useState(0);
  const [tips, setTips] = useState(0);
  const [date, setDate] = useState('');

  const insertShift = async () => {
    const { data, error } = await supabase
    .from('shift')
    .insert(
      { hoursWorked: hoursWorked, tips: tips, total: parseInt(tips) + (parseInt(hoursWorked) * jobHourlyRate), date: date, jobFK: jobId },
    )
    if (error) console.log(error)
    else window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger><Button>+ New shift</Button></DialogTrigger>
      <DialogContent>
          <DialogHeader>
              <DialogTitle>Create new shift</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Tips</FieldLabel>
                <Input type="number" onChange={(e) => setTips(e.target.value)}  autoComplete="off" placeholder="Tips" />
              </Field>
              <Field>
                <FieldLabel>Hours worked</FieldLabel>
                <Input type="number" onChange={(e) => setHoursWorked(e.target.value)}  autoComplete="off" placeholder="Hours worked" />
              </Field>
              <Field>
                <FieldLabel>Date</FieldLabel>
                <Input type="text" onChange={(e) => setDate(e.target.value)}  autoComplete="off" placeholder="year-month-date" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={insertShift}>Submit</Button>
            </DialogFooter>
          </FieldSet>
      </DialogContent>
    </Dialog>
    );
};