export interface FfzChannelEmotesResponse {
  room?: Room

  sets: Sets
}

export interface FfzGlobalEmotesResponse {
  sets: Sets
}
export interface FfzGlobalBadgesResponse {
  badges: Sets
}
//${customapi.https://<BASE_URL>/bot?input=${queryescape ${0:}}&user=${queryescape ${user}}&secret=<SECRET>}

export interface Room {
  _id: number
  css: null
  display_name: string
  id: string
  is_group: boolean
  moderator_badge: string
  vip_badge: {
    '1': string
    '2': string
    '4': string
  }
  mod_urls: {
    '1': string
    '2': string
    '4': string
  }
  user_badge_ids: {
    [key: `${number}`]: number[]
  }
  set: number
  twitch_id: number
  user_badges: UserBadges
}

export interface UserBadges {
  [key: `${number}`]: string[]
}

export interface Sets {
  [key: string]: EmoteSet
}

export interface EmoteSet {
  // _type:       number;
  // css:         null;
  // description: null;
  emoticons: Emoticon[]
  // icon:        null;
  // id:          number;
  // title:       string;
}

export interface Emoticon {
  // css:      null;
  // height:   number;
  // hidden:   boolean;
  id: number
  // margins:  null;
  // modifier: boolean;
  name: string
  // offset:   null;
  // owner:    Owner;
  // public:   boolean;
  urls: { [key: string]: string }
  // width:    number;
}

export interface Owner {
  _id: number
  display_name: string
  name: string
}
