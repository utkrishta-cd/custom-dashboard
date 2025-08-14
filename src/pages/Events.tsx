import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Plus, Activity, Eye, Calendar } from "lucide-react";

const eventTypes = [
  { name: "Page View", count: 45672, color: "bg-analytics-blue" },
  { name: "Button Click", count: 12834, color: "bg-analytics-teal" },
  { name: "Form Submit", count: 3456, color: "bg-analytics-blue-light" },
  { name: "Download", count: 1789, color: "bg-analytics-gray-dark" },
  { name: "Video Play", count: 892, color: "bg-primary" },
];

const recentEvents = [
  {
    id: 1,
    event: "page_view",
    user: "user_12345",
    timestamp: "2024-01-15 14:32:15",
    properties: { page: "/dashboard", referrer: "google" },
    status: "processed",
  },
  {
    id: 2,
    event: "button_click",
    user: "user_67890",
    timestamp: "2024-01-15 14:31:42",
    properties: { button_id: "signup_cta", page: "/landing" },
    status: "processed",
  },
  {
    id: 3,
    event: "form_submit",
    user: "user_11111",
    timestamp: "2024-01-15 14:30:18",
    properties: { form_id: "contact_form", success: true },
    status: "processed",
  },
  {
    id: 4,
    event: "download",
    user: "user_22222",
    timestamp: "2024-01-15 14:28:55",
    properties: { file: "whitepaper.pdf", size: "2.3MB" },
    status: "processed",
  },
  {
    id: 5,
    event: "video_play",
    user: "user_33333",
    timestamp: "2024-01-15 14:27:30",
    properties: { video_id: "intro_video", duration: 120 },
    status: "failed",
  },
];

const eventDefinitions = [
  {
    name: "page_view",
    description: "User views a page",
    properties: ["page", "referrer", "user_agent"],
    volume: "High",
    lastSeen: "1 min ago",
  },
  {
    name: "button_click",
    description: "User clicks a button or CTA",
    properties: ["button_id", "page", "position"],
    volume: "Medium",
    lastSeen: "2 min ago",
  },
  {
    name: "form_submit",
    description: "User submits a form",
    properties: ["form_id", "success", "validation_errors"],
    volume: "Low",
    lastSeen: "5 min ago",
  },
  {
    name: "download",
    description: "User downloads a file",
    properties: ["file", "size", "type"],
    volume: "Low",
    lastSeen: "10 min ago",
  },
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventFilter, setEventFilter] = useState("all");

  const filteredEvents = recentEvents.filter(event => {
    const matchesSearch = event.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = eventFilter === "all" || event.event === eventFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Events"
        description="Monitor and analyze user events and interactions"
        action={
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 24h
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        }
      />

      {/* Event Type Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {eventTypes.map((type, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className={`absolute top-0 left-0 w-1 h-full ${type.color}`} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{type.name}</p>
                  <p className="text-2xl font-bold text-foreground">{type.count.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live">Live Events</TabsTrigger>
          <TabsTrigger value="definitions">Event Definitions</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search events or users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={eventFilter} onValueChange={setEventFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="page_view">Page View</SelectItem>
                    <SelectItem value="button_click">Button Click</SelectItem>
                    <SelectItem value="form_submit">Form Submit</SelectItem>
                    <SelectItem value="download">Download</SelectItem>
                    <SelectItem value="video_play">Video Play</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Events Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Real-time event stream from your application</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Properties</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.event}</TableCell>
                      <TableCell className="text-muted-foreground">{event.user}</TableCell>
                      <TableCell className="text-muted-foreground">{event.timestamp}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {JSON.stringify(event.properties)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={event.status === "processed" ? "default" : "destructive"}
                          className={event.status === "processed" ? "bg-analytics-teal text-white" : ""}
                        >
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="definitions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Definitions</CardTitle>
              <CardDescription>Manage your event schema and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Properties</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventDefinitions.map((definition, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{definition.name}</TableCell>
                      <TableCell>{definition.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {definition.properties.slice(0, 2).map((prop, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {prop}
                            </Badge>
                          ))}
                          {definition.properties.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{definition.properties.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={definition.volume === "High" ? "default" : "secondary"}
                          className={definition.volume === "High" ? "bg-analytics-blue text-white" : ""}
                        >
                          {definition.volume}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{definition.lastSeen}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Properties</CardTitle>
              <CardDescription>Manage and validate event property schemas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Property Management</h3>
                <p className="text-muted-foreground mb-4">
                  Configure validation rules and data types for event properties
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property Schema
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;