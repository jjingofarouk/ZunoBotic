"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface DonationFormProps {
  donationType: "one-time" | "supporter" | "innovator" | "pioneer" | "visionary"
  defaultAmount?: number
}

export default function DonationForm({ donationType, defaultAmount = 50 }: DonationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [donationAmount, setDonationAmount] = useState(defaultAmount)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleDonationChange = (value: number[]) => {
    setDonationAmount(value[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: donationAmount,
          name: isAnonymous ? "" : name,
          email,
          message,
          anonymous: isAnonymous,
          donationType,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()

      // Redirect to Stripe checkout or thank you page
      if (data.url) {
        router.push(data.url)
      } else {
        throw new Error("No redirect URL provided")
      }
    } catch (error) {
      console.error("Donation error:", error)
      setError("Failed to process your donation. Please try again later.")
      toast({
        title: "Error",
        description: "Failed to process your donation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Label htmlFor="amount">Donation Amount (USD)</Label>
        <div className="mt-2">
          <Slider
            id="amount"
            defaultValue={[defaultAmount]}
            min={10}
            max={500}
            step={5}
            value={[donationAmount]}
            onValueChange={handleDonationChange}
            className="my-6"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>$10</span>
            <span>${donationAmount}</span>
            <span>$500</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isAnonymous}
            placeholder="Your name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share why you're supporting ZunoBotics..."
            className="mt-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) => setIsAnonymous(checked === true)}
          />
          <Label htmlFor="anonymous">Make my donation anonymous</Label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 py-6 text-lg text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : `Donate $${donationAmount}`} <Heart className="ml-2 h-5 w-5" />
      </Button>
    </form>
  )
}
