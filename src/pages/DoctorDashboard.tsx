
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, ChevronRight, Clock, FileText, Stethoscope, Users } from "lucide-react";
import QueueVisualizer from "@/components/QueueVisualizer";
import FlowOptimizer from "@/components/FlowOptimizer";

const DoctorDashboard = () => {
  const { isAuthenticated, userType } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || userType !== "doctor") {
      navigate("/login");
    }
  }, [isAuthenticated, userType, navigate]);

  if (!isAuthenticated || userType !== "doctor") {
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <Badge variant="outline" className="mb-2">Doctor Portal</Badge>
                <h1 className="text-3xl font-bold">Welcome, Dr. Smith</h1>
                <p className="text-muted-foreground mt-1">Your patient queue and schedule for today</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Records
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="h-9 bg-hospital-500 hover:bg-hospital-600"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Patients
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Current Patient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="border-0 shadow-card overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-hospital-500 text-white p-6 md:w-1/3">
                    <div className="flex items-center gap-2 mb-4">
                      <Stethoscope className="h-5 w-5" />
                      <h3 className="font-medium">Current Patient</h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-2xl font-bold mb-1">Sarah Johnson</p>
                      <p className="text-white/90">Room 305</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-white">SJ</span>
                        </div>
                        <div>
                          <p className="font-medium">Patient #38291</p>
                          <p className="text-sm text-white/80">Annual Heart Checkup</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:flex-1 md:flex md:justify-between md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-medium mb-2">Appointment Details</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1.5 text-hospital-500" />
                          <span>Oct 24, 2023 - 10:30 AM</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1.5 text-hospital-500" />
                          <span>Duration: 45 minutes</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Checked In
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-9 justify-start"
                      >
                        View History
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="h-9 justify-start bg-hospital-500 hover:bg-hospital-600"
                      >
                        Complete Visit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Queue Visualization and Patient Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <QueueVisualizer />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl">Today's Schedule</CardTitle>
                  <CardDescription>Your appointments for October 24</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { time: "09:00 AM", patient: "Michael Brown", status: "Completed" },
                    { time: "10:30 AM", patient: "Sarah Johnson", status: "In Progress" },
                    { time: "12:00 PM", patient: "Emily Williams", status: "Scheduled" },
                    { time: "02:30 PM", patient: "David Lee", status: "Scheduled" },
                    { time: "04:00 PM", patient: "Jennifer Garcia", status: "Scheduled" },
                  ].map((appointment, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="font-medium">{appointment.time}</span>
                          <span className="text-sm text-muted-foreground">{appointment.patient}</span>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${
                          appointment.status === "Completed" 
                            ? "bg-gray-50 text-gray-500 border-gray-200" 
                            : appointment.status === "In Progress" 
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }`}
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 justify-between"
                  >
                    <span>View Full Schedule</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Patient Flow Optimizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FlowOptimizer />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
