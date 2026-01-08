"use client"

import { ArrowLeft, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ResumeDetailHeaderProps {
  name: string
  uploadDate: string
  overallScore: number
  status: "analyzed" | "analyzing" | "pending"
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "analyzed":
      return "default"
    case "analyzing":
      return "secondary"
    case "pending":
      return "outline"
    default:
      return "secondary"
  }
}

const getScoreColor = (score: number) => {
  if (score >= 8) return "bg-emerald-600/20 text-emerald-300 border-emerald-600/30"
  if (score >= 6) return "bg-amber-600/20 text-amber-300 border-amber-600/30"
  return "bg-rose-600/20 text-rose-300 border-rose-600/30"
}

export const ResumeDetailHeader = ({ name, uploadDate, overallScore, status }: ResumeDetailHeaderProps) => {
  return (
    <div className="mb-8 border-b border-border/50 pb-8">
      <Link href="/dashboard">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Resumes
        </Button>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">{name}</h1>
          <p className="text-muted-foreground text-sm">Uploaded {uploadDate}</p>
        </div>

        <div className="flex items-center gap-3">
          {status === "analyzed" && (
            <div className={`border rounded-lg px-4 py-3 text-center ${getScoreColor(overallScore)}`}>
              <div className="text-3xl font-bold">{overallScore}</div>
              <div className="text-xs uppercase tracking-wider mt-1">Overall Score</div>
            </div>
          )}

          {status === "analyzing" && <Badge variant={getStatusColor(status)}>Analyzing...</Badge>}

          <Button variant="outline" size="icon" title="Download">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" title="Share">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
