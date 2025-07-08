"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

interface Review {
  id: number
  name: string
  position: string
  company: string
  avatar: string | null
  rating: number
  text: string
  project: string
  date: string
  isActive: boolean
  isFeatured: boolean
  order: number
}

export default function EditReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState<Review | null>(null)

  useEffect(() => {
    fetchReview()
  }, [params.id])

  const fetchReview = async () => {
    try {
      const response = await fetch(`/api/admin/reviews/${params.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch review")
      }
      const review = await response.json()
      setFormData(review)
    } catch (error) {
      console.error("Error fetching review:", error)
      toast.error("Ошибка при загрузке отзыва")
      router.push("/admin/reviews")
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setLoading(true)

    try {
      const response = await fetch(`/api/admin/reviews/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update review")
      }

      toast.success("Отзыв успешно обновлен")
      router.push("/admin/reviews")
    } catch (error) {
      console.error("Error updating review:", error)
      toast.error("Ошибка при обновлении отзыва")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    if (!formData) return
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  if (initialLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!formData) {
    return <div>Отзыв не найден</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Редактировать отзыв</h1>
        <p className="text-gray-600 dark:text-gray-400">Изменение данных отзыва</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Информация об отзыве</CardTitle>
            <CardDescription>Обновите данные отзыва</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Имя клиента *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Должность *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Компания *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Проект *</Label>
                <Input
                  id="project"
                  value={formData.project}
                  onChange={(e) => handleChange("project", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar">Аватар (URL)</Label>
                <Input
                  id="avatar"
                  type="url"
                  value={formData.avatar || ""}
                  onChange={(e) => handleChange("avatar", e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Рейтинг</Label>
                <Select
                  value={formData.rating.toString()}
                  onValueChange={(value) => handleChange("rating", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 звезда</SelectItem>
                    <SelectItem value="2">2 звезды</SelectItem>
                    <SelectItem value="3">3 звезды</SelectItem>
                    <SelectItem value="4">4 звезды</SelectItem>
                    <SelectItem value="5">5 звезд</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Дата</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Порядок сортировки</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => handleChange("order", Number.parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Текст отзыва *</Label>
              <Textarea
                id="text"
                value={formData.text}
                onChange={(e) => handleChange("text", e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleChange("isActive", checked)}
                />
                <Label htmlFor="isActive">Активен</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleChange("isFeatured", checked)}
                />
                <Label htmlFor="isFeatured">Рекомендуемый</Label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Сохранение..." : "Сохранить изменения"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/reviews")} disabled={loading}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
