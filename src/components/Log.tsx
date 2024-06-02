import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Txt } from '../icons/Txt'
import { getUserId, isUserId } from '../services/isUserId'
import { store } from '../store'
import { ContentLog } from './ContentLog'
import { TwitchChatContentLog } from './TwitchChatLogContainer'

const LogContainer = styled.div`
  position: relative;
  background: var(--bg-bright);
  border-radius: 3px;
  padding: 0.5rem;
  margin-top: 3rem;

  .txt {
    position: absolute;
    top: 5px;
    right: 15px;
    opacity: 0.9;
    cursor: pointer;
    z-index: 999;

    &:hover {
      opacity: 1;
    }
  }
`

export function Log({ year, month, initialLoad = false }: { year: string; month: string; initialLoad?: boolean }) {
  const { state } = useContext(store)
  const [load, setLoad] = useState(initialLoad)
  const [txtHref, setTxtHref] = useState(state.apiBaseUrl)

  React.useEffect(() => {
    let href = state.apiBaseUrl
    if (state.currentChannel && isUserId(state.currentChannel)) {
      href += `/channelid/${getUserId(state.currentChannel)}`
    } else {
      href += `/channel/${state.currentChannel}`
    }

    if (state.currentUsername && isUserId(state.currentUsername)) {
      href += `/userid/${getUserId(state.currentUsername)}`
    } else {
      href += `/user/${state.currentUsername}`
    }

    href += `/${year}/${month}?reverse`
    setTxtHref(href)
  }, [state.currentChannel, state.currentUsername, year, month, load])
  if (!load) {
    return (
      <LogContainer>
        <LoadableLog year={year} month={month} onLoad={() => setLoad(true)} />
      </LogContainer>
    )
  }

  return (
    <LogContainer>
      <a className="txt" target="__blank" href={txtHref} rel="noopener noreferrer">
        <Txt />
      </a>
      <ContentLog year={year} month={month} />
    </LogContainer>
  )
}

const LoadableLogContainer = styled.div``

function LoadableLog({ year, month, onLoad }: { year: string; month: string; onLoad: () => void }) {
  return (
    <LoadableLogContainer>
      <Button variant="contained" color="primary" size="large" onClick={onLoad}>
        load {year}/{month}
      </Button>
    </LoadableLogContainer>
  )
}
