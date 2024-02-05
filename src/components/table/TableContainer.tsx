import { PropsWithChildren } from 'react'

const TableContainer = (props: PropsWithChildren) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        {props.children}
      </table>
    </div>
  )
}

export default TableContainer
