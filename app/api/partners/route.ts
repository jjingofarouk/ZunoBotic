import { NextResponse } from "next/server"
import { sql, generateId } from "@/lib/db"

export async function GET() {
  try {
    const partners = await sql`
      SELECT id, name, logo, website, created_at as "createdAt", updated_at as "updatedAt"
      FROM partners
      ORDER BY name ASC
    `

    return NextResponse.json(partners)
  } catch (error) {
    console.error("Error fetching partners:", error)
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, logo, website } = body

    // Generate a unique ID
    const id = generateId()

    const partner = await sql`
      INSERT INTO partners (id, name, logo, website, created_at, updated_at)
      VALUES (${id}, ${name}, ${logo || null}, ${website || null}, NOW(), NOW())
      RETURNING id, name, logo, website, created_at as "createdAt", updated_at as "updatedAt"
    `

    return NextResponse.json(partner[0])
  } catch (error) {
    console.error("Error creating partner:", error)
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 })
  }
}
