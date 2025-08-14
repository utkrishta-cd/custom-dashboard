import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { FilterBuilder } from "@/components/FilterBuilder";
import { QueryResults } from "@/components/QueryResults";
import { EventInfoPanel } from "@/components/EventInfoPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, TrendingUp, Filter } from "lucide-react";

const savedSegments = [
  {
    id: 1,
    name: "High-Value Customers",
    description: "Users with purchases > ₹500 in last 30 days",
    userCount: 1247,
    growth: "+12%",
    lastUpdated: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    name: "Mobile Power Users",
    description: "Users with >10 sessions on mobile devices",
    userCount: 3521,
    growth: "+8%",
    lastUpdated: "1 day ago",
    status: "active",
  },
  {
    id: 3,
    name: "Churned Users",
    description: "Users with no activity in last 14 days",
    userCount: 892,
    growth: "-5%",
    lastUpdated: "3 hours ago",
    status: "monitoring",
  },
  {
    id: 4,
    name: "New Signups",
    description: "Users who signed up in the last 7 days",
    userCount: 456,
    growth: "+23%",
    lastUpdated: "30 minutes ago",
    status: "active",
  },
];

const Segments = () => {
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [activeView, setActiveView] = useState<"saved" | "builder">("saved");

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="User Segments"
        description="Create and manage user segments based on behavior and properties"
        action={
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowEventInfo(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Event Info
            </Button>
            <Button 
              variant={activeView === "builder" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("builder")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Segment
            </Button>
          </div>
        }
      />

      {activeView === "saved" ? (
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Segments</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{savedSegments.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+2</span> new this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {savedSegments.reduce((acc, segment) => acc + segment.userCount, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+15.3%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Segments</CardTitle>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {savedSegments.filter(s => s.status === "active").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {savedSegments.filter(s => s.status === "monitoring").length} monitoring
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Saved Segments */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Segments</CardTitle>
              <CardDescription>Manage your existing user segments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedSegments.map((segment) => (
                  <div
                    key={segment.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-foreground">{segment.name}</h3>
                        <Badge 
                          variant={segment.status === "active" ? "default" : "secondary"}
                          className={segment.status === "active" ? "bg-analytics-teal text-white" : ""}
                        >
                          {segment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{segment.description}</p>
                      <p className="text-xs text-muted-foreground">Last updated: {segment.lastUpdated}</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-foreground">
                          {segment.userCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">users</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          segment.growth.startsWith('+') ? 'text-analytics-teal' : 'text-destructive'
                        }`}>
                          {segment.growth}
                        </div>
                        <div className="text-xs text-muted-foreground">growth</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Segment Builder */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Segment Builder</CardTitle>
                  <CardDescription>Create custom user segments with advanced filters</CardDescription>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setActiveView("saved")}
                >
                  Back to Segments
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <FilterBuilder />
            </CardContent>
          </Card>

          {/* Query Results */}
          <QueryResults />
        </div>
      )}

      {/* Event Info Panel */}
      <EventInfoPanel 
        isOpen={showEventInfo} 
        onClose={() => setShowEventInfo(false)} 
      />
    </div>
  );
};

export default Segments;