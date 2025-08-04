'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { SiteHeader } from "./site-header"
import { SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export function SessionWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SessionProvider>
        <div className="flex h-screen overflow-hidden bg-background w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col bg-muted">
            <SiteHeader />
            <main className="flex-1 overflow-y-auto p-4">
              {children}
            </main>
          </div>
        </div>
      </SessionProvider>
    </SidebarProvider>
  )
}
