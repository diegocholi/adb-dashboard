import DashboardComponent from '@/app/components/dashboard/DashboardComponent'
import { exec } from './utils/exec'
import AComponent from './components/button/AComponent'

export default async function Home() {
  const { stdout: packages } = await exec(`adb shell pm list packages`)
  const packagesList = String(packages).split('\n')

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <DashboardComponent>
        {!packagesList || (
          <table className='table-auto'>
            <thead>
              <tr>
                <th>APP ID</th>
              </tr>
            </thead>
            <tbody>
              {packagesList.map((value, key) => (
                <tr key={key}>
                  <td>
                    <AComponent
                      href={`/?app-id=${value.replace('package:', '')}`}
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
    </main>
  )
}
