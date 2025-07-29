// components/layout/TopNavbar.tsx
import { Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeStore } from "../ui/themeToggle";

export function TopNavbar({
  onMenuClick,
}: {
  onMenuClick: () => void
}) {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";
  const handleThemeToggle = () => {
    toggleTheme();
  };
  return (
    <header className="sticky top-0 z-20 px-4 py-2 border-b flex items-center justify-between transform transition-transform duration-300 ease-in-out">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu />
      </Button>
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleThemeToggle}
        >
          {isDark ? (
            <Sun />
          ) : (
            <Moon />
          )}
        </Button>
        {/* bisa tambahkan Avatar/ProfileMenu di sini */}
      </div>
    </header>
  )
}