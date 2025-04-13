import { Pool } from "pg"
import { neon } from "@neondatabase/serverless"

// Create a SQL client with Neon
export const sql = neon(process.env.DATABASE_URL!)

// Create a connection pool for more complex operations
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Helper function to generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
