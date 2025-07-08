"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { Upload, X, FileImage, File } from "lucide-react"

export default function MediaUploadPage() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [folder, setFolder] = useState("root")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Выберите файлы для загрузки")
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", folder)

        const response = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        setUploadProgress(((i + 1) / files.length) * 100)
      }

      toast.success(`Успешно загружено ${files.length} файлов`)
      router.push("/admin/media")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Ошибка при загрузке файлов")
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Загрузка файлов</h1>
        <p className="text-gray-600 dark:text-gray-400">Загрузите изображения и другие медиа файлы</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Выбор файлов</CardTitle>
          <CardDescription>Выберите файлы для загрузки в облачное хранилище</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="folder">Папка (необязательно)</Label>
            <Select value={folder} onValueChange={setFolder}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите папку или оставьте пустым" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="root">Корневая папка</SelectItem>
                <SelectItem value="images">images</SelectItem>
                <SelectItem value="documents">documents</SelectItem>
                <SelectItem value="portfolio">portfolio</SelectItem>
                <SelectItem value="blog">blog</SelectItem>
                <SelectItem value="team">team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="files">Файлы</Label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">Перетащите файлы сюда или нажмите для выбора</p>
              <Input
                id="files"
                type="file"
                multiple
                accept="image/*,application/pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById("files")?.click()}>
                Выбрать файлы
              </Button>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Выбранные файлы ({files.length})</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      {file.type.startsWith("image/") ? (
                        <FileImage className="w-8 h-8 text-blue-500" />
                      ) : (
                        <File className="w-8 h-8 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploading && (
            <div className="space-y-2">
              <Label>Прогресс загрузки</Label>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-gray-600">{Math.round(uploadProgress)}% завершено</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={handleUpload} disabled={files.length === 0 || uploading}>
              {uploading ? "Загрузка..." : "Загрузить файлы"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/media")} disabled={uploading}>
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
