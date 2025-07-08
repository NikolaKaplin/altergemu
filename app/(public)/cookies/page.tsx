import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Cookie, Settings, BarChart, Globe } from "lucide-react"
import Link from "next/link"

export default function CookiesPage() {
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
            <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-full">
              <Cookie className="w-12 h-12 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Политика использования cookies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Информация о том, как мы используем файлы cookie на нашем сайте
          </p>
          <p className="text-sm text-gray-500 mt-4">Последнее обновление: 15 января 2024 года</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* What are cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="w-5 h-5" />
                Что такое cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Cookies (файлы cookie) - это небольшие текстовые файлы, которые сохраняются на вашем устройстве
                (компьютере, планшете или мобильном телефоне) при посещении веб-сайтов.
              </p>
              <p>
                Эти файлы позволяют сайту "запомнить" ваши действия и предпочтения (такие как язык, размер шрифта и
                другие настройки отображения) на определенный период времени, поэтому вам не нужно вводить их заново при
                каждом посещении сайта.
              </p>
            </CardContent>
          </Card>

          {/* Types of cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Типы cookies, которые мы используем</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Settings className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">Необходимые cookies</h3>
                      <Badge variant="default">Обязательные</Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Эти cookies необходимы для работы сайта и не могут быть отключены. Они обычно устанавливаются в
                      ответ на ваши действия, такие как вход в систему или заполнение форм.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <BarChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">Аналитические cookies</h3>
                      <Badge variant="secondary">Опциональные</Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Помогают нам понять, как посетители взаимодействуют с сайтом, собирая и передавая информацию
                      анонимно. Используются для улучшения работы сайта.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">Функциональные cookies</h3>
                      <Badge variant="secondary">Опциональные</Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Позволяют сайту запоминать ваши предпочтения (язык, регион, тема оформления) и предоставлять
                      расширенные функции и персонализированный контент.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specific cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Конкретные cookies, используемые на сайте</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Название</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Назначение</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Срок действия</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Тип</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono text-sm">session_id</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">
                        Идентификация сессии пользователя
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">Сессия</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">
                        <Badge variant="default">Необходимые</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono text-sm">theme</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">Сохранение темы оформления</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">1 год</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">
                        <Badge variant="secondary">Функциональные</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono text-sm">_ga</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">
                        Google Analytics - отслеживание посетителей
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">2 года</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">
                        <Badge variant="secondary">Аналитические</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono text-sm">_ym_uid</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">
                        Yandex Metrica - уникальный идентификатор
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">1 год</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">
                        <Badge variant="secondary">Аналитические</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Third party cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies третьих сторон</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>Некоторые cookies устанавливаются третьими сторонами, чьи сервисы мы используем на нашем сайте:</p>
              <ul>
                <li>
                  <strong>Google Analytics</strong> - для анализа трафика и поведения пользователей
                </li>
                <li>
                  <strong>Yandex Metrica</strong> - для веб-аналитики
                </li>
                <li>
                  <strong>YouTube</strong> - для встроенных видео (если используются)
                </li>
              </ul>
              <p>
                Эти сервисы могут использовать cookies в соответствии со своими собственными политиками
                конфиденциальности.
              </p>
            </CardContent>
          </Card>

          {/* Managing cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Управление cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3>Настройки браузера</h3>
              <p>
                Вы можете контролировать и/или удалять cookies по своему усмотрению. Большинство браузеров позволяют:
              </p>
              <ul>
                <li>Просматривать, какие cookies сохранены</li>
                <li>Блокировать cookies с определенных сайтов</li>
                <li>Блокировать cookies третьих сторон</li>
                <li>Блокировать все cookies</li>
                <li>Удалить все cookies при закрытии браузера</li>
              </ul>

              <h3>Инструкции для популярных браузеров:</h3>
              <ul>
                <li>
                  <strong>Chrome:</strong> Настройки → Конфиденциальность и безопасность → Файлы cookie
                </li>
                <li>
                  <strong>Firefox:</strong> Настройки → Приватность и защита → Файлы cookie
                </li>
                <li>
                  <strong>Safari:</strong> Настройки → Конфиденциальность → Файлы cookie
                </li>
                <li>
                  <strong>Edge:</strong> Настройки → Файлы cookie и разрешения сайтов
                </li>
              </ul>

              <p>
                <strong>Важно:</strong> Отключение cookies может повлиять на функциональность нашего сайта. Некоторые
                функции могут работать неправильно или быть недоступными.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Вопросы о cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>Если у вас есть вопросы о нашем использовании cookies, свяжитесь с нами:</p>
              <ul>
                <li>
                  Email: <a href="mailto:privacy@altergemu.com">privacy@altergemu.com</a>
                </li>
                <li>Телефон: +7 (999) 123-45-67</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
