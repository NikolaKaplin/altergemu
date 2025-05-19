"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  price: string
  description: string
  details?: string
}

export function ServiceModal({ isOpen, onClose, title, price, description, details }: ServiceModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!mounted) return null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="text-2xl font-bold mb-4">{price}</div>
          <p className="text-zinc-300 mb-4">{description}</p>
          {details && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Подробная информация:</h4>
              <p className="text-zinc-400">{details}</p>
            </div>
          )}
          <button
            onClick={onClose}
            className="mt-6 w-full bg-white text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
