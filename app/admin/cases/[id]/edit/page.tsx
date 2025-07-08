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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { X, Plus } from "lucide-react"

interface CaseItem {
  id: number
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: Array<{ metric: string; value: string }>
  image: string | null
  timeline: string
  technologies: string[]
  order: number
  isActive: boolean
}

export default function EditCasePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState<CaseItem | null>(null)
  const [newResult, setNewResult] = useState({ metric: "", value: "" })
  const [newTechnology, setNewTechnology] = useState("")

  useEffect(() => {
    fetchCase()
  }, [params.id])

  const fetchCase = async () => {
    try {
      const response = await fetch(`/api/admin/cases/${params.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch case")
      }
      const caseItem = await response.json()
      setFormData(caseItem)
    } catch (error) {
      console.error("Error fetching case:", error)
      toast.error("Ошибка при загрузке кейса")
      router.push("/admin/cases")
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setLoading(true)

    try {
      const response = await fetch(`/api/admin/cases/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update case")
      }

      toast.success("Кейс успешно обновлен")
      router.push("/admin/cases")
    } catch (error) {
      console.error("Error updating case:", error)
      toast.error("Ошибка при обновлении кейса")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    if (!formData) return
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const addResult = () => {
    if (!formData || !newResult.metric || !newResult.value) return

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            results: [...prev.results, newResult],
          }
        : null,
    )
    setNewResult({ metric: "", value: "" })
  }

  const removeResult = (index: number) => {
    if (!formData) return

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            results: prev.results.filter((_, i) => i !== index),
          }
        : null,
    )
  }

  const addTechnology = () => {
    if (!formData || !newTechnology || formData.technologies.includes(newTechnology)) return

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            technologies: [...prev.technologies, newTechnology],
          }
        : null,
    )
    setNewTechnology("")
  }

  const removeTechnology = (tech: string) => {
    if (!formData) return

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            technologies: prev.technologies.filter((t) => t !== tech),
          }
        : null,
    )
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
              {Array.from({ length: 6 }).map((_, i) => (
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
    return <div>Кейс не найден</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Редактировать кейс</h1>
        <p className="text-gray-600 dark:text-gray-400">Изменение данных кейса</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Информация о кейсе</CardTitle>
            <CardDescription>Обновите данные кейса</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Название кейса *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Клиент *</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => handleChange("client", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Отрасль *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Временные рамки *</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => handleChange("timeline", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Изображение (URL)</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image || ""}
                  onChange={(e) => handleChange("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
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
              <Label htmlFor="challenge">Вызов/Проблема *</Label>
              <Textarea
                id="challenge"
                value={formData.challenge}
                onChange={(e) => handleChange("challenge", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution">Решение *</Label>
              <Textarea
                id="solution"
                value={formData.solution}
                onChange={(e) => handleChange("solution", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Результаты</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Метрика"
                  value={newResult.metric}
                  onChange={(e) => setNewResult((prev) => ({ ...prev, metric: e.target.value }))}
                />
                <Input
                  placeholder="Значение"
                  value={newResult.value}
                  onChange={(e) => setNewResult((prev) => ({ ...prev, value: e.target.value }))}
                />
                <Button type="button" onClick={addResult}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.results.map((result, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {result.metric}: {result.value}
                    <button type="button" onClick={() => removeResult(index)} className="ml-1 hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Технологии</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Добавить технологию"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <button type="button" onClick={() => removeTechnology(tech)} className="ml-1 hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleChange("isActive", checked)}
              />
              <Label htmlFor="isActive">Активен</Label>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Сохранение..." : "Сохранить изменения"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/cases")} disabled={loading}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
