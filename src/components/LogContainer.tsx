import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { OptOutError } from '../errors/OptOutError'
import { useAvailableLogs } from '../hooks/useAvailableLogs'
import { store } from '../store'
import { Log } from './Log'
import { OptOutMessage } from './OptOutMessage'
import { IconButton, InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material'
import { ArrowLeftRounded, ArrowRight, ArrowRightAltSharp, ArrowRightRounded, Search } from '@mui/icons-material'

const LogContainerDiv = styled.div`
  color: white;
  padding: 2rem;
  padding-top: 2rem;
  width: 100%;
  position: relative;
`

const ArrowButton = styled(IconButton)`
  .MuiIconButton-root {
    border: 1px solid #8c8c8c;
    background: #1e1e1e;
  }
  &:hover {
    background: #1e1e1e;
  }
`

export function LogContainer() {
  const { state } = useContext(store)
  const [searchText, setSearchText] = useState('')
  const search = useRef<HTMLInputElement>(null)
  const [currentLog, setCurrentLog] = useState<number>(0)

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
  const ctrlKey = isMac ? 'metaKey' : 'ctrlKey'

  useEffect(() => {
    const keyListener = function (e: KeyboardEvent) {
      if (e.key === 'f' && e[ctrlKey]) {
        e.preventDefault()
        if (search.current) {
          search.current.focus()
        }
      }
    }

    window.addEventListener('keydown', keyListener)

    return () => {
      window.removeEventListener('keydown', keyListener)
    }
  }, [])

  useEffect(() => {
    setCurrentLog(0)
  }, [state.currentChannel, state.currentUsername])

  const [availableLogs, err] = useAvailableLogs(state.currentChannel, state.currentUsername)
  if (err instanceof OptOutError) {
    return <OptOutMessage />
  }

  const log = availableLogs[currentLog]

  return (
    <LogContainerDiv>
      {availableLogs.length > 0 && (
        <>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Select value={currentLog} onChange={(e) => setCurrentLog(e.target.value as number)} size="small" sx={{ width: '150px', marginRight: '2rem' }}>
              {availableLogs.map((log, index) => {
                const isNewYear = index !== availableLogs.length - 1 && availableLogs[index + 1].year !== log.year
                return (
                  <MenuItem
                    key={`${log.year}:${log.month}`}
                    value={index}
                    sx={{ textAlign: 'center', borderBottom: isNewYear ? '1px solid #ffffff43' : '', height: '30px', marginBottom: isNewYear ? '5px' : '0px' }}>
                    {log.year}-{log.month.toString().padStart(2, '0')}
                  </MenuItem>
                )
              })}
            </Select>
            <TextField
              className="search"
              label="Search"
              fullWidth
              inputRef={search}
              onChange={(e) => setSearchText(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" spacing={0.2} alignItems="center">
              <ArrowButton
                onClick={() => {
                  if (currentLog > 0) {
                    setCurrentLog(currentLog - 1)
                  }
                }}
                disabled={currentLog === 0}
                sx={{
                  border: '1px solid #ffffff3b',
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  '&:hover': {
                    border: '1px solid #ffffff',
                  },
                }}>
                <ArrowLeftRounded
                  sx={{
                    fontSize: '3rem',
                  }}
                />
              </ArrowButton>
              <ArrowButton
                onClick={() => {
                  if (currentLog < availableLogs.length - 1) {
                    setCurrentLog(currentLog + 1)
                  }
                }}
                disabled={currentLog === availableLogs.length - 1}
                sx={{
                  border: '1px solid #ffffff3b',
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  '&:hover': {
                    border: '1px solid #ffffff',
                  },
                }}>
                <ArrowRightRounded
                  sx={{
                    fontSize: '3rem',
                  }}
                />
              </ArrowButton>
            </Stack>
          </Stack>
          {/* {availableLogs.map((log, index) => ( */}
          <Log key={`${log.year}:${log.month}`} year={log.year} month={log.month} searchText={searchText} />
        </>
      )}
      {/* ))} */}
    </LogContainerDiv>
  )
}
