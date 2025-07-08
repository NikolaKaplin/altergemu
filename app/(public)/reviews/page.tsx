import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/animated-section";

async function getReviews() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/public/reviews`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

async function ReviewsContent() {
  const reviews = await getReviews();

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Отзывы клиентов
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Узнайте, что говорят о нас наши клиенты. Каждый отзыв - это
              результат успешного сотрудничества и качественно выполненной
              работы.
            </p>
          </div>
        </AnimatedSection>

        {reviews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Отзывы временно недоступны. Пожалуйста, свяжитесь с нами для
              получения дополнительной информации.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/support">Связаться с нами</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review: any, index: number) => (
              <AnimatedSection key={review.id} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                        />
                        <AvatarFallback>
                          {review.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{review.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {review.position} в {review.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {review.rating}/5
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <blockquote className="text-gray-600 dark:text-gray-300 mb-6 flex-1 italic">
                      "{review.text}"
                    </blockquote>

                    <div className="mt-auto">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Проект:{" "}
                        <span className="font-medium">{review.project}</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString("ru-RU", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
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
              Готовы стать нашим следующим довольным клиентом?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Свяжитесь с нами сегодня и узнайте, как мы можем помочь вашему
              бизнесу.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/support">Связаться с нами</Link>
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

export default function ReviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Загрузка отзывов...</p>
          </div>
        </div>
      }
    >
      <ReviewsContent />
    </Suspense>
  );
}
