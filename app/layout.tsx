import type { Metadata } from "next";
import "./globals.css";
import Opening from "./components/opening/Opening";

export const metadata: Metadata = {
  title: "ECLETS — By Abdullah Baloch",
  description:
    "ECLETS — Contemporary menswear by Abdullah Baloch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Opening />
        {children}
      </body>
    </html>
  );
}