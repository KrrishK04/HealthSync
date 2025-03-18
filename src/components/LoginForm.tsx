
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/App";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Hospital, User, UserCog } from "lucide-react";

const LoginForm = () => {
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPassword, setPatientPassword] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePatientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty input
      if (patientEmail && patientPassword) {
        login("patient");
        toast.success("Successfully logged in as Patient");
        navigate("/patient-dashboard");
      } else {
        toast.error("Please enter valid credentials");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate inputs
      if (!patientName) {
        toast.error("Please enter your name");
        setIsLoading(false);
        return;
      }
      
      if (!patientEmail) {
        toast.error("Please enter a valid email");
        setIsLoading(false);
        return;
      }
      
      if (patientPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }
      
      if (patientPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        setIsLoading(false);
        return;
      }
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid input
      login("patient");
      toast.success("Account created successfully!");
      navigate("/patient-dashboard");
    } catch (error) {
      toast.error("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty input
      if (doctorEmail && doctorPassword) {
        login("doctor");
        toast.success("Successfully logged in as Doctor");
        navigate("/doctor-dashboard");
      } else {
        toast.error("Please enter valid credentials");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={fadeInVariants}
    >
      <Card className="w-full max-w-md mx-auto shadow-card border-0 overflow-hidden">
        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patient" className="data-[state=active]:bg-hospital-50 data-[state=active]:text-hospital-700 h-14">
              <User className="h-4 w-4 mr-2" />
              Patient
            </TabsTrigger>
            <TabsTrigger value="doctor" className="data-[state=active]:bg-hospital-50 data-[state=active]:text-hospital-700 h-14">
              <UserCog className="h-4 w-4 mr-2" />
              Doctor
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="patient">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Hospital className="h-5 w-5 text-hospital-500" />
                {isLogin ? "Patient Login" : "Patient Signup"}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? "Access your appointments and medical records" 
                  : "Create a new patient account to manage your healthcare"
                }
              </CardDescription>
            </CardHeader>
            
            {isLogin ? (
              <form onSubmit={handlePatientLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email</Label>
                    <Input
                      id="patient-email"
                      type="email"
                      placeholder="patient@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="patient-password">Password</Label>
                      <a href="#" className="text-xs text-hospital-600 hover:text-hospital-700 transition-colors">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="patient-password"
                      type="password"
                      value={patientPassword}
                      onChange={(e) => setPatientPassword(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-hospital-500 hover:bg-hospital-600 btn-hover-effect" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login as Patient"}
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-hospital-600 hover:text-hospital-700 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </CardFooter>
              </form>
            ) : (
              <form onSubmit={handlePatientSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-name">Full Name</Label>
                    <Input
                      id="patient-name"
                      type="text"
                      placeholder="John Doe"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="patient@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Min. 6 characters"
                      value={patientPassword}
                      onChange={(e) => setPatientPassword(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-hospital-500 hover:bg-hospital-600 btn-hover-effect" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Patient Account"}
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-hospital-600 hover:text-hospital-700 font-medium"
                    >
                      Log in
                    </button>
                  </p>
                </CardFooter>
              </form>
            )}
          </TabsContent>
          
          <TabsContent value="doctor">
            <form onSubmit={handleDoctorLogin}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Hospital className="h-5 w-5 text-hospital-500" />
                  Doctor Login
                </CardTitle>
                <CardDescription>
                  Access your schedule and patient information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor-email">Email</Label>
                  <Input
                    id="doctor-email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={doctorEmail}
                    onChange={(e) => setDoctorEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="doctor-password">Password</Label>
                    <a href="#" className="text-xs text-hospital-600 hover:text-hospital-700 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="doctor-password"
                    type="password"
                    value={doctorPassword}
                    onChange={(e) => setDoctorPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-hospital-500 hover:bg-hospital-600 btn-hover-effect" 
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login as Doctor"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
