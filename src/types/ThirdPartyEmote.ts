export interface ThirdPartyEmote {
  code: string
  id: string
  urls: EmoteUrls
  provider?: string
}

export interface EmoteUrls {
  small: string
  medium: string
  big: string
}
