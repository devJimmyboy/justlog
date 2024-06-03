export interface ChannelBadge {
  code: string

  urls: BadgeUrls
  title: string
  action: string | null
}

export interface UserBadge {
  code: string

  urls: BadgeUrls
  title: string
  action: string | null
  users: string[]
}

export interface BadgeUrls {
  small: string
  medium: string
  big: string
}

export interface TwitchBadge {
  set_id: string
  versions: TwitchBadgeVersion[]
}

export interface TwitchBadgeVersion {
  id: string
  title: string
  description: string
  click_action: string | null
  click_url: string | null
  image_url_1x: string
  image_url_2x: string
  image_url_4x: string
}

export type IvrTwitchBadgeResponse = TwitchBadge[]
