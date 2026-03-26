import type { ReactNode } from "react"

export interface CourseCard {
  title: string
  description: string
  tag: string
}

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  courses?: CourseCard[]
}

export interface SectionProps extends Section {
  isActive: boolean
  onButtonClick?: () => void
}