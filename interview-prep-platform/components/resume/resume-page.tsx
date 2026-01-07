"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { ResumeDetailHeader } from "./resume-detail-header"
import { AssessmentShowcase } from "./assessment-showcase"
import { IssuesShowcase } from "./issues-showcase"
import { ImprovementsCarousel } from "./improvements-carousel"

interface Resume {
  id: string
  name: string
  uploadDate: string
  status: "analyzed" | "analyzing" | "pending"
  overallScore: number
}

interface ResumeFeedback {
  overall_assessment: string
  biggest_issues: Array<{
    issue: string
    why_it_matters: string
    suggestion: string
  }>
  bullet_rewrites: Array<{
    original: string
    improved: string
    reason: string
  }>
}

const ResumePage = ({ id } : {
    id: string
}) => {
  
  // Mock data - in production, this would be fetched from your API
  const resumeData: Record<string, Resume> = {
    "1": {
      id: "1",
      name: "Software Engineer Resume.pdf",
      uploadDate: "Dec 15, 2024",
      status: "analyzed",
      overallScore: 8,
    },
    "2": {
      id: "2",
      name: "Product Manager Resume.docx",
      uploadDate: "Dec 10, 2024",
      status: "analyzed",
      overallScore: 7,
    },
  }

  const feedbackData: Record<string, ResumeFeedback> = {
    "1": {
      overall_assessment:
        "Pass — lacks impact, professional experience, and quantifiable achievements. Strong technical foundation but needs more concrete examples and measurable outcomes.",
      biggest_issues: [
        {
          issue: "No professional work experience listed",
          why_it_matters:
            "Hiring managers need evidence of real-world impact, ownership, and ability to ship production software; projects alone are insufficient for mid-to-senior roles",
          suggestion:
            "Add any internships, freelance contracts, or full-time roles with dates and responsibilities, or clearly label projects as personal with measurable outcomes",
        },
        {
          issue: "Project descriptions are vague and lack metrics",
          why_it_matters:
            "Without numbers (users, performance gains, revenue), you cannot demonstrate the scale or significance of your work",
          suggestion:
            "Include concrete impact data for each project (e.g., 'served 2,000 daily active users', 'reduced page load by 30%')",
        },
        {
          issue: "Missing dates and links for projects",
          why_it_matters:
            "Dates show recency and progression; links let reviewers verify the work. Their absence makes the resume look incomplete",
          suggestion: "Add start/end months for each project and provide live URLs or GitHub repos",
        },
      ],
      bullet_rewrites: [
        {
          original: "Developed the front-end of an health-care software named 'aegis-health' with other developers.",
          improved:
            "Co‑designed and implemented the responsive front‑end of the Aegis Health Care platform using Next.js, TypeScript, Tailwind CSS and Firebase, collaborating with a cross‑functional team.",
          reason:
            "Adds collaboration, specific tech stack, and design responsibility, making the contribution clearer and higher‑impact",
        },
        {
          original:
            "Developed a real-time messaging application with robust user authentication and enhanced security measures. Key functionalities include - secure user login, real-time message delivery, and data protection",
          improved:
            "Built a real‑time messaging app with secure authentication and end‑to‑end encryption using React.js, Firebase and Vercel, delivering instant message delivery for registered users.",
          reason: "Condenses description, highlights security focus, and names the tech stack succinctly",
        },
        {
          original: "Worked on various projects improving code quality and performance.",
          improved:
            "Optimized query performance by 40% and implemented automated testing, reducing production bugs by 60% across 5+ projects.",
          reason: "Transforms vague statement into specific, measurable achievements with quantifiable impact",
        },
      ],
    },
    "2": {
      overall_assessment:
        "Good — strong product management experience with clear examples of cross-functional collaboration. Would benefit from more data-driven decision making examples and user impact metrics.",
      biggest_issues: [
        {
          issue: "Limited quantified business impact",
          why_it_matters:
            "Product management roles require demonstrating revenue growth, user engagement improvements, and business metrics that prove your impact",
          suggestion:
            "Add metrics like 'increased retention by 25%', 'grew MAU from 50K to 200K', or 'improved user satisfaction score from 3.2 to 4.1'",
        },
        {
          issue: "Missing user feedback and research examples",
          why_it_matters:
            "Modern PMs need to show they understand user needs and can leverage feedback to drive product decisions",
          suggestion:
            "Include examples of user research conducted, feedback loops implemented, and how you validated product decisions with user data",
        },
      ],
      bullet_rewrites: [
        {
          original: "Led product strategy and managed cross-functional teams to launch new features.",
          improved:
            "Led product strategy for 3 major launches, coordinating with engineering and design teams, resulting in 40% increase in monthly active users and $2.5M revenue impact.",
          reason: "Adds specific metrics, quantifies scope, and demonstrates direct business impact",
        },
        {
          original: "Conducted user research and analyzed product metrics.",
          improved:
            "Conducted 40+ user interviews and analyzed product analytics using Amplitude, identifying key pain points that informed roadmap prioritization and increased feature adoption by 35%.",
          reason: "Specifies research scale, tools used, and concrete outcome metrics",
        },
      ],
    },
  }

  const resume = resumeData[id]
  const feedback = feedbackData[id]

  if (!resume || !feedback) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-muted-foreground">Resume not found.</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader  />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <ResumeDetailHeader
          name={resume.name}
          uploadDate={resume.uploadDate}
          overallScore={resume.overallScore}
          status={resume.status}
        />

        {/* Main Content */}
        <div className="space-y-12">
          {/* Assessment */}
          <div>
            <AssessmentShowcase assessment={feedback.overall_assessment} score={resume.overallScore} />
          </div>

          {/* Issues */}
          {feedback.biggest_issues.length > 0 && (
            <div>
              <IssuesShowcase issues={feedback.biggest_issues} />
            </div>
          )}

          {/* Improvements Carousel */}
          {feedback.bullet_rewrites.length > 0 && (
            <div>
              <ImprovementsCarousel bullets={feedback.bullet_rewrites} />
            </div>
          )}

          {/* Footer CTA */}
          <div className="border-t border-border/50 pt-8 text-center">
            <p className="text-muted-foreground mb-4">Ready to upload an improved version?</p>
            <a
              href="/dashboard/resumes"
              className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Upload New Version
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ResumePage