import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
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
  title: "Travel In Makkah | Trusted Hajj & Umrah Agency",
  description: "Your trusted companion for sacred journeys. Experience spiritually fulfilling Hajj and Umrah pilgrimages with complete guidance and care.",
  keywords: "Hajj, Umrah, pilgrimage, Makkah, Madinah, Islamic travel, Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="antialiased bg-[#FAF8F5]">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
