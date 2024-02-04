import { PropsWithChildren } from 'react'

const CardBody = (props: PropsWithChildren<{ className?: string }>) => {
  return <div className={`card-body ${props.className}`}>{props.children}</div>
}

export default CardBody
