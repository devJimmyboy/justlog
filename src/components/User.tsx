import { Stack, Tooltip } from '@mui/material'
import { ChatMessage } from '@twurple/chat'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ChannelBadge } from '../types/Badge'
import { useBadges } from '../hooks/useBadges'
import { useUserBadges } from '../hooks/useUserBadges'

const UserRoot = styled.div`
  display: inline-flex;
  font-weight: 600;
  transition: scale 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    scale: 1.02;
    text-shadow: 0 0 5px var(--theme2);
  }

  &:active {
    scale: 0.98;
  }
`

const UserContainer = styled.div.attrs((props) => ({
  style: {
    color: props.color,
  },
}))`
  display: inline;
  font-weight: 600;
  transition: scale 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    scale: 1.02;
    text-shadow: 0 0 5px var(--theme2);
  }

  &:active {
    scale: 0.98;
  }
`

const UserBadge = styled.img`
  height: 1rem;
  display: inline;
  vertical-align: middle;
  margin-right: 2px;
  &:first-of-type {
    margin-left: 4px;
  }
`

export function User({ displayName, color, badges, parsed }: { displayName: string; color: string; badges: string[]; parsed: ChatMessage }): JSX.Element {
  const renderColor = color !== '' ? color : 'grey'
  // const [render, setRendering] = useState(false)
  // useEffect(() => {
  //   setRendering(true)
  // }, [])
  // if (!render) return null
  const channelBadges = useBadges(parsed.channelId)
  const userBadges = useUserBadges(parsed.userInfo?.userId)

  return (
    <UserRoot>
      {badges.map((badgeId, i) => {
        const badge = channelBadges.get(badgeId)
        if (badge) {
          var ffz = false
          if (badge.urls.small.includes('franker')) ffz = true
          const url = badge.urls.small ?? null
          if (!url) return null
          return (
            <Tooltip
              key={`badge-${parsed.date.toISOString()}-${i}`}
              title={
                <Stack justifyContent="center">
                  <img src={ffz ? url : badge.urls.big} />
                  <span>{badge.title}</span>
                </Stack>
              }>
              {badge.action ? (
                <a href={badge.action} target={badge.code}>
                  <UserBadge src={url} style={{ height: '1.1rem' }} />{' '}
                </a>
              ) : (
                <UserBadge
                  src={url}
                  style={{ height: '1.1rem', backgroundColor: badge.code === 'moderator/1' ? '#00ad03' : 'transparent', borderRadius: badge.code === 'moderator/1' ? '0.15em' : '0' }}
                />
              )}
            </Tooltip>
          )
        }
        return null
      })}
      {userBadges.badges.map((badge, i) => {
        // var ffz = false
        // if (badge.urls.small.includes('franker')) ffz = true

        const url = badge.urls.small ?? null
        if (!url) return null
        return (
          <Tooltip
            key={`badge-${parsed.date.toISOString()}-${i}`}
            title={
              <Stack justifyContent="center" alignContent="center">
                <img src={badge.urls.big} style={{ maxHeight: 128, maxWidth: 128 }} />
                <span>{badge.title}</span>
              </Stack>
            }>
            {badge.action ? (
              <a href={badge.action} target={badge.code}>
                <UserBadge src={url} style={{ height: '1.1rem' }} />{' '}
              </a>
            ) : (
              <UserBadge src={url} style={{ height: '1.1rem' }} />
            )}
          </Tooltip>
        )
      })}
      <UserContainer color={renderColor} className="user">
        {displayName}:
      </UserContainer>
    </UserRoot>
  )
}
