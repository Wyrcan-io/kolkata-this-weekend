import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { AppProvider } from "./context";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kolkata This Weekend - Weekend City Guide & Passes",
  description: "Curated weekend events, gigs, workshops, Durga Puja passes & hotlists in Kolkata.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${plusJakarta.className} antialiased`}>
        <Suspense fallback={null}>
          <AppProvider>{children}</AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
