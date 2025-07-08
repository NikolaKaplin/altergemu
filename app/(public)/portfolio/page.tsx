import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/animated-section";

async function getPortfolio() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/public/portfolio`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return [];
  }
}

async function PortfolioContent() {
  const portfolio = await getPortfolio();

  // Группируем по категориям
  const categories = [...new Set(portfolio.map((item: any) => item.category))];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Наше портфолио
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Примеры успешно реализованных проектов. Каждый проект - это
              уникальное решение, созданное с учетом потребностей клиента.
            </p>
          </div>
        </AnimatedSection>

        {portfolio.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Портфолио временно недоступно. Пожалуйста, свяжитесь с нами для
              получения информации о наших работах.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/support">Связаться с нами</Link>
            </Button>
          </div>
        ) : (
          <>
            {categories.length > 1 && (
              <AnimatedSection>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="text-sm px-4 py-2"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </AnimatedSection>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((project: any, index: number) => (
                <AnimatedSection key={project.id} delay={index * 0.1}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    {project.image && (
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{project.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {project.year}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      {project.client && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Клиент: {project.client}
                        </p>
                      )}
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.technologies.map(
                              (tech: string, techIndex: number) => (
                                <Badge
                                  key={techIndex}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tech}
                                </Badge>
                              )
                            )}
                          </div>
                        )}

                      <div className="mt-auto">
                        {project.url && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            asChild
                          >
                            <Link
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Посмотреть проект
                              <ExternalLink className="ml-2 w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </>
        )}

        <AnimatedSection className="text-center mt-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Хотите увидеть свой проект здесь?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Мы готовы воплотить ваши идеи в жизнь. Свяжитесь с нами для
              обсуждения вашего проекта.
            </p>
            <Button size="lg" asChild>
              <Link href="/support">Обсудить проект</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Загрузка портфолио...</p>
          </div>
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
