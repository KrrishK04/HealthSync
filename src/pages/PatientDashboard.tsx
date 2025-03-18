
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, CalendarClock, CheckCircle, ChevronRight, Clock, FileText, Heart } from "lucide-react";
import QueueVisualizer from "@/components/QueueVisualizer";

const PatientDashboard = () => {
  const { isAuthenticated, userType } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || userType !== "patient") {
      navigate("/login");
    }
  }, [isAuthenticated, userType, navigate]);

  if (!isAuthenticated || userType !== "patient") {
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
                <Badge variant="outline" className="mb-2">Patient Portal</Badge>
                <h1 className="text-3xl font-bold">Welcome, John</h1>
                <p className="text-muted-foreground mt-1">Here's your health information at a glance</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Medical Records
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="h-9 bg-hospital-500 hover:bg-hospital-600"
                >
                  <CalendarClock className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Upcoming Appointment */}
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
                      <Calendar className="h-5 w-5" />
                      <h3 className="font-medium">Upcoming Appointment</h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-2xl font-bold mb-1">Oct 24, 2023</p>
                      <p className="text-white/90">10:30 AM - 11:15 AM</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-white">DR</span>
                        </div>
                        <div>
                          <p className="font-medium">Dr. Robert Chen</p>
                          <p className="text-sm text-white/80">Cardiologist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:flex-1 md:flex md:justify-between md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-medium mb-2">Annual Heart Checkup</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Heart className="h-4 w-4 mr-1.5 text-hospital-500" />
                          <span>Cardiology Department</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1.5 text-hospital-500" />
                          <span>Floor 3, Room 305</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Badge variant="outline" className="bg-hospital-50 text-hospital-700 border-hospital-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Confirmed
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-9 justify-start"
                      >
                        Reschedule
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="h-9 justify-start bg-hospital-500 hover:bg-hospital-600"
                      >
                        Check-in Online
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Queue Status */}
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
                  <CardTitle className="text-xl">Recent Results</CardTitle>
                  <CardDescription>Your latest health metrics and test results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Blood Pressure</p>
                      <p className="font-medium">120/80 mmHg</p>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-xs text-right text-green-600">Normal</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Heart Rate</p>
                      <p className="font-medium">72 bpm</p>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-right text-green-600">Good</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Cholesterol (LDL)</p>
                      <p className="font-medium">110 mg/dL</p>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-xs text-right text-amber-600">Borderline</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Blood Glucose</p>
                      <p className="font-medium">95 mg/dL</p>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-right text-green-600">Normal</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 justify-between"
                  >
                    <span>View Complete History</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Prescription and Medications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Current Medications</h2>
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", remaining: 15 },
                { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at night", remaining: 22 },
                { name: "Metformin", dosage: "500mg", frequency: "Twice daily with meals", remaining: 8 },
              ].map((medication, i) => (
                <Card key={i} className="border-0 shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">{medication.name}</h3>
                        <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                      </div>
                      <Badge variant="outline" className="bg-hospital-50 text-hospital-700 border-hospital-200">
                        {medication.remaining} days left
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{medication.frequency}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Request Refill
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
