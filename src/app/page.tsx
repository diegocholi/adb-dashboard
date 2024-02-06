import AComponent from '@/components/a/AComponent'
import { createSimulator } from '@/utils/createSimulator'
import { deleteSimulator } from '@/utils/deleteSimulator'
import { exec } from '@/utils/exec'
import { openSimulator } from '@/utils/openSimulator'
import { redirect } from 'next/navigation'

interface IMainPage {
  params: any
  searchParams: any
}

interface IStartDeviceComponent {
  devicesOffList: Array<string>
}
const StartDeviceComponent = (props: IStartDeviceComponent) => (
  <form action='/' method='get' className='p-10'>
    <label
      htmlFor='start-devices'
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-slate-900 p-6'
    >
      Iniciar um Simulador
    </label>
    <select
      id='start-devices'
      name='start-device'
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    >
      {props.devicesOffList.map((value, key) => (
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
)

interface ICreateDeviceComponent {
  devicesCreateList: Array<string>
}
const CreateDeviceComponent = (props: ICreateDeviceComponent) => (
  <form action='/' method='get' className='p-10'>
    <label
      htmlFor='create-devices'
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-slate-900 p-6'
    >
      Criar Simulador
    </label>
    <select
      id='create-devices'
      name='create-device'
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    >
      {props.devicesCreateList.map((value, key) => (
        <option key={key} value={value.split('\t')[0]}>
          {value.split('\t')[0]}
        </option>
      ))}
    </select>
    <button
      type='submit'
      className='mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
    >
      Criar
    </button>
  </form>
)

interface IDeleteDeviceComponent {
  devicesList: Array<string>
}
const DeleteDeviceComponent = (props: IDeleteDeviceComponent) => (
  <form action='/' method='get' className='p-10'>
    <label
      htmlFor='delete-devices'
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-slate-900 p-6'
    >
      Iniciar um Simulador
    </label>
    <select
      id='delete-devices'
      name='delete-device'
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    >
      {props.devicesList.map((value, key) => (
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
)

interface IInspectDeviceComponent {
  devicesOnList: Array<string>
}
const InspectDeviceComponent = (props: IInspectDeviceComponent) => (
  <form action='/dashboard' method='get' className='p-10'>
    <label
      htmlFor='devices-on'
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-slate-900 p-6'
    >
      Inspecionar Device
    </label>
    <select
      id='devices-on'
      name='device-inspect'
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    >
      {props.devicesOnList.map((value, key) => (
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
)

export default async (props: IMainPage) => {
  const startDevice = props.searchParams['start-device']
  const homeMode = props.searchParams['home-mode'] ?? 'start-device'
  const deviceCreateType = props.searchParams['create-device'] ?? undefined
  const deleteDevice = props.searchParams['delete-device'] ?? undefined

  // Ação de inicialização do device
  if (startDevice) {
    openSimulator(startDevice)
    redirect('/')
  }

  // Ação de remoção do device
  if (deleteDevice) {
    await deleteSimulator(deleteDevice)
    redirect('/')
  }

  // Ação de criação de um device
  if (deviceCreateType) {
    await createSimulator(deviceCreateType)
    redirect('/')
  }

  // Listagem de Simuladores instalados
  let devicesOffList: Array<string> = []
  if (homeMode === 'start-device' || homeMode === 'delete-device') {
    // Buscar Simuladores instalados
    const { stdout: devicesOff } = await exec(`emulator -list-avds`)
    devicesOffList = String(devicesOff)
      .split('\r\n')
      .filter((f) => f)
  }

  // Listagem de imagem dos Simuladores disponível
  let devicesCreateList: Array<string> = []
  if (homeMode === 'create-device') {
    // Buscar lista de devices para criação
    const { stdout: devicesCreate } = await exec(`sdkmanager --list`)

    // Regex para capturar os valores de system-images
    const regex = /system-images;([^;]+);([^;]+);([^;\s]+)/g

    let matches

    while ((matches = regex.exec(devicesCreate)) !== null) {
      // Adiciona um objeto ao array para cada correspondência encontrada
      devicesCreateList.push(
        `system-images;${matches[1]};${matches[2]};${matches[3]}`
      )
    }
  }

  // Listagem de Devices Iniciados
  let devicesOnList: Array<string> = []
  if (homeMode === 'inspect-device') {
    // Buscar devices
    const { stdout: devicesOn } = await exec(`adb devices`)
    devicesOnList = String(devicesOn)
      .split('\r\n')
      .filter((f) => f && f != 'List of devices attached')
  }

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
            href='/?home-mode=create-device'
            className={
              homeMode === 'create-device'
                ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'
                : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold'
            }
          >
            Criar Simulador
          </AComponent>
        </li>
        <li className='-mb-px mr-1'>
          <AComponent
            href='/?home-mode=delete-device'
            className={
              homeMode === 'delete-device'
                ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'
                : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold'
            }
          >
            Deletar Simulador
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
        <StartDeviceComponent devicesOffList={devicesOffList} />
      ) : undefined}

      {homeMode === 'create-device' ? (
        <CreateDeviceComponent devicesCreateList={devicesCreateList} />
      ) : undefined}

      {homeMode === 'delete-device' ? (
        <DeleteDeviceComponent devicesList={devicesOffList} />
      ) : undefined}

      {homeMode === 'inspect-device' ? (
        <InspectDeviceComponent devicesOnList={devicesOnList} />
      ) : undefined}
    </div>
  )
}
