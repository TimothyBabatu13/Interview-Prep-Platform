import Link from "next/link"
import { Button } from "../ui/button"

const Header = () => {
  return (
    <header className="border-b border-border sticky top-0 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">InterviewPrep</h1>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
  )
}

export default Header