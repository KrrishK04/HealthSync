
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, BarChart3, ChevronRight, Clock, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Department {
  id: string;
  name: string;
  currentCapacity: number;
  maxCapacity: number;
  averageWaitTime: number;
  trend: "increasing" | "decreasing" | "stable";
}

interface PatientFlow {
  hour: string;
  patients: number;
}

const FlowOptimizer = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [flowData, setFlowData] = useState<PatientFlow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("today");
  
  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    
    setTimeout(() => {
      const mockDepartments: Department[] = [
        {
          id: "general-medicine",
          name: "General Medicine",
          currentCapacity: 8,
          maxCapacity: 12,
          averageWaitTime: 22,
          trend: "increasing",
        },
        {
          id: "cardiology",
          name: "Cardiology",
          currentCapacity: 5,
          maxCapacity: 8,
          averageWaitTime: 15,
          trend: "stable",
        },
        {
          id: "pediatrics",
          name: "Pediatrics",
          currentCapacity: 4,
          maxCapacity: 10,
          averageWaitTime: 10,
          trend: "decreasing",
        },
        {
          id: "orthopedics",
          name: "Orthopedics",
          currentCapacity: 7,
          maxCapacity: 10,
          averageWaitTime: 30,
          trend: "increasing",
        },
      ];
      
      // Generate mock flow data based on timeframe
      const generateFlowData = () => {
        if (timeframe === "today") {
          return [
            { hour: "8 AM", patients: 12 },
            { hour: "9 AM", patients: 18 },
            { hour: "10 AM", patients: 25 },
            { hour: "11 AM", patients: 30 },
            { hour: "12 PM", patients: 22 },
            { hour: "1 PM", patients: 16 },
            { hour: "2 PM", patients: 21 },
            { hour: "3 PM", patients: 24 },
            { hour: "4 PM", patients: 20 },
            { hour: "5 PM", patients: 15 },
          ];
        } else if (timeframe === "week") {
          return [
            { hour: "Mon", patients: 82 },
            { hour: "Tue", patients: 75 },
            { hour: "Wed", patients: 98 },
            { hour: "Thu", patients: 110 },
            { hour: "Fri", patients: 115 },
            { hour: "Sat", patients: 52 },
            { hour: "Sun", patients: 40 },
          ];
        } else {
          return [
            { hour: "Week 1", patients: 450 },
            { hour: "Week 2", patients: 480 },
            { hour: "Week 3", patients: 520 },
            { hour: "Week 4", patients: 490 },
          ];
        }
      };
      
      setDepartments(mockDepartments);
      setFlowData(generateFlowData());
      setIsLoading(false);
    }, 1000);
  }, [timeframe]);
  
  // Get trend icon based on trend direction
  const getTrendIcon = (trend: string) => {
    if (trend === "increasing") {
      return <div className="text-red-500">↑</div>;
    } else if (trend === "decreasing") {
      return <div className="text-green-500">↓</div>;
    } else {
      return <div className="text-amber-500">→</div>;
    }
  };
  
  // Calculate capacity percentage
  const getCapacityPercentage = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    return Math.round(percentage);
  };
  
  // Get capacity color based on percentage
  const getCapacityColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-amber-500";
    return "bg-red-500";
  };
  
  // Toggle department selection
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };
  
  // Handle timeframe change
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
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
            <CardTitle className="text-xl font-medium">Patient Flow Optimizer</CardTitle>
            <Badge variant="outline" className="px-3 py-1">
              <ArrowRightLeft className="h-3.5 w-3.5 mr-1" />
              <span>Flow Management</span>
            </Badge>
          </div>
          <CardDescription>Analyze and optimize patient flow across departments</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
              <SelectTrigger className="w-full sm:w-60">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Tabs value={timeframe} onValueChange={handleTimeframeChange} className="w-full sm:w-auto">
              <TabsList className="grid w-full sm:w-auto grid-cols-3">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Department status cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => {
              const capacityPercentage = getCapacityPercentage(dept.currentCapacity, dept.maxCapacity);
              return (
                <Card key={dept.id} className={`border overflow-hidden ${selectedDepartment === "all" || selectedDepartment === dept.id ? 'block' : 'hidden md:block opacity-50'}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">{dept.name}</p>
                      {getTrendIcon(dept.trend)}
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Capacity</span>
                        <span>{dept.currentCapacity}/{dept.maxCapacity}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getCapacityColor(capacityPercentage)}`} 
                          style={{ width: `${capacityPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center">
                      <Clock className="h-4 w-4 text-hospital-500 mr-1.5" />
                      <span className="text-sm">{dept.averageWaitTime} min wait</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Patient flow chart */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Patient Flow Analysis</h3>
              <Button variant="ghost" size="sm" className="h-8 text-hospital-500 hover:text-hospital-600 hover:bg-hospital-50">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>Detailed Report</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={timeframe}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-64 w-full pt-2"
              >
                {isLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="loading-shimmer h-40 w-full rounded-lg bg-gray-100"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={flowData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="patientFlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0C98E9" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0C98E9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="hour" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#888' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#888' }}
                      />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                          border: 'none',
                          padding: '8px 12px',
                        }}
                        formatter={(value: number) => [`${value} patients`, 'Volume']}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="patients" 
                        stroke="#0C98E9" 
                        fillOpacity={1}
                        fill="url(#patientFlow)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-hospital-500 mr-2" />
                <span className="text-sm font-medium">
                  {isLoading ? "Calculating..." : 
                    `${flowData.reduce((sum, item) => sum + item.patients, 0)} total patients`}
                </span>
              </div>
              <Badge variant="outline">
                {timeframe === "today" ? "Hourly Data" : 
                  timeframe === "week" ? "Daily Data" : "Weekly Data"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlowOptimizer;
