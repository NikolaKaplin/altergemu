import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { db } from "@/lib/db"
import { blogPosts } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { Plus, Edit, Eye, Trash2, Calendar, Clock } from "lucide-react"

async function BlogContent() {
  const blogList = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Блог</h1>
          <p className="text-gray-600 dark:text-gray-400">Управление статьями блога</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="w-4 h-4 mr-2" />
            Добавить статью
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {blogList.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <Badge variant={post.isActive ? "default" : "secondary"}>
                      {post.isActive ? "Опубликована" : "Черновик"}
                    </Badge>
                    {post.isFeatured && <Badge variant="outline">Рекомендуемая</Badge>}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>

                  <CardDescription className="text-base mb-2">{post.excerpt}</CardDescription>

                  <div className="text-sm text-gray-500">Автор: {post.author}</div>
                </div>
                {post.image && (
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded-lg ml-4"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Просмотр
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/blog/${post.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Удалить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {blogList.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">Статьи не найдены</p>
              <Button asChild>
                <Link href="/admin/blog/new">Добавить первую статью</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <BlogContent />
    </Suspense>
  )
}
