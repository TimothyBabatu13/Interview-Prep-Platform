"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { CreditsCard } from "@/components/dashboard/credits-card"
import { ResumeUpload } from "@/components/dashboard/resume-upload"
import { FeedbackSection } from "@/components/dashboard/feedback-section"
import { InterviewSection } from "@/components/dashboard/interview-section"

interface Feedback {
  id: string
  title: string
  score: number
  feedback: string
  date: string
}

const DashboardPage = () => {

  const handleResumeUpload = (file: File) => {
    console.log("Resume uploaded:", file.name)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Credits Overview */}
        <div className="mb-8">
          <CreditsCard />
        </div>

        {/* Interview and Resume Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <InterviewSection creditsAvailable={5} />
          </div>
          <div className="lg:col-span-1">
            <ResumeUpload onUpload={handleResumeUpload} />
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mb-8">
          <FeedbackSection  />
        </div>
      </main>
    </div>
  )
}

export default  DashboardPage