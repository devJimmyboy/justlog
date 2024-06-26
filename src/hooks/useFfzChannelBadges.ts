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
  if (!data.room.mod_urls || !data.room.vip_badge) {
    return badges
  }

  badges.mod = {
    code: 'moderator/1',
    title: 'Moderator',
    urls: {
      big: data.room.mod_urls['4'],
      medium: data.room.mod_urls['2'],
      small: data.room.mod_urls['1'],
    },
    action: null,
  }
  badges.vip = {
    code: 'vip/1',
    title: 'VIP',
    urls: {
      big: data.room.vip_badge['4'],
      medium: data.room.vip_badge['2'],
      small: data.room.vip_badge['1'],
    },
    action: 'https://help.twitch.tv/customer/en/portal/articles/659115-twitch-chat-badges-guide',
  }

  return badges
}
