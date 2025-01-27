import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Settings, HelpCircle, LogOut, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard?tab=overview" },
  { icon: Users, label: "Users", href: "/dashboard?tab=users" },
  { icon: Settings, label: "Settings", href: "/dashboard?tab=settings" },
  { icon: HelpCircle, label: "Help", href: "/dashboard?tab=help" },
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentTab = new URLSearchParams(location.search).get("tab");

  return (
      <TooltipProvider>
        <motion.div
            className={cn("flex flex-col h-screen bg-green-700 border-r shadow-sm text-white", isCollapsed ? "w-16" : "w-64")}
            animate={{ width: isCollapsed ? "64px" : "256px" }}
            transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-4 border-b">
            {!isCollapsed && (
                <span className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
               BMS
            </span>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="ml-auto">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <nav className="p-2">
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                    <li key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                              asChild
                              variant="ghost"
                              className={cn("w-full justify-start text-white", currentTab === item.href.split("=")[1] && "bg-gray-100 font-semibold text-black")}
                          >
                            <Link to={item.href} className="flex items-center">
                              <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
                              {!isCollapsed && <span>{item.label}</span>}
                              {!isCollapsed && currentTab === item.href.split("=")[1] && <ChevronRight className="ml-auto h-4 w-4" />}
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                      </Tooltip>
                    </li>
                ))}
              </ul>
            </nav>
          </ScrollArea>
          <div className="p-4 border-t">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="w-full justify-start text-white" onClick={() => console.log("Logout clicked")}>
                  <LogOut className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
                  {!isCollapsed && <span>Logout</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">Logout</TooltipContent>}
            </Tooltip>
          </div>
        </motion.div>
      </TooltipProvider>
  );
}