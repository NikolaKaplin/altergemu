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
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

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
  createdAt: string
}

export default function CasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetchCases()
  }, [])

  const fetchCases = async () => {
    try {
      const response = await fetch("/api/admin/cases")
      if (response.ok) {
        const data = await response.json()
        setCases(data)
      } else {
        toast.error("Ошибка при загрузке кейсов")
      }
    } catch (error) {
      console.error("Error fetching cases:", error)
      toast.error("Ошибка при загрузке кейсов")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/cases/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Кейс удален")
        fetchCases()
      } else {
        toast.error("Ошибка при удалении кейса")
      }
    } catch (error) {
      console.error("Error deleting case:", error)
      toast.error("Ошибка при удалении кейса")
    }
    setDeleteId(null)
  }

  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.industry.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Кейсы</h1>
            <p className="text-gray-600 dark:text-gray-400">Управление историями успеха</p>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Кейсы</h1>
          <p className="text-gray-600 dark:text-gray-400">Управление историями успеха</p>
        </div>
        <Button asChild>
          <Link href="/admin/cases/new">
            <Plus className="w-4 h-4 mr-2" />
            Добавить кейс
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все кейсы ({cases.length})</CardTitle>
          <CardDescription>Список всех историй успеха</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Поиск по названию, клиенту или отрасли..."
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
                  <TableHead>Название</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Отрасль</TableHead>
                  <TableHead>Временные рамки</TableHead>
                  <TableHead>Технологии</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {searchTerm ? "Кейсы не найдены" : "Нет кейсов"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell>
                        <div className="font-medium">{caseItem.title}</div>
                      </TableCell>
                      <TableCell>{caseItem.client}</TableCell>
                      <TableCell>{caseItem.industry}</TableCell>
                      <TableCell>{caseItem.timeline}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {caseItem.technologies.slice(0, 2).map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {caseItem.technologies.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{caseItem.technologies.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={caseItem.isActive ? "default" : "secondary"}>
                          {caseItem.isActive ? "Активен" : "Неактивен"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/cases/${caseItem.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/cases/${caseItem.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setDeleteId(caseItem.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Удалить кейс?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Это действие нельзя отменить. Кейс будет удален навсегда.
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
