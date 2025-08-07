'use client'

import { ReactNode, useEffect } from "react"
import { SiteHeader } from "./site-header"
import { SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function SessionWrapper({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, router])
  
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Memuat sesi pengguna...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <SidebarProvider>
        <div className="flex h-screen overflow-hidden bg-background w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col bg-muted">
            <SiteHeader />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
    </SidebarProvider>
  )
}
