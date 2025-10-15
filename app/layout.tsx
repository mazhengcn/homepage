import type { Metadata } from "next"
import "./globals.css"
import BackToTopButton from "@/components/back-to-top"
import Footer from "@/components/footer"
import NavBar from "@/components/nav-bar"
import { ThemeProvider } from "@/components/theme-provider"
import { geistMono, geistSans } from "@/lib/fonts"
import 'katex/dist/katex.css';

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
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased leading-normal break-words transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="pt-20">
            <article className="prose prose-lg dark:prose-invert prose-a:no-underline mx-auto max-w-5xl px-8">
              {children}
            </article>
          </main>
          <BackToTopButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
