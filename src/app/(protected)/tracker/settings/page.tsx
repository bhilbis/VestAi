"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Separator } from '@/components/ui/separator';
// import { Badge } from '@/components/ui/badge';
// import { AlertTriangleIcon, BellIcon, ShieldIcon, UserIcon, BotIcon } from 'lucide-react';
import { useThemeStore } from '@/lib/themeToggle';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session} = useSession();
  const {theme, setTheme} = useThemeStore();
  const isDarkMode = theme === 'dark';

  return (
    <div className="max-w-2xl mx-auto space-y-6 min-h-screen justify-center items-center flex flex-col">
      <Card className="p-6 w-full">
        <h2 className="text-xl mb-4">Pengaturan Aplikasi</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg mb-4">Profil Pengguna</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label>Nama</label>
                <p className="text-sm text-muted-foreground">{session?.user?.name}</p>
              </div>
              <div className="flex items-center justify-between">
                <label>Email</label>
                <p className="text-sm text-muted-foreground">
                  {session?.user?.email?.replace(/(?<=^.{3}).*(?=@)/, '***')}
                </p>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between">
            <div>
              <label>Dark Mode</label>
              <p className="text-sm text-muted-foreground">Aktifkan tema gelap</p>
            </div>
            <Switch 
              checked={isDarkMode}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>

          <div>

          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg mb-4">Tentang Aplikasi</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>AI Portfolio Tracker v1.0</p>
          <p>Aplikasi tracking portfolio dengan teknologi AI untuk memberikan insight dan analisis investasi yang mendalam.</p>
          <p>Fitur: Dashboard analytics, AI chat assistant, drag & drop interface, real-time notifications.</p>
        </div>
      </Card>
    </div>
  );
}