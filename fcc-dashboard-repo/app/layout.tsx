import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FCC Pivote 2 — Cultura y Liderazgo Digital",
  description: "Dashboard interactivo del caso Federal Communications Commission bajo el liderazgo del CIO Dr. David Bray (2013–2016). Análisis del pivote 2 de cultura y liderazgo digital. Vector-AI MED · INCAE Digital Business 2025.",
  authors: [{ name: "Vladimir González Araya, MD" }],
  keywords: ["FCC", "transformación digital", "INCAE", "OKR", "cultura digital", "Bray"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
