import { PropsWithChildren } from 'react'

interface ITr {
  className?: string
}

const Tr = (props: PropsWithChildren<ITr>) => {
  const {
    children,
    className = 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600',
  } = props
  return <tr className={className}>{children}</tr>
}

export default Tr
