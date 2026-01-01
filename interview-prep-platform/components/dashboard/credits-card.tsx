"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CreditsCardProps {
  credits: number
}

export function CreditsCard({ credits }: CreditsCardProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Interview Credits</CardTitle>
        <CardDescription>Sessions remaining for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-4xl font-bold text-primary">{credits}</div>
            <p className="text-sm text-muted-foreground mt-2">sessions available</p>
          </div>
          <Button variant="outline" size="sm">
            Buy More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
