import Image from "next/image"
import { ArrowRight, Twitter, Instagram, Youtube, Disc } from "lucide-react"
import Link from "next/link"
import { ServiceCard } from "@/components/shared/service-card"


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center justify-center">
            <Image src="/altergemu.svg" alt="Altergemu Logo" width={64} height={64} className="my-auto" />
            <span className="text-xl font-semibold my-auto ml-2">Altergemu</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-sm font-medium hover:text-zinc-400 transition-colors">
              Product
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-zinc-400 transition-colors">
              Why Gem
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-zinc-400 transition-colors">
              Developers
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-zinc-400 transition-colors">
              Enterprise
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-zinc-400 transition-colors">
              Docs
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b border-zinc-800 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="lg:flex items-center justify-center lg:justify-around">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">Altergemu</h1>
              <div className="flex items-center space-x-4 mt-8">
                <button className="bg-white text-black text-sm font-medium px-6 py-3 rounded-md hover:bg-zinc-200 transition-colors">
                  Наши услуги
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="relative w-[40vh] h-[40vh] lg:w-[60vh] lg:h-[60vh] md:w-80 md:h-80">
                <img
                  src="/altergemu.svg"
                  alt="Altergemu Logo"
                  className="object-contain animate-float filter drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 -z-10"></div>
      </section>


      {/* Pricing Section */}
      <section className="py-20 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
            Мы предлагаем полный спектр услуг по веб-разработке, дизайну и другим IT-решениям
          </p>

          {/* Websites */}
          <h3 className="text-2xl font-bold mb-8 text-center">Сайты</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-16">
            <ServiceCard
              title="Сайт-визитка"
              description="Идеальное решение для представления вашего бизнеса в интернете"
              price="от 15 000 ₽"
              details="Сайт-визитка включает до 5 страниц с основной информацией о вашей компании, услугах и контактах. Идеально подходит для малого бизнеса, который хочет иметь базовое присутствие в интернете. В стоимость входит адаптивный дизайн, базовая SEO-оптимизация и размещение на хостинге."
            />
            <ServiceCard
              title="Корпоративный информационный web-сайт"
              description="Полноценное представительство компании в сети"
              price="от 30 000 ₽"
              details="Корпоративный информационный сайт включает до 15 страниц с подробной информацией о компании, услугах, проектах, новостях и контактах. Подходит для среднего бизнеса, которому необходимо полноценное представительство в интернете. В стоимость входит уникальный дизайн, адаптивная верстка, базовая SEO-оптимизация, интеграция с CMS и размещение на хостинге."
            />
            <ServiceCard
              title="Корпоративный имиджевый web-сайт"
              description="Презентационный сайт с уникальным дизайном"
              price="от 40 000 ₽"
              details="Корпоративный имиджевый сайт - это презентационный ресурс с уникальным дизайном и интерактивными элементами. Идеально подходит для компаний, которые хотят выделиться на фоне конкурентов и произвести впечатление на посетителей. В стоимость входит эксклюзивный дизайн, анимации, адаптивная верстка, SEO-оптимизация и размещение на хостинге."
            />
            <ServiceCard
              title="Интернет-магазин"
              description="Полнофункциональная платформа для онлайн-продаж"
              price="от 100 000 ₽"
              details="Интернет-магазин включает каталог товаров, корзину, личный кабинет пользователя, систему оплаты и доставки. Подходит для бизнеса, который хочет продавать товары или услуги онлайн. В стоимость входит уникальный дизайн, адаптивная верстка, интеграция с CMS, платежными системами и службами доставки, SEO-оптимизация и размещение на хостинге."
            />
            <ServiceCard
              title="Информационный сайт"
              description="Ресурс для публикации и управления контентом"
              price="от 50 000 ₽"
              details="Информационный сайт включает систему управления контентом, блог, новостную ленту и другие информационные разделы. Подходит для медиа-проектов, блогов и информационных порталов. В стоимость входит уникальный дизайн, адаптивная верстка, интеграция с CMS, SEO-оптимизация и размещение на хостинге."
            />
            <ServiceCard
              title="Персональный проект"
              description="Индивидуальное решение под ваши задачи"
              price="от 50 000 ₽"
              details="Персональный проект - это индивидуальное решение, разработанное под конкретные задачи и потребности вашего бизнеса. Стоимость и сроки зависят от сложности проекта и требуемого функционала. Мы готовы обсудить ваши идеи и предложить оптимальное решение."
            />
          </div>

          {/* Design */}
          <h3 className="text-2xl font-bold mb-8 text-center">Дизайн</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-16">
            <ServiceCard
              title="Логотип"
              description="Уникальный логотип для вашего бренда"
              price="от 10 000 ₽"
              details="Разработка уникального логотипа включает анализ рынка, создание концепции, разработку нескольких вариантов дизайна и финальную доработку выбранного варианта. В стоимость входит предоставление логотипа в различных форматах и цветовых решениях."
            />
            <ServiceCard
              title="Макет сайта"
              description="Дизайн-концепция вашего будущего сайта"
              price="от 10 000 ₽"
              details="Разработка макета сайта включает создание концепции дизайна, прототипирование и визуализацию основных страниц. В стоимость входит предоставление макетов в формате Figma или PSD."
            />
            <ServiceCard
              title="Другое"
              description="Индивидуальные дизайн-решения"
              price="по договоренности"
              details="Мы также предлагаем разработку фирменного стиля, дизайн полиграфической продукции, оформление социальных сетей и другие дизайн-услуги. Стоимость зависит от сложности и объема работ."
            />
          </div>

          {/* Other */}
          <h3 className="text-2xl font-bold mb-8 text-center">Другое</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <ServiceCard
              title="SMM продвижение"
              description="Продвижение в социальных сетях"
              price="по договоренности"
              details="SMM продвижение включает разработку стратегии, создание и публикацию контента, работу с аудиторией и аналитику. Стоимость зависит от выбранных социальных сетей, частоты публикаций и дополнительных услуг."
            />
            <ServiceCard
              title="Документирование приложения"
              description="Создание технической документации"
              price="по договоренности"
              details="Создание технической документации включает разработку руководств пользователя, технических спецификаций, API-документации и другой необходимой документации. Стоимость зависит от сложности проекта и объема документации."
            />
            <ServiceCard
              title="Разработка концепта приложения"
              description="Проработка идеи и архитектуры приложения"
              price="по договоренности"
              details="Разработка концепта приложения включает анализ рынка, определение целевой аудитории, проработку функционала, создание прототипа и технической спецификации. Стоимость зависит от сложности проекта."
            />
            <ServiceCard
              title="Телеграмм боты"
              description="Разработка ботов для Telegram"
              price="по договоренности"
              details="Разработка Telegram-ботов включает проектирование функционала, разработку, тестирование и размещение бота на сервере. Стоимость зависит от сложности функционала и интеграций."
            />
            <ServiceCard
              title="Остальные IT-решения"
              description="Индивидуальные IT-проекты любой сложности"
              price="по договоренности"
              details="Мы также предлагаем разработку мобильных приложений, CRM-систем, интеграцию с различными сервисами и другие IT-решения. Стоимость зависит от сложности проекта и требуемого функционала."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 border-b border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Профессиональная разработка <br />
            для вашего бизнеса
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-16">
            Мы создаем современные веб-решения, которые помогают бизнесу расти и развиваться в цифровом пространстве.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Современный дизайн</h3>
              <p className="text-zinc-400">
                Создаем уникальные, стильные и удобные интерфейсы, которые привлекают внимание и улучшают
                пользовательский опыт.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Надежная разработка</h3>
              <p className="text-zinc-400">
                Разрабатываем высокопроизводительные веб-приложения с использованием современных технологий и лучших
                практик.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Комплексный подход</h3>
              <p className="text-zinc-400">
                Предлагаем полный цикл услуг: от разработки концепции и дизайна до технической поддержки и продвижения.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase mb-6">USE CASES</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Content Management System
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Enterprise App Builder
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Headless E-Commerce
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Digital Asset Management
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase mb-6">DEVELOPERS</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Gem Cloud
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Community Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Releases
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase mb-6">COMPANY</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Partner With Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Find a Partner
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Compare Gem
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase mb-6">STAY CONNECTED</h3>
              <div className="relative mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex space-x-4 mb-6">
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <Disc className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-zinc-500 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Auto</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
