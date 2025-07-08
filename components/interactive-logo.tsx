"use client"

import type React from "react"

import { useTheme } from "@/components/theme-provider"

interface InteractiveLogoProps {
  variant?: "header" | "hero"
}

export default function InteractiveLogo({ variant = "hero" }: InteractiveLogoProps) {
  const { theme } = useTheme()

  const isHeader = variant === "header"
  const logoSize = isHeader ? "w-12 h-12" : "w-[480px] h-[480px]"
  const strokeColor = theme === "dark" ? "#FFFFFF" : "#000000"

  return (
    <div className={`relative ${logoSize} flex items-center justify-center`}>
      <svg
        viewBox="0 0 595.28 510"
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 8px 32px rgba(0, 0, 0, 0.1))",
        }}
      >
        {/* Main diamond shape */}
        <path
          d="M297.29,71.67c-32.45,61.21-64.91,122.43-97.36,183.64c32.57,60.32,65.14,120.65,97.7,180.97c32.57-60.32,65.14-120.65,97.7-180.97C362.66,194.1,329.98,132.89,297.29,71.67z"
          stroke={strokeColor}
          strokeWidth="3.4646"
          strokeMiterlimit="10"
          fill="none"
        />

        {/* Inner fill */}
        <path
          d="M296.94,75.24c0.19,0,0.38,0,0.57,0c18.34,60.51,36.67,121.02,55.01,181.53l-55.55,180.97l29.87-182.75C316.87,195.07,306.9,135.15,296.94,75.24z"
          fill={strokeColor}
        />

        {/* Base ellipse */}
        <path
          d="M370.37,205.01c4.89,9.16,9.78,18.33,14.67,27.49c21.15,8.56,26.59,15.71,26.51,21.16c-0.25,18.1-61.37,35.82-115.31,35.46c-52.62-0.35-112.38-18.01-112.52-35.83c-0.05-6.46,7.71-13.41,26.48-20.86c4.83-9.15,9.65-18.3,14.48-27.46c-84.83,12.55-142.78,36.6-142.61,59.42c0.23,29.61,98.26,51.22,106.79,53.05c-15.76-7.48-24.88-14.55-24.16-17.47c1.68-6.87,56.88,11.51,152.37,9.01c72.93-1.91,112.14-14.5,113.52-9.01c0.73,2.92-9.38,10.45-26.64,18.3c6.19-1.26,108.91-22.86,109.27-53.21C513.47,242.17,455.46,217.56,370.37,205.01z"
          fill={strokeColor}
        />
      </svg>
    </div>
  )
}

export function FullPageLogoInteraction({ children }: { children: React.ReactNode }) {
  return <div className="relative min-h-screen">{children}</div>
}
