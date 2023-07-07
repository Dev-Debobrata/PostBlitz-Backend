import Navbar from "@/components/Navbar";
import "./globals.css";
import { Roboto_Slab, Ubuntu } from "next/font/google";
import Footer from "@/components/Footer";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ubuntu",
});

const roboto_slab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
});

export const metadata = {
  title: "Postblitz",
  description: "A simple, fast, and free blogging platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto_slab.variable} ${ubuntu.variable}`}
      data-theme="corporate"
    >
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
