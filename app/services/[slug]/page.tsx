import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/footer"

const servicesData = {
  "corporate-info": {
    title: "Корпоративный информационный web-сайт",
    description: "Полноценное представительство компании в сети",
    price: "от 15 000 ₽",
    fullDescription:
      "Создаем профессиональные корпоративные сайты, которые эффективно представляют вашу компанию в интернете. Наши решения включают современный дизайн, удобную навигацию и оптимизацию для поисковых систем.",
    features: [
      "Адаптивный дизайн для всех устройств",
      "SEO-оптимизация",
      "Система управления контентом",
      "Интеграция с социальными сетями",
      "Форма обратной связи",
      "Аналитика и метрики",
    ],
    examples: [
      {
        title: "Сайт IT-компании",
        description: "Современный корпоративный сайт с презентацией услуг",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Сайт консалтинговой фирмы",
        description: "Профессиональный сайт с портфолио проектов",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    process: [
      "Анализ требований и целей",
      "Создание структуры сайта",
      "Дизайн макетов",
      "Разработка и программирование",
      "Тестирование и оптимизация",
      "Запуск и поддержка",
    ],
  },
  ecommerce: {
    title: "Интернет-магазин",
    description: "Полнофункциональная платформа для онлайн-продаж",
    price: "от 100 000 ₽",
    fullDescription:
      "Разрабатываем современные интернет-магазины с удобной системой управления товарами, безопасными платежами и интеграцией с популярными сервисами доставки.",
    features: [
      "Каталог товаров с фильтрами",
      "Корзина и оформление заказов",
      "Интеграция с платежными системами",
      "Система управления заказами",
      "Личный кабинет покупателя",
      "Интеграция с CRM и складом",
    ],
    examples: [
      {
        title: "Магазин электроники",
        description: "Интернет-магазин с расширенным каталогом товаров",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Магазин одежды",
        description: "Стильный магазин с системой размеров и цветов",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    process: [
      "Анализ бизнес-процессов",
      "Проектирование архитектуры",
      "Дизайн пользовательского интерфейса",
      "Разработка функционала",
      "Интеграция с внешними сервисами",
      "Тестирование и запуск",
    ],
  },
  logo: {
    title: "Разработка логотипа",
    description: "Уникальный логотип для вашего бренда",
    price: "от 10 000 ₽",
    fullDescription:
      "Создаем запоминающиеся логотипы, которые отражают суть вашего бренда и выделяют его среди конкурентов. Разрабатываем полный фирменный стиль для всех носителей.",
    features: [
      "Исследование целевой аудитории",
      "Несколько вариантов концепций",
      "Векторные файлы в разных форматах",
      "Руководство по использованию",
      "Адаптация для разных носителей",
      "Регистрация товарного знака",
    ],
    examples: [
      {
        title: "Логотип IT-стартапа",
        description: "Современный минималистичный логотип",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Логотип ресторана",
        description: "Элегантный логотип с типографикой",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    process: [
      "Бриф и исследование",
      "Создание концепций",
      "Презентация вариантов",
      "Доработка выбранного варианта",
      "Создание финальных файлов",
      "Передача материалов",
    ],
  },
  "telegram-bots": {
    title: "Telegram боты",
    description: "Разработка ботов для Telegram",
    price: "по договоренности",
    fullDescription:
      "Создаем умных Telegram-ботов для автоматизации бизнес-процессов, обслуживания клиентов и увеличения продаж. Интегрируем с вашими системами и базами данных.",
    features: [
      "Автоматизация процессов",
      "Интеграция с CRM и базами данных",
      "Система платежей",
      "Уведомления и рассылки",
      "Аналитика и отчеты",
      "Многоязычная поддержка",
    ],
    examples: [
      {
        title: "Бот для интернет-магазина",
        description: "Бот с каталогом товаров и оформлением заказов",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Бот службы поддержки",
        description: "Автоматизированная система обработки обращений",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    process: [
      "Анализ задач и требований",
      "Проектирование логики бота",
      "Разработка и программирование",
      "Интеграция с внешними API",
      "Тестирование функционала",
      "Запуск и настройка",
    ],
  },
}

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = servicesData[slug as keyof typeof servicesData]

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg font-semibold">altergemu</span>
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm font-medium">
              Заказать услугу
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-0 px-4 py-2 text-sm font-medium">
            {service.price}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight">{service.title}</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 font-medium max-w-3xl mx-auto">
            {service.fullDescription}
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-medium">
            Обсудить проект
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900 tracking-tight">
            Что входит в услугу
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900 tracking-tight">
            Примеры работ
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {service.examples.map((example, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-xl bg-white">
                <div className="aspect-video bg-gray-100">
                  <img
                    src={example.image || "/placeholder.svg"}
                    alt={example.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-8">
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{example.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base">{example.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900 tracking-tight">
            Процесс работы
          </h2>
          <div className="space-y-8">
            {service.process.map((step, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <span className="text-xl text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">Готовы начать проект?</h2>
          <p className="text-xl text-gray-600 mb-12 font-medium">
            Свяжитесь с нами для обсуждения деталей и получения персонального предложения
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-medium">
              Написать в Telegram
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-8 py-3 text-lg font-medium"
            >
              Заказать звонок
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
