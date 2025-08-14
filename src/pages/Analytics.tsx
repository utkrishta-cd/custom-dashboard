import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Calendar, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const trafficData = [
  { date: "Jan 1", pageViews: 4000, uniqueVisitors: 2400, bounceRate: 0.45 },
  { date: "Jan 2", pageViews: 3000, uniqueVisitors: 1398, bounceRate: 0.32 },
  { date: "Jan 3", pageViews: 2000, uniqueVisitors: 9800, bounceRate: 0.29 },
  { date: "Jan 4", pageViews: 2780, uniqueVisitors: 3908, bounceRate: 0.41 },
  { date: "Jan 5", pageViews: 1890, uniqueVisitors: 4800, bounceRate: 0.38 },
  { date: "Jan 6", pageViews: 2390, uniqueVisitors: 3800, bounceRate: 0.33 },
  { date: "Jan 7", pageViews: 3490, uniqueVisitors: 4300, bounceRate: 0.28 },
];

const conversionData = [
  { funnel: "Visitors", count: 10000, rate: 100 },
  { funnel: "Sign ups", count: 3500, rate: 35 },
  { funnel: "Trial users", count: 1200, rate: 12 },
  { funnel: "Paid users", count: 350, rate: 3.5 },
];

const chartConfig = {
  pageViews: { label: "Page Views", color: "hsl(var(--analytics-blue))" },
  uniqueVisitors: { label: "Unique Visitors", color: "hsl(var(--analytics-teal))" },
  bounceRate: { label: "Bounce Rate", color: "hsl(var(--analytics-blue-light))" },
  count: { label: "Count", color: "hsl(var(--analytics-blue))" },
};

const Analytics = () => {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Analytics"
        description="Detailed insights and performance metrics"
        action={
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
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

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18,460</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+12.5%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,408</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+8.2%</span> from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Avg. Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-destructive">-5.1%</span> from last period
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Daily traffic patterns and visitor behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="pageViews" 
                      stackId="1" 
                      stroke="hsl(var(--analytics-blue))" 
                      fill="hsl(var(--analytics-blue))" 
                      fillOpacity={0.6} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="uniqueVisitors" 
                      stackId="2" 
                      stroke="hsl(var(--analytics-teal))" 
                      fill="hsl(var(--analytics-teal))" 
                      fillOpacity={0.6} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>User journey through conversion stages</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="funnel" type="category" stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="hsl(var(--analytics-blue))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Duration</CardTitle>
                <CardDescription>Average time users spend on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4m 32s</div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-analytics-teal">+15%</span> increase from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pages per Session</CardTitle>
                <CardDescription>Average pages viewed per user session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3.7</div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-analytics-teal">+8%</span> increase from last week
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹24,567</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+18.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹89.45</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+4.3%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.24%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-teal">+0.8%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;