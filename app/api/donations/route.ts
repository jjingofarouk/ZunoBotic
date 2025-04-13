import { NextResponse } from "next/server"
import { z } from "zod"
import { sql, generateId } from "@/lib/db"

// Donation schema validation
const donationSchema = z.object({
  amount: z.number().min(1),
  name: z.string().optional(),
  email: z.string().email().optional(),
  message: z.string().optional(),
  anonymous: z.boolean().optional(),
  donationType: z.enum(["one-time", "supporter", "innovator", "pioneer", "visionary"]),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { amount, name, email, message, anonymous, donationType } = donationSchema.parse(body)

    // Generate a unique ID for the donation
    const id = generateId()

    // Check if we're in development/preview mode or if Stripe keys are missing
    const isDevMode = !process.env.STRIPE_SECRET_KEY || process.env.NODE_ENV === "development"

    let checkoutUrl = ""
    let stripeSessionId = ""

    if (isDevMode) {
      // Mock Stripe session for development/preview
      console.log("Using mock Stripe session for development/preview")
      stripeSessionId = `mock_session_${Math.random().toString(36).substring(2, 15)}`
      checkoutUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/thank-you?session_id=${stripeSessionId}&mock=true`
    } else {
      // Use real Stripe in production
      try {
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `${donationType.charAt(0).toUpperCase() + donationType.slice(1)} Donation to ZunoBotics`,
                  description: "Thank you for supporting open-source robotics innovation in Africa",
                },
                unit_amount: amount * 100, // Stripe uses cents
              },
              quantity: 1,
            },
          ],
          metadata: {
            name: name || "Anonymous",
            email: email || "",
            message: message || "",
            anonymous: anonymous ? "true" : "false",
            donationType,
          },
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/support`,
        })
        stripeSessionId = session.id
        checkoutUrl = session.url
      } catch (stripeError) {
        console.error("Stripe error:", stripeError)
        return NextResponse.json({ error: "Payment processing error" }, { status: 500 })
      }
    }

    // Store donation intent in database
    await sql`
      INSERT INTO donations (id, amount, name, email, message, anonymous, donation_type, status, stripe_session_id, created_at, updated_at)
      VALUES (${id}, ${amount}, ${name || "Anonymous"}, ${email || null}, ${message || null}, ${anonymous || false}, ${donationType}, 'pending', ${stripeSessionId}, NOW(), NOW())
    `

    return NextResponse.json({ url: checkoutUrl })
  } catch (error) {
    console.error("Donation error:", error)
    return NextResponse.json({ error: "Failed to process donation" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get total amount raised (only count completed donations)
    const totalRaisedResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as total_raised
      FROM donations
      WHERE status = 'completed'
    `

    // Handle the result properly - Neon returns an array of rows
    const totalRaised = Number.parseFloat(totalRaisedResult[0]?.total_raised || "0")

    // Get recent public donations
    const recentDonationsResult = await sql`
      SELECT id, amount, name, message, donation_type as "donationType", created_at as "createdAt"
      FROM donations
      WHERE status = 'completed' AND anonymous = false
      ORDER BY created_at DESC
      LIMIT 5
    `

    // Format the dates properly for JSON serialization
    const recentDonations = recentDonationsResult.map((donation) => ({
      ...donation,
      amount: Number.parseFloat(donation.amount),
      createdAt: donation.createdAt.toISOString(),
    }))

    return NextResponse.json({
      totalRaised,
      recentDonations,
    })
  } catch (error) {
    console.error("Error fetching donation data:", error)
    return NextResponse.json({ error: "Failed to fetch donation data" }, { status: 500 })
  }
}
