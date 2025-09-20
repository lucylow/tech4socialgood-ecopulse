import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./InterVariable.ttf",
});

export const metadata: Metadata = {
  title: "EcoPulse - Climate Impact Simulation",
  description:
    "Interactive 3D globe simulation that demonstrates the environmental impact of human actions on our planet. Explore climate change scenarios and understand the consequences of environmental decisions.",
  keywords:
    "climate change, environment, sustainability, simulation, 3D globe, education, EcoPulse, environmental impact",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
