"use client";

import { useAuthStore } from "@/lib/stores/auth-store";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar";
import { LogOut, Moon, Sun, User, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <Avatar className="h-20 w-20 mx-auto mb-4">
          <AvatarFallback>
            <AvatarInitials name={user.name} />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {user.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Name</Label>
            <p className="text-gray-900 dark:text-white">{user.name}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <p className="text-gray-900 dark:text-white">{user.email}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Member Since</Label>
            <p className="text-gray-900 dark:text-white">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </CardTitle>
          <CardDescription>Customize your app experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <Label htmlFor="theme-toggle">Dark Mode</Label>
            </div>
            <Switch
              id="theme-toggle"
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleLogout} variant="destructive" className="w-full">
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}
