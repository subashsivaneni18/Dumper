import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import {SessionProviderWrap}  from "@/app/providers/SessionProvider";

const roboto = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProviderWrap>
          <ChakraProvider>{children}</ChakraProvider>
        </SessionProviderWrap>
      </body>
    </html>
  );
}