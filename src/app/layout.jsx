import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "../../components/Provider";
import Navbar from "../../components/Navbar";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    /** Dynamic title updates on each page AUTOMATICALLY */
    template: "%s | Travel In Makkah",  // ← MAGIC LINE
    default: "Travel In Makkah | Trusted Hajj & Umrah Agency",  // Fallback
  },
  description: "Your trusted companion for sacred journeys. Experience spiritually fulfilling Hajj and Umrah pilgrimages with complete guidance and care.",
  keywords: "Hajj, Umrah, pilgrimage, Makkah, Madinah, Islamic travel, Bangladesh",
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8182060166306956"  ></script>
      </head>
      <body className="antialiased bg-[#FAF8F5]">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
