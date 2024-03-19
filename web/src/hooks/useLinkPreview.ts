import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { QueryDefaults } from '../store'

interface LinkPreviewProps {
  href: string
  host?: string
  fetchOptions?: RequestInit
}
export type LinkPreviewData = Partial<{
  url: string
  title: string
  siteName: string
  description: string
  mediaType: string
  contentType: string
  images: string[]
  videos: string[]
  favicons: string[]
}>

export const useLinkPreview = ({
  href,
}: // host = 'https://api.linkpreview.net/',

LinkPreviewProps) => {
  const { isLoading, error, data } = useQuery(
    `link-preview:${href}`,
    () => {
      return fetch(`https://previews.jimmyboy.dev/?secret=lollolpenis&url=${href}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        // mode: 'no-cors',
      }).then((res) => res.json() as Promise<LinkPreviewData>)
    },
    { ...QueryDefaults, retry: 4 }
  )

  return { isLoading, data, error }
}
