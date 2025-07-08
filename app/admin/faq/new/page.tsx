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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function NewFaqPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    order: 0,
    isActive: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create FAQ item")
      }

      toast.success("Вопрос FAQ успешно создан")
      router.push("/admin/faq")
    } catch (error) {
      console.error("Error creating FAQ item:", error)
      toast.error("Ошибка при создании вопроса FAQ")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Новый вопрос FAQ</h1>
        <p className="text-gray-600 dark:text-gray-400">Добавьте новый часто задаваемый вопрос</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Информация о вопросе</CardTitle>
            <CardDescription>Заполните данные для нового вопроса FAQ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Категория *</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Общие">Общие</SelectItem>
                    <SelectItem value="Услуги">Услуги</SelectItem>
                    <SelectItem value="Цены">Цены</SelectItem>
                    <SelectItem value="Техническая поддержка">Техническая поддержка</SelectItem>
                    <SelectItem value="Сотрудничество">Сотрудничество</SelectItem>
                  </SelectContent>
                </Select>
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
              <Label htmlFor="question">Вопрос *</Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) => handleChange("question", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Ответ *</Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) => handleChange("answer", e.target.value)}
                rows={6}
                required
              />
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
                {loading ? "Создание..." : "Создать вопрос"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/faq")} disabled={loading}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
