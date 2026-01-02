
import Header from "@/components/shared_ui/Header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Home = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-5xl font-bold text-balance">Master Your Interviews with AI</h2>
          <p className="text-xl text-muted-foreground text-balance">
            Practice with AI-powered mock interviews, get real-time feedback on your resume, and build confidence before
            your next big opportunity.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Start Free Trial</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-lg border border-border bg-card/30">
            <h3 className="text-lg font-semibold mb-2">AI Mock Interviews</h3>
            <p className="text-muted-foreground text-sm">
              Practice with realistic interview scenarios tailored to your target role.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card/30">
            <h3 className="text-lg font-semibold mb-2">Resume Analysis</h3>
            <p className="text-muted-foreground text-sm">
              Get instant AI-powered feedback to improve your resume and stand out.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card/30">
            <h3 className="text-lg font-semibold mb-2">Real-time Feedback</h3>
            <p className="text-muted-foreground text-sm">
              Receive detailed insights on your performance and areas for improvement.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home