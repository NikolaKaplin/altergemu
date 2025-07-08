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
import { services } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Plus, Edit, Eye, Trash2, DollarSign } from "lucide-react";

async function ServicesContent() {
  const servicesList = await db
    .select()
    .from(services)
    .orderBy(desc(services.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Услуги
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Управление услугами компании
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="w-4 h-4 mr-2" />
            Добавить услугу
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {servicesList.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <Badge variant={service.isActive ? "default" : "secondary"}>
                      {service.isActive ? "Активна" : "Неактивна"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {service.price}
                    </div>
                    <div>Порядок: {service.order}</div>
                  </div>

                  <CardDescription className="text-base mb-2">
                    {service.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {service.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{service.features.length - 3} еще
                      </Badge>
                    )}
                  </div>
                </div>
                {service.image && (
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-20 h-20 object-cover rounded-lg ml-4"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/services/${service.slug}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Просмотр
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/services/${service.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Удалить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {servicesList.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Услуги не найдены
              </p>
              <Button asChild>
                <Link href="/admin/services/new">Добавить первую услугу</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
