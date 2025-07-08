import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { blogPosts } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getBlogPost(slug: string) {
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1)

  return post
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post || !post.isActive) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к блогу
            </Link>
          </Button>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            {post.image && (
              <div className="mb-8">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm">
                {post.category}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300">{post.excerpt}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </Button>
              </div>
            </div>
          </header>

          {/* Content */}
          <Card>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none p-8">
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
              />
            </CardContent>
          </Card>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Автор: <span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Опубликовано {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться в соцсетях
                </Button>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Похожие статьи</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This would be populated with related posts */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">
                  Технологии
                </Badge>
                <h3 className="font-semibold mb-3">Заголовок статьи</h3>
                <p className="text-gray-500 dark:text-gray-400">Краткое описание статьи</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
