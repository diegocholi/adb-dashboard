'use client'
import { useSearchParams } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface IAComponent {
  href: string
  className?: string
  recreateParams?: boolean
}

const AComponent = (props: PropsWithChildren<IAComponent>) => {
  const { href, className, recreateParams = true, children } = props
  let hrefBuilder: string = href
  if (recreateParams) {
    const searchParams = useSearchParams()
    searchParams.forEach((item, key) => {
      if (hrefBuilder.indexOf(`${key}=`) !== -1) return
      if (hrefBuilder.indexOf('?') === -1) {
        hrefBuilder += `?${key}=${item}`
        return
      }
      hrefBuilder += `&${key}=${item}`
    })
  }
  return (
    <a className={className} href={hrefBuilder}>
      {children}
    </a>
  )
}

export default AComponent
