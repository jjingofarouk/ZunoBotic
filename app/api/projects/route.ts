import { NextResponse } from "next/server"
import { sql, generateId } from "@/lib/db"

export async function GET() {
  try {
    const projects = await sql`
      SELECT id, title, description, image, tags, university, created_at as "createdAt", updated_at as "updatedAt"
      FROM projects
      ORDER BY created_at DESC
    `

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, image, tags, university } = body

    // Generate a unique ID
    const id = generateId()

    const project = await sql`
      INSERT INTO projects (id, title, description, image, tags, university, created_at, updated_at)
      VALUES (${id}, ${title}, ${description}, ${image || null}, ${tags || []}, ${university}, NOW(), NOW())
      RETURNING id, title, description, image, tags, university, created_at as "createdAt", updated_at as "updatedAt"
    `

    return NextResponse.json(project[0])
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
