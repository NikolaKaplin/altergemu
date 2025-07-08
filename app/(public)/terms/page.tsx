import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Scale, AlertTriangle, Users, CreditCard } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full">
              <Scale className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Условия использования</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Правила и условия использования нашего веб-сайта и услуг
          </p>
          <p className="text-sm text-gray-500 mt-4">Последнее обновление: 15 января 2024 года</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Общие положения
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Добро пожаловать на веб-сайт AlterGemu. Используя наш сайт и услуги, вы соглашаетесь соблюдать настоящие
                Условия использования.
              </p>
              <p>
                Если вы не согласны с какими-либо из этих условий, пожалуйста, не используйте наш сайт. Мы оставляем за
                собой право изменять эти условия в любое время без предварительного уведомления.
              </p>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Описание услуг</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>AlterGemu предоставляет следующие услуги:</p>
              <ul>
                <li>Разработка веб-сайтов и веб-приложений</li>
                <li>Мобильная разработка</li>
                <li>UI/UX дизайн</li>
                <li>Консультации по цифровым технологиям</li>
                <li>Техническая поддержка и сопровождение</li>
              </ul>
              <p>
                Мы стремимся предоставлять качественные услуги, но не гарантируем, что наши услуги будут соответствовать
                всем вашим требованиям или будут предоставляться без перерывов.
              </p>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Обязанности пользователя
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>Используя наш сайт, вы обязуетесь:</p>
              <ul>
                <li>Предоставлять точную и актуальную информацию</li>
                <li>Не использовать сайт в незаконных целях</li>
                <li>Не нарушать права интеллектуальной собственности</li>
                <li>Не распространять вредоносное программное обеспечение</li>
                <li>Не пытаться получить несанкционированный доступ к системам</li>
                <li>Соблюдать все применимые законы и правила</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Интеллектуальная собственность</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Все содержимое нашего сайта, включая тексты, изображения, логотипы, дизайн и программный код, защищено
                авторским правом и другими правами интеллектуальной собственности.
              </p>
              <p>
                Вы можете просматривать и загружать материалы с нашего сайта только для личного некоммерческого
                использования. Любое другое использование требует нашего письменного разрешения.
              </p>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Условия оплаты
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3>Цены и оплата</h3>
              <ul>
                <li>Все цены указаны в российских рублях</li>
                <li>Цены могут изменяться без предварительного уведомления</li>
                <li>Оплата производится согласно выставленному счету</li>
                <li>Просрочка платежа может привести к приостановке услуг</li>
              </ul>

              <h3>Возврат средств</h3>
              <p>
                Возврат средств возможен в случаях, предусмотренных договором или действующим законодательством. Каждый
                случай рассматривается индивидуально.
              </p>
            </CardContent>
          </Card>

          {/* Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Ограничение ответственности
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>В максимальной степени, разрешенной законом, AlterGemu не несет ответственности за:</p>
              <ul>
                <li>Прямые, косвенные или случайные убытки</li>
                <li>Потерю данных или прибыли</li>
                <li>Прерывание деятельности</li>
                <li>Действия третьих лиц</li>
                <li>Технические сбои или недоступность сайта</li>
              </ul>
              <p>
                Наша общая ответственность ограничена суммой, уплаченной вами за наши услуги в течение 12 месяцев,
                предшествующих возникновению претензии.
              </p>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Конфиденциальность</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Ваша конфиденциальность важна для нас. Информация о том, как мы собираем, используем и защищаем ваши
                данные, содержится в нашей{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Политике конфиденциальности
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Прекращение использования</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Мы можем прекратить или приостановить ваш доступ к нашим услугам в любое время без предварительного
                уведомления, если вы нарушаете настоящие Условия использования.
              </p>
              <p>Вы также можете прекратить использование наших услуг в любое время, уведомив нас об этом.</p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>Применимое право</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Настоящие Условия использования регулируются законодательством Российской Федерации. Все споры подлежат
                рассмотрению в судах Российской Федерации.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>Если у вас есть вопросы по настоящим Условиям использования, свяжитесь с нами:</p>
              <ul>
                <li>
                  Email: <a href="mailto:legal@altergemu.com">legal@altergemu.com</a>
                </li>
                <li>Телефон: +7 (999) 123-45-67</li>
                <li>Адрес: г. Москва, ул. Примерная, д. 123</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
