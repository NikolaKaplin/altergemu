"use client";
import Image from "next/image";
import { Code, Palette, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import InteractiveLogo from "@/components/interactive-logo";

import AnimatedSection from "@/components/animated-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <InteractiveLogo variant="hero" />
          </div>
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 800,
            }}
          >
            altergemu
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-2 font-semibold">
            Команда разработчиков IT-контента.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 font-semibold">
            Создаем цифровые решения для вашего бизнеса.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-semibold">
              Узнать больше
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 rounded-full px-8 py-3 text-lg font-semibold"
            >
              Наши работы
            </Button>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <section className="py-8">
        {/* Websites Section */}
        <AnimatedSection delay={0}>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="text-white">
                  <h2
                    className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 800,
                    }}
                  >
                    Сайты
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-2 opacity-90 font-medium">
                    Идеальное решение для представления
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 font-medium">
                    вашего бизнеса в интернете.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full px-8 py-3 text-lg font-semibold backdrop-blur-sm">
                      Узнать больше
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/50 text-white rounded-full px-8 py-3 text-lg font-semibold bg-white/10 hover:scale-105 transition-transform duration-200"
                    >
                      от 15 000 ₽
                    </Button>
                  </div>
                  <p className="text-sm opacity-75 font-medium"></p>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <Image
                      src="/website.webp"
                      alt="Примеры сайтов"
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-2xl"
                      style={{
                        transform:
                          "perspective(1000px) rotateY(-15deg) rotateX(5deg)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Design Section */}
        <AnimatedSection delay={200}>
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800 py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="lg:order-2 text-white">
                  <h2
                    className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 800,
                    }}
                  >
                    Дизайн
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-2 opacity-90 font-medium">
                    Создаем уникальный визуальный образ
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 font-medium">
                    вашего бренда.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full px-8 py-3 text-lg font-semibold backdrop-blur-sm">
                      Узнать больше
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/50 text-white rounded-full px-8 py-3 text-lg font-semibold bg-white/10 hover:scale-105 transition-transform duration-200"
                    >
                      от 10 000 ₽
                    </Button>
                  </div>
                  <p className="text-sm opacity-75 font-medium"></p>
                </div>
                <div className="lg:order-1 flex justify-center">
                  <div className="relative">
                    <Image
                      src="/design.webp"
                      alt="Примеры сайтов"
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-2xl"
                      style={{
                        transform:
                          "perspective(1000px) rotateY(-15deg) rotateX(5deg)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* E-commerce Section */}
        <AnimatedSection delay={400}>
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 dark:from-green-600 dark:to-emerald-800 py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="text-white">
                  <h2
                    className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 800,
                    }}
                  >
                    Интернет-магазины
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-2 opacity-90 font-medium">
                    Полнофункциональная платформа
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 font-medium">
                    для онлайн-продаж.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full px-8 py-3 text-lg font-semibold backdrop-blur-sm">
                      Узнать больше
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/50 text-white rounded-full px-8 py-3 text-lg font-semibold bg-white/10 hover:scale-105 transition-transform duration-200"
                    >
                      от 100 000 ₽
                    </Button>
                  </div>
                  <p className="text-sm opacity-75 font-medium"></p>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <Image
                      src="/market.webp"
                      alt="Примеры сайтов"
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-2xl"
                      style={{
                        transform:
                          "perspective(1000px) rotateY(-15deg) rotateX(5deg)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Telegram Bots Section */}
        <AnimatedSection delay={600}>
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 dark:from-cyan-600 dark:to-blue-700 py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="lg:order-2 text-white">
                  <h2
                    className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 800,
                    }}
                  >
                    Telegram боты
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-2 opacity-90 font-medium">
                    Автоматизация бизнес-процессов
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 font-medium">
                    и обслуживания клиентов.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full px-8 py-3 text-lg font-semibold backdrop-blur-sm">
                      Узнать больше
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/50 text-white rounded-full px-8 py-3 text-lg font-semibold bg-white/10 hover:scale-105 transition-transform duration-200"
                    >
                      по договоренности
                    </Button>
                  </div>
                  <p className="text-sm opacity-75 font-medium"></p>
                </div>
                <div className="lg:order-1 flex justify-center">
                  <div className="relative">
                    <Image
                      src="/telegram-bot.webp"
                      alt="Примеры сайтов"
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-2xl"
                      style={{
                        transform:
                          "perspective(1000px) rotateY(-15deg) rotateX(5deg)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* IT Solutions Section */}
        <AnimatedSection delay={800}>
          <div className="bg-gradient-to-br from-orange-400 to-red-500 dark:from-orange-600 dark:to-red-700 py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="text-white">
                  <h2
                    className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 800,
                    }}
                  >
                    IT-решения
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-2 opacity-90 font-medium">
                    Индивидуальные проекты
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 font-medium">
                    любой сложности.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full px-8 py-3 text-lg font-semibold backdrop-blur-sm">
                      Узнать больше
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/50 text-white rounded-full px-8 py-3 text-lg font-semibold bg-white/10 hover:scale-105 transition-transform duration-200"
                    >
                      по договоренности
                    </Button>
                  </div>
                  <p className="text-sm opacity-75 font-medium"></p>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <Image
                      src="/it.webp"
                      alt="Примеры сайтов"
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-2xl"
                      style={{
                        transform:
                          "perspective(1000px) rotateY(-15deg) rotateX(5deg)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* About Section */}
      <AnimatedSection delay={600}>
        <section className="bg-white/50 dark:bg-gray-900/50 py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 800,
              }}
            >
              О компании
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto font-semibold">
              Мы на рынке разработки уже несколько лет и знаем, как создавать
              качественные IT-решения, которые помогают бизнесу расти и
              развиваться.
            </p>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Опыт
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Многолетний опыт в разработке веб-решений
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Дизайн
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Современный и функциональный дизайн
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Технологии
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Используем передовые технологии
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection delay={700}>
        <section className="bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 800,
              }}
            >
              Готовы начать проект?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 font-semibold">
              Свяжитесь с нами для обсуждения деталей и получения персонального
              предложения.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-semibold">
                Написать в Telegram
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 rounded-full px-8 py-3 text-lg font-semibold"
              >
                Заказать звонок
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
