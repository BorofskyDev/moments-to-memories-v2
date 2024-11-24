import { bebasNeue, montserrat, lato } from './fonts'
import '../styles/globals.scss'
import Header from '@/components/layout/header/Header'
import { AuthProvider } from '@/libs/context/AuthContext'
import Footer from '@/components/layout/footer/Footer'

export const metadata = {
  title: 'Moments to Memories by KAL',
  description:
    'Transforming life’s fleeting moments into timeless works of art. At Moments to Memories, we capture your unique story through photography, creating memories that last a lifetime.',
  openGraph: {
    title: 'Moments to Memories by Kelli Ann Leibold',
    description:
      'Transforming life’s fleeting moments into timeless works of art. Capture your unique story through photography.',
    url: 'https://www.momentstomemoriesbykal.com', // Replace with your actual domain
    siteName: 'Moments to Memories by KAL',
    images: [
      {
        url: '/api/og', // We'll create this API route next
        width: 1200,
        height: 630,
        alt: 'Moments to Memories Home Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moments to Memories by Kelli Ann Leibold',
    description:
      'Transforming life’s fleeting moments into timeless works of art.',
    images: ['/api/og'], // Or '/og-image.jpg' if using a static image
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${bebasNeue.variable} ${montserrat.variable} ${lato.variable}`}
      >
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
