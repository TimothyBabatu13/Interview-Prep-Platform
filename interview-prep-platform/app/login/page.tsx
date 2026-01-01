import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "Sign In - InterviewPrep",
  description: "Sign in to your interview preparation dashboard",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">InterviewPrep</h1>
          <p className="text-muted-foreground">Master your interviews with AI-powered practice</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
