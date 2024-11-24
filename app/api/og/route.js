// app/api/og/route.js
import { ImageResponse } from '@vercel/og'

export const runtime = 'edge' // Updated configuration

export async function GET() {
  // Note the use of GET for route handlers
  // Fetch the home page image or any dynamic content you want
  const imageUrl = 'https://www.momentstomemories.com/path-to-home-image.jpg' // Replace with your image URL

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          Moments to Memories
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
