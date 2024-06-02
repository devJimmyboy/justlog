import { useQuery } from 'react-query'
import { QueryDefaults } from '../store'
import { EmoteSet, FfzChannelEmotesResponse, FfzGlobalBadgesResponse } from '../types/Ffz'
import { Badge } from '../types/Badge'

export function useFfzChannelBadges(channelId: string): Array<Badge> {
  const { isLoading, error, data } = useQuery<{ room: FfzChannelEmotesResponse['room'] }>(
    ['badges:ffz:channel', { channelId: channelId }],
    () => {
      if (channelId === '') {
        return Promise.resolve({ room: {} })
      }

      return fetch(`https://api.frankerfacez.com/v1/room/id/${channelId}`)
        .then((res) => res.json())
        .then((res) => res?.room || null)
        .then((room) => {
          return { room }
        })
    },
    QueryDefaults
  )

  if (isLoading || !data?.room) {
    return []
  }

  if (error) {
    console.error(error)
    return []
  }

  const badges: Badge[] = []

  badges.push({
    code: '',
    users: [],
    urls: {
      big: `https:${data.room.mod_urls['4']}`,
      medium: `https:${data.room.mod_urls['2']}`,
      small: `https:${data.room.mod_urls['1']}`,
    },
  })
  badges.push({
    code: '',
    users: [],
    urls: {
      big: `https:${data.room.vip_badge['4']}`,
      medium: `https:${data.room.vip_badge['2']}`,
      small: `https:${data.room.vip_badge['1']}`,
    },
  })

  return badges
}
