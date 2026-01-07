"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react"

interface AssessmentShowcaseProps {
  assessment: string
  score: number
}

export function AssessmentShowcase({ assessment, score }: AssessmentShowcaseProps) {
  const isPass = assessment.toLowerCase().includes("pass")
  const isExcellent = score >= 8
  const isGood = score >= 6

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-indigo-600/10 via-background to-purple-600/10 shadow-lg">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative p-8 sm:p-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                {isExcellent && <TrendingUp className="w-10 h-10 text-emerald-500 mb-3" />}
                {isGood && !isExcellent && <CheckCircle2 className="w-10 h-10 text-amber-500 mb-3" />}
                {!isGood && <AlertTriangle className="w-10 h-10 text-rose-500 mb-3" />}
                <h2 className="text-xl font-semibold text-foreground mb-2">Overall Assessment</h2>
              </div>

              <div className="text-right">
                <div
                  className={`text-4xl font-bold ${
                    isExcellent ? "text-emerald-500" : isGood ? "text-amber-500" : "text-rose-500"
                  }`}
                >
                  {score}/10
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-lg text-foreground leading-relaxed">{assessment}</p>

              {/* Score interpretation */}
              <div className="mt-6 pt-4 border-t border-border/50 flex gap-4">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Status</p>
                  <p className="text-sm font-semibold text-foreground">
                    {isExcellent && "Excellent"}
                    {isGood && !isExcellent && "Good"}
                    {!isGood && "Needs Work"}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Recommendation</p>
                  <p className="text-sm font-semibold text-foreground">
                    {isExcellent && "Ready to apply"}
                    {isGood && !isExcellent && "Review suggestions"}
                    {!isGood && "Major revisions"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
