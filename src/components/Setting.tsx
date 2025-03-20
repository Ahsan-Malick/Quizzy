
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "./ui/Button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { User, CreditCard, Bell, Lock, HelpCircle, LogOut } from 'lucide-react'
import Avatar from "../utils/avatar";
import { useStore } from '../store/store'

export default function SettingsPage() {
  const [name, setName] = useState('Alex Johnson')
  const [email, setEmail] = useState('alex.johnson@example.com')
  const [notifications, setNotifications] = useState(true)
  
  const userDetails = useStore((state) => state.userDetail);
  const handleSaveProfile = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle saving profile logic here
    
  }

  const handleLogout = () => {
    // Handle logout logic here
   
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">Settings</h1>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="flex items-center space-x-4">
                  <Avatar initials={userDetails?.avatar || ""}></Avatar>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <Button className="bg-black text-white" type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="text-indigo-600" />
                    <div>
                      <p className="font-medium">Visa ending in 1234</p>
                      <p className="text-sm text-gray-500">Expires 12/2024</p>
                    </div>
                  </div>
                  <Button variant="outline">Edit</Button>
                </div>
                <Button className="w-full">Add New Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive quiz updates via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications on your device</p>
                  </div>
                  <Switch id="push-notifications" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">Change Password</Button>
                <Button variant="outline" className="w-full">Enable Two-Factor Authentication</Button>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 space-y-4 bg-white rounded-md">
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}