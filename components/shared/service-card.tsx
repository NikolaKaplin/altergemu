"use client"

import { useState } from "react"
import { ServiceModal } from "./service-modal"

interface ServiceCardProps {
  title: string
  description: string
  price: string
  details?: string
}

export function ServiceCard({ title, description, price, details }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-3 md:p-6">
          <h4 className="text-base md:text-xl font-semibold mb-2 line-clamp-1">{title}</h4>
          <p className="text-zinc-400 mb-3 text-xs md:text-base line-clamp-2 overflow-hidden">{description}</p>
          <div className="text-lg md:text-2xl font-bold">{price}</div>
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        price={price}
        description={description}
        details={details}
      />
    </>
  )
}
