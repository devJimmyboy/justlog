export type StvGlobalEmotesResponse = StvGlobal
export type StvChannelEmotesResponse = StvChannel

interface StvGlobal {
  emotes: StvEmote[]
}

interface StvChannel {
  emote_set: StvEmoteSet | null
}

interface StvEmoteSet {
  id: string
  name: string
  emotes: StvEmote[]
}

interface StvEmote {
  id: string
  name: string
  data: StvEmoteData
}

interface StvEmoteData {
  id: string
  name: string
  listed: boolean
  animated: boolean
  host: StvEmoteHost
}

interface StvEmoteHost {
  url: string
  files: StvEmoteFile[]
}

interface StvEmoteFile {
  name: string
  width: number
  height: number
  format: string
}

export interface BadgeCosmetic {
  id: string
  kind: string
  name: string
  tag: string
  tooltip: string
}
export interface PaintCosmetic {
  id: string
  angle: number
  color: number | null
  function: 'LINEAR_GRADIENT' | 'RADIAL_GRADIENT' | 'URL'
  image_url: string | null
  kind: string
  name: string
  repeat: boolean
  shadows: {
    x_offset: number
    y_offset: number
    color: number
    radius: number
  }[]
  shape: 'circle' | 'ellipse'
  stops: {
    at: number
    color: number
  }
}

export interface StvCosmeticsResponse {
  cosmetics: {
    badges: BadgeCosmetic[]
    paints: PaintCosmetic[]
  }
}
