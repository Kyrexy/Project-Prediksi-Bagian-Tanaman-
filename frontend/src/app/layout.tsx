import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klasifikasi Bagian Tanaman",
  description: "Aplikasi klasifikasi citra akar, daun, buah, dan batang menggunakan CNN",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id"><body>{children}</body></html>
  );
}
