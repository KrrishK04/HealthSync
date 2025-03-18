
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Hospital } from "lucide-react";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="py-6 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <Hospital className="w-6 h-6 text-hospital-500 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-medium">HealthSync</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-medium">
              <div className="absolute inset-0 bg-gradient-to-b from-hospital-700/10 to-hospital-950/80 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Healthcare professionals" 
                className="w-full h-full object-cover"
              />
              <div className="absolute left-8 bottom-8 right-8 z-20">
                <h2 className="text-white text-2xl font-medium mb-2">Welcome to HealthSync</h2>
                <p className="text-white/80">Sign in or create an account to access healthcare services</p>
              </div>
            </div>
            
            <div className="mt-8 space-y-4 px-4">
              <div className="flex items-start gap-4">
                <div className="bg-hospital-50 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-hospital-500 font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Secure Access</h3>
                  <p className="text-muted-foreground text-sm">Your data is encrypted and securely stored according to healthcare privacy standards.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-hospital-50 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-hospital-500 font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Personalized Dashboard</h3>
                  <p className="text-muted-foreground text-sm">Access information tailored to your role as either a patient or healthcare provider.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-hospital-50 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-hospital-500 font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Optimized Workflow</h3>
                  <p className="text-muted-foreground text-sm">Enjoy a streamlined experience designed to save time and reduce administrative overhead.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LoginForm />
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Doctors: <Link to="/" className="text-hospital-600 hover:text-hospital-700 font-medium">Contact administration</Link> for registration</p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t">
        <p>© 2025 HealthSync Hospital Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
