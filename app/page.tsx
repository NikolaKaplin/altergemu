import Image from "next/image"
import { Github, Search, ArrowRight, Twitter, Instagram, Youtube, Disc } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/gem-logo.png" alt="Gem Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Gem</span>
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

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">34.9k</span>
            </div>
            <Link href="#" className="hidden md:block text-sm font-medium hover:text-zinc-400 transition-colors">
              Login
            </Link>
            <Link
              href="#"
              className="bg-white text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors"
            >
              Get Started
            </Link>
            <button className="md:hidden">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b border-zinc-800 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href="#"
                className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-6 transition-colors"
              >
                <span>Профессиональная веб-разработка</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                The backend <br />
                to build the <br />
                modern web.
              </h1>
              <div className="flex items-center space-x-4 mt-8">
                <button className="bg-white text-black text-sm font-medium px-6 py-3 rounded-md hover:bg-zinc-200 transition-colors">
                  Наши услуги
                </button>
              </div>
              <Link
                href="#"
                className="inline-flex items-center mt-8 text-sm font-medium hover:text-zinc-400 transition-colors"
              >
                <span>Связаться с нами</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/gem-logo.png"
                  alt="Gem Logo"
                  fill
                  className="object-contain animate-float filter drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 -z-10"></div>
      </section>

      {/* Brands Section */}
      <section className="py-16 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-zinc-500 mb-12">
            Gem is the open-source Next.js backend used in production by the most innovative companies on earth.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=40&width=100"
                alt="U.S. Air Force"
                width={100}
                height={40}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=40&width=100"
                alt="Asics"
                width={100}
                height={40}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=40&width=100"
                alt="Kong"
                width={100}
                height={40}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=40&width=100"
                alt="Disney"
                width={100}
                height={40}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=40&width=100"
                alt="Microsoft"
                width={100}
                height={40}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=40&width=100"
                alt="Bugatti"
                width={100}
                height={40}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Сайт-визитка</h4>
                <p className="text-zinc-400 mb-4">Идеальное решение для представления вашего бизнеса в интернете</p>
                <div className="text-2xl font-bold">от 15 000 ₽</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Корпоративный информационный web-сайт</h4>
                <p className="text-zinc-400 mb-4">Полноценное представительство компании в сети</p>
                <div className="text-2xl font-bold">от 30 000 ₽</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Корпоративный имиджевый web-сайт</h4>
                <p className="text-zinc-400 mb-4">Презентационный сайт с уникальным дизайном</p>
                <div className="text-2xl font-bold">от 40 000 ₽</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Интернет-магазин</h4>
                <p className="text-zinc-400 mb-4">Полнофункциональная платформа для онлайн-продаж</p>
                <div className="text-2xl font-bold">от 100 000 ₽</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Информационный сайт</h4>
                <p className="text-zinc-400 mb-4">Ресурс для публикации и управления контентом</p>
                <div className="text-2xl font-bold">от 50 000 ₽</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Персональный проект</h4>
                <p className="text-zinc-400 mb-4">Индивидуальное решение под ваши задачи</p>
                <div className="text-2xl font-bold">от 50 000 ₽</div>
              </div>
            </div>
          </div>

          {/* Design */}
          <h3 className="text-2xl font-bold mb-8 text-center">Дизайн</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Логотип</h4>
                <p className="text-zinc-400 mb-4">Уникальный логотип для вашего бренда</p>
                <div className="text-2xl font-bold">от 10 000 ₽</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Макет сайта</h4>
                <p className="text-zinc-400 mb-4">Дизайн-концепция вашего будущего сайта</p>
                <div className="text-2xl font-bold">от 10 000 ₽</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Другое</h4>
                <p className="text-zinc-400 mb-4">Индивидуальные дизайн-решения</p>
                <div className="text-2xl font-bold">по договоренности</div>
              </div>
            </div>
          </div>

          {/* Other */}
          <h3 className="text-2xl font-bold mb-8 text-center">Другое</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">SMM продвижение</h4>
                <p className="text-zinc-400 mb-4">Продвижение в социальных сетях</p>
                <div className="text-2xl font-bold">по договоренности</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Документирование приложения</h4>
                <p className="text-zinc-400 mb-4">Создание технической документации</p>
                <div className="text-2xl font-bold">по договоренности</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Разработка концепта приложения</h4>
                <p className="text-zinc-400 mb-4">Проработка идеи и архитектуры приложения</p>
                <div className="text-2xl font-bold">по договоренности</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Телеграмм боты</h4>
                <p className="text-zinc-400 mb-4">Разработка ботов для Telegram</p>
                <div className="text-2xl font-bold">по договоренности</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Остальные IT-решения</h4>
                <p className="text-zinc-400 mb-4">Индивидуальные IT-проекты любой сложности</p>
                <div className="text-2xl font-bold">по договоренности</div>
              </div>
            </div>
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
