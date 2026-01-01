"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface InterviewSessionProps {
  role: string
  level: string
  duration: number
  onEnd: () => void
}

export function InterviewSession({ role, level, duration, onEnd }: InterviewSessionProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiMessage, setAiMessage] = useState(
    "Welcome to your mock interview! I'll be asking you questions about your experience and skills. Feel free to take a moment to think before responding.",
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleEndSession()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function handleEndSession() {
    setIsRecording(false)
    onEnd()
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Timer */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Interview Session</h1>
            <p className="text-muted-foreground">
              {role} - {level}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <p className="text-sm text-muted-foreground">Time remaining</p>
          </div>
        </div>

        {/* Interview Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video/Voice Area */}
          <Card className="lg:col-span-2 border-primary/20">
            <CardContent className="p-6">
              <div className="bg-secondary/30 rounded-lg p-12 text-center aspect-video flex items-center justify-center">
                <div>
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/40 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-muted-foreground">{isRecording ? "Recording..." : "Ready to record"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Message Area */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">AI Interviewer</h3>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 min-h-32">
                <p className="text-sm text-foreground leading-relaxed">{aiMessage}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>
                  Session Status: <span className="text-primary font-semibold">Active</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transcript Area */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Your Response</h3>
            <div className="bg-secondary/10 border border-border rounded-lg p-4 min-h-24 text-sm text-muted-foreground">
              {transcript || "Your transcribed response will appear here..."}
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setIsRecording(!isRecording)}
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            className="min-w-40"
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          <Button onClick={handleEndSession} variant="outline" size="lg" className="min-w-40 bg-transparent">
            End Interview
          </Button>
        </div>
      </div>
    </div>
  )
}
