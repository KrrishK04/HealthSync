
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Airplay, CalendarClock, HeartPulse, Hospital, Users, Zap } from "lucide-react";

const Index = () => {
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

  const features = [
    {
      icon: <HeartPulse className="w-6 h-6 text-hospital-500" />,
      title: "Patient Care",
      description: "Streamlined patient registration and health record management for better care delivery."
    },
    {
      icon: <CalendarClock className="w-6 h-6 text-hospital-500" />,
      title: "Smart Scheduling",
      description: "AI-powered appointment scheduling that reduces wait times and optimizes staff resources."
    },
    {
      icon: <Activity className="w-6 h-6 text-hospital-500" />,
      title: "Real-time Analytics",
      description: "Instant insights into patient flow, wait times, and operational efficiency metrics."
    },
    {
      icon: <Users className="w-6 h-6 text-hospital-500" />,
      title: "Staff Management",
      description: "Coordinate medical staff schedules and workloads to maximize productivity."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-hospital-50 flex items-center justify-center">
                <Hospital className="h-8 w-8 text-hospital-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              HealthSync Hospital Management System
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Streamline patient flow, reduce wait times, and enhance healthcare delivery with our elegant, intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-hospital-500 hover:bg-hospital-600 btn-hover-effect text-base h-12 px-8"
              >
                <Link to="/login">
                  Get Started
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-20"
          >
            <div className="relative mx-auto w-full max-w-5xl h-[400px] rounded-2xl overflow-hidden shadow-medium">
              <div className="absolute inset-0 bg-gradient-to-b from-hospital-700/10 to-hospital-950/80 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80" 
                alt="Hospital Management" 
                className="w-full h-full object-cover"
              />
              <div className="absolute left-8 bottom-8 right-8 z-20">
                <h2 className="text-white text-2xl md:text-3xl font-medium mb-2">Optimize Healthcare Delivery</h2>
                <p className="text-white/80">Seamlessly connect patients, doctors, and staff with a powerful yet intuitive platform.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Streamlined Healthcare Management</h2>
            <p className="text-muted-foreground text-lg">
              Our platform offers powerful tools for patient flow optimization, queue management, and seamless healthcare delivery.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Card className="border-0 shadow-card overflow-hidden h-full">
                  <CardHeader className="pb-3">
                    <div className="mb-4 h-12 w-12 rounded-lg bg-hospital-50 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Login Paths Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-muted-foreground text-lg">
              Access the platform designed specifically for your role in the healthcare ecosystem.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-card overflow-hidden h-full card-hover">
                <CardHeader>
                  <div className="mb-4 h-12 w-12 rounded-lg bg-hospital-50 flex items-center justify-center">
                    <Airplay className="w-6 h-6 text-hospital-500" />
                  </div>
                  <CardTitle>For Patients</CardTitle>
                  <CardDescription className="text-base">
                    Access your medical records, schedule appointments, and check wait times.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-6">
                  <Button
                    asChild
                    className="bg-hospital-500 hover:bg-hospital-600 btn-hover-effect"
                  >
                    <Link to="/login">Patient Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-card overflow-hidden h-full card-hover">
                <CardHeader>
                  <div className="mb-4 h-12 w-12 rounded-lg bg-hospital-50 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-hospital-500" />
                  </div>
                  <CardTitle>For Doctors</CardTitle>
                  <CardDescription className="text-base">
                    Manage your schedule, access patient information, and optimize your workflow.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-6">
                  <Button
                    asChild
                    className="bg-hospital-500 hover:bg-hospital-600 btn-hover-effect"
                  >
                    <Link to="/login">Doctor Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-10 w-10 rounded-full bg-hospital-50 flex items-center justify-center">
              <Hospital className="h-5 w-5 text-hospital-500" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">HealthSync Hospital Management</h3>
          <p className="text-muted-foreground mb-6">Streamlined healthcare for a better experience</p>
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="sm">Privacy</Button>
            <Button variant="ghost" size="sm">Terms</Button>
            <Button variant="ghost" size="sm">Contact</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-8">© 2025 HealthSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
