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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Target, Award, Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/animated-section";

async function getTeam() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/public/team`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error("Error fetching team:", error);
    return [];
  }
}

function HeroSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              О нашей компании
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Мы - команда профессионалов, которая создает цифровые решения для
              бизнеса. Наша миссия - помочь компаниям расти и развиваться с
              помощью современных технологий.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      icon: Target,
      title: "Ориентация на результат",
      description:
        "Мы фокусируемся на достижении конкретных бизнес-целей наших клиентов, а не просто на выполнении технических задач.",
    },
    {
      icon: Lightbulb,
      title: "Инновационный подход",
      description:
        "Используем современные технологии и методологии для создания эффективных и масштабируемых решений.",
    },
    {
      icon: Users,
      title: "Командная работа",
      description:
        "Верим в силу коллективного разума и тесного сотрудничества как внутри команды, так и с клиентами.",
    },
    {
      icon: Award,
      title: "Качество превыше всего",
      description:
        "Каждый проект проходит тщательное тестирование и контроль качества на всех этапах разработки.",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Наши ценности
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card className="text-center h-full">
                <CardHeader>
                  <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Наша история
            </h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p>
                Компания была основана в 2019 году группой энтузиастов, которые
                верили в силу цифровых технологий для трансформации бизнеса.
                Начав с небольших проектов, мы постепенно расширяли команду и
                компетенции.
              </p>
              <p>
                Сегодня мы - команда из более чем 20 специалистов, которая
                успешно реализовала свыше 200 проектов для клиентов из различных
                отраслей. Наш опыт охватывает веб-разработку, мобильные
                приложения, системы автоматизации и многое другое.
              </p>
              <p>
                Мы продолжаем расти и развиваться, всегда оставаясь верными
                нашим принципам: качество, инновации и ориентация на клиента.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  200+
                </div>
                <div className="text-gray-600 dark:text-gray-300">Проектов</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  100+
                </div>
                <div className="text-gray-600 dark:text-gray-300">Клиентов</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  5+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Лет опыта
                </div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  20+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Специалистов
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

async function TeamSection() {
  const team = await getTeam();
  const keyMembers = team.slice(0, 6); // Показываем только ключевых участников

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Наша команда
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Познакомьтесь с профессионалами, которые воплощают ваши идеи в
              жизнь
            </p>
          </div>
        </AnimatedSection>

        {keyMembers.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyMembers.map((member: any, index: number) => (
                <AnimatedSection key={member.id} delay={index * 0.1}>
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                        />
                        <AvatarFallback className="text-lg">
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {member.description}
                      </p>
                      {member.skills && member.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.skills
                            .slice(0, 3)
                            .map((skill: string, skillIndex: number) => (
                              <Badge
                                key={skillIndex}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/team">
                  Вся команда
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </AnimatedSection>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Информация о команде временно недоступна
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-800">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Готовы работать с нами?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Свяжитесь с нами сегодня и узнайте, как мы можем помочь вашему
              бизнесу достичь новых высот
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/support">
                  Связаться с нами
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/portfolio">Посмотреть работы</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

async function AboutContent() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ValuesSection />
      <StorySection />
      <TeamSection />
      <CTASection />
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Загрузка...</p>
          </div>
        </div>
      }
    >
      <AboutContent />
    </Suspense>
  );
}
