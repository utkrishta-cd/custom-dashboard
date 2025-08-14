import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Download, Filter, Calendar, TrendingUp, Users, DollarSign } from "lucide-react";

const performanceData = [
  { metric: "Page Load Time", current: "2.3s", previous: "2.8s", change: "-18%", status: "improved" },
  { metric: "Bounce Rate", current: "34%", previous: "41%", change: "-17%", status: "improved" },
  { metric: "Session Duration", current: "4m 32s", previous: "3m 45s", change: "+21%", status: "improved" },
  { metric: "Pages per Session", current: "3.7", previous: "3.2", change: "+16%", status: "improved" },
];

const userActivityData = [
  { date: "Mon", activeUsers: 1240, newUsers: 180, returningUsers: 1060 },
  { date: "Tue", activeUsers: 1350, newUsers: 210, returningUsers: 1140 },
  { date: "Wed", activeUsers: 1180, newUsers: 165, returningUsers: 1015 },
  { date: "Thu", activeUsers: 1420, newUsers: 245, returningUsers: 1175 },
  { date: "Fri", activeUsers: 1680, newUsers: 320, returningUsers: 1360 },
  { date: "Sat", activeUsers: 980, newUsers: 140, returningUsers: 840 },
  { date: "Sun", activeUsers: 860, newUsers: 95, returningUsers: 765 },
];

const revenueData = [
  { month: "Jan", revenue: 12000, subscriptions: 450, churn: 23 },
  { month: "Feb", revenue: 15000, subscriptions: 520, churn: 18 },
  { month: "Mar", revenue: 18000, subscriptions: 680, churn: 15 },
  { month: "Apr", revenue: 22000, subscriptions: 780, churn: 12 },
  { month: "May", revenue: 25000, subscriptions: 890, churn: 14 },
  { month: "Jun", revenue: 28000, subscriptions: 950, churn: 11 },
];

const topPages = [
  { page: "/dashboard", views: 15420, uniqueViews: 8930, avgTime: "3m 45s", bounceRate: "28%" },
  { page: "/analytics", views: 12380, uniqueViews: 7240, avgTime: "5m 12s", bounceRate: "22%" },
  { page: "/reports", views: 9850, uniqueViews: 6120, avgTime: "4m 33s", bounceRate: "31%" },
  { page: "/segments", views: 8640, uniqueViews: 5490, avgTime: "6m 18s", bounceRate: "25%" },
  { page: "/settings", views: 4320, uniqueViews: 3180, avgTime: "2m 56s", bounceRate: "45%" },
];

const chartConfig = {
  activeUsers: { label: "Active Users", color: "hsl(var(--analytics-blue))" },
  newUsers: { label: "New Users", color: "hsl(var(--analytics-teal))" },
  returningUsers: { label: "Returning Users", color: "hsl(var(--analytics-blue-light))" },
  revenue: { label: "Revenue", color: "hsl(var(--analytics-blue))" },
  subscriptions: { label: "Subscriptions", color: "hsl(var(--analytics-teal))" },
};

const Reports = () => {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Reports"
        description="Comprehensive analytics and performance reports"
        action={
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹120,000</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+22.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,710</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+18.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.24%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+0.8%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Session Time</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4m 32s</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+15%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Top Pages Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages and their performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Unique Views</TableHead>
                    <TableHead>Avg Time</TableHead>
                    <TableHead>Bounce Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPages.map((page, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{page.page}</TableCell>
                      <TableCell>{page.views.toLocaleString()}</TableCell>
                      <TableCell>{page.uniqueViews.toLocaleString()}</TableCell>
                      <TableCell>{page.avgTime}</TableCell>
                      <TableCell>
                        <Badge variant={parseFloat(page.bounceRate) < 35 ? "default" : "secondary"}>
                          {page.bounceRate}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Trends</CardTitle>
              <CardDescription>Daily user engagement patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="newUsers" fill="hsl(var(--analytics-teal))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="returningUsers" fill="hsl(var(--analytics-blue))" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>Monthly revenue and subscription trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--analytics-blue))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--analytics-blue))", strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="subscriptions" 
                      stroke="hsl(var(--analytics-teal))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--analytics-teal))", strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators and their trends</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>Previous</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((metric, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{metric.metric}</TableCell>
                      <TableCell className="font-semibold">{metric.current}</TableCell>
                      <TableCell className="text-muted-foreground">{metric.previous}</TableCell>
                      <TableCell 
                        className={metric.change.startsWith('+') ? 'text-analytics-teal' : 'text-analytics-teal'}
                      >
                        {metric.change}
                      </TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-analytics-teal text-white">
                          {metric.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;