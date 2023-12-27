import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TRPCProvider from "@/components/providers/trpc-provider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ModalProvider from "@/components/providers/modal-provider";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkTab",
  description: "Your go to place for all your links management!!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <TRPCProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <ModalProvider />
              <Toaster />
              <Navbar />
              {children}
            </ThemeProvider>
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
