import { RootProvider } from "fumadocs-ui/provider/next"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Noto_Sans_SC } from "next/font/google"
import "./globals.css"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
})

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans",
})

export const metadata: Metadata = {
  title: "Zheng Ma's Personal Website",
  description: "Welcome to my personal website!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interSans.variable} ${jetBrainsMono.variable} ${notoSansSC.variable} font-sans antialiased leading-normal break-words transition-colors duration-500`}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
