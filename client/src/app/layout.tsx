import Navbar from "@/components/navbar/Navbar";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { getBlogs } from "@/helpers/getBlogs";

const inter = Inter({
  weight: ["400", "700", "500", "600", "800", "900", "100", "200", "300"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Postblitz",
  description: "Blog website for tech solutions",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogs = await getBlogs();

  return (
    <html lang="en">
      <body
        className={`${inter.className} relative bg-[url('/bg.png')] bg-cover bg-center`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
