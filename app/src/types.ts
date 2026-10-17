export type ResourceType = 'book' | 'report'

export interface Resource {
  type: ResourceType
  title: string
  authors: string[]
  open_access: boolean
  license?: string | null
  links: string[]
}
