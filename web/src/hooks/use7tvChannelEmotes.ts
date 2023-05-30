import { useQuery } from 'react-query'
import { QueryDefaults } from '../store'
import { StvChannelEmotesResponse } from '../types/7tv'
import { ThirdPartyEmote } from '../types/ThirdPartyEmote'

export function use7tvChannelEmotes(channelId: string): Array<ThirdPartyEmote> {
  const { isLoading, error, data } = useQuery(
    ['7tv:channel', { channelId: channelId }],
    () => {
      if (channelId === '') {
        return Promise.resolve([])
      }

      return fetch(`https://api.7tv.app/v2/users/${channelId}/emotes`).then((res) => {
        if (res.ok) {
          return res.json() as Promise<StvChannelEmotesResponse>
        }

        return Promise.reject(res.statusText)
      })
    },
    QueryDefaults
  )

  if (isLoading) {
    return []
  }

  if (error) {
    console.error(error)
    return []
  }

  const emotes = []

  for (const channelEmote of data ?? []) {
    emotes.push({
      id: channelEmote.id,
      code: channelEmote.name,
      urls: {
        small: channelEmote.urls[0][1],
        medium: channelEmote.urls[1][1],
        big: channelEmote.urls[3][1],
      },
    })
  }

  return emotes
}
