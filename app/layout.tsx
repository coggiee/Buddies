import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthSession from "./_wrapper/AuthSession";
import { Roboto } from "next/font/google";
import RecoilRootWrapper from "./_wrapper/RecoilRootWrapper";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buddies",
  description: "Generated by create next app",
};

// RootLayout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${roboto.variable}`}>
      {/* <link rel='preload' as='font' /> */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/images/icon-512x512.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="theme-color" content="#ffffff" />
      <head></head>
      <body>
        <AuthSession>
          <RecoilRootWrapper>{children}</RecoilRootWrapper>
        </AuthSession>
      </body>
    </html>
  );
}
