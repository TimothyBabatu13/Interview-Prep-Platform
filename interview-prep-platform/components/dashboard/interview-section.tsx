"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface InterviewSectionProps {
  creditsAvailable: number
}

export function InterviewSection({ creditsAvailable }: InterviewSectionProps) {
  return (
    <Card className="border-primary/30 bg-card/50">
      <CardHeader>
        <CardTitle>Start a Mock Interview</CardTitle>
        <CardDescription>Practice with AI-powered mock interviews</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <p className="text-2xl font-bold text-primary">{creditsAvailable}</p>
            <p className="text-xs text-muted-foreground mt-1">Credits Available</p>
          </div>
          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <p className="text-2xl font-bold text-primary">Real-time</p>
            <p className="text-xs text-muted-foreground mt-1">Feedback</p>
          </div>
          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <p className="text-2xl font-bold text-primary">Any Role</p>
            <p className="text-xs text-muted-foreground mt-1">Interview Type</p>
          </div>
        </div>
        <Link href="/dashboard/interview" className="block">
          <Button disabled={creditsAvailable === 0} className="w-full h-12 text-base" size="lg">
            {creditsAvailable > 0 ? "Start Interview Now" : "No Credits Available"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
