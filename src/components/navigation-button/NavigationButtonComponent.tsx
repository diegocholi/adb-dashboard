import { FC, SVGProps } from 'react'
import AComponent from '../a/AComponent'
interface INavigationButtonComponent {
  label?: string
  Icon?: FC
  href?: string
  recreateParams?: boolean
}

const NavigationButtonComponent = (props: INavigationButtonComponent) => {
  const {
    label = 'Go back',
    Icon = () => (
      <svg
        className='w-5 h-5 rtl:rotate-180'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
        />
      </svg>
    ),
    href = '/',
    recreateParams,
  } = props

  return (
    <AComponent
      href={href}
      recreateParams={recreateParams}
      className='w-full flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700'
    >
      {<Icon />}
      <span>{label}</span>
    </AComponent>
  )
}

export default NavigationButtonComponent
