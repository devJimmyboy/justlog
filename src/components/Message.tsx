import React, { useContext, useState } from 'react'
import Linkify from 'linkify-react'
import styled from 'styled-components'
import { store } from '../store'
import type { Emote as IEmote, LogMessage } from '../types/log'
import { ThirdPartyEmote } from '../types/ThirdPartyEmote'
import runes from 'runes'
import { Link, Tooltip } from '@mui/material'
import { LinkPreview } from './LinkPreview'

const MessageContainer = styled.div`
  a {
    margin: 0 2px;
    color: var(--theme2);
    text-decoration: none;

    &:hover,
    &:active,
    &:focus {
      color: var(--theme2-bright);
    }
  }
`

// const HoverEmote = ()

const Emote = ({ emote, type }: { emote: IEmote; type: 'twitch' } | { emote: ThirdPartyEmote; type: 'thirdparty' }) => {
  const [hovering, setHover] = useState(false)
  if (type === 'thirdparty')
    return (
      <div style={{ maxHeight: 18, width: 'auto', display: 'inline-block' }} onMouseEnter={() => setHover(true)} title={emote.code}>
        <BaseEmote className="emote" alt={emote.code} src={hovering ? emote.urls.big : emote.urls.small} />
      </div>
    )
  else
    return (
      <div style={{ maxHeight: 18, width: 'auto', display: 'inline-block' }} onMouseEnter={() => setHover(true)} title={emote.code}>
        <BaseEmote className="emote" alt={emote.code} src={`https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/${hovering ? '3.0' : '1.0'}`} />
      </div>
    )
}

const BaseEmote = styled.img`
  max-height: 18px;
  margin: 0 2px;
  margin-bottom: -2px;
  width: auto;
  transition: transform 0.15s ease-in-out;
  position: relative;
  pointer-events: none;
  div:hover > & {
    /* border: 1px solid var(--theme2); */
    transform: scale(3);
    z-index: 100;
  }
  &:active {
    transform: scale(1.5);
  }
`

export function Message({ message, thirdPartyEmotes }: { message: LogMessage; thirdPartyEmotes: Array<ThirdPartyEmote> }): JSX.Element {
  const { state } = useContext(store)
  const renderMessage: React.ReactNode[] = []

  let replaced
  let buffer = ''

  let messageText = message.text
  let renderMessagePrefix = ''
  if (message.tags['system-msg']) {
    messageText = messageText.replace(message.tags['system-msg'] + ' ', '')

    renderMessagePrefix = `${message.tags['system-msg']} `
  }

  const messageTextEmoji = runes(messageText)

  for (let x = 0; x <= messageTextEmoji.length; x++) {
    const c = messageTextEmoji[x]

    replaced = false

    if (state.settings.showEmotes.value) {
      for (const emote of message.emotes) {
        if (emote.startIndex === x) {
          replaced = true
          renderMessage.push(<Emote type="twitch" key={x} emote={emote} />)
          x += emote.endIndex - emote.startIndex - 1
          break
        }
      }
    }

    if (!replaced) {
      if (c !== ' ' && x !== messageTextEmoji.length) {
        buffer += c
        continue
      }
      let emoteFound = false

      for (const emote of thirdPartyEmotes) {
        if (buffer.trim() === emote.code) {
          renderMessage.push(<Emote type="thirdparty" key={x} emote={emote} />)
          emoteFound = true
          buffer = ''

          break
        }
      }

      if (!emoteFound) {
        renderMessage.push(buffer)
        buffer = ''
      }

      // if (c === ' ' && !state.settings.twitchChatMode.value) {
      //   renderMessage.push(<React.Fragment key={`${x}-newline`}>&nbsp;</React.Fragment>)
      // } else {
      renderMessage.push(c)
      // }
    }
  }

  return (
    <MessageContainer className="message">
      <Linkify
        options={{
          render: ({ attributes, content }) => (
            <Tooltip title={<LinkPreview href={attributes.href} />}>
              <Link target="__blank" {...attributes}>
                {content}
              </Link>
            </Tooltip>
          ),
        }}>
        {renderMessagePrefix}
        {renderMessage}
      </Linkify>
    </MessageContainer>
  )
}
