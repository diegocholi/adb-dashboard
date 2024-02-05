'use client'
import Table from '@/components/table'
import { useSearchParams } from 'next/navigation'

interface ITableRowAction {
  value: string
}

const TableRowAction = (props: ITableRowAction) => {
  const searchParams = useSearchParams()

  const handlerItemSelect = () => {
    let hrefBuilder: string = `/dashboard?app-id=${props.value}`

    searchParams.forEach((item, key) => {
      if (key.indexOf('search') !== -1) return
      if (hrefBuilder.indexOf(`${key}=`) !== -1) return

      if (hrefBuilder.indexOf('?') === -1) {
        hrefBuilder += `?${key}=${item}`
        return
      }
      hrefBuilder += `&${key}=${item}`
    })
    location.href = hrefBuilder
  }

  return (
    <Table.Tr>
      <Table.Th
        scope='col'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer'
        onClick={handlerItemSelect}
      >
        {props.value}
      </Table.Th>
    </Table.Tr>
  )
}

export default TableRowAction
