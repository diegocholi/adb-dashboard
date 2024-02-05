import DashboardComponent from '@/components/dashboard/DashboardComponent'
import { exec } from '@/utils/exec'
import { redirect } from 'next/navigation'
import Table from '@/components/table'
import TableRowAction from './components/TableAction'
import SearchAction from './components/SearchAction'
import AComponent from '@/components/a/AComponent'

interface SearchParams {
  [key: string]: string // Define que cada chave é uma string e seu valor correspondente também é uma string.
}

interface IDashboard {
  searchParams: SearchParams
}

export default async (props: IDashboard) => {
  try {
    const search = props.searchParams['search']
    const device = props.searchParams['device']

    const { stdout: appsId } = await exec(
      `adb -s ${device} shell pm list packages`
    )
    let appsIdList: Array<string> = String(appsId).split('\r\n')
    if (search) {
      let appsIdFilterdList: Array<string> = []
      appsIdList.filter((item) => {
        if (item.indexOf(search) !== -1) {
          appsIdFilterdList.push(item)
        }
      })

      appsIdList = appsIdFilterdList
    }

    return (
      <div>
        {/* Botão de voltar */}
        <AComponent
          href='/?home-mode=inspect-device'
          className='w-full flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700'
        >
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
          <span>Go back</span>
        </AComponent>

        {/* Busca */}
        <SearchAction />
        <DashboardComponent />
        {/* Tabela que lista os devices */}
        <Table.TableContainer>
          <Table.Thead>
            <Table.Th>APP ID</Table.Th>
          </Table.Thead>
          <Table.Tbody>
            {appsIdList.map((value, key) => (
              <TableRowAction key={key} value={value.replace('package:', '')} />
            ))}
          </Table.Tbody>
        </Table.TableContainer>
      </div>
    )
  } catch {
    return redirect('/')
  }
}
