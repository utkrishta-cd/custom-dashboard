import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings as SettingsIcon, User, Bell, Database, Key, Shield, Mail, Smartphone } from "lucide-react";

const integrations = [
  { name: "Slack", status: "connected", description: "Real-time alert notifications" },
  { name: "Email", status: "connected", description: "Daily reports and alerts" },
  { name: "Webhook", status: "disconnected", description: "Custom HTTP endpoints" },
  { name: "API", status: "connected", description: "Direct data access" },
];

const apiKeys = [
  { name: "Production API Key", key: "ak_prod_1234...89ab", created: "2024-01-10", lastUsed: "2 hours ago", status: "active" },
  { name: "Development API Key", key: "ak_dev_5678...cdef", created: "2024-01-05", lastUsed: "1 day ago", status: "active" },
  { name: "Staging API Key", key: "ak_stage_9012...3456", created: "2023-12-20", lastUsed: "1 week ago", status: "inactive" },
];

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account and application preferences"
        action={
          <Button>
            <SettingsIcon className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        }
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="cet">Central European Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Data Preferences</span>
                </CardTitle>
                <CardDescription>Configure data collection and retention settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dataRetention">Data Retention</Label>
                    <p className="text-sm text-muted-foreground">How long to keep analytics data</p>
                  </div>
                  <Select defaultValue="12months">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 months</SelectItem>
                      <SelectItem value="6months">6 months</SelectItem>
                      <SelectItem value="12months">12 months</SelectItem>
                      <SelectItem value="24months">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="anonymizeIp">Anonymize IP Addresses</Label>
                    <p className="text-sm text-muted-foreground">Automatically anonymize user IP addresses</p>
                  </div>
                  <Switch id="anonymizeIp" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cookieConsent">Cookie Consent</Label>
                    <p className="text-sm text-muted-foreground">Require user consent for cookies</p>
                  </div>
                  <Switch id="cookieConsent" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="trackingOptOut">Allow Tracking Opt-out</Label>
                    <p className="text-sm text-muted-foreground">Let users opt out of tracking</p>
                  </div>
                  <Switch id="trackingOptOut" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Choose how and when you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Notifications</span>
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailAlerts">Alert Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts when thresholds are exceeded</p>
                    </div>
                    <Switch id="emailAlerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailReports">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Get weekly analytics summaries</p>
                    </div>
                    <Switch id="emailReports" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailUpdates">Product Updates</Label>
                      <p className="text-sm text-muted-foreground">New features and announcements</p>
                    </div>
                    <Switch id="emailUpdates" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Push Notifications</span>
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushCritical">Critical Alerts</Label>
                      <p className="text-sm text-muted-foreground">Immediate notifications for critical issues</p>
                    </div>
                    <Switch id="pushCritical" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushGoals">Goal Achievements</Label>
                      <p className="text-sm text-muted-foreground">When you reach set goals</p>
                    </div>
                    <Switch id="pushGoals" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage your third-party integrations and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={integration.status === "connected" ? "default" : "secondary"}
                        className={integration.status === "connected" ? "bg-analytics-teal text-white" : ""}
                      >
                        {integration.status}
                      </Badge>
                      <Button
                        variant={integration.status === "connected" ? "outline" : "default"}
                        size="sm"
                      >
                        {integration.status === "connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-4">Webhook Configuration</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      placeholder="https://your-domain.com/webhook"
                      type="url"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhookSecret">Secret Key</Label>
                    <Input
                      id="webhookSecret"
                      placeholder="Enter webhook secret"
                      type="password"
                    />
                  </div>
                  <Button size="sm">Test Webhook</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Manage your account security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Password Settings</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button size="sm">Update Password</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <Label>Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Session Management</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current session expires in: 7 days</span>
                    <Button variant="outline" size="sm">Extend Session</Button>
                  </div>
                  <Button variant="destructive" size="sm">Revoke All Sessions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>API Keys</span>
              </CardTitle>
              <CardDescription>Manage your API keys for programmatic access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Active API Keys</h4>
                  <Button size="sm">
                    <Key className="h-4 w-4 mr-2" />
                    Create New Key
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{key.name}</TableCell>
                        <TableCell className="font-mono text-sm">{key.key}</TableCell>
                        <TableCell className="text-muted-foreground">{key.created}</TableCell>
                        <TableCell className="text-muted-foreground">{key.lastUsed}</TableCell>
                        <TableCell>
                          <Badge
                            variant={key.status === "active" ? "default" : "secondary"}
                            className={key.status === "active" ? "bg-analytics-teal text-white" : ""}
                          >
                            {key.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Revoke
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">API Usage Guidelines</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Rate limit: 1000 requests per hour</li>
                  <li>• Keep your API keys secure and never share them publicly</li>
                  <li>• Use different keys for different environments</li>
                  <li>• Rotate keys regularly for enhanced security</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;