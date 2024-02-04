import DashboardComponent from '@/app/components/dashboard/DashboardComponent'
import AComponent from '@/app/components/button/AComponent'
import { exec } from '@/app/utils/exec'

export default async () => {
  const { stdout: appsId } = await exec(`adb shell pm list packages`)
  const appsIdList = String(appsId).split('\r\n')
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
}
