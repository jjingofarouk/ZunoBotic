import { NextResponse } from "next/server"
import { z } from "zod"
import { sql, generateId } from "@/lib/db"

// Donation schema validation with more flexible email handling
const paypalDonationSchema = z.object({
  orderID: z.string(),
  paypalTransactionID: z.string(),
  amount: z.number().min(1),
  name: z.string(),
  // Make email more flexible - it can be a valid email, empty string, or undefined
  email: z.union([z.string().email(), z.string().length(0), z.undefined()]).optional(),
  message: z.string().optional(),
  anonymous: z.boolean().optional(),
  donationType: z.enum(["one-time", "supporter", "innovator", "pioneer", "visionary"]),
})

export async function POST(req: Request) {
  try {
    // Log the request body for debugging
    const body = await req.json()
    console.log("PayPal donation request body:", body)

    // Parse with more lenient validation
    const validatedData = paypalDonationSchema.parse(body)

    // Extract fields with proper handling for email
    const { orderID, paypalTransactionID, amount, name, email, message, anonymous, donationType } = validatedData

    // Generate a unique ID for the donation
    const id = generateId()

    // Store donation in database - ensure email is null if it's empty or invalid
    const emailToStore = email && email.length > 0 ? email : null

    await sql`
      INSERT INTO donations (
        id, amount, name, email, message, anonymous, donation_type, status, 
        stripe_session_id, paypal_transaction_id, paid_at, created_at, updated_at
      )
      VALUES (
        ${id}, ${amount}, ${name}, ${emailToStore}, ${message || null}, 
        ${anonymous || false}, ${donationType}, 'completed', 
        null, ${paypalTransactionID}, NOW(), NOW(), NOW()
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("PayPal donation error:", error)

    // More detailed error logging
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", JSON.stringify(error.errors, null, 2))
    }

    return NextResponse.json({ error: "Failed to process donation" }, { status: 500 })
  }
}
