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
import { MapPin, Clock, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/animated-section";

async function getJobs() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/public/jobs`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

async function CareersContent() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Карьера в нашей компании
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Присоединяйтесь к команде профессионалов и развивайтесь вместе с
              нами. Мы предлагаем интересные проекты, конкурентную зарплату и
              возможности для роста.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Дружная команда</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Работайте в команде единомышленников, где каждый готов помочь
                  и поделиться опытом
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Гибкий график</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Возможность удаленной работы и гибкого графика для лучшего
                  баланса работы и жизни
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Конкурентная зарплата</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Справедливая оплата труда и регулярные пересмотры зарплаты в
                  зависимости от результатов
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Открытые вакансии
          </h2>
        </AnimatedSection>

        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              В данный момент открытых вакансий нет, но мы всегда рады
              рассмотреть резюме талантливых специалистов.
            </p>
            <Button asChild>
              <Link href="/support">Отправить резюме</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job: any, index: number) => (
              <AnimatedSection key={job.id} delay={index * 0.1}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">
                          {job.title}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <Button asChild>
                        <Link href="/support">Откликнуться</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-6">
                      {job.description}
                    </CardDescription>

                    <div className="grid md:grid-cols-2 gap-6">
                      {job.requirements && job.requirements.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3">Требования:</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                            {job.requirements.map(
                              (req: string, reqIndex: number) => (
                                <li
                                  key={reqIndex}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-blue-600 mt-1">•</span>
                                  {req}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {job.skills && job.skills.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3">Навыки:</h4>
                          <div className="flex flex-wrap gap-1">
                            {job.skills.map(
                              (skill: string, skillIndex: number) => (
                                <Badge
                                  key={skillIndex}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}
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
              Не нашли подходящую вакансию?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Отправьте нам свое резюме, и мы свяжемся с вами, когда появится
              подходящая позиция.
            </p>
            <Button size="lg" asChild>
              <Link href="/support">Отправить резюме</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default function CareersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Загрузка вакансий...</p>
          </div>
        </div>
      }
    >
      <CareersContent />
    </Suspense>
  );
}
