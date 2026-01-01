"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FeedbackItem {
  category: string
  score: number
  feedback: string[]
  suggestions: string[]
}

interface DetailedFeedbackProps {
  resumeId: string
  feedbacks: FeedbackItem[]
}

export function DetailedFeedback({ feedbacks }: DetailedFeedbackProps) {
  if (feedbacks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Detailed Feedback</CardTitle>
          <CardDescription>No analysis available yet</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Feedback</CardTitle>
        <CardDescription>Category-by-category AI analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={feedbacks[0]?.category} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {feedbacks.map((item) => (
              <TabsTrigger key={item.category} value={item.category} className="text-xs sm:text-sm">
                {item.category}
              </TabsTrigger>
            ))}
          </TabsList>
          {feedbacks.map((item) => (
            <TabsContent key={item.category} value={item.category} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{item.category}</h3>
                <div className="text-2xl font-bold text-primary">{item.score}/10</div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-foreground">Feedback</h4>
                  <ul className="space-y-1">
                    {item.feedback.map((fb, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{fb}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-foreground">Suggestions</h4>
                  <ul className="space-y-1">
                    {item.suggestions.map((sugg, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-accent">→</span>
                        <span>{sugg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
