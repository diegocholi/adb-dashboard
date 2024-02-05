import { PropsWithChildren } from 'react'

interface IPropsWithChildren {
  className?: string
}

const Thead = (props: PropsWithChildren<IPropsWithChildren>) => {
  const {
    children,
    className = 'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
  } = props
  return (
    <thead className={className}>
      <tr>{children}</tr>
    </thead>
  )
}

export default Thead
