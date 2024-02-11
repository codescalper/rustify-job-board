import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rustify",
  description: "Rustify is a job board for Rust developers. Find your next Rust job here! 🦀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/rustify.png" sizes="any" />
      </head>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
      <body className={`${inter.className} min-w-[350px]` }>{children}</body>
      </ThemeProvider>
    </html>
  );
}
