"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  FileText,
  ImageIcon,
  Briefcase,
  Users,
  LogOut,
  Wrench,
  BookOpen,
  HelpCircle,
  CaseSensitiveIcon as CaseIcon,
  UserCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/db/schema";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Услуги", href: "/admin/services", icon: Wrench },
  { name: "Портфолио", href: "/admin/portfolio", icon: Briefcase },
  { name: "Команда", href: "/admin/team", icon: UserCheck },
  { name: "Отзывы", href: "/admin/reviews", icon: Star },
  { name: "Блог", href: "/admin/blog", icon: BookOpen },
  { name: "Кейсы", href: "/admin/cases", icon: CaseIcon },
  { name: "Вакансии", href: "/admin/jobs", icon: Users },
  { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { name: "Страницы", href: "/admin/pages", icon: FileText },
  { name: "Медиа файлы", href: "/admin/media", icon: ImageIcon },
  { name: "Настройки", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Админ панель
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          altergemu.com
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  );
}
