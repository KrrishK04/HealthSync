
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, MessageSquare } from "lucide-react";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    appointmentTime: string;
    status: "waiting" | "in-progress" | "completed" | "no-show";
    waitTime?: number;
    department: string;
    image: string;
  };
  onStatusChange?: (id: string, status: string) => void;
}

const PatientCard = ({ patient, onStatusChange }: PatientCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-amber-400 hover:bg-amber-500";
      case "in-progress":
        return "bg-hospital-400 hover:bg-hospital-500";
      case "completed":
        return "bg-green-400 hover:bg-green-500";
      case "no-show":
        return "bg-gray-400 hover:bg-gray-500";
      default:
        return "bg-gray-400 hover:bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting":
        return "Waiting";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "no-show":
        return "No Show";
      default:
        return "Unknown";
    }
  };

  const handleStatusClick = () => {
    if (onStatusChange) {
      const newStatus = 
        patient.status === "waiting" ? "in-progress" : 
        patient.status === "in-progress" ? "completed" : 
        patient.status === "completed" ? "waiting" : "waiting";
      
      onStatusChange(patient.id, newStatus);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-hover"
    >
      <Card className="overflow-hidden border-0 shadow-card bg-white">
        <CardContent className="p-0">
          <div className="flex items-center">
            <div className="h-full w-2 self-stretch mr-4" style={{ backgroundColor: patient.status === "waiting" ? "#FCD34D" : patient.status === "in-progress" ? "#38BDF8" : "#4ADE80" }}></div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                    <img 
                      src={patient.image || "https://via.placeholder.com/100"} 
                      alt={patient.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{patient.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <span>{patient.age} years</span>
                      <span className="text-hospital-500 font-medium">{patient.department}</span>
                    </div>
                  </div>
                </div>
                
                <Badge 
                  className={`${getStatusColor(patient.status)} text-white cursor-pointer`}
                  onClick={handleStatusClick}
                >
                  {getStatusText(patient.status)}
                </Badge>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-hospital-500" />
                  <span>{patient.appointmentTime}</span>
                </div>
                
                {patient.waitTime && patient.status === "waiting" && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                    <span>Waiting: {patient.waitTime} mins</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                  Message
                </Button>
                <Button variant="default" size="sm" className="h-8 px-3 bg-hospital-500 hover:bg-hospital-600">
                  <span>Details</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PatientCard;
