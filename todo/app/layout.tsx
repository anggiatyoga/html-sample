import './globals.css'

export const metadata = {
  title: 'Travel Itinerary',
  description: 'A Next.js travel itinerary app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}