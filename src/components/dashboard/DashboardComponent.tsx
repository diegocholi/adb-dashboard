'use client'
import { useState, useEffect, PropsWithChildren, FormEvent } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Card from '@/components/card'
import PieChart from '../Charts/PieChart'

export interface IDashboardComponent {
  totalRam: number
  freeRam: number
  ramUsed: number
  memoryAppUsed: number
  totalPSS: number
  totalRSS: number
  memAppPercentPSSUsed: number
  memAppPercentRSSUsed: number
  appCpuUsed: number
}

const DashboardComponent = (pros: PropsWithChildren) => {
  const cardsColor = 'card-dark'
  const router = useRouter()
  const searchParams = useSearchParams()
  const appId = searchParams.get('app-id')
  const device = searchParams.get('device')

  const [data, setData] = useState<IDashboardComponent>({
    freeRam: 0,
    memoryAppUsed: 0,
    ramUsed: 0,
    totalRam: 0,
    totalPSS: 0,
    totalRSS: 0,
    memAppPercentPSSUsed: 0,
    memAppPercentRSSUsed: 0,
    appCpuUsed: 0,
  })

  useEffect(() => {
    const fetchMemory = async () => {
      const response = await fetch(
        `/api/system?app-id=${appId}&device=${device}`
      )
      const data: IDashboardComponent = await response.json()
      setData({
        totalRam: data.totalRam,
        freeRam: data.freeRam,
        ramUsed: data.ramUsed,
        memoryAppUsed: data.memoryAppUsed,
        totalPSS: data.totalPSS,
        totalRSS: data.totalRSS,
        memAppPercentPSSUsed: data.memAppPercentPSSUsed,
        memAppPercentRSSUsed: data.memAppPercentRSSUsed,
        appCpuUsed: data.appCpuUsed,
      })
    }
    fetchMemory()
    const intervalId = setInterval(fetchMemory, 2000)
    return () => clearInterval(intervalId)
  }, [])

  const handlerSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    let hrefBuilder: string = `/dashboard?search=${formData.get('search')}`
    searchParams.forEach((item, key) => {
      if (hrefBuilder.indexOf(`${key}=`) !== -1) return
      if (hrefBuilder.indexOf('?') === -1) {
        hrefBuilder += `?${key}=${item}`
        return
      }
      hrefBuilder += `&${key}=${item}`
    })
    router.push(hrefBuilder)
  }

  return (
    <div className='w-100'>
      <Card.CardContainer cardColor='card-info'>
        <Card.CardHeader
          title={`Device: ${device}`}
          badgeColor='badge-warning'
        />
        <div className='flex flex-row space-x-10 p-3'>
          <Card.CardContainer cardColor={cardsColor} className='w-100'>
            <Card.CardHeader
              title='Consumo de memória'
              badge='MB'
              badgeColor='badge-info'
            />
            <Card.CardBody className='flex flex-row'>
              <div>
                <div>
                  <span>Total de memória: </span>
                  <b>{data.totalRam} MB</b>
                </div>
                <div>
                  <span>Memória em uso: </span>
                  <b>{data.ramUsed} MB</b>
                </div>
              </div>
              <div className='w-100'>
                <PieChart
                  backgroundColor={['rgb(54, 162, 235)', 'rgb(255, 99, 132)']}
                  borderColor={['rgb(54, 162, 235)', 'rgb(255, 99, 132)']}
                  labels={['Total', 'Usado']}
                  data={[data.totalRam, data.ramUsed]}
                />
              </div>
            </Card.CardBody>
          </Card.CardContainer>

          <div className='info-box'>
            <span className='info-box-icon bg-success'>
              <svg
                width={50}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
              >
                <path
                  fill='#fff'
                  d='M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V323.9c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32H121zm0 64H391l48 192H387.8c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7H195.8c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7H73L121 96z'
                />
              </svg>
            </span>
            <div className='info-box-content'>
              <span className='info-box-text'>Memória livre</span>
              <span className='info-box-number'>{data.freeRam} MB</span>
            </div>
          </div>
        </div>
      </Card.CardContainer>

      <form onSubmit={handlerSearch} className='mb-1 mt-3'>
        <div className='relative'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            name='search'
            className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='      Buscar por APPS'
            required
          />
          <button
            type='submit'
            className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Buscar
          </button>
        </div>
      </form>

      {!appId || (
        <Card.CardContainer cardColor='card-info'>
          <Card.CardHeader
            title={`Aplicativo: ${appId}`}
            badgeColor='badge-warning'
          />
          <div>
            <div className='flex flex-row space-x-10 p-3'>
              <Card.CardContainer cardColor={cardsColor} className='w-100'>
                <Card.CardHeader
                  title='Memória SQL'
                  badge='KB'
                  badgeColor='badge-warning'
                />
                <Card.CardBody>
                  <b>{data.memoryAppUsed} KB</b>
                </Card.CardBody>
              </Card.CardContainer>
              {/* O PSS é uma métrica que atribui a cada aplicativo sua "parte
              justa" da memória compartilhada, oferecendo uma boa estimativa do
              impacto real do aplicativo na memória total do sistema. Portanto,
              se várias aplicações estão compartilhando a mesma memória, o PSS
              dividirá essa memória entre os aplicativos proporcionalmente. */}
              <div className='info-box'>
                <span className='info-box-icon bg-warning'>
                  <svg
                    width={50}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path
                      fill='#fff'
                      d='M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V323.9c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32H121zm0 64H391l48 192H387.8c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7H195.8c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7H73L121 96z'
                    />
                  </svg>
                </span>
                <div className='info-box-content'>
                  <span className='info-box-text'>Memória PSS</span>
                  <span className='info-box-number'>{data.totalPSS} MB</span>
                  <div className='progress'>
                    <div
                      className='progress-bar bg-info'
                      style={{ width: `${data.memAppPercentPSSUsed}%` }}
                    ></div>
                  </div>
                  <span className='progress-description'>
                    {data.memAppPercentPSSUsed}% memória em uso no APP {appId}
                  </span>
                </div>
              </div>

              {/* O RSS representa a quantidade total de memória que o processo
              ocupa na RAM (memória física), não excluindo a memória
              compartilhada e podendo, portanto, ser uma superestimação do uso
              real de memória, pois conta a memória compartilhada como se fosse
              totalmente utilizada por cada processo que a compartilha. */}
              <div className='info-box'>
                <span className='info-box-icon bg-danger'>
                  <svg
                    width={50}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path
                      fill='#fff'
                      d='M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V323.9c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32H121zm0 64H391l48 192H387.8c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7H195.8c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7H73L121 96z'
                    />
                  </svg>
                </span>
                <div className='info-box-content'>
                  <span className='info-box-text'>Memória PSS</span>
                  <span className='info-box-number'>{data.totalRSS} MB</span>
                  <div className='progress'>
                    <div
                      className='progress-bar bg-info'
                      style={{ width: `${data.memAppPercentRSSUsed}%` }}
                    ></div>
                  </div>
                  <span className='progress-description'>
                    {data.memAppPercentRSSUsed}% memória em uso no APP {appId}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-row space-x-10 p-3'>
              {/* CPU Used */}
              <div className='info-box'>
                <span className='info-box-icon bg-danger'>
                  <svg
                    width={50}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path
                      fill='#fff'
                      d='M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V323.9c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32H121zm0 64H391l48 192H387.8c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7H195.8c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7H73L121 96z'
                    />
                  </svg>
                </span>
                <div className='info-box-content'>
                  <b className='info-box-text'>Uso da CPU</b>
                  <div className='progress'>
                    <div
                      className='progress-bar bg-info'
                      style={{ width: `${data.appCpuUsed}%` }}
                    ></div>
                  </div>
                  <span className='progress-description'>
                    {data.appCpuUsed}% CPU em uso no APP {appId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card.CardContainer>
      )}
      <div>{pros.children}</div>
    </div>
  )
}

export default DashboardComponent
