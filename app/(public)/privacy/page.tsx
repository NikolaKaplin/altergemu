import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Eye, Lock, Database, Mail } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              На главную
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Мы серьезно относимся к защите ваших персональных данных и соблюдаем все требования законодательства
          </p>
          <p className="text-sm text-gray-500 mt-4">Последнее обновление: 15 января 2024 года</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Введение
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Настоящая Политика конфиденциальности описывает, как компания AlterGemu ("мы", "наша компания")
                собирает, использует и защищает информацию, которую вы предоставляете при использовании нашего веб-сайта
                и услуг.
              </p>
              <p>
                Используя наш сайт, вы соглашаетесь с условиями данной Политики конфиденциальности. Если вы не согласны
                с какими-либо условиями, пожалуйста, не используйте наш сайт.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Какую информацию мы собираем
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3>Персональная информация</h3>
              <ul>
                <li>Имя и фамилия</li>
                <li>Адрес электронной почты</li>
                <li>Номер телефона</li>
                <li>Название компании и должность</li>
                <li>Адрес (при необходимости)</li>
              </ul>

              <h3>Техническая информация</h3>
              <ul>
                <li>IP-адрес</li>
                <li>Тип браузера и операционной системы</li>
                <li>Страницы, которые вы посещаете на нашем сайте</li>
                <li>Время и дата посещения</li>
                <li>Файлы cookie и аналогичные технологии</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Как мы используем вашу информацию</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>Мы используем собранную информацию для следующих целей:</p>
              <ul>
                <li>Предоставление и улучшение наших услуг</li>
                <li>Связь с вами по поводу ваших запросов</li>
                <li>Отправка важных уведомлений и обновлений</li>
                <li>Анализ использования сайта для его улучшения</li>
                <li>Соблюдение правовых обязательств</li>
                <li>Защита от мошенничества и злоупотреблений</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Защита данных
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Мы принимаем соответствующие технические и организационные меры для защиты ваших персональных данных от
                несанкционированного доступа, изменения, раскрытия или уничтожения:
              </p>
              <ul>
                <li>Шифрование данных при передаче (SSL/TLS)</li>
                <li>Ограниченный доступ к персональным данным</li>
                <li>Регулярное обновление систем безопасности</li>
                <li>Обучение сотрудников вопросам конфиденциальности</li>
                <li>Регулярные аудиты безопасности</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Передача данных третьим лицам</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Мы не продаем, не обмениваем и не передаем ваши персональные данные третьим лицам, за исключением
                следующих случаев:
              </p>
              <ul>
                <li>С вашего явного согласия</li>
                <li>Поставщикам услуг, которые помогают нам в работе сайта</li>
                <li>При соблюдении правовых требований</li>
                <li>Для защиты наших прав и безопасности</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Файлы cookie</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Наш сайт использует файлы cookie для улучшения пользовательского опыта. Cookie - это небольшие файлы,
                которые сохраняются на вашем устройстве.
              </p>
              <p>
                Вы можете настроить свой браузер для отклонения всех файлов cookie, однако это может ограничить
                функциональность сайта.
              </p>
              <p>
                Подробнее о нашем использовании cookie читайте в{" "}
                <Link href="/cookies" className="text-blue-600 hover:underline">
                  Политике использования cookie
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Ваши права</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                В соответствии с действующим законодательством о защите персональных данных, вы имеете следующие права:
              </p>
              <ul>
                <li>Право на доступ к вашим персональным данным</li>
                <li>Право на исправление неточных данных</li>
                <li>Право на удаление ваших данных</li>
                <li>Право на ограничение обработки</li>
                <li>Право на портируемость данных</li>
                <li>Право на возражение против обработки</li>
                <li>Право отозвать согласие в любое время</li>
              </ul>
              <p>
                Для реализации этих прав обращайтесь к нам по адресу{" "}
                <a href="mailto:privacy@altergemu.com" className="text-blue-600 hover:underline">
                  privacy@altergemu.com
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Контактная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Если у вас есть вопросы о данной Политике конфиденциальности или обработке ваших персональных данных,
                свяжитесь с нами:
              </p>
              <ul>
                <li>
                  Email: <a href="mailto:privacy@altergemu.com">privacy@altergemu.com</a>
                </li>
                <li>Телефон: +7 (999) 123-45-67</li>
                <li>Адрес: г. Москва, ул. Примерная, д. 123</li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes */}
          <Card>
            <CardHeader>
              <CardTitle>Изменения в политике</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Мы можем периодически обновлять данную Политику конфиденциальности. О существенных изменениях мы
                уведомим вас по электронной почте или разместим уведомление на нашем сайте.
              </p>
              <p>
                Рекомендуем регулярно просматривать эту страницу для получения актуальной информации о наших практиках
                конфиденциальности.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
