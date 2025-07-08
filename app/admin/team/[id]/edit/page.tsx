"use client";

import type React from "react";

import { useState, useEffect, use } from "react";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Plus } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string | null;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  order: number;
  isActive: boolean;
}

export default function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState<TeamMember | null>(null);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    fetchTeamMember(id);
  }, [id]);

  const fetchTeamMember = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/team/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch team member");
      }
      const teamMember: TeamMember = await response.json();
      setFormData({
        id: teamMember.id,
        name: teamMember.name,
        role: teamMember.role,
        description: teamMember.description,
        image: teamMember.image,
        skills: teamMember.skills,
        social: teamMember.social,
        order: teamMember.order,
        isActive: teamMember.isActive,
      });
    } catch (error) {
      console.error("Error fetching team member:", error);
      toast.error("Ошибка при загрузке участника команды");
      router.push("/admin/team");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);

    try {
      console.log(formData);
      const response = await fetch(`/api/admin/team/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update team member");
      }

      toast.success("Участник команды успешно обновлен");
      router.push("/admin/team");
    } catch (error) {
      console.error("Error updating team member:", error);
      toast.error("Ошибка при обновлении участника команды");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    if (!formData) return;
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSocialChange = (field: string, value: string) => {
    if (!formData) return;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            social: { ...prev.social, [field]: value },
          }
        : null
    );
  };

  const addSkill = () => {
    if (!formData || !newSkill || formData.skills.includes(newSkill)) return;

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            skills: [...prev.skills, newSkill],
          }
        : null
    );
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    if (!formData) return;

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
          }
        : null
    );
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
              {Array.from({ length: 4 }).map((_, i) => (
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
    return <div>Участник команды не найден</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Редактировать участника команды
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Изменение данных участника команды
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Информация об участнике</CardTitle>
            <CardDescription>Обновите данные участника команды</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Должность *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Фото (URL)</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image || ""}
                  onChange={(e) => handleChange("image", e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                />
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
              <Label htmlFor="description">Описание *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Навыки</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Добавить навык"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addSkill())
                  }
                />
                <Button type="button" onClick={addSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Социальные сети</Label>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    type="url"
                    value={formData.social.github || ""}
                    onChange={(e) =>
                      handleSocialChange("github", e.target.value)
                    }
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={formData.social.linkedin || ""}
                    onChange={(e) =>
                      handleSocialChange("linkedin", e.target.value)
                    }
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.social.email || ""}
                    onChange={(e) =>
                      handleSocialChange("email", e.target.value)
                    }
                    placeholder="email@example.com"
                  />
                </div>
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
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/team")}
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
