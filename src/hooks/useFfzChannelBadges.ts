import { useQuery } from 'react-query'
import { QueryDefaults } from '../store'
import { EmoteSet, FfzChannelEmotesResponse, FfzGlobalBadgesResponse } from '../types/Ffz'
import { ChannelBadge } from '../types/Badge'

export function useFfzChannelBadges(channelId: string): { mod: ChannelBadge | null; vip: ChannelBadge | null; isLoading: boolean } {
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
    return {
      mod: null,
      vip: null,
      isLoading,
    }
  }

  if (error) {
    console.error(error)
    return {
      mod: null,
      vip: null,
      isLoading,
    }
  }

  const badges: { mod: ChannelBadge | null; vip: ChannelBadge | null; isLoading: boolean } = {
    mod: null,
    vip: null,
    isLoading,
  }
  if (!data.room.mod_urls && !data.room.vip_badge) {
    return badges
  }
  if (data.room.mod_urls) {
    badges.mod = {
      code: 'moderator/1',
      title: 'Moderator',
      urls: {
        big: data.room.mod_urls[
          Object.keys(data.room.mod_urls)
            .map(Number)
            .sort((a, b) => a - b)
            .pop()
        ],
        medium: data.room.mod_urls['2'],
        small: data.room.mod_urls['1'],
      },
      action: 'https://help.twitch.tv/s/article/twitch-chat-badges-guide',
    }
  }
  if (data.room.vip_badge) {
    badges.vip = {
      code: 'vip/1',
      title: 'VIP',
      urls: {
        big: data.room.vip_badge[
          Object.keys(data.room.vip_badge)
            .map(Number)
            .sort((a, b) => a - b)
            .pop()
        ],
        medium: data.room.vip_badge['2'],
        small: data.room.vip_badge['1'],
      },
      action: 'https://help.twitch.tv/customer/en/portal/articles/659115-twitch-chat-badges-guide',
    }
  }

  return badges
}
