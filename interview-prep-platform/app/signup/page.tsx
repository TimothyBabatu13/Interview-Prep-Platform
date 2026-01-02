import { SignupForm } from "@/components/auth/signup-form"

export const metadata = {
  title: "Sign Up - InterviewPrep",
  description: "Create your interview preparation account",
}

const SignupPage = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">InterviewPrep</h1>
          <p className="text-muted-foreground">Master your interviews with AI-powered practice</p>
        </div>
        <SignupForm />
      </div>
    </main>
  )
}

export default SignupPage