'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../../components/Provider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-50`}>
        <Providers>
          {!isAdminRoute && <Navbar />}
          
          <div className={!isAdminRoute ? "mt-20" : ""}>
            {children}
          </div>

          {!isAdminRoute && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
