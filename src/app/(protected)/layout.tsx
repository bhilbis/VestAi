import { SessionWrapper } from "@/components/layout/SessionWrapper"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <SessionWrapper>{children}</SessionWrapper>
}
