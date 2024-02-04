'use client'

import { PropsWithChildren } from 'react'

interface IAComponent {
  href: string
}

const AComponent = (props: PropsWithChildren<IAComponent>) => {
  return <a href={props.href}>{props.children}</a>
}

export default AComponent
