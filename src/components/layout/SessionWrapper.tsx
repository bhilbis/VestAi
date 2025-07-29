'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode, useState } from "react"
import { Sidebar } from "./Sidebar"
import { TopNavbar } from "./TopNavbar"

export function SessionWrapper({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col bg-muted">
          <TopNavbar onMenuClick={() => setSidebarOpen(true)}/>
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}
