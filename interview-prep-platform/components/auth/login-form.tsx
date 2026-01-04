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
import { SignInValidation } from "@/validations/auth"
import { formatZodError } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { setToken } from "@/lib/memory"

export const LoginForm = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const { success: validationSuccess, data: ValidatedData, error: validationError } = SignInValidation.safeParse(form);

    if(!validationSuccess){
      ErrorToast(formatZodError(validationError));
      setIsLoading(false)
      return;
    }

    try {
      const res = await makeRequest('/api/auth/login',{
        method: "POST",
        body: JSON.stringify(ValidatedData)
      })
      if(!res) return;
      if(res.token){
        setToken(res.token as string);
        router.push('/dashboard')
      }
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
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Enter your email and password to access your interview dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm(prev =>({
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
