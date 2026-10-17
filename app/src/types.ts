export type ResourceType = 'book' | 'report' | 'conference-paper' | 'preprint'

export interface Resource {
  type: ResourceType
  title: string
  authors: string[]
  date?: string
  tags?: string[]
  asin?: string
  open_access: boolean
  license?: string | null
  links: string[]
}
