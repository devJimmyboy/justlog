import { ThirdPartyEmote } from '../types/ThirdPartyEmote'
import { use7tvChannelEmotes } from './use7tvChannelEmotes'
import { use7tvGlobalEmotes } from './use7tvGlobalEmotes'
import { useBttvChannelEmotes } from './useBttvChannelEmotes'
import { useBttvGlobalEmotes } from './useBttvGlobalEmotes'
import { useFfzChannelEmotes } from './useFfzChannelEmotes'
import { useFfzGlobalEmotes } from './useFfzGlobalEmotes'

export function useThirdPartyEmotes(channelId: string): Array<ThirdPartyEmote> {
  const thirdPartyEmotes: Array<ThirdPartyEmote> = [
    ...use7tvChannelEmotes(channelId),
    ...useBttvChannelEmotes(channelId),
    ...useFfzChannelEmotes(channelId),
    ...use7tvGlobalEmotes(),
    ...useBttvGlobalEmotes(),
    ...useFfzGlobalEmotes(),
  ]

  return thirdPartyEmotes
}
