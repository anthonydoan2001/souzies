import type { Metadata } from "next";
import { Montserrat, Inknut_Antiqua } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inknutAntiqua = Inknut_Antiqua({
  variable: "--font-inknut",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Souzies - Authentic Nigerian Cuisine",
  description:
    "Experience the best of Nigerian cuisine with Souzies. Freshly made meals, catering services, and our new food truck launch in March!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inknutAntiqua.variable} font-montserrat antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
