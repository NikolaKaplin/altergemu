import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Веб-разработка", href: "/services" },
      { name: "UI/UX Дизайн", href: "/services" },
      { name: "Консультации", href: "/services" },
    ],
    company: [
      { name: "О нас", href: "/about" },
      { name: "Карьера", href: "/careers" },
      { name: "Блог", href: "/blog" },
    ],
    support: [
      { name: "Поддержка", href: "/support" },
      { name: "FAQ", href: "/faq" },
      { name: "Портфолио", href: "/portfolio" },
      { name: "Отзывы", href: "/reviews" },
    ],
    legal: [
      { name: "Политика конфиденциальности", href: "/privacy" },
      { name: "Условия использования", href: "/terms" },
    ],
  };

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/altergemuu", icon: Github },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Email", href: "mailto:info@company.com", icon: Mail },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 block">
              altergemu
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Создаем цифровые решения для вашего бизнеса. Веб-разработка,
              мобильные приложения и консультации от команды профессионалов.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@altergemu.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Москва, Россия</span>
              </div>
            </div>

            <div id="contact" className="flex gap-4">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="sm" asChild>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-4 h-4" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Услуги</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Компания</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Поддержка</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Newsletter */}
        <div className="text-center mb-8">
          <h3 className="font-semibold text-lg mb-4">
            Подпишитесь на обновления
          </h3>
          <p className="text-gray-300 mb-4 max-w-md mx-auto">
            Получайте уведомления о новых статьях, проектах и специальных
            предложениях
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Ваш email"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button>Подписаться</Button>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-300 text-sm">
            © {currentYear} altergemu. Все права защищены.
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            {footerLinks.legal.map((link, index) => (
              <span key={link.name} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="text-gray-600">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
