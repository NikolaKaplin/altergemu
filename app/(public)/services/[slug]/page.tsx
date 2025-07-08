import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/animated-section";

async function getService(slug: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/public/services/${slug}`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

async function ServiceContent({ slug }: { slug: string }) {
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/services">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Назад к услугам
              </Link>
            </Button>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <div>
              {service.image && (
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-64 object-cover rounded-lg mb-8"
                />
              )}
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {service.fullDescription}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {service.price}
                </span>
                <Button size="lg" asChild>
                  <Link href="/support">
                    Заказать услугу
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              {service.features && service.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Что входит в услугу</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map(
                        (feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {service.process && service.process.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Процесс работы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {service.process.map((step: string, index: number) => (
                        <li key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <span className="pt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              )}
            </div>
          </AnimatedSection>
        </div>

        {service.examples && service.examples.length > 0 && (
          <AnimatedSection className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Примеры работ
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.examples.map((example: any, index: number) => (
                <Card key={index} className="overflow-hidden">
                  {example.image && (
                    <img
                      src={example.image || "/placeholder.svg"}
                      alt={example.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection className="mt-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Готовы начать проект?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Свяжитесь с нами для обсуждения деталей и получения персонального
              предложения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/support">
                  Связаться с нами
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio">Посмотреть работы</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Загрузка услуги...</p>
          </div>
        </div>
      }
    >
      <ServiceContent slug={params.slug} />
    </Suspense>
  );
}
