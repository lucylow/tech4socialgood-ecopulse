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
    "climate change, environment, sustainability, simulation, 3D globe, education, EcoPulse, environmental impact, accessibility, inclusive design",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  other: {
    'color-scheme': 'dark light',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
