import { Bebas_Neue, Montserrat, Lato } from 'next/font/google'

export const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400'],
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const lato = Lato({
    subsets: ['latin'],
    variable: '--font-body',
    weight: ['100', '300', '400', '700', '900'],
    })