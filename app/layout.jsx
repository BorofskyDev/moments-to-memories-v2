import { bebasNeue, montserrat, lato } from './fonts'
import '../styles/globals.scss'
import Header from '@/components/layout/header/Header'
import { AuthProvider } from '@/libs/context/AuthContext'
import Footer from '@/components/layout/footer/Footer'

export const metadata = {
  title: 'Moments to Memories',
  description: 'Generated by create next app',
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
