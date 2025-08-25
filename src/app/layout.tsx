import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "./i18n-mock";
import { BackOfficeLayout } from "./components/BackOfficeLayout";
import { SettingsProvider } from "./contexts/SettingsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Back Office Dashboard",
  description: "Complete back office solution with CRUD operations and analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <SettingsProvider>
            <BackOfficeLayout>
              {children}
            </BackOfficeLayout>
          </SettingsProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
