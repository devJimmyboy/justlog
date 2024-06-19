import { useState } from 'react'
// import { ReactLinkPreviewComponentProps } from 'react-link-previewer'
import { useLinkPreview } from '../hooks/useLinkPreview'
import { Box, Link, Typography } from '@mui/material'

export type ReactLinkPreviewComponentProps = {
  children?: React.ReactNode
  href: string
  host?: string
  fetchOptions?: RequestInit
  external?: boolean
} & React.HTMLAttributes<HTMLAnchorElement>

export const LinkPreview = ({ children, href, host, fetchOptions, external, ...props }: ReactLinkPreviewComponentProps) => {
  const { data, error } = useLinkPreview({
    href,
    host,
    fetchOptions,
  })

  if (data && (data.mediaType === 'image' || href.includes('i.imgur.com'))) return <img loading="lazy" src={data.url} style={{ width: '100%' }} />
  return (
    <>
      {data && (
        <Box aria-hidden={true} sx={{ width: '100%' }}>
          <Link {...props} href={href} style={{ maxWidth: '100%' }}>
            <h2>{data.title}</h2>
          </Link>
          <Typography textOverflow="clip">{data.description}</Typography>
          <img loading="lazy" src={!data.images || data.images.length === 0 ? data.favicons?.[0] ?? '' : data.images[data.images.length - 1]} style={{ width: '100%' }} />
        </Box>
      )}

      {error && <div role="alert">{JSON.stringify(error)}</div>}
    </>
  )
}
