import { NextResponse } from 'next/server'

export function POST() {
  const response = NextResponse.json({ success: true })

  response.cookies.delete('userId')
  response.cookies.delete('userRole')

  return response
}