"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { X, Plus } from "lucide-react"

export default function NewCasePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    industry: "",
    challenge: "",
    solution: "",
    results: [] as Array<{ metric: string; value: string }>,
    image: "",
    timeline: "",
    technologies: [] as string[],
    order: 0,
    isActive: true,
  })

  const [newResult, setNewResult] = useState({ metric: "", value: "" })
  const [newTechnology, setNewTechnology] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create case")
      }

      toast.success("Кейс успешно создан")
      router.push("/admin/cases")
    } catch (error) {
      console.error("Error creating case:", error)
      toast.error("Ошибка при создании кейса")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addResult = () => {
    if (newResult.metric && newResult.value) {
      setFormData((prev) => ({
        ...prev,
        results: [...prev.results, newResult],
      }))
      setNewResult({ metric: "", value: "" })
    }
  }

  const removeResult = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index),
    }))
  }

  const addTechnology = () => {
    if (newTechnology && !formData.technologies.includes(newTechnology)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology],
      }))
      setNewTechnology("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Новый кейс</h1>
        <p className="text-gray-600 dark:text-gray-400">Добавьте новую историю успеха</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Информация о кейсе</CardTitle>
            <CardDescription>Заполните данные для нового кейса</CardDescription>
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
                  placeholder="например: 3 месяца"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Изображение (URL)</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
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
                  placeholder="Метрика (например: Увеличение продаж)"
                  value={newResult.metric}
                  onChange={(e) => setNewResult((prev) => ({ ...prev, metric: e.target.value }))}
                />
                <Input
                  placeholder="Значение (например: +150%)"
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
                {loading ? "Создание..." : "Создать кейс"}
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
