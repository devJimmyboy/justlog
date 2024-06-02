import React, { useContext } from 'react'
import styled from 'styled-components'
import DescriptionIcon from '@mui/icons-material/Description'
import { IconButton } from '@mui/material'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import ReactDOM from 'react-dom'
import { store } from '../store'

const DocsWrapper = styled.div``

export function Docs() {
  const { state } = useContext(store)

  const handleClick = () => {
    const docsUrl = (state.apiBaseUrl = '/docs')
    window.location.href = docsUrl
  }

  return (
    <DocsWrapper>
      <IconButton aria-controls="docs" aria-haspopup="true" onClick={handleClick} size="small" color="default">
        <DescriptionIcon />
      </IconButton>
    </DocsWrapper>
  )
}
