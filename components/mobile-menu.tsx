"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight, ArrowLeft, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

interface DropdownItem {
  title: string
  href: string
  description?: string
}

interface DropdownSection {
  title: string
  items: DropdownItem[]
}

interface MobileMenuProps {
  servicesDropdown: DropdownSection[]
  companyDropdown: DropdownSection[]
}

export default function MobileMenu({ servicesDropdown, companyDropdown }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentView, setCurrentView] = useState<"main" | "services" | "company">("main")
  const { theme, setTheme } = useTheme()

  // Открыть меню
  const openMenu = () => {
    setIsOpen(true)
    setCurrentView("main")
    document.body.style.overflow = "hidden"
  }

  // Закрыть меню
  const closeMenu = () => {
    setIsOpen(false)
    setCurrentView("main")
    document.body.style.overflow = "unset"
  }

  // Перейти к услугам
  const showServices = () => {
    setCurrentView("services")
  }

  // Перейти к "О нас"
  const showCompany = () => {
    setCurrentView("company")
  }

  // Вернуться в главное меню
  const goBack = () => {
    setCurrentView("main")
  }

  // Закрыть при клике на ссылку
  const handleLinkClick = () => {
    closeMenu()
  }

  // Переключить тему
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (!isOpen) {
    return (
      <button
        onClick={openMenu}
        className="md:hidden p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div
      className="fixed z-[9999] md:hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Монотонный фон на весь экран */}
      <div
        className="absolute bg-white dark:bg-gray-900"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
        }}
      />

      {/* Контент меню на весь экран */}
      <div
        className="relative flex flex-col"
        style={{
          width: "100vw",
          height: "100vh",
          minHeight: "100vh",
        }}
      >
        {/* Шапка - фиксированная на всю ширину */}
        <div
          className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          style={{ width: "100%" }}
        >
          {currentView !== "main" && (
            <button
              onClick={goBack}
              className="p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          {currentView === "main" && <div className="w-10" />}

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {currentView === "main" && "Меню"}
            {currentView === "services" && "Услуги"}
            {currentView === "company" && "О нас"}
          </h2>

          <button
            onClick={closeMenu}
            className="p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Основной контент - растягивается на всю оставшуюся высоту */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900" style={{ width: "100%", minHeight: 0 }}>
          <div className="p-6" style={{ width: "100%", minHeight: "100%" }}>
            {/* Главное меню */}
            {currentView === "main" && (
              <div className="space-y-4" style={{ width: "100%" }}>
                {/* Услуги */}
                <button
                  onClick={showServices}
                  className="w-full flex items-center justify-between p-4 text-left text-xl font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span>Услуги</span>
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* О нас */}
                <button
                  onClick={showCompany}
                  className="w-full flex items-center justify-between p-4 text-left text-xl font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span>О нас</span>
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Контакты */}
                <Link
                  href="#contact"
                  onClick={handleLinkClick}
                  className="block w-full p-4 text-xl font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Контакты
                </Link>

                {/* Разделитель */}
                <div className="w-full border-t border-gray-200 dark:border-gray-700 my-6" />

                {/* Кнопка смены темы */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between p-4 text-left text-xl font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span>Тема</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {theme === "dark" ? "Темная" : "Светлая"}
                    </span>
                    {theme === "dark" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                  </div>
                </button>

                {/* Кнопка связаться */}
                <Button
                  onClick={handleLinkClick}
                  className="w-full mt-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg py-4 text-lg font-semibold transition-colors"
                >
                  Связаться
                </Button>
              </div>
            )}

            {/* Подменю услуг */}
            {currentView === "services" && (
              <div className="space-y-6" style={{ width: "100%" }}>
                {servicesDropdown.map((section, index) => (
                  <div key={index} className="w-full">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                      {section.title}
                    </h3>
                    <div className="w-full space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          onClick={handleLinkClick}
                          className="block w-full p-3 text-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <div className="font-medium">{item.title}</div>
                          {item.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Подменю "О нас" */}
            {currentView === "company" && (
              <div className="space-y-6" style={{ width: "100%" }}>
                {companyDropdown.map((section, index) => (
                  <div key={index} className="w-full">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                      {section.title}
                    </h3>
                    <div className="w-full space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          onClick={handleLinkClick}
                          className="block w-full p-3 text-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <div className="font-medium">{item.title}</div>
                          {item.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Футер - фиксированный внизу на всю ширину */}
        <div
          className="flex-shrink-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          style={{ width: "100%" }}
        >
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">© 2024 altergemu. Все права защищены.</p>
        </div>
      </div>
    </div>
  )
}
