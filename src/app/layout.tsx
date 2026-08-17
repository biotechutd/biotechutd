import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biotech UTD",
  description: "The student biotechnology club at The University of Texas at Dallas.",
  icons: {
    icon: "/images/ui/bioTechSquareLogo.png",
    apple: "/images/ui/bioTechSquareLogo.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
