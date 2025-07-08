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
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface FaqItem {
  id: number
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  createdAt: string
}

export default function FaqPage() {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetchFaqItems()
  }, [])

  const fetchFaqItems = async () => {
    try {
      const response = await fetch("/api/admin/faq")
      if (response.ok) {
        const data = await response.json()
        setFaqItems(data)
      } else {
        toast.error("Ошибка при загрузке FAQ")
      }
    } catch (error) {
      console.error("Error fetching FAQ items:", error)
      toast.error("Ошибка при загрузке FAQ")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/faq/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Вопрос удален")
        fetchFaqItems()
      } else {
        toast.error("Ошибка при удалении вопроса")
      }
    } catch (error) {
      console.error("Error deleting FAQ item:", error)
      toast.error("Ошибка при удалении вопроса")
    }
    setDeleteId(null)
  }

  const filteredFaqItems = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FAQ</h1>
            <p className="text-gray-600 dark:text-gray-400">Управление часто задаваемыми вопросами</p>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FAQ</h1>
          <p className="text-gray-600 dark:text-gray-400">Управление часто задаваемыми вопросами</p>
        </div>
        <Button asChild>
          <Link href="/admin/faq/new">
            <Plus className="w-4 h-4 mr-2" />
            Добавить вопрос
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все вопросы ({faqItems.length})</CardTitle>
          <CardDescription>Список всех часто задаваемых вопросов</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Поиск по вопросу, ответу или категории..."
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
                  <TableHead>Вопрос</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Порядок</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaqItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      {searchTerm ? "Вопросы не найдены" : "Нет вопросов"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFaqItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="max-w-md">
                          <div className="font-medium">{item.question}</div>
                          <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {item.answer.substring(0, 100)}...
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.order}</TableCell>
                      <TableCell>
                        <Badge variant={item.isActive ? "default" : "secondary"}>
                          {item.isActive ? "Активен" : "Неактивен"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/faq/${item.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setDeleteId(item.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Удалить вопрос?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Это действие нельзя отменить. Вопрос будет удален навсегда.
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
