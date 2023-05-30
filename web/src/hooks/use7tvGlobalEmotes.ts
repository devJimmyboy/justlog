import { useQuery } from 'react-query'
import { QueryDefaults } from '../store'
import { StvGlobalEmotesResponse } from '../types/7tv'
import { ThirdPartyEmote } from '../types/ThirdPartyEmote'

export function use7tvGlobalEmotes(): Array<ThirdPartyEmote> {
  const { isLoading, error, data } = useQuery(
    '7tv:global',
    async () => {
      const res = await fetch('https://api.7tv.app/v2/emotes/global')
      if (res.ok) {
        return (await res.json()) as Promise<StvGlobalEmotesResponse>
      }

      return Promise.reject(res.statusText)
    },
    QueryDefaults
  )

  if (isLoading || !data) {
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
