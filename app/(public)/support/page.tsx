import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MessageCircle, Clock, HelpCircle, FileText, Users, Zap } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Центр поддержки</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Мы здесь, чтобы помочь вам. Найдите ответы на ваши вопросы или свяжитесь с нашей командой поддержки.
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Часто задаваемые вопросы</CardTitle>
              <CardDescription>Найдите быстрые ответы на популярные вопросы</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/faq">Перейти к FAQ</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Документация</CardTitle>
              <CardDescription>Подробные руководства и инструкции</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Открыть документацию
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Сообщество</CardTitle>
              <CardDescription>Общайтесь с другими пользователями</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Присоединиться
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Связаться с нами
              </CardTitle>
              <CardDescription>Отправьте нам сообщение, и мы ответим в течение 24 часов</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Компания</Label>
                  <Input id="company" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Тема обращения *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тему" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Общий вопрос</SelectItem>
                      <SelectItem value="technical">Техническая поддержка</SelectItem>
                      <SelectItem value="billing">Вопросы по оплате</SelectItem>
                      <SelectItem value="partnership">Партнерство</SelectItem>
                      <SelectItem value="feedback">Отзыв или предложение</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение *</Label>
                  <Textarea id="message" rows={6} placeholder="Опишите ваш вопрос или проблему подробно..." required />
                </div>

                <Button type="submit" className="w-full">
                  Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
                <CardDescription>Другие способы связи с нашей командой</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600 dark:text-gray-300">support@altergemupub.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-gray-600 dark:text-gray-300">+7 (999) 123-45-67</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="font-medium">Часы работы</p>
                    <p className="text-gray-600 dark:text-gray-300">Пн-Пт: 9:00 - 18:00 (МСК)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Время ответа</CardTitle>
                <CardDescription>Мы стремимся отвечать максимально быстро</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Критические вопросы
                  </span>
                  <span className="font-medium">2-4 часа</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    Общие вопросы
                  </span>
                  <span className="font-medium">24 часа</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-500" />
                    Консультации
                  </span>
                  <span className="font-medium">48 часов</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Экстренная поддержка</CardTitle>
                <CardDescription>Для критических ситуаций 24/7</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Если у вас критическая проблема, которая влияет на работу вашего бизнеса, свяжитесь с нами немедленно:
                </p>
                <Button variant="destructive" className="w-full">
                  Экстренная связь
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Дополнительные ресурсы</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Руководства</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Пошаговые инструкции</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Чат-бот</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Мгновенные ответы</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Форум</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Обсуждения с экспертами</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Статус системы</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Мониторинг сервисов</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
