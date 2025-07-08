"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Edit, Eye, Globe } from "lucide-react"
import Link from "next/link"

interface StaticPage {
  id: string
  title: string
  slug: string
  description: string
  status: "published" | "draft"
  lastModified: string
}

const staticPages: StaticPage[] = [
  {
    id: "privacy",
    title: "Политика конфиденциальности",
    slug: "/privacy",
    description: "Информация о том, как мы собираем и используем персональные данные",
    status: "published",
    lastModified: "2024-01-15",
  },
  {
    id: "terms",
    title: "Условия использования",
    slug: "/terms",
    description: "Правила и условия использования нашего сайта и услуг",
    status: "published",
    lastModified: "2024-01-15",
  },
  {
    id: "cookies",
    title: "Политика использования cookies",
    slug: "/cookies",
    description: "Информация об использовании файлов cookie на нашем сайте",
    status: "published",
    lastModified: "2024-01-15",
  },
  {
    id: "about",
    title: "О компании",
    slug: "/about",
    description: "История компании, миссия и ценности",
    status: "published",
    lastModified: "2024-01-10",
  },
  {
    id: "support",
    title: "Поддержка",
    slug: "/support",
    description: "Центр поддержки и контактная информация",
    status: "published",
    lastModified: "2024-01-12",
  },
]

export default function PagesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPages = staticPages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Статические страницы</h1>
          <p className="text-gray-600 dark:text-gray-400">Управление статическими страницами сайта</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все страницы ({staticPages.length})</CardTitle>
          <CardDescription>Список всех статических страниц сайта</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredPages.map((page) => (
              <Card key={page.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{page.title}</h3>
                          <Badge variant={page.status === "published" ? "default" : "secondary"}>
                            {page.status === "published" ? "Опубликовано" : "Черновик"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{page.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            {page.slug}
                          </span>
                          <span>Изменено: {new Date(page.lastModified).toLocaleDateString("ru-RU")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={page.slug} target="_blank">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" disabled>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPages.length === 0 && <div className="text-center py-8 text-gray-500">Страницы не найдены</div>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Информация</CardTitle>
          <CardDescription>Дополнительная информация о статических страницах</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <p>
              <strong>Статические страницы</strong> - это страницы с фиксированным содержимым, которые редко изменяются.
              К ним относятся политика конфиденциальности, условия использования и другие юридические документы.
            </p>
            <p>
              Эти страницы создаются автоматически на основе шаблонов и не требуют ручного редактирования через
              админ-панель. Для изменения содержимого обратитесь к разработчику.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
