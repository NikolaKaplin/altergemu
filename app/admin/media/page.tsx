"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Upload, Search, Trash2, Download, Eye, FileImage, File, Folder } from "lucide-react"
import Link from "next/link"

interface MediaFile {
  id: number
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  folder: string
  uploadedBy: number
  createdAt: string
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetchMediaFiles()
  }, [])

  const fetchMediaFiles = async () => {
    try {
      const response = await fetch("/api/admin/media")
      if (response.ok) {
        const data = await response.json()
        setMediaFiles(data)
      } else {
        toast.error("Ошибка при загрузке медиа файлов")
      }
    } catch (error) {
      console.error("Error fetching media files:", error)
      toast.error("Ошибка при загрузке медиа файлов")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Файл удален")
        fetchMediaFiles()
      } else {
        toast.error("Ошибка при удалении файла")
      }
    } catch (error) {
      console.error("Error deleting media file:", error)
      toast.error("Ошибка при удалении файла")
    }
    setDeleteId(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFolder = selectedFolder === "all" || file.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  const folders = Array.from(new Set(mediaFiles.map((file) => file.folder))).filter(Boolean)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Медиа файлы</h1>
            <p className="text-gray-600 dark:text-gray-400">Управление загруженными файлами</p>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Медиа файлы</h1>
          <p className="text-gray-600 dark:text-gray-400">Управление загруженными файлами</p>
        </div>
        <Button asChild>
          <Link href="/admin/media/upload">
            <Upload className="w-4 h-4 mr-2" />
            Загрузить файлы
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все файлы ({mediaFiles.length})</CardTitle>
          <CardDescription>Список всех загруженных медиа файлов</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Поиск файлов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedFolder} onValueChange={setSelectedFolder}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Все папки" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все папки</SelectItem>
                <SelectItem value="root">Корневая папка</SelectItem>
                {folders.map((folder) => (
                  <SelectItem key={folder} value={folder}>
                    {folder}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchTerm || selectedFolder !== "all" ? "Файлы не найдены" : "Нет загруженных файлов"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm || selectedFolder !== "all"
                  ? "Попробуйте изменить критерии поиска"
                  : "Загрузите первые файлы для начала работы"}
              </p>
              {!searchTerm && selectedFolder === "all" && (
                <Button asChild>
                  <Link href="/admin/media/upload">
                    <Upload className="w-4 h-4 mr-2" />
                    Загрузить файлы
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {file.mimeType.startsWith("image/") ? (
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.originalName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <File className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <span className="text-xs text-gray-500 uppercase">{file.mimeType.split("/")[1]}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        {file.mimeType.startsWith("image/") ? (
                          <FileImage className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <File className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate" title={file.originalName}>
                            {file.originalName}
                          </p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>

                      {file.folder && (
                        <div className="flex items-center gap-1">
                          <Folder className="w-3 h-3 text-gray-400" />
                          <Badge variant="outline" className="text-xs">
                            {file.folder}
                          </Badge>
                        </div>
                      )}

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={file.url} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-3 h-3" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={file.url} download={file.originalName}>
                            <Download className="w-3 h-3" />
                          </a>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setDeleteId(file.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить файл?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить. Файл будет удален навсегда.
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
