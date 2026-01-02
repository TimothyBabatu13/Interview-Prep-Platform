"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorToast } from "../ui/toast"
import { makeRequest } from "@/lib/api-wrapper"

export const SignupForm = () => {

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (form.password !== form.confirmPassword) {
      ErrorToast(`Password does not match`)
      setIsLoading(false)
      return
    }

    try {
      const res = await makeRequest('/api/auth/signup',{
        method: "POST",
        body: JSON.stringify(form)
      })

      if(!res) return;

      console.log(res)
    } catch (err) {
      const error = err as Error;
      console.log(error)
      ErrorToast(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>Sign up to start preparing for your interviews</CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={handleSubmit} 
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm(prev => ({
                ...prev,
                email: e.target.value
              }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm(prev => ({
                ...prev,
                password: e.target.value
              }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) => setForm(prev => ({
                ...prev,
                confirmPassword: e.target.value
              }))}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
