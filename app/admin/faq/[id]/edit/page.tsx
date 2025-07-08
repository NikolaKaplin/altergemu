"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

export default function EditFaqPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState<FaqItem | null>(null);
  useEffect(() => {
    fetchFaqItem();
  }, [params.id]);

  const fetchFaqItem = async () => {
    try {
      const response = await fetch(`/api/admin/faq/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch FAQ item");
      }
      const faqItem = await response.json();
      console.log(faqItem);
      setFormData(faqItem);
    } catch (error) {
      console.error("Error fetching FAQ item:", error);
      toast.error("Ошибка при загрузке вопроса FAQ");
      router.push("/admin/faq");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    console.log(formData);
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/faq/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update FAQ item");
      }

      toast.success("Вопрос FAQ успешно обновлен");
      router.push("/admin/faq");
    } catch (error) {
      console.error("Error updating FAQ item:", error);
      toast.error("Ошибка при обновлении вопроса FAQ");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    if (!formData) return;
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

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
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!formData) {
    return <div>Вопрос FAQ не найден</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Редактировать вопрос FAQ
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Изменение данных вопроса FAQ
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Информация о вопросе</CardTitle>
            <CardDescription>Обновите данные вопроса FAQ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Категория *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Общие">Общие</SelectItem>
                    <SelectItem value="Услуги">Услуги</SelectItem>
                    <SelectItem value="Цены">Цены</SelectItem>
                    <SelectItem value="Техническая поддержка">
                      Техническая поддержка
                    </SelectItem>
                    <SelectItem value="Сотрудничество">
                      Сотрудничество
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Порядок сортировки</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    handleChange("order", Number.parseInt(e.target.value) || 0)
                  }
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
                {loading ? "Сохранение..." : "Сохранить изменения"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/faq")}
                disabled={loading}
              >
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
