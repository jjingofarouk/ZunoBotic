import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { sql } from "@/lib/db"
import Stripe from "stripe"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-03-31.basil",
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("stripe-signature") as string

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string)
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`)
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    // Update donation status in database
    await sql`
      UPDATE donations
      SET status = 'completed', paid_at = NOW(), updated_at = NOW()
      WHERE stripe_session_id = ${session.id}
    `

    // You could also send a thank you email here
  }

  return NextResponse.json({ received: true })
}

// This is needed to handle Stripe webhook events
export const config = {
  api: {
    bodyParser: false,
  },
}
