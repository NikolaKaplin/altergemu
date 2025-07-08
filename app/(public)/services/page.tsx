import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/animated-section";

async function getServices() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/public/services`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

async function ServicesContent() {
  const services = await getServices();

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Наши услуги
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Полный спектр услуг для цифровой трансформации вашего бизнеса. От
              идеи до готового продукта.
            </p>
          </div>
        </AnimatedSection>

        {services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Услуги временно недоступны. Пожалуйста, свяжитесь с нами для
              получения информации.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/support">Связаться с нами</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any, index: number) => (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    {service.image && (
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1">
                      {service.features && service.features.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Что входит:</h4>
                          <ul className="space-y-2">
                            {service.features
                              .slice(0, 4)
                              .map((feature: string, featureIndex: number) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-start gap-2"
                                >
                                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {service.price}
                        </span>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/services/${service.slug}`}>
                          Подробнее
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection className="text-center mt-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Не нашли подходящую услугу?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Мы создаем индивидуальные решения под ваши потребности. Свяжитесь
              с нами для обсуждения вашего проекта.
            </p>
            <Button size="lg" asChild>
              <Link href="/support">
                Обсудить проект
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Загрузка услуг...</p>
          </div>
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}
