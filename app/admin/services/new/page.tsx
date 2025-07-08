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
import { X, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function NewServicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    fullDescription: "",
    price: "",
    image: "",
    isActive: true,
    order: 0,
  })
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [examples, setExamples] = useState<Array<{ title: string; description: string; image: string }>>([])
  const [process, setProcess] = useState<string[]>([])
  const [newProcess, setNewProcess] = useState("")

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const addProcess = () => {
    if (newProcess.trim()) {
      setProcess([...process, newProcess.trim()])
      setNewProcess("")
    }
  }

  const removeProcess = (index: number) => {
    setProcess(process.filter((_, i) => i !== index))
  }

  const addExample = () => {
    setExamples([...examples, { title: "", description: "", image: "" }])
  }

  const updateExample = (index: number, field: string, value: string) => {
    const updated = examples.map((example, i) => (i === index ? { ...example, [field]: value } : example))
    setExamples(updated)
  }

  const removeExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          features,
          examples,
          process,
        }),
      })

      if (response.ok) {
        toast.success("Услуга создана успешно")
        router.push("/admin/services")
      } else {
        toast.error("Ошибка при создании услуги")
      }
    } catch (error) {
      toast.error("Ошибка при создании услуги")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Новая услуга</h1>
          <p className="text-gray-600 dark:text-gray-400">Создание новой услуги</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
            <CardDescription>Основные данные об услуге</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название</Label>
                <Input id="title" value={formData.title} onChange={(e) => handleTitleChange(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL (slug)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Краткое описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription">Полное описание</Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Цена</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Порядок</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Изображение (URL)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Активна</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Особенности</CardTitle>
            <CardDescription>Ключевые особенности услуги</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Добавить особенность"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeFeature(index)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Процесс работы</CardTitle>
            <CardDescription>Этапы выполнения услуги</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Добавить этап"
                value={newProcess}
                onChange={(e) => setNewProcess(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addProcess())}
              />
              <Button type="button" onClick={addProcess}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {process.map((step, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="font-medium">{index + 1}.</span>
                  <span className="flex-1">{step}</span>
                  <X className="w-4 h-4 cursor-pointer text-red-500" onClick={() => removeProcess(index)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Примеры работ</CardTitle>
            <CardDescription>Примеры выполненных проектов</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button type="button" onClick={addExample} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Добавить пример
            </Button>
            <div className="space-y-4">
              {examples.map((example, index) => (
                <div key={index} className="p-4 border rounded space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Пример {index + 1}</h4>
                    <X className="w-4 h-4 cursor-pointer text-red-500" onClick={() => removeExample(index)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Название"
                      value={example.title}
                      onChange={(e) => updateExample(index, "title", e.target.value)}
                    />
                    <Input
                      placeholder="Изображение (URL)"
                      value={example.image}
                      onChange={(e) => updateExample(index, "image", e.target.value)}
                    />
                  </div>
                  <Textarea
                    placeholder="Описание"
                    value={example.description}
                    onChange={(e) => updateExample(index, "description", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Создание..." : "Создать услугу"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/services">Отмена</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
