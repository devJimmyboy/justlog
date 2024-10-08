import dayjs from 'dayjs'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { useThirdPartyEmotes } from '../hooks/useThirdPartyEmotes'
import { store } from '../store'
import { LogMessage } from '../types/log'
import { Message } from './Message'
import { User } from './User'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { parseTwitchMessage, ChatMessage } from '@twurple/chat'
import { useBadges } from '../hooks/useBadges'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()

const LogLineContainer = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1px;

  .timestamp {
    color: var(--text-dark);
    user-select: none;
    font-family: monospace;
    white-space: nowrap;
    line-height: 1.1rem;
  }

  .user {
    margin-left: 5px;
    user-select: none;
    /* font-weight: bold; */
    line-height: 1.1rem;
  }

  .message {
    margin-left: 5px;
    line-height: 1.1rem;
  }
`

export function LogLine({ message }: { message: LogMessage }) {
  const { state } = useContext(store)
  const colorValue = (() => {
    if (!!message.tags['system-msg'] || message.type === 4) {
      return '#562b70a3'
    }
    if (message.type === 2) {
      return '#2b2b30'
    }
    if (!!message.tags['first-msg']) {
      return '#487f3f3c'
    }
    if (!!message.tags['custom-reward-id']) {
      return '#1c7e8d3c'
    }
    return null
  })()
  if (state.settings.showEmotes.value) {
    return <LogLineWithEmotes message={message} colorValue={colorValue} />
  }
  const parsed = parseTwitchMessage(message.raw)
  const timestamp = dayjs(message.timestamp).format('YYYY-MM-DD HH:mm:ss')
  return (
    <LogLineContainer className="logLine" style={colorValue ? { backgroundColor: colorValue, paddingBlock: 1, paddingRight: 8 } : {}}>
      {state.settings.showTimestamp.value && <span className="timestamp">{timestamp}</span>}
      {state.settings.showName.value && <User parsed={parsed as any} displayName={message.displayName} color={message.tags['color']} badges={message.tags['badges'].split(',')} />}
      <Message message={message} thirdPartyEmotes={[]} />
    </LogLineContainer>
  )
}

export function LogLineWithEmotes({ message, colorValue }: { message: LogMessage; colorValue?: string }) {
  // console.log(message.tags)
  const parsed = parseTwitchMessage(message.raw) as ChatMessage
  const thirdPartyEmotes = useThirdPartyEmotes(parsed.channelId ?? parsed.tags.get('room-id') ?? '')
  const { state } = useContext(store)
  const timestamp = dayjs(message.timestamp).format('YYYY-MM-DD HH:mm:ss')
  return (
    <LogLineContainer className="logLine" style={colorValue ? { backgroundColor: colorValue, paddingBlock: 1, paddingRight: 8 } : {}}>
      {state.settings.showTimestamp.value && <span className="timestamp">{timestamp}</span>}
      {state.settings.showName.value && <User parsed={parsed as any} displayName={message.displayName} color={message.tags['color']} badges={message.tags?.['badges']?.split(',') ?? []} />}
      <Message message={message} thirdPartyEmotes={thirdPartyEmotes} />
    </LogLineContainer>
  )
}
