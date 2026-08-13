export type Page =
  | 'home'
  | 'how-it-works'
  | 'platform'
  | 'models'
  | 'solutions'
  | 'case-studies'
  | 'security'
  | 'company'
  | 'pricing'
  | 'resources'
  | 'contact'

export interface NavigateProps {
  navigate: (page: Page) => void
}
