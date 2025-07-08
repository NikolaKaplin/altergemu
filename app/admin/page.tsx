import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { services, portfolioItems, mediaFiles, pages } from "@/lib/db/schema";
import { count } from "drizzle-orm";
import { FileText, ImageIcon, Briefcase, Wrench } from "lucide-react";

export default async function AdminDashboard() {
  const [servicesCount, portfolioCount, mediaCount, pagesCount] =
    await Promise.all([
      db.select({ count: count() }).from(services),
      db.select({ count: count() }).from(portfolioItems),
      db.select({ count: count() }).from(mediaFiles),
      db.select({ count: count() }).from(pages),
    ]);

  const stats = [
    {
      title: "Услуги",
      value: servicesCount[0].count,
      icon: Wrench,
      href: "/admin/services",
    },
    {
      title: "Портфолио",
      value: portfolioCount[0].count,
      icon: Briefcase,
      href: "/admin/portfolio",
    },
    {
      title: "Страницы",
      value: pagesCount[0].count,
      icon: FileText,
      href: "/admin/pages",
    },
    {
      title: "Медиа файлы",
      value: mediaCount[0].count,
      icon: ImageIcon,
      href: "/admin/media",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Добро пожаловать в административную панель
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">Всего записей</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Последние действия</CardTitle>
            <CardDescription>Недавние изменения в системе</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Создана новая услуга</p>
                  <p className="text-xs text-gray-500">2 часа назад</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Обновлено портфолио</p>
                  <p className="text-xs text-gray-500">5 часов назад</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Загружены новые файлы</p>
                  <p className="text-xs text-gray-500">1 день назад</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
            <CardDescription>Часто используемые функции</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/services/new"
                className="block p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium">Добавить услугу</div>
                <div className="text-sm text-gray-500">
                  Создать новую услугу
                </div>
              </a>
              <a
                href="/admin/portfolio/new"
                className="block p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium">Добавить в портфолио</div>
                <div className="text-sm text-gray-500">
                  Новый проект в портфолио
                </div>
              </a>
              <a
                href="/admin/media"
                className="block p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium">Загрузить файлы</div>
                <div className="text-sm text-gray-500">
                  Управление медиа файлами
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
