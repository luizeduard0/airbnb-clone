import type { Metadata } from 'next'
import './globals.css'

import { Nunito } from 'next/font/google'
import Navbar from '@/app/components/navbar/Navbar'

const font = Nunito({
  subsets: ['latin']
})

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
