'https://api.ivr.fi/v2/twitch/badges/global'
'https://api.ivr.fi/v2/twitch/badges/channel?id=${channel}'

import { useQuery } from 'react-query'
import { ChannelBadge, IvrTwitchBadgeResponse } from '../types/Badge'
import { QueryDefaults } from '../store'
import { useFfzChannelBadges } from './useFfzChannelBadges'

export function useBadges(channelId: string): Map<string, ChannelBadge> {
  const { isLoading, error, data } = useQuery<IvrTwitchBadgeResponse>(
    ['badges:channel', { channelId: channelId }],
    async () => {
      if (channelId === '') {
        return Promise.resolve([])
      }

      return [
        ...(await fetch(`https://api.ivr.fi/v2/twitch/badges/global`)
          .then((res) => res.json())
          .then((res) => res || null)),
        ...(await fetch(`https://api.ivr.fi/v2/twitch/badges/channel?id=${channelId}`)
          .then((res) => res.json())
          .then((res) => res || null)),
      ]
    },
    QueryDefaults
  )
  const { isLoading: ffzLoading, mod, vip } = useFfzChannelBadges(channelId)

  if (isLoading || ffzLoading) {
    return new Map()
  }

  if (error) {
    console.error(error)
    return new Map()
  }

  const badges: Map<string, ChannelBadge> = new Map()

  if (data) {
    data.forEach((badge) => {
      badge.versions.forEach((version) => {
        badges.set(`${badge.set_id}/${version.id}`, {
          code: `${badge.set_id}/${version.id}`,
          title: version.title,
          urls: {
            big: version.image_url_4x,
            medium: version.image_url_2x,
            small: version.image_url_1x,
          },
          action: version.click_url,
        })
      })
    })
  }
  if (mod) {
    badges.set(mod.code, mod)
  }
  if (vip) {
    badges.set(vip.code, vip)
  }

  return badges
}
