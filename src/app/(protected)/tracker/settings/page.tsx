"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertTriangleIcon, BellIcon, ShieldIcon, UserIcon, BotIcon } from 'lucide-react';

export default function Page() {

  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    aiRecommendations: true,
    portfolioUpdates: false,
    marketNews: true
  });

  const [aiSettings, setAiSettings] = useState({
    autoTrade: false,
    riskTolerance: 'medium',
    maxTradeAmount: '5000',
    stopLoss: '10'
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-muted-foreground">Manage your account, AI preferences, and security settings</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="est">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BotIcon className="h-5 w-5" />
                AI Assistant Configuration
              </CardTitle>
              <CardDescription>Customize how VestAI manages your investments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Autonomous Trading</Label>
                  <p className="text-sm text-muted-foreground">Allow AI to execute trades automatically based on your settings</p>
                </div>
                <Switch 
                  checked={aiSettings.autoTrade}
                  onCheckedChange={(checked) => setAiSettings({...aiSettings, autoTrade: checked})}
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                <Select value={aiSettings.riskTolerance} onValueChange={(value) => setAiSettings({...aiSettings, riskTolerance: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="maxTrade">Max Trade Amount ($)</Label>
                  <Input 
                    id="maxTrade" 
                    type="number" 
                    value={aiSettings.maxTradeAmount}
                    onChange={(e) => setAiSettings({...aiSettings, maxTradeAmount: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="stopLoss">Stop Loss (%)</Label>
                  <Input 
                    id="stopLoss" 
                    type="number" 
                    value={aiSettings.stopLoss}
                    onChange={(e) => setAiSettings({...aiSettings, stopLoss: e.target.value})}
                  />
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangleIcon className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Important Notice</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Autonomous trading carries risks. The AI will follow your risk parameters, but market conditions can change rapidly. 
                  Monitor your positions regularly and adjust settings as needed.
                </p>
              </div>

              <Button>Save AI Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellIcon className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what updates you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Price Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when assets reach target prices</p>
                </div>
                <Switch 
                  checked={notifications.priceAlerts}
                  onCheckedChange={(checked) => setNotifications({...notifications, priceAlerts: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>AI Recommendations</Label>
                  <p className="text-sm text-muted-foreground">Receive trading suggestions and insights from VestAI</p>
                </div>
                <Switch 
                  checked={notifications.aiRecommendations}
                  onCheckedChange={(checked) => setNotifications({...notifications, aiRecommendations: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Portfolio Updates</Label>
                  <p className="text-sm text-muted-foreground">Daily summary of portfolio performance</p>
                </div>
                <Switch 
                  checked={notifications.portfolioUpdates}
                  onCheckedChange={(checked) => setNotifications({...notifications, portfolioUpdates: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Market News</Label>
                  <p className="text-sm text-muted-foreground">Important market updates and news alerts</p>
                </div>
                <Switch 
                  checked={notifications.marketNews}
                  onCheckedChange={(checked) => setNotifications({...notifications, marketNews: checked})}
                />
              </div>

              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldIcon className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Enabled</Badge>
                    <span className="text-sm text-muted-foreground">Added security for your account</span>
                  </div>
                  <Button variant="outline">Manage 2FA</Button>
                </div>
              </div>

              <Separator />

              <div>
                <Label>API Keys</Label>
                <p className="text-sm text-muted-foreground mb-3">Connect your exchange accounts for automated trading</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <span className="font-medium">Coinbase Pro</span>
                      <Badge variant="secondary" className="ml-2">Connected</Badge>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <span className="font-medium">Binance</span>
                      <Badge variant="outline" className="ml-2">Not Connected</Badge>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Change Password</Label>
                <div className="space-y-3 mt-2">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                  <Button>Update Password</Button>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Account Backup</Label>
                <p className="text-sm text-muted-foreground mb-3">Download your account data and settings</p>
                <Button variant="outline">Download Backup</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}