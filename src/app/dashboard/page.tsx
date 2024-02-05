import DashboardComponent from '@/components/dashboard/DashboardComponent'
import { exec } from '@/utils/exec'
import { redirect } from 'next/navigation'
import Table from '@/components/table'
import TableRowAction from './components/TableAction'
import SearchAction from './components/SearchAction'

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
