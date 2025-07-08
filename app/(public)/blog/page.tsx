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
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/animated-section";

async function getBlogPosts() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/public/blog`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

async function BlogContent() {
  const posts = await getBlogPosts();

  // Группируем по категориям
  const categories = [...new Set(posts.map((post: any) => post.category))];
  const featuredPosts = posts.filter((post: any) => post.isFeatured);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Блог
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Полезные статьи о веб-разработке, дизайне, технологиях и трендах в
              IT. Делимся опытом и знаниями с сообществом.
            </p>
          </div>
        </AnimatedSection>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Статьи временно недоступны. Следите за обновлениями!
            </p>
            <Button className="mt-6" asChild>
              <Link href="/support">Связаться с нами</Link>
            </Button>
          </div>
        ) : (
          <>
            {featuredPosts.length > 0 && (
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Рекомендуемые статьи
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  {featuredPosts.slice(0, 2).map((post: any, index: number) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <Badge variant="outline">Рекомендуемое</Badge>
                        </div>
                        <CardTitle className="text-xl">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString(
                              "ru-RU"
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <Button variant="outline" asChild>
                          <Link href={`/blog/${post.slug}`}>Читать далее</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {categories.length > 1 && (
              <AnimatedSection>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <Badge
                    variant="outline"
                    className="text-sm px-4 py-2 cursor-pointer"
                  >
                    Все категории
                  </Badge>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="text-sm px-4 py-2 cursor-pointer"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Все статьи
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any, index: number) => (
                  <Card
                    key={post.id}
                    className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        {post.isFeatured && (
                          <Badge variant="outline">Рекомендуемое</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 mt-auto">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "ru-RU",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.slug}`}>Читать далее</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </>
        )}

        <AnimatedSection className="text-center mt-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Хотите быть в курсе новостей?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Подпишитесь на наши обновления и получайте уведомления о новых
              статьях.
            </p>
            <Button size="lg" asChild>
              <Link href="/support">Подписаться на обновления</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Загрузка статей...</p>
          </div>
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
