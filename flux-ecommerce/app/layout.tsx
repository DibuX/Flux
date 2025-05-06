import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flux | Tienda de Ropa",
  description: "Descubre tu estilo con Flux - Ropa urbana para los que marcan tendencia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
