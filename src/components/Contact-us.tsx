"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./Button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { AlertCircle, CheckCircle2, Send } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export default function ContactPage() {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
    message: "",
  })

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))

    // Reset status when user starts typing again after submission
    if (status.submitted) {
      setStatus({
        submitted: false,
        submitting: false,
        error: false,
        message: "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus((prev) => ({ ...prev, submitting: true }))

    try {
      // Replace this URL with your Formspree form endpoint
      const response = await fetch("https://formspree.io/f/your-formspree-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })

      if (response.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          error: false,
          message: "Thank you! Your message has been sent successfully.",
        })
        setInputs({
          name: "",
          email: "",
          message: "",
        })
      } else {
        const data = await response.json()
        throw new Error(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        error: true,
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Get in touch</CardTitle>
          <CardDescription>Fill out the form below and I&apos;ll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          {status.submitted && !status.error ? (
            <Alert className="mb-6 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          ) : status.error ? (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                required
                value={inputs.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={inputs.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="What would you like to say?"
                className="min-h-[150px]"
                required
                value={inputs.message}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto" disabled={status.submitting}>
              {status.submitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send message
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-sm text-muted-foreground">
          <p>Your information will never be shared with third parties.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

