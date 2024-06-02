import { Stack, Tooltip } from '@mui/material'
import { ChatMessage } from '@twurple/chat'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

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
  const [render, setRendering] = useState(false)
  useEffect(() => {
    if (!window.badges) setTimeout(() => setRendering(true), 250)
    else setRendering(true)
  }, [])
  if (!render) return null

  return (
    <UserRoot>
      {badges.map((badge, i) => {
        const [name, version] = badge.split('/')

        const bdge = window.badges.find((b) => b.id === name)
        if (bdge) {
          const url = bdge.getVersion(version)?.getImageUrl(2) ?? null
          if (!url) return null
          return (
            <Tooltip
              key={`badge-${parsed.date.toISOString()}-${i}`}
              title={
                <Stack justifyContent="center">
                  <img src={url} />
                  <span>{bdge.id}</span>
                </Stack>
              }>
              <UserBadge src={url} style={{ height: '1.1rem' }} />
            </Tooltip>
          )
        }
        return null
      })}
      <UserContainer color={renderColor} className="user">
        {displayName}:
      </UserContainer>
    </UserRoot>
  )
}
