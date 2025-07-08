import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/animated-section";

async function getCases() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/public/cases`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error("Error fetching cases:", error);
    return [];
  }
}

async function CasesContent() {
  const cases = await getCases();

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Истории успеха
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Реальные кейсы наших клиентов. Узнайте, как мы помогли бизнесу
              достичь целей и решить сложные задачи с помощью цифровых
              технологий.
            </p>
          </div>
        </AnimatedSection>

        {cases.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Кейсы временно недоступны. Пожалуйста, свяжитесь с нами для
              получения информации о наших проектах.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/support">Связаться с нами</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {cases.map((caseItem: any, index: number) => (
              <AnimatedSection key={caseItem.id} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {caseItem.image && (
                      <div className="lg:order-2">
                        <img
                          src={caseItem.image || "/placeholder.svg"}
                          alt={caseItem.title}
                          className="w-full h-64 lg:h-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`p-8 ${caseItem.image ? "lg:order-1" : ""}`}
                    >
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <Badge variant="secondary">{caseItem.industry}</Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {caseItem.timeline}
                        </div>
                      </div>

                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {caseItem.title}
                      </h2>

                      <p className="text-lg text-blue-600 dark:text-blue-400 mb-6">
                        Клиент: {caseItem.client}
                      </p>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Задача
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {caseItem.challenge}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Решение
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {caseItem.solution}
                          </p>
                        </div>

                        {caseItem.results && caseItem.results.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                              <TrendingUp className="w-5 h-5" />
                              Результаты
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              {caseItem.results.map(
                                (result: any, resultIndex: number) => (
                                  <div
                                    key={resultIndex}
                                    className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                  >
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                      {result.value}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                      {result.metric}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {caseItem.technologies &&
                          caseItem.technologies.length > 0 && (
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Технологии
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {caseItem.technologies.map(
                                  (tech: string, techIndex: number) => (
                                    <Badge key={techIndex} variant="outline">
                                      {tech}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection className="text-center mt-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Хотите стать нашим следующим кейсом?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Расскажите нам о своих задачах, и мы найдем оптимальное решение
              для вашего бизнеса.
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

export default function CasesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Загрузка кейсов...</p>
          </div>
        </div>
      }
    >
      <CasesContent />
    </Suspense>
  );
}
