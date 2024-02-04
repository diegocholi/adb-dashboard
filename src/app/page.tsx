import RootLayout from './layout'
import { exec } from '@/app/utils/exec'

export default async function Home() {
  const { stdout: devices } = await exec(`adb devices`)
  const devicesList = String(devices)
    .split('\r\n')
    .filter((f) => f && f != 'List of devices attached')
  return (
    <RootLayout>
      <form action='/dashboard' method='get'>
        <label
          htmlFor='devices'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-slate-900 p-10'
        >
          Selecione o dispositivo
        </label>
        <select
          id='devices'
          name='device'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          {devicesList.map((value, key) => (
            <option key={key} value={value.split('\t')[0]}>
              {value.split('\t')[0]}
            </option>
          ))}
        </select>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        >
          Inspecionar
        </button>
      </form>
    </RootLayout>
  )
}
