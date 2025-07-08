import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
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

function SocialIcon({ type, url }: { type: string; url: string }) {
  const icons = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    telegram: MessageCircle,
  };

  const Icon = icons[type as keyof typeof icons];

  if (!Icon) return null;

  const isEmail = type === "email";
  const href = isEmail ? `mailto:${url}` : url;

  return (
    <Button variant="ghost" size="sm" asChild>
      <Link
        href={href}
        target={isEmail ? undefined : "_blank"}
        rel={isEmail ? undefined : "noopener noreferrer"}
      >
        <Icon className="w-4 h-4" />
      </Link>
    </Button>
  );
}

async function TeamContent() {
  const team = await getTeam();

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Наша команда
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Познакомьтесь с профессионалами, которые воплощают ваши идеи в
              жизнь. Каждый член нашей команды - эксперт в своей области.
            </p>
          </div>
        </AnimatedSection>

        {team.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Информация о команде временно недоступна. Пожалуйста, свяжитесь с
              нами для получения дополнительной информации.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/support">Связаться с нами</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member: any, index: number) => (
              <AnimatedSection key={member.id} delay={index * 0.1}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <Avatar className="w-24 h-24 mx-auto mb-4">
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
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
                      {member.description}
                    </p>

                    {member.skills && member.skills.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Навыки:</h4>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.skills.map(
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

                    {member.social && Object.keys(member.social).length > 0 && (
                      <div className="flex justify-center gap-2">
                        {Object.entries(member.social).map(
                          ([type, url]) =>
                            url && (
                              <SocialIcon
                                key={type}
                                type={type}
                                url={url as string}
                              />
                            )
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection className="text-center mt-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Хотите присоединиться к нашей команде?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Мы всегда ищем талантливых специалистов. Посмотрите наши открытые
              вакансии.
            </p>
            <Button size="lg" asChild>
              <Link href="/careers">Посмотреть вакансии</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Загрузка команды...</p>
          </div>
        </div>
      }
    >
      <TeamContent />
    </Suspense>
  );
}
