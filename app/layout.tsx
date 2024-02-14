import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Rustify",
    template:  `%s | Rustify`,
  },
  description:
    "Rustify is a job board for Rust developers. Find your next Rust job here! 🦀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/rustify.png" sizes="any" />
      </head>

      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <body className={`${inter.className} min-w-[350px]`}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
