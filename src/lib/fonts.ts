import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google"

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
})
