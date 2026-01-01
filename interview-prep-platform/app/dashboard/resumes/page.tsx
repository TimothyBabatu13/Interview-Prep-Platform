"use client"

import { useEffect, useState } from "react"
import { InterviewSetup, type InterviewConfig } from "@/components/interview/interview-setup"
import { InterviewSession } from "@/components/interview/interview-session"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type SessionState = "setup" | "active" | "completed"

export default function InterviewPage() {
  const [userEmail, setUserEmail] = useState<string>("")
  const [sessionState, setSessionState] = useState<SessionState>("setup")
  const [isLoading, setIsLoading] = useState(false)
  const [activeConfig, setActiveConfig] = useState<InterviewConfig | null>(null)

  useEffect(() => {
    const email = localStorage.getItem("user_email")
    if (!email) {
      window.location.href = "/login"
    } else {
      setUserEmail(email)
    }
  }, [])

  function handleStartInterview(config: InterviewConfig) {
    setIsLoading(true)
    // Simulate AI connection delay
    setTimeout(() => {
      setActiveConfig(config)
      setSessionState("active")
      setIsLoading(false)
    }, 1500)
  }

  function handleEndInterview() {
    setSessionState("completed")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userEmail={userEmail} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sessionState === "setup" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Start Interview Practice</h1>
              <p className="text-muted-foreground">Configure your AI mock interview session</p>
            </div>
            <InterviewSetup onStart={handleStartInterview} isLoading={isLoading} />
          </div>
        )}

        {sessionState === "active" && activeConfig && (
          <InterviewSession
            role={activeConfig.role}
            level={activeConfig.level}
            duration={activeConfig.duration}
            onEnd={handleEndInterview}
          />
        )}

        {sessionState === "completed" && activeConfig && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Interview Complete</h1>
              <p className="text-muted-foreground">Your session has ended</p>
            </div>
            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Session Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary/20 rounded-lg border border-secondary">
                      <p className="text-sm text-muted-foreground mb-1">Role</p>
                      <p className="text-lg font-semibold text-foreground">{activeConfig.role}</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg border border-secondary">
                      <p className="text-sm text-muted-foreground mb-1">Level</p>
                      <p className="text-lg font-semibold text-foreground">{activeConfig.level}</p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg border border-secondary">
                      <p className="text-sm text-muted-foreground mb-1">Duration</p>
                      <p className="text-lg font-semibold text-foreground">{activeConfig.duration} minutes</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Performance Feedback</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-accent/10 rounded border border-accent/20">
                      <p className="text-sm font-medium text-foreground">Communication</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Clear explanations with good structure. Consider slowing down at times to emphasize key points.
                      </p>
                    </div>
                    <div className="p-3 bg-accent/10 rounded border border-accent/20">
                      <p className="text-sm font-medium text-foreground">Technical Knowledge</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Strong grasp of fundamentals. Show more concrete examples when discussing complex topics.
                      </p>
                    </div>
                    <div className="p-3 bg-accent/10 rounded border border-accent/20">
                      <p className="text-sm font-medium text-foreground">Problem Solving</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Good approach. Practice thinking out loud more to demonstrate your thought process.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setSessionState("setup")
                      setActiveConfig(null)
                    }}
                    className="flex-1"
                  >
                    Practice Again
                  </Button>
                  <Button onClick={() => (window.location.href = "/dashboard")} variant="outline" className="flex-1">
                    Back to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
