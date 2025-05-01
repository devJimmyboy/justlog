import { InputAdornment, TextField } from '@mui/material'
import React, { useContext, useState, CSSProperties, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useLog } from '../hooks/useLog'
import { store } from '../store'
import { LogLine } from './LogLine'
import { areEqual, FixedSizeList as List, ListChildComponentProps } from 'react-window'
import { LogMessage } from '../types/log'
import { useOverlayScrollbars } from 'overlayscrollbars-react'

const ContentLogContainer = styled.ul`
  padding: 0;
  margin: 0;
  position: relative;

  /* .search {
    position: absolute;
    top: -52px;
    width: 320px;
    left: 0;
  } */

  .logLine {
    white-space: nowrap;
  }

  .list {
    scrollbar-color: dark;
  }
`

const Row = React.memo(
  ({ index, style, data: logs }: ListChildComponentProps<LogMessage[]>) => (
    <div key={logs[index].id ? logs[index].id : index} style={style}>
      <LogLine message={logs[index]} />
    </div>
  ),
  areEqual
)

export function ContentLog({ year, month, searchText }: { year: string; month: string; searchText: string }) {
  const { state, setState } = useContext(store)

  // Overlay Scrollbars setup
  const rootRef = useRef(null)
  const outerRef = useRef(null)
  const [initialize, osInstance] = useOverlayScrollbars({ defer: true })
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  useEffect(() => {
    const { current: root } = rootRef
    const { current: outer } = outerRef

    if (root && outer) {
      initialize({
        target: root,
        elements: {
          viewport: outer,
        },
      })
    }
    return () => osInstance()?.destroy()
  }, [initialize, osInstance])
  // end Overlay Scrollbars setup

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const logs = useLog(state.currentChannel ?? '', state.currentUsername ?? '', year, month).filter((log) => log.text.toLowerCase().includes(searchText.toLowerCase()))

  // const handleMouseEnter = () => {
  //   if (state.activeSearchField === search.current) return
  //   setState({ ...state, activeSearchField: search.current })
  // }

  // useEffect(() => {
  //   setState({ ...state, activeSearchField: search.current })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <ContentLogContainer>
      <div data-overlayscrollbars="" ref={rootRef}>
        {/*@ts-ignore*/}
        <List className="list" height={Math.max(300, screenHeight - 225)} itemCount={logs.length} itemSize={20} width={'100%'} itemData={logs} outerRef={outerRef}>
          {/*@ts-ignore*/}
          {Row}
        </List>
      </div>
    </ContentLogContainer>
  )
}

// const Overflow = ({ children, onScroll }: { children: React.ReactNode; onScroll: (e: React.UIEvent<HTMLDivElement>) => void }) => {
//   const ofRef = useRef(null)

//   useEffect(() => {
//     const el = ofRef.current.osInstance().getElements().viewport

//     if (onScroll) el.addEventListener('scroll', onScroll)

//     return () => {
//       if (onScroll) el.removeEventListener('scroll', onScroll)
//     }
//   }, [onScroll])

//   return (
//     <OverlayScrollbarsComponent options={{}} ref={ofRef}>
//       {children}
//     </OverlayScrollbarsComponent>
//   )
// }
