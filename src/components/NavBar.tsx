
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/App";
import { motion } from "framer-motion";
import { Hospital, LogOut, User } from "lucide-react";

interface NavBarProps {
  className?: string;
}

const NavBar = ({ className }: NavBarProps) => {
  const { isAuthenticated, userType, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed w-full top-0 z-50 glassmorphism border-b py-3 px-6",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Hospital className="w-7 h-7 text-hospital-500 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-medium">HealthSync</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Home
          </Link>
          {isAuthenticated ? (
            userType === "patient" ? (
              <Link 
                to="/patient-dashboard" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link 
                to="/doctor-dashboard" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            )
          ) : null}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-hospital-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-hospital-500" />
                </div>
                <span className="text-sm font-medium hidden md:inline">
                  {userType === "patient" ? "Patient" : "Doctor"}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="btn-hover-effect"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              asChild 
              className="btn-hover-effect bg-hospital-500 hover:bg-hospital-600"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default NavBar;
