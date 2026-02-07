import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: 'Kairo - Know Your Rights. Raise Your Voice. Create Change.',
  description: "India's first unified civic action platform connecting rights education with direct government outreach",
  keywords: ['civic rights', 'petitions', 'India', 'government', 'activism', 'rights education'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
