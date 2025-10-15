import {
  Geist,
  Geist_Mono,
  Inter,
  JetBrains_Mono,
  Noto_Sans_SC,
} from "next/font/google"

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
})

export const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
})
