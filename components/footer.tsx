"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setTimeout(() => setIsSubscribed(false), 3000)
    setEmail("")
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Услуги</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/services/corporate-info"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Корпоративные сайты
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ecommerce"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Интернет-магазины
                </Link>
              </li>
              <li>
                <Link
                  href="/services/logo"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Дизайн логотипов
                </Link>
              </li>
              <li>
                <Link
                  href="/services/telegram-bots"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Telegram боты
                </Link>
              </li>
              <li>
                <Link
                  href="/services/app-concept"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Разработка приложений
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Компания</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#about"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Портфолио
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Команда
                </Link>
              </li>
              <li>
                <Link
                  href="#careers"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Карьера
                </Link>
              </li>
              <li>
                <Link
                  href="#blog"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Поддержка</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Связаться с нами
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link
                  href="#documentation"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Документация
                </Link>
              </li>
              <li>
                <Link
                  href="#status"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Статус сервисов
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Контакты</h4>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>info@altergemu.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>Москва, Россия</span>
              </div>
            </div>
            <div className="flex space-x-3 pt-2">
              <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Новости</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Подпишитесь на наши новости и получайте актуальную информацию о IT-трендах.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-sm"
                required
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg text-sm font-medium"
                disabled={isSubscribed}
              >
                {isSubscribed ? "Подписка оформлена!" : "Подписаться"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-gray-900 dark:text-white">altergemu</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-600 dark:text-gray-300">
              <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Условия использования
              </Link>
              <Link href="/cookies" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Файлы cookie
              </Link>
            </div>
          </div>
          <div className="text-center md:text-left mt-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 altergemu. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
