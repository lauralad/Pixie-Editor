//add clerk auth provider

import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "./globals.css";


const IBMPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',

});
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Pixie Editor",
  description: "A simple document scanner and editor during the day, an AI-powered image editor at night.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={
      {variables: { colorPrimary: '#a7b2c4'}}
    }>
      <html lang="en">
        <body
        //   className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        // >
          className={cn("font-IBMPlex antialiased", IBMPlex.variable)}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
    
  );
}
