import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FudiSplashScreen } from "@/components/FudiSplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "fudiGPT - AI para Restaurantes", 
  description: "Inteligencia artificial avanzada para optimizar tu restaurante",
  icons: {
    icon: "/favicon.png", // ¡Así de simple!
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <FudiSplashScreen />
        {children}
      </body>
    </html>
  );
}
