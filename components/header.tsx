"use client";
import Link from "next/link";
import AutoHideHeader from "./auto-hide-header";
import InteractiveLogo from "./interactive-logo";
import NavigationDropdown from "./navigation-dropdown";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import MobileMenu from "./mobile-menu";

const servicesDropdown = [
  {
    title: "Веб-разработка",
    items: [
      {
        title: "Корпоративные сайты",
        href: "/services/corporate-info",
        description: "Представительство компании",
      },
      {
        title: "Интернет-магазины",
        href: "/services/ecommerce",
        description: "Платформа для продаж",
      },
      {
        title: "Лендинги",
        href: "/services/landing",
        description: "Продающие страницы",
      },
    ],
  },
  {
    title: "Дизайн",
    items: [
      {
        title: "Логотипы",
        href: "/services/logo",
        description: "Фирменный стиль",
      },
      {
        title: "Веб-дизайн",
        href: "/services/web-design",
        description: "UI/UX дизайн",
      },
      {
        title: "Брендинг",
        href: "/services/branding",
        description: "Комплексный подход",
      },
    ],
  },
  {
    title: "Автоматизация",
    items: [
      {
        title: "Telegram боты",
        href: "/services/telegram-bots",
        description: "Чат-боты для бизнеса",
      },
      {
        title: "CRM системы",
        href: "/services/crm",
        description: "Управление клиентами",
      },
      {
        title: "API интеграции",
        href: "/services/api",
        description: "Связь систем",
      },
    ],
  },
];

const companyDropdown = [
  {
    title: "О компании",
    items: [
      { title: "Наша история", href: "/about", description: "Как мы начинали" },
      { title: "Команда", href: "/team", description: "Наши специалисты" },
      { title: "Карьера", href: "/careers", description: "Работа у нас" },
    ],
  },
  {
    title: "Работы",
    items: [
      { title: "Портфолио", href: "/portfolio", description: "Наши проекты" },
      { title: "Кейсы", href: "/cases", description: "Истории успеха" },
      { title: "Отзывы", href: "/reviews", description: "Мнения клиентов" },
    ],
  },
  {
    title: "Ресурсы",
    items: [
      { title: "Блог", href: "/blog", description: "Статьи и новости" },
      { title: "FAQ", href: "/faq", description: "Частые вопросы" },
      { title: "Поддержка", href: "/support", description: "Помощь клиентам" },
    ],
  },
];

export default function Header() {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <AutoHideHeader>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              onClick={handleScrollToContact}
              className="flex items-center space-x-3"
            >
              <InteractiveLogo variant="header" />
              <span
                className="text-2xl font-bold text-gray-900 dark:text-white"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 700,
                }}
              >
                altergemu
              </span>
            </Link>
            <div className="hidden md:flex space-x-8 text-sm">
              <NavigationDropdown title="Услуги" sections={servicesDropdown} />
              <NavigationDropdown title="О нас" sections={companyDropdown} />
              <Link
                href="#contact"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2 font-medium"
              >
                Контакты
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm font-semibold">
              Связаться
            </Button>
            <MobileMenu
              servicesDropdown={servicesDropdown}
              companyDropdown={companyDropdown}
            />
          </div>
        </nav>
      </div>
    </AutoHideHeader>
  );
}
