"use client"

import { useState } from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface PayPalDonationButtonProps {
  amount: number
  donationType: string
  name: string
  email: string
  message?: string
  anonymous: boolean
}

export default function PayPalDonationButton({
  amount,
  donationType,
  name,
  email,
  message,
  anonymous,
}: PayPalDonationButtonProps) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  return (
    <div className="w-full">
      <PayPalButtons
        style={{ layout: "vertical", shape: "rect" }}
        disabled={isProcessing}
        forceReRender={[amount, donationType, name, email]}
        createOrder={async (data, actions) => {
          // Create the order on PayPal's servers
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                  currency_code: "USD",
                },
                description: `${donationType.charAt(0).toUpperCase() + donationType.slice(1)} Donation to ZunoBotics`,
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          })
        }}
        onApprove={async (data, actions) => {
          setIsProcessing(true)

          try {
            // Capture the funds from the transaction
            const details = await actions.order!.capture()

            // Prepare the donation data with proper email handling
            const donationData = {
              orderID: data.orderID,
              paypalTransactionID: details.id,
              amount,
              name: anonymous ? "Anonymous" : name,
              // Only include email if it's a valid non-empty string
              email: email && email.trim() ? email.trim() : undefined,
              message: message && message.trim() ? message.trim() : undefined,
              anonymous,
              donationType,
            }

            // Save the donation in your database
            const response = await fetch("/api/donations/paypal", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(donationData),
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.error || "Failed to record donation")
            }

            // Redirect to thank you page
            router.push("/thank-you?provider=paypal")
          } catch (error) {
            console.error("Error processing PayPal donation:", error)
            toast({
              title: "Error",
              description: "There was a problem processing your donation. Please try again.",
              variant: "destructive",
            })
            setIsProcessing(false)
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err)
          toast({
            title: "PayPal Error",
            description: "There was a problem with PayPal. Please try again later.",
            variant: "destructive",
          })
          setIsProcessing(false)
        }}
      />
    </div>
  )
}
