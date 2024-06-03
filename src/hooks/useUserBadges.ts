'https://api.ivr.fi/v2/twitch/badges/global'
'https://api.ivr.fi/v2/twitch/badges/channel?id=${channel}'

import { useQuery } from 'react-query'
import { ChannelBadge, IvrTwitchBadgeResponse, UserBadge } from '../types/Badge'
import { QueryDefaults } from '../store'
import { useFfzChannelBadges } from './useFfzChannelBadges'
import { PaintCosmetic, StvCosmeticsResponse } from '../types/7tv'
import axios from 'axios'

export function useUserBadges(userId: string): {
  badges: UserBadge[]
  paint: PaintCosmetic | null
} {
  const { isLoading, error, data } = useQuery<{ badges: UserBadge[]; paints: PaintCosmetic[] }>(
    'badges:user',
    async () => {
      const sevenTvBadges = await axios
        .post<{ data: StvCosmeticsResponse }>('https://7tv.io/v3/gql', {
          operationName: 'GetCosmestics',
          variables: {},
          query: `
          query GetCosmestics($list: [ObjectID!]) {
              cosmetics(list: $list) {
                  paints {
                      id
                      kind
                      name
                      function
                      color
                      angle
                      shape
                      image_url
                      repeat
                      stops {
                          at
                          color
                          __typename
                      }
                      shadows {
                          x_offset
                          y_offset
                          radius
                          color
                          __typename
                      }
                      __typename
                  }
                  badges {
                      id
                      kind
                      name
                      tooltip
                      tag
                      __typename
                  }
                  __typename
              }
          }
      `,
        })
        .then((res) => {
          const cosmetics: {
            badges: UserBadge[]
            paints: PaintCosmetic[]
          } = {
            paints: res.data.data.cosmetics.paints,
            badges: [],
          }

          cosmetics.badges = res.data.data.cosmetics.badges.map((badge) => {
            return {
              code: badge.id,
              title: badge.tooltip,
              users: [],
              urls: {
                big: `https://cdn.7tv.app/badge/${badge.id}/3x`,
                medium: `https://cdn.7tv.app/badge/${badge.id}/2x`,
                small: `https://cdn.7tv.app/badge/${badge.id}/1x`,
              },
              action: '',
            }
          })
          return cosmetics
        })

      return {
        badges: sevenTvBadges.badges,
        paints: sevenTvBadges.paints,
      }
    },
    QueryDefaults
  )

  const {
    isLoading: userLoading,
    error: userError,
    data: userData,
  } = useQuery<{ id: string; kind: 'BADGE' | 'PAINT'; selected: boolean }[]>(
    ['cosmetics:user', { userId: userId }],
    async () => {
      const stvID = (await axios.get(`https://7tv.io/v3/users/twitch/${userId}`)).data?.user?.id
      const sevenTvBadges = await axios
        .post<{ data: { user: { cosmetics: { id: string; kind: 'BADGE' | 'PAINT'; selected: boolean }[] } } }>('https://7tv.io/v3/gql', {
          operationName: 'GetUserCosmetics',
          variables: {
            id: String(stvID),
          },
          query: `
                        query GetUserCosmetics($id: ObjectID!) {
                            user(id: $id) {
                                id
                                cosmetics {
                                    id
                                    kind
                                    selected
                                    __typename
                                }
                                __typename
                            }
                        }
                    `,
        })
        .then((res) => {
          return res.data.data.user.cosmetics
        })
      const userCosmetics = sevenTvBadges.filter((cosmetic) => cosmetic.selected)

      return userCosmetics
    },
    QueryDefaults
  )
  if (isLoading || userLoading) {
    return {
      badges: [],
      paint: null,
    }
  }

  if (error || userError) {
    console.error(error)
    return {
      badges: [],
      paint: null,
    }
  }

  const badges: {
    badges: UserBadge[]
    paint: PaintCosmetic | null
  } = {
    badges: [],
    paint: null,
  }

  if (data) {
    userData.forEach((cosmetic) => {
      if (cosmetic.kind === 'BADGE') {
        badges.badges = data.badges.filter((badge) => cosmetic.id === badge.code)
      } else {
        badges.paint = data.paints.find((paint) => cosmetic.id === paint.id) || null
      }
    })
  }

  return badges
}
