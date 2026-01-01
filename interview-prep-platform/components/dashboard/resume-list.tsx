"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Resume {
  id: string
  name: string
  uploadDate: string
  status: "analyzed" | "analyzing" | "pending"
  overallScore: number
}

interface ResumeListProps {
  resumes: Resume[]
  onDelete?: (id: string) => void
}

export function ResumeList({ resumes, onDelete }: ResumeListProps) {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "analyzed":
        return "Analysis Complete"
      case "analyzing":
        return "Analyzing..."
      case "pending":
        return "Pending"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Resumes</CardTitle>
        <CardDescription>Manage and track your resume uploads</CardDescription>
      </CardHeader>
      <CardContent>
        {resumes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No resumes uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/5 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{resume.name}</h4>
                      <p className="text-xs text-muted-foreground">{resume.uploadDate}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getStatusColor(resume.status) as any}>{getStatusText(resume.status)}</Badge>
                  {resume.status === "analyzed" && (
                    <div className="text-right">
                      <p className="font-semibold text-primary">{resume.overallScore}/10</p>
                      <p className="text-xs text-muted-foreground">Overall Score</p>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete?.(resume.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
