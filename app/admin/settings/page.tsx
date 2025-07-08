"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Save, Globe, Phone } from "lucide-react"

interface Settings {
  siteName: string
  siteDescription: string
  siteUrl: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  socialFacebook: string
  socialTwitter: string
  socialInstagram: string
  socialLinkedin: string
  socialGithub: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  analyticsGoogleId: string
  analyticsYandexId: string
  maintenanceMode: string
  registrationEnabled: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: "",
    siteDescription: "",
    siteUrl: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    socialFacebook: "",
    socialTwitter: "",
    socialInstagram: "",
    socialLinkedin: "",
    socialGithub: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    analyticsGoogleId: "",
    analyticsYandexId: "",
    maintenanceMode: "false",
    registrationEnabled: "true",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings")
      if (response.ok) {
        const data = await response.json()
        setSettings((prev) => ({ ...prev, ...data }))
      } else {
        toast.error("Ошибка при загрузке настроек")
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
      toast.error("Ошибка при загрузке настроек")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast.success("Настройки сохранены")
      } else {
        toast.error("Ошибка при сохранении настроек")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error("Ошибка при сохранении настроек")
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof value === "boolean" ? value.toString() : value,
    }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Настройки</h1>
          <p className="text-gray-600 dark:text-gray-400">Управление настройками сайта</p>
        </div>
        <div className="text-center py-12">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Настройки</h1>
          <p className="text-gray-600 dark:text-gray-400">Управление настройками сайта</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="contact">Контакты</TabsTrigger>
          <TabsTrigger value="social">Соцсети</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Основные настройки
              </CardTitle>
              <CardDescription>Основная информация о сайте</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Название сайта</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleChange("siteName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteUrl">URL сайта</Label>
                  <Input
                    id="siteUrl"
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) => handleChange("siteUrl", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Описание сайта</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode === "true"}
                    onCheckedChange={(checked) => handleChange("maintenanceMode", checked)}
                  />
                  <Label htmlFor="maintenanceMode">Режим обслуживания</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="registrationEnabled"
                    checked={settings.registrationEnabled === "true"}
                    onCheckedChange={(checked) => handleChange("registrationEnabled", checked)}
                  />
                  <Label htmlFor="registrationEnabled">Разрешить регистрацию</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Контактная информация
              </CardTitle>
              <CardDescription>Контактные данные компании</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Телефон</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactAddress">Адрес</Label>
                <Textarea
                  id="contactAddress"
                  value={settings.contactAddress}
                  onChange={(e) => handleChange("contactAddress", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Социальные сети</CardTitle>
              <CardDescription>Ссылки на профили в социальных сетях</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="socialFacebook">Facebook</Label>
                  <Input
                    id="socialFacebook"
                    type="url"
                    value={settings.socialFacebook}
                    onChange={(e) => handleChange("socialFacebook", e.target.value)}
                    placeholder="https://facebook.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialTwitter">Twitter</Label>
                  <Input
                    id="socialTwitter"
                    type="url"
                    value={settings.socialTwitter}
                    onChange={(e) => handleChange("socialTwitter", e.target.value)}
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialInstagram">Instagram</Label>
                  <Input
                    id="socialInstagram"
                    type="url"
                    value={settings.socialInstagram}
                    onChange={(e) => handleChange("socialInstagram", e.target.value)}
                    placeholder="https://instagram.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialLinkedin">LinkedIn</Label>
                  <Input
                    id="socialLinkedin"
                    type="url"
                    value={settings.socialLinkedin}
                    onChange={(e) => handleChange("socialLinkedin", e.target.value)}
                    placeholder="https://linkedin.com/company/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialGithub">GitHub</Label>
                  <Input
                    id="socialGithub"
                    type="url"
                    value={settings.socialGithub}
                    onChange={(e) => handleChange("socialGithub", e.target.value)}
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO настройки</CardTitle>
              <CardDescription>Настройки для поисковой оптимизации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={settings.metaTitle}
                  onChange={(e) => handleChange("metaTitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.metaDescription}
                  onChange={(e) => handleChange("metaDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={settings.metaKeywords}
                  onChange={(e) => handleChange("metaKeywords", e.target.value)}
                  placeholder="ключевое слово, другое слово, третье слово"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="analyticsGoogleId">Google Analytics ID</Label>
                  <Input
                    id="analyticsGoogleId"
                    value={settings.analyticsGoogleId}
                    onChange={(e) => handleChange("analyticsGoogleId", e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="analyticsYandexId">Yandex Metrica ID</Label>
                  <Input
                    id="analyticsYandexId"
                    value={settings.analyticsYandexId}
                    onChange={(e) => handleChange("analyticsYandexId", e.target.value)}
                    placeholder="12345678"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
