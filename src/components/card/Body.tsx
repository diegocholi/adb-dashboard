import { PropsWithChildren } from 'react'

const Body = (props: PropsWithChildren<{ className?: string }>) => {
  const { children, className = '' } = props
  return (
    <div
      className={`font-normal text-gray-700 dark:text-gray-400 ${className}`}
    >
      {children}
    </div>
  )
}

export default Body
