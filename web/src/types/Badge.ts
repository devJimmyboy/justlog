export interface Badge {
  code: string
  users: string[]
  urls: BadgeUrls
}

export interface BadgeUrls {
  small: string
  medium: string
  big: string
}
