import AComponent from '@/components/a/AComponent'
import DashboardComponent from '@/components/dashboard/DashboardComponent'
import { exec } from '@/utils/exec'
import { redirect } from 'next/navigation'
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
      <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        <DashboardComponent>
          {!appsIdList || (
            <table className='table table-bordered table-hover'>
              <thead>
                <tr>
                  <th>APP ID</th>
                </tr>
              </thead>
              <tbody>
                {appsIdList.map((value, key) => (
                  <tr key={key}>
                    <td>
                      <AComponent
                        href={`/dashboard?app-id=${value.replace(
                          'package:',
                          ''
                        )}`}
                      >
                        {value.replace('package:', '')}
                      </AComponent>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </DashboardComponent>
      </div>
    )
  } catch {
    return redirect('/')
  }
}
