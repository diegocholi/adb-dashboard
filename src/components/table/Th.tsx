import { MouseEventHandler, PropsWithChildren } from 'react'

interface ITh {
  className?: string
  scope?: 'col' | 'row'
  onClick?: MouseEventHandler<HTMLTableCellElement>
}

const Th = (props: PropsWithChildren<ITh>) => {
  const { children, className = 'px-6 py-3', scope = 'col', onClick } = props
  return (
    <th scope={scope} className={className} onClick={onClick}>
      {children}
    </th>
  )
}

export default Th
