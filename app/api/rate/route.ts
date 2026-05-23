import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy')
  try {
    const { slug, rating, toolName } = await request.json()

    if (!slug || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Send the email notification
    const { data, error } = await resend.emails.send({
      from: 'WebToolkit Pro Rating System <hello@wtkpro.site>',
      to: ['hello@wtkpro.site'],
      subject: `⭐ New Tool Rating: ${rating}/5 for ${toolName || slug}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #00D4B4;">New User Rating Received</h2>
          <p>A user just submitted a new rating on the site.</p>
          <table style="border-collapse: collapse; width: 100%; max-width: 500px; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Tool Name</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${toolName || 'Unknown Tool'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Tool Slug</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${slug}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Rating Given</td>
              <td style="padding: 10px; border: 1px solid #ddd; font-size: 18px; color: #f59e0b;">
                ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)
              </td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">
            Sent automatically from WebToolkit Pro serverless edge.
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Resend API Error:', error)
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Failed to process rating API:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
