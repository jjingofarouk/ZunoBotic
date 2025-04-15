// app/api/test/route.ts
import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const result = await sql`SELECT NOW() as time`
    return NextResponse.json({ 
      message: "Database connection successful", 
      time: result[0].time 
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      { error: "Failed to connect to database" },
      { status: 500 }
    )
  }
}