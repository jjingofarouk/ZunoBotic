// app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    
    // Here you would typically:
    // 1. Validate the input
    // 2. Store in database or send email
    // 3. Return success/failure
    
    // For now, we'll just log and return success
    console.log('Contact form submission:', { name, email, message });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}