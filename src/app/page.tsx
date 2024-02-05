import AComponent from '@/components/a/AComponent'
import { exec } from '@/utils/exec'
import { openSimulator } from '@/utils/openSimulator'

interface IMainPage {
  params: any
  searchParams: any
}

export default async function (props: IMainPage) {
  const startDevice = props.searchParams['start-device']
  const homeMode = props.searchParams['home-mode'] ?? 'start-device'
  if (startDevice) openSimulator(startDevice)

  // Buscar Simuladores instalados
  const { stdout: devicesOff } = await exec(`emulator -list-avds`)
  const devicesOffList = String(devicesOff)
    .split('\r\n')
    .filter((f) => f)

  // Buscar devices
  const { stdout: devicesOn } = await exec(`adb devices`)
  const devicesOnList = String(devicesOn)
    .split('\r\n')
    .filter((f) => f && f != 'List of devices attached')
  return (
    <div>
      <ul className='flex border-b'>
        <li className='-mb-px mr-1'>
          <AComponent
            href='/?home-mode=start-device'
            className={
              homeMode === 'start-device'
                ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'
                : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold'
            }
          >
            Iniciar Simulador
          </AComponent>
        </li>
        <li className='-mb-px mr-1'>
          <AComponent
            href='/?home-mode=inspect-device'
            className={
              homeMode === 'inspect-device'
                ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'
                : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold'
            }
          >
            Inspecionar Device
          </AComponent>
        </li>
      </ul>

      {homeMode === 'start-device' ? (
        <form action='/' method='get' className='p-10'>
          <label
            htmlFor='devices'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-slate-900 p-6'
          >
            Iniciar um Simulador
          </label>
          <select
            id='start-devices'
            name='start-device'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            {devicesOffList.map((value, key) => (
              <option key={key} value={value.split('\t')[0]}>
                {value.split('\t')[0]}
              </option>
            ))}
          </select>
          <button
            type='submit'
            className='mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Iniciar
          </button>
        </form>
      ) : undefined}

      {homeMode === 'inspect-device' ? (
        <form action='/dashboard' method='get' className='p-10'>
          <label
            htmlFor='devices'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-slate-900 p-6'
          >
            Inspecionar Device
          </label>
          <select
            id='devices'
            name='device'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            {devicesOnList.map((value, key) => (
              <option key={key} value={value.split('\t')[0]}>
                {value.split('\t')[0]}
              </option>
            ))}
          </select>
          <button
            type='submit'
            className='mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Inspecionar
          </button>
        </form>
      ) : undefined}
    </div>
  )
}
