"use client"
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/tracker")
    }
  }, [status, router])
  
  return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Silakan login untuk mengakses tracker</p>
        <button onClick={() => signIn("google", { callbackUrl: "/tracker" })} className="px-4 py-2 bg-black text-white rounded">Login dengan Google</button>
      </div>
    )
}

