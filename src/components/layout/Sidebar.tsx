/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Bot, BotIcon, Briefcase, ChevronLeft, ChevronRight, Home, LogOut, MessageCircle, PanelLeft, Settings, SquaresExclude, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { signOut } from "next-auth/react"

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <aside
      className={cn(
        "fixed z-40 inset-y-0 left-0 bg-background shadow-md transition-all duration-300 ease-in-out border-r",
        isOpen ? "translate-x-0" : "-translate-x-full",
        collapsed ? "w-[56px]" : "w-64",
        "lg:translate-x-0 lg:relative"
      )}
    >

      <div className="flex items-center justify-between py-2">
        {!collapsed && (
          <Button
            variant="ghost"
            className="font-bold text-black dark:text-white flex items-center gap-1"
          >
            <SquaresExclude width={20} height={20}/>
            <span className="text-lg">VEST AI</span>
          </Button>
        )}

        <SidebarToggle onClick={() => setCollapsed(!collapsed)} isCollapsed={collapsed} />

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="block lg:hidden"
        >
          <X />
        </Button>
      </div>

      <ScrollArea className="h-full py-2">
        <nav className="space-y-2">
          <SidebarItem icon={Home} label="Home" collapsed={collapsed}/>
          <SidebarItem icon={MessageCircle} label="Messages" collapsed={collapsed}/>
          <SidebarItem icon={Briefcase} label="Assets" collapsed={collapsed}/>
          <SidebarItem icon={Settings} label="Settings" collapsed={collapsed}/>
        </nav>
      </ScrollArea>

      <SidebarFooter
        collapsed={collapsed}
        user={{
          name: "Flexsy Bilbis",
          image: "/profile.jpg", // atau dari session.user.image
        }}
        onLogout={() => signOut()} // jika pakai next-auth
      />
    </aside>
  )
}

function SidebarItem({
  icon: Icon,
  label,
  collapsed
}: {
  icon: any
  label: string
  collapsed?: boolean
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 rounded-md hover:cursor-pointer",
        collapsed && 'justify-center'
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Button>
  )
}

function SidebarToggle({ 
  onClick, 
  isCollapsed
} : {
  onClick: () => void, 
  isCollapsed: boolean 
}) {
  return (
    <button
      onClick={onClick}
      className={cn(`relative flex items-center justify-center w-10 h-10 rounded-md mx-2 transition-colors group hover:bg-gray-500`,
        isCollapsed && 'mx-auto'
      )}
      aria-label="Toggle Sidebar"
    >
      {isCollapsed && (
        <div className="flex">
          <span className="hidden md:block text-xl group-hover:opacity-0 transition-opacity duration-100">
            <SquaresExclude width={20} height={20} />
          </span>
          <span className="absolute hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-100">
            {/* <img src="/sidebar.svg" alt="Sidebar Icon" width={20} height={20} className="dark:stroke-white" /> */}
            <PanelLeft width={20} height={20}/>
            <span className="sr-only">Toggle Menu</span>
          </span>
        </div>
      )}

      {!isCollapsed && (
        <span className="hidden md:block">
          {/* <img src="/sidebar.svg" alt="Sidebar Icon" width={20} height={20} className="dark:stroke-white" /> */}
          <PanelLeft width={20} height={20}/>
          <span className="sr-only">Toggle Menu</span>
        </span>
      )}
    </button>
  )
}

function SidebarFooter({
  collapsed,
  user,
  onLogout,
}: {
  collapsed: boolean;
  user: {
    name: string;
    image?: string;
  };
  onLogout: () => void;
}) {
  return (
    <div className="border-t border-muted px-3 py-2 mt-auto z-50">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <span className="text-sm font-medium text-muted-foreground truncate max-w-[120px]">
              {user.name}
            </span>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={onLogout}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}