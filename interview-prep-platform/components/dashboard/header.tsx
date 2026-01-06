"use client"
import { Button } from "@/components/ui/button"
import { useAuthProvider } from "@/context/auth-context"

export const DashboardHeader = () => {
  const { user } = useAuthProvider()

  const handleLogout = async () => {
    try {
    } catch (error) {
      
    }
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">InterviewPrep</h1>
          <p className="text-sm text-muted-foreground">Welcome back</p>
        </div>
        <div className="flex items-center gap-4">
          {user && <p className="text-sm text-muted-foreground">{user.email}</p>}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
