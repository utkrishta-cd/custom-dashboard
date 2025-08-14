import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Plus, AlertTriangle, CheckCircle, Clock, Settings } from "lucide-react";

const alerts = [
  {
    id: 1,
    name: "High Bounce Rate Alert",
    description: "Triggered when bounce rate exceeds 60%",
    condition: "bounce_rate > 60%",
    status: "active",
    lastTriggered: "2 hours ago",
    frequency: "Real-time",
    severity: "high",
    enabled: true,
  },
  {
    id: 2,
    name: "Low Conversion Alert",
    description: "Triggered when conversion rate drops below 2%",
    condition: "conversion_rate < 2%",
    status: "triggered",
    lastTriggered: "Yesterday",
    frequency: "Daily",
    severity: "medium",
    enabled: true,
  },
  {
    id: 3,
    name: "Server Error Spike",
    description: "Triggered when 5xx errors exceed 10 per hour",
    condition: "error_5xx_hourly > 10",
    status: "resolved",
    lastTriggered: "3 days ago",
    frequency: "Hourly",
    severity: "critical",
    enabled: true,
  },
  {
    id: 4,
    name: "New User Drop",
    description: "Triggered when new user signups drop by 30%",
    condition: "new_users_daily < -30%",
    status: "active",
    lastTriggered: "Never",
    frequency: "Daily",
    severity: "medium",
    enabled: false,
  },
];

const recentNotifications = [
  {
    id: 1,
    alert: "High Bounce Rate Alert",
    message: "Bounce rate reached 62% on /landing page",
    timestamp: "2024-01-15 14:32:15",
    severity: "high",
    acknowledged: false,
  },
  {
    id: 2,
    alert: "Low Conversion Alert",
    message: "Conversion rate dropped to 1.8% over the last 24 hours",
    timestamp: "2024-01-14 09:15:22",
    severity: "medium",
    acknowledged: true,
  },
  {
    id: 3,
    alert: "Server Error Spike",
    message: "15 server errors detected in the last hour",
    timestamp: "2024-01-12 16:45:33",
    severity: "critical",
    acknowledged: true,
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical": return "bg-destructive text-destructive-foreground";
    case "high": return "bg-orange-500 text-white";
    case "medium": return "bg-yellow-500 text-white";
    case "low": return "bg-blue-500 text-white";
    default: return "bg-secondary text-secondary-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "triggered": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case "resolved": return <CheckCircle className="h-4 w-4 text-analytics-teal" />;
    case "active": return <Clock className="h-4 w-4 text-analytics-blue" />;
    default: return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
};

const Alerts = () => {
  const [alertsData, setAlertsData] = useState(alerts);

  const toggleAlert = (id: number) => {
    setAlertsData(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
      )
    );
  };

  const activeAlertsCount = alertsData.filter(alert => alert.enabled).length;
  const triggeredAlertsCount = alertsData.filter(alert => alert.status === "triggered").length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Alerts"
        description="Monitor and manage your analytics alerts"
        action={
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Alert Settings
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </div>
        }
      />

      {/* Alert Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertsData.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeAlertsCount} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Triggered</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{triggeredAlertsCount}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-analytics-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-analytics-teal">3</div>
            <p className="text-xs text-muted-foreground">
              Issues fixed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12m</div>
            <p className="text-xs text-muted-foreground">
              Average response
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Alert Rules</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Rules</CardTitle>
              <CardDescription>Manage your monitoring rules and conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Alert Name</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Last Triggered</TableHead>
                    <TableHead>Enabled</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertsData.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        {getStatusIcon(alert.status)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{alert.name}</div>
                          <div className="text-sm text-muted-foreground">{alert.description}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{alert.condition}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{alert.frequency}</TableCell>
                      <TableCell className="text-muted-foreground">{alert.lastTriggered}</TableCell>
                      <TableCell>
                        <Switch
                          checked={alert.enabled}
                          onCheckedChange={() => toggleAlert(alert.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Test</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Latest alert notifications and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border ${
                      notification.acknowledged ? 'bg-muted/50' : 'bg-background'
                    }`}
                  >
                    <div className="mt-1">
                      {notification.severity === "critical" && <AlertTriangle className="h-5 w-5 text-destructive" />}
                      {notification.severity === "high" && <AlertTriangle className="h-5 w-5 text-orange-500" />}
                      {notification.severity === "medium" && <Bell className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">{notification.alert}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(notification.severity)}>
                            {notification.severity}
                          </Badge>
                          {notification.acknowledged && (
                            <Badge variant="secondary">Acknowledged</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                    </div>
                    {!notification.acknowledged && (
                      <Button variant="outline" size="sm">
                        Acknowledge
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>Historical view of all alert activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Alert History</h3>
                <p className="text-muted-foreground mb-4">
                  View detailed timeline of all alert triggers and resolutions
                </p>
                <Button variant="outline">
                  View Full History
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Alerts;