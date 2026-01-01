"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface InterviewSetupProps {
  onStart: (config: InterviewConfig) => void
  isLoading?: boolean
}

export interface InterviewConfig {
  role: string
  level: string
  duration: number
}

const roles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "UI/UX Designer",
  "DevOps Engineer",
]

const levels = ["Junior", "Mid-Level", "Senior", "Staff/Principal"]

export function InterviewSetup({ onStart, isLoading }: InterviewSetupProps) {
  const [selectedRole, setSelectedRole] = useState("Software Engineer")
  const [selectedLevel, setSelectedLevel] = useState("Mid-Level")
  const [selectedDuration, setSelectedDuration] = useState(30)

  function handleStart() {
    onStart({
      role: selectedRole,
      level: selectedLevel,
      duration: selectedDuration,
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Interview Configuration</CardTitle>
        <CardDescription>Choose your interview settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Target Role</Label>
          <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles.map((role) => (
                <div
                  key={role}
                  className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-secondary/5 cursor-pointer"
                >
                  <RadioGroupItem value={role} id={role} />
                  <Label htmlFor={role} className="cursor-pointer font-normal">
                    {role}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Level Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Experience Level</Label>
          <RadioGroup value={selectedLevel} onValueChange={setSelectedLevel}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {levels.map((level) => (
                <div
                  key={level}
                  className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-secondary/5 cursor-pointer"
                >
                  <RadioGroupItem value={level} id={level} />
                  <Label htmlFor={level} className="cursor-pointer font-normal">
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Duration Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Interview Duration</Label>
          <RadioGroup value={selectedDuration.toString()} onValueChange={(v) => setSelectedDuration(Number(v))}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[15, 30, 45, 60].map((duration) => (
                <div
                  key={duration}
                  className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-secondary/5 cursor-pointer"
                >
                  <RadioGroupItem value={duration.toString()} id={`duration-${duration}`} />
                  <Label htmlFor={`duration-${duration}`} className="cursor-pointer font-normal">
                    {duration}m
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Summary */}
        <div className="bg-secondary/20 border border-secondary p-4 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Your Interview Session</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Role:</span> {selectedRole}
            </li>
            <li>
              <span className="text-foreground font-medium">Level:</span> {selectedLevel}
            </li>
            <li>
              <span className="text-foreground font-medium">Duration:</span> {selectedDuration} minutes
            </li>
          </ul>
        </div>

        {/* Start Button */}
        <Button onClick={handleStart} disabled={isLoading} className="w-full h-12 text-base" size="lg">
          {isLoading ? "Connecting to AI..." : "Start Interview"}
        </Button>
      </CardContent>
    </Card>
  )
}
