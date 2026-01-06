"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { CreditsCard } from "@/components/dashboard/credits-card"
import { ResumeUpload } from "@/components/dashboard/resume-upload"
import { FeedbackSection } from "@/components/dashboard/feedback-section"
import { InterviewSection } from "@/components/dashboard/interview-section"
import { useAuthProvider } from "@/context/auth-context"

interface Feedback {
  id: string
  title: string
  score: number
  feedback: string
  date: string
}

export default function DashboardPage() {
  const { isLoading, user } = useAuthProvider()
  const [userEmail, setUserEmail] = useState<string>("")
  const [credits, setCredits] = useState(5)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "1",
      title: "Initial Resume Review",
      score: 8,
      feedback:
        "Strong technical background. Consider adding more quantifiable achievements and metrics to demonstrate impact.",
      date: "Dec 15, 2024",
    },
    {
      id: "2",
      title: "Format and Structure",
      score: 9,
      feedback: "Excellent formatting. The layout is clean and easy to scan. Good use of white space.",
      date: "Dec 15, 2024",
    },
  ])

  function handleResumeUpload(file: File) {
    console.log("Resume uploaded:", file.name)
    // TODO: Process and analyze resume
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userEmail={userEmail} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Credits Overview */}
        <div className="mb-8">
          <CreditsCard credits={credits} />
        </div>

        {/* Interview and Resume Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <InterviewSection creditsAvailable={credits} />
          </div>
          <div className="lg:col-span-2">
            <ResumeUpload onUpload={handleResumeUpload} />
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mb-8">
          <FeedbackSection feedbacks={feedbacks} />
        </div>
      </main>
    </div>
  )
}
