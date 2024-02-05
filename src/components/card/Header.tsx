import { PropsWithChildren } from 'react'

interface IHeader {
  className?: string
}

const Header = (props: PropsWithChildren<IHeader>) => {
  const { children, className = '' } = props
  return (
    <h5
      className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${className}`}
    >
      {children}
    </h5>
  )
}

export default Header
