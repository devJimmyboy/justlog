import { useQuery } from 'react-query'
import { QueryDefaults } from '../store'
import { EmoteSet, FfzChannelEmotesResponse, FfzGlobalBadgesResponse } from '../types/Ffz'
import { Badge } from '../types/Badge'

export function useFfzChannelBadges(channelId: string): Array<Badge> {
  const { isLoading, error, data } = useQuery<{ room: FfzChannelEmotesResponse['room']; badges: FfzGlobalBadgesResponse }>(
    ['badges:ffz:channel', { channelId: channelId }],
    () => {
      if (channelId === '') {
        return Promise.resolve({ room: {}, sets: {} })
      }

      return Promise.all([
        fetch(`https://api.frankerfacez.com/v1/room/id/${channelId}`)
          .then((res) => res.json())
          .then((res) => res?.room || null),
        fetch(`https://api.frankerfacez.com/v1/badges`).then((res) => res.json()),
      ]).then(([room, badges]) => {
        return { room, badges }
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

  for (const set of Object.values(data.room.user_badges) as Array<EmoteSet>) {
    for (const channelEmote of set.emoticons) {
      badges.push({
        id: String(channelEmote.id),
        code: channelEmote.name,
        urls: {
          small: channelEmote.urls['1'],
          medium: channelEmote.urls['2'],
          big: channelEmote.urls['4'],
        },
      })
    }
  }

  return emotes
}
