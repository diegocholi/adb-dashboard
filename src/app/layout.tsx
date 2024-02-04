import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <script src='https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js'></script>
        <script src='https://code.jquery.com/jquery-3.7.1.min.js'></script>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css'
        ></link>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
