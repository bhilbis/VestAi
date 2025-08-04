"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Wallet2Icon, ChevronUp, Home, MessagesSquare, Settings, SquaresExclude, User2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";
import { useThemeStore } from "@/lib/themeToggle";
import { useState } from "react";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/tracker",
    icon: Home,
  },
  {
    title: "Messages",
    url: "/tracker/messages",
    icon: MessagesSquare,
  },
  {
    title: "Assets",
    url: "/tracker/assets",
    icon: Wallet2Icon,
  },
  {
    title: "Settings",
    url: "/tracker/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
    const { data: session } = useSession();
    const username = session?.user?.name ?? "Guest";
    const [showThemeOptions, setShowThemeOptions] = useState(false);
    const { theme, setTheme } = useThemeStore();

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                        asChild
                        className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                        <a href="#">
                            <SquaresExclude width={20} height={20}/>
                            <span className="text-base font-semibold">Vest AI</span>
                        </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                            <User2 className="mr-2" />
                            {username}
                            <ChevronUp className="ml-auto" />
                        </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" className="w-56">
                            {!showThemeOptions ? (
                            <>
                                <DropdownMenuItem 
                                    onClick={() => setShowThemeOptions(true)} 
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    System
                                </DropdownMenuItem>
                                <DropdownMenuItem>Account</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                                    Sign out
                                </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                <DropdownMenuItem disabled className="opacity-70">
                                    Select Theme
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setTheme("light")}
                                    onSelect={(e) => e.preventDefault()}
                                    className={theme === "light" ? "font-bold" : ""}
                                >
                                    ☀️ Light Mode
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setTheme("dark")}
                                    onSelect={(e) => e.preventDefault()}
                                    className={theme === "dark" ? "font-bold" : ""}
                                >
                                    🌙 Dark Mode
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setShowThemeOptions(false)}
                                    onSelect={(e) => e.preventDefault()}
                                    className="text-muted-foreground"
                                >
                                    ← Back
                                </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
                </SidebarFooter>
        </Sidebar>
    )
}