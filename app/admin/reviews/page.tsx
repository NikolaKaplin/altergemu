"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Plus, Search, Edit, Trash2, Star } from "lucide-react"
import Link from "next/link"

interface Review {
  id: number
  name: string
  position: string
  company: string
  rating: number
  text: string
  project: string
  date: string
  isActive: boolean
  isFeatured: boolean
  createdAt: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/admin/reviews")
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      } else {
        toast.error("Ошибка при загрузке отзывов")
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
      toast.error("Ошибка при загрузке отзывов")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Отзыв удален")
        fetchReviews()
      } else {
        toast.error("Ошибка при удалении отзыва")
      }
    } catch (error) {
      console.error("Error deleting review:", error)
      toast.error("Ошибка при удалении отзыва")
    }
    setDeleteId(null)
  }

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.project.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Отзывы</h1>
            <p className="text-gray-600 dark:text-gray-400">Управление отзывами клиентов</p>
          </div>
        </div>
        <div className="text-center py-12">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Отзывы</h1>
          <p className="text-gray-600 dark:text-gray-400">Управление отзывами клиентов</p>
        </div>
        <Button asChild>
          <Link href="/admin/reviews/new">
            <Plus className="w-4 h-4 mr-2" />
            Добавить отзыв
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все отзывы ({reviews.length})</CardTitle>
          <CardDescription>Список всех отзывов клиентов</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Поиск по имени, компании или проекту..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Компания</TableHead>
                  <TableHead>Проект</TableHead>
                  <TableHead>Рейтинг</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {searchTerm ? "Отзывы не найдены" : "Нет отзывов"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="text-sm text-gray-500">{review.position}</div>
                        </div>
                      </TableCell>
                      <TableCell>{review.company}</TableCell>
                      <TableCell>{review.project}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Badge variant={review.isActive ? "default" : "secondary"}>
                            {review.isActive ? "Активен" : "Неактивен"}
                          </Badge>
                          {review.isFeatured && <Badge variant="outline">Рекомендуемый</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(review.date).toLocaleDateString("ru-RU")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/reviews/${review.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setDeleteId(review.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Удалить отзыв?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Это действие нельзя отменить. Отзыв будет удален навсегда.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
                                  Удалить
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
