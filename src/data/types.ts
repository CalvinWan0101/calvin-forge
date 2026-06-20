import type { IconType } from 'react-icons'

export type Skill = {
  corner: string
  title: string
  icon: IconType
  items: string[]
}

export type Experience = {
  company?: string
  title: string
  period: string
  items?: string[]
  active?: boolean
  compact?: boolean
}

export type Education = {
  company?: string
  title: string
  period: string
  active?: boolean
  compact?: boolean
}

export type Project = {
  name: string
  host: 'GitHub'
  hostIcon: IconType
  href: string
  description: string
  tags: string[]
  desktopImageUrl?: string
  mobileImageUrl?: string
  imageAlt?: string
}

export type ContactMethod = {
  label: string
  value: string
  subtext: string
  href: string
  icon: IconType
}

export type PurchaseRecord = {
  date: Date
  shares: number
  price: number
}
