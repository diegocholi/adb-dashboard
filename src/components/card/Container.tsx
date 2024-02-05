import { PropsWithChildren } from 'react'

interface IContainer {
  className?: string
}

const Container = (props: PropsWithChildren<IContainer>) => {
  const { children, className = '' } = props

  return (
    <div
      className={`block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className} w-100`}
    >
      {children}
    </div>
  )
}

export default Container
