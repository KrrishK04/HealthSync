
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarClock, Clock, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
];

const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Neurology" },
  { id: 3, name: "Dr. Emily Rodriguez", specialty: "Pediatrics" },
  { id: 4, name: "Dr. James Wilson", specialty: "Orthopedics" }
];

const AppointmentScheduler = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [doctor, setDoctor] = useState<string | undefined>(undefined);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentScheduled, setAppointmentScheduled] = useState(false);

  const handleScheduleAppointment = async () => {
    if (!date || !timeSlot || !doctor || !reason.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API request to schedule appointment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Appointment scheduled successfully!");
      setAppointmentScheduled(true);
      
      // Reset form
      setDate(undefined);
      setTimeSlot(undefined);
      setDoctor(undefined);
      setReason("");
    } catch (error) {
      toast.error("Failed to schedule appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    // Disable weekends and past dates
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return day === 0 || day === 6 || date < today;
  };

  // Updated DayContent to avoid TypeScript error
  const dayContent = (props: any) => {
    // Here we use the props directly instead of accessing a 'day' property
    const date = props.date;
    // Rest of your custom rendering logic
    return <div>{date.getDate()}</div>;
  };

  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="bg-hospital-50 border-b px-6">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-hospital-600" />
          <CardTitle className="text-lg font-medium">Schedule Appointment</CardTitle>
        </div>
        <CardDescription>Book your next appointment with a specialist</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pt-6 pb-2">
        {appointmentScheduled ? (
          <Alert className="bg-green-50 border-green-200 mb-4">
            <AlertCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-700">Appointment Confirmed</AlertTitle>
            <AlertDescription className="text-green-600">
              Your appointment has been scheduled successfully. You will receive a confirmation email shortly.
            </AlertDescription>
          </Alert>
        ) : null}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="appointment-date" className="mb-2 block">Select Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={isDateDisabled}
              className="border rounded-md p-3 bg-white"
              // Use the dayContent property correctly
              components={{
                DayContent: dayContent
              }}
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="doctor" className="mb-2 block">Select Doctor</Label>
              <Select value={doctor} onValueChange={setDoctor}>
                <SelectTrigger id="doctor" className="w-full h-11">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doc) => (
                    <SelectItem key={doc.id} value={doc.name}>
                      {doc.name} - {doc.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="time-slot" className="mb-2 block">Select Time Slot</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger id="time-slot" className="w-full h-11">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{time}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="reason" className="mb-2 block">Reason for Visit</Label>
              <Textarea 
                id="reason" 
                placeholder="Briefly describe your symptoms or reason for appointment"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="resize-none"
                rows={4}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 flex justify-end">
        <Button 
          onClick={handleScheduleAppointment} 
          disabled={isSubmitting || !date || !timeSlot || !doctor || !reason.trim()}
          className="bg-hospital-500 hover:bg-hospital-600"
        >
          {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentScheduler;
