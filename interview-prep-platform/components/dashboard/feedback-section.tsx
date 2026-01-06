"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Feedback {
  id: string
  title: string
  score: number
  feedback: string
  date: string
}

interface FeedbackSectionProps {
  feedbacks: Feedback[]
}

const feedbacks = [
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
  ]

export const FeedbackSection = () => {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Feedback</CardTitle>
        <CardDescription>AI-generated insights on your resume</CardDescription>
      </CardHeader>
      <CardContent>
        {feedbacks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Upload your resume to get AI feedback</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{fb.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{fb.date}</p>
                  </div>
                  <Badge
                    variant={fb.score >= 8 ? "default" : fb.score >= 6 ? "secondary" : "destructive"}
                    className="ml-2"
                  >
                    {fb.score}/10
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{fb.feedback}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
