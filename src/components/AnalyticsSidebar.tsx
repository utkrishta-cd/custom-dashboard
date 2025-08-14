import {
  BarChart3,
  Users,
  TrendingUp,
  Settings,
  Bell,
  FileText,
  PieChart,
  Target,
  Chrome,
  Snail
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  { icon: BarChart3, label: "Dashboard", path: "/", active: false },
  { icon: Users, label: "Users", path: "/users", active: true },
  { icon: TrendingUp, label: "Analytics", path: "/analytics", active: false },
  { icon: Target, label: "Segments", path: "/segments", active: false },
  { icon: PieChart, label: "Reports", path: "/reports", active: false },
  { icon: FileText, label: "Events", path: "/events", active: false },
  { icon: Bell, label: "Alerts", path: "/alerts", active: false },
  { icon: Settings, label: "Settings", path: "/settings", active: false },
];

export function AnalyticsSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-16 bg-analytics-blue h-100 flex flex-col items-center py-4">
      <div className="mb-8">
        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
          <Snail className="w-5 h-5 text-analytics-blue" />
        </div>
      </div>

      <nav className="flex flex-col space-y-2">
        {navigationItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-analytics-blue-light text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <item.icon className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </div>
  );
}