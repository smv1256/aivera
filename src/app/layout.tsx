import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";

export const inter = Inter({ subsets: ["latin"] });
export const lato = Lato({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${lato.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
