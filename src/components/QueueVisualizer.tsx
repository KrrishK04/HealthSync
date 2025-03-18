
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";

interface QueueStats {
  currentWaitTime: number;
  patientsInQueue: number;
  estimatedTimeByDepartment: {
    [key: string]: number;
  };
  queueCapacity: number;
}

const QueueVisualizer = () => {
  const [stats, setStats] = useState<QueueStats>({
    currentWaitTime: 0,
    patientsInQueue: 0,
    estimatedTimeByDepartment: {
      "General Medicine": 0,
      "Cardiology": 0,
      "Pediatrics": 0,
      "Orthopedics": 0
    },
    queueCapacity: 100
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        currentWaitTime: 15,
        patientsInQueue: 12,
        estimatedTimeByDepartment: {
          "General Medicine": 25,
          "Cardiology": 18,
          "Pediatrics": 8,
          "Orthopedics": 32
        },
        queueCapacity: 30
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Format minutes to human readable format
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} mins`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Calculate queue occupancy percentage
  const queuePercentage = Math.min(100, Math.round((stats.patientsInQueue / stats.queueCapacity) * 100));
  
  // Determine status color based on percentage
  const getStatusColor = (percentage: number) => {
    if (percentage < 30) return "bg-green-500";
    if (percentage < 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-card border-0 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-medium">Current Queue Status</CardTitle>
            <Badge variant="outline" className="px-3 py-1">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Live</span>
            </Badge>
          </div>
          <CardDescription>Real-time overview of wait times and queue capacity</CardDescription>
        </CardHeader>
        <CardContent className="pb-6 space-y-6">
          {/* Queue Overview */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-muted-foreground">Queue Capacity</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{stats.patientsInQueue} / {stats.queueCapacity}</span>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(queuePercentage)}`}></div>
              </div>
            </div>
            <Progress value={queuePercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span>Empty</span>
              <span>Full</span>
            </div>
          </div>
          
          {/* Current Wait Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Average Wait Time</p>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-hospital-500" />
                <span className="text-2xl font-semibold">{formatTime(stats.currentWaitTime)}</span>
              </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Patients Waiting</p>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-hospital-500" />
                <span className="text-2xl font-semibold">{stats.patientsInQueue}</span>
              </div>
            </div>
          </div>
          
          {/* Department Breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Wait Times by Department</h3>
            <div className="space-y-3">
              {Object.entries(stats.estimatedTimeByDepartment).map(([dept, time]) => {
                const percentage = (time / 60) * 100; // Scale to percentage (assuming 60 min max)
                return (
                  <div key={dept} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{dept}</span>
                      <span className="text-sm font-medium">{formatTime(time)}</span>
                    </div>
                    <Progress value={Math.min(100, percentage)} className="h-1.5" />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QueueVisualizer;
