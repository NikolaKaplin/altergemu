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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { X, Plus } from "lucide-react"

interface Job {
  id: number
  title: string
  type: string
  location: string
  salary: string
  description: string
  requirements: string[]
  skills: string[]
  isActive: boolean
  order: number
}

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState<Job | null>(null)
  const [newRequirement, setNewRequirement] = useState("")
  const [newSkill, setNewSkill] = useState("")

  useEffect(() => {
    fetchJob()
  }, [params.id])

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/admin/jobs/${params.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch job")
      }
      const job = await response.json()
      setFormData(job)
    } catch (error) {
      console.error("Error fetching job:", error)
      toast.error("Ошибка при загрузке вакансии")
      router.push("/admin/jobs")
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setLoading(true)

    try {
      const response = await fetch(`/api/admin/jobs/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update job")
      }

      toast.success("Вакансия успешно обновлена")
      router.push("/admin/jobs")
    } catch (error) {
      console.error("Error updating job:", error)
      toast.error("Ошибка при обновлении вакансии")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    if (!formData) return
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const addRequirement = () => {
    if (!formData || !newRequirement || formData.requirements.includes(newRequirement)) return

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            requirements: [...prev.requirements, newRequirement],
          }
        : null,
    )
    setNewRequirement("")
  }

  const removeRequirement = (req: string) => {
    if (!formData) return

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            requirements: prev.requirements.filter((r) => r !== req),
          }
        : null,
    )
  }

  const addSkill = () => {
    if (!formData || !newSkill || formData.skills.includes(newSkill)) return

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            skills: [...prev.skills, newSkill],
          }
        : null,
    )
    setNewSkill("")
  }

  const removeSkill = (skill: string) => {
    if (!formData) return

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
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
              {Array.from({ length: 5 }).map((_, i) => (
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
    return <div>Вакансия не найдена</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Редактировать вакансию</h1>
        <p className="text-gray-600 dark:text-gray-400">Изменение данных вакансии</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Информация о вакансии</CardTitle>
            <CardDescription>Обновите данные вакансии</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Название должности *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Тип занятости *</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Полная занятость">Полная занятость</SelectItem>
                    <SelectItem value="Частичная занятость">Частичная занятость</SelectItem>
                    <SelectItem value="Удаленная работа">Удаленная работа</SelectItem>
                    <SelectItem value="Контракт">Контракт</SelectItem>
                    <SelectItem value="Стажировка">Стажировка</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Местоположение *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Зарплата *</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => handleChange("salary", e.target.value)}
                  required
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
              <Label htmlFor="description">Описание вакансии *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Требования</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Добавить требование"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                />
                <Button type="button" onClick={addRequirement}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.requirements.map((req, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {req}
                    <button type="button" onClick={() => removeRequirement(req)} className="ml-1 hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Навыки</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Добавить навык"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-red-500">
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
              <Label htmlFor="isActive">Активна</Label>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Сохранение..." : "Сохранить изменения"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/jobs")} disabled={loading}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
