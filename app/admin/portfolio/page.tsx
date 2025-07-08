import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { portfolioItems } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Plus, Edit, Eye, Trash2, Calendar } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";

async function PortfolioContent() {
  const items = await db
    .select()
    .from(portfolioItems)
    .orderBy(desc(portfolioItems.createdAt));

  // const handleDelete = async (id: number) => {
  //   const query = useQuery(["portfolio", id], async () => {
  //   await fetch(`/api/portfolio/${id}`, {
  //     method: "DELETE",
  //   });

  // };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Портфолио
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Управление проектами портфолио
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/portfolio/new">
            <Plus className="w-4 h-4 mr-2" />
            Добавить проект
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <Badge variant={item.isActive ? "default" : "secondary"}>
                      {item.isActive ? "Активен" : "Неактивен"}
                    </Badge>
                    {item.isFeatured && (
                      <Badge variant="outline">Рекомендуемый</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <Badge variant="secondary">{item.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.year}
                    </div>
                    {item.client && <div>Клиент: {item.client}</div>}
                  </div>

                  <CardDescription className="text-base mb-2">
                    {item.description}
                  </CardDescription>

                  {item.technologies && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.technologies.slice(0, 3).map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {item.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.technologies.length - 3} еще
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                {item.image && (
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg ml-4"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {/* {item.url && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={item.id} target="_blank">
                      <Eye className="w-4 h-4 mr-2" />
                      Просмотр
                    </Link>
                  </Button>
                )} */}
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/portfolio/${item.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Удалить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Удалить проект?</DialogTitle>
                      <DialogDescription>
                        Вы полностью удалите проект
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Да
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Проекты не найдены
              </p>
              <Button asChild>
                <Link href="/admin/portfolio/new">Добавить первый проект</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
