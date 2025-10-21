import { useState } from "react";
import { ChevronDownIcon } from "lucide-react"
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function NewShift({ jobId, jobHourlyRate }) {
  const [hoursWorked, setHoursWorked] = useState(0);
  const [tips, setTips] = useState(0);
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const insertShift = async () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const { data, error } = await supabase
    .from('shift')
    .insert(
      { hoursWorked: hoursWorked, tips: tips, total: parseInt(tips) + (parseInt(hoursWorked) * jobHourlyRate), date: formattedDate, jobFK: jobId },
    )
    if (error) console.log(error)
    else window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild><Button>+ New shift</Button></DialogTrigger>
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
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal">
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
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

/*

              <Field>
                <FieldLabel>Date</FieldLabel>
                <Input type="text" onChange={(e) => setDate(e.target.value)}  autoComplete="off" placeholder="year-month-date" />
              </Field>

              */