import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/header";
import { FullPageLogoInteraction } from "@/components/interactive-logo";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "altergemu - Команда разработчиков IT-контента",
  description:
    "Создаем сайты, приложения и цифровые решения для вашего бизнеса. Корпоративные сайты, интернет-магазины, дизайн, Telegram боты и другие IT-решения.",
  keywords:
    "разработка сайтов, создание сайтов, веб-разработка, дизайн логотипов, telegram боты, интернет-магазины",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FullPageLogoInteraction>
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Header />
        <br />
        {children}
        <Footer />
      </div>
    </FullPageLogoInteraction>
  );
}
