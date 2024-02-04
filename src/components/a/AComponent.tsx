'use client'
import { useSearchParams } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface IAComponent {
  href: string
}

const AComponent = (props: PropsWithChildren<IAComponent>) => {
  const { href } = props
  let hrefBuilder: string = href

  const searchParams = useSearchParams()
  searchParams.forEach((item, key) => {
    if (hrefBuilder.indexOf(`${key}=`) !== -1) return
    if (hrefBuilder.indexOf('?') === -1) {
      hrefBuilder += `?${key}=${item}`
      return
    }
    hrefBuilder += `&${key}=${item}`
  })
  return <a href={hrefBuilder}>{props.children}</a>
}

export default AComponent
