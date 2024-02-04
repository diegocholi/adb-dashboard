'use client'
import { useState, useEffect, PropsWithChildren } from 'react'
import { useSearchParams } from 'next/navigation'
import Card from '@/app/components/card'

export interface IDashboardComponent {
  totalRam: number
  freeRam: number
  ramUsed: number
  memoryAppUsed: number
  totalPSS: number
  totalRSS: number
  memAppPercentConsume: number
}

const DashboardComponent = (pros: PropsWithChildren) => {
  const cardsColor = 'card-dark'
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
    memAppPercentConsume: 0,
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
        memAppPercentConsume: data.memAppPercentConsume,
      })
    }
    fetchMemory()
    const intervalId = setInterval(fetchMemory, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='w-100'>
      <Card.CardContainer cardColor='card-info'>
        <Card.CardHeader title={`Simulador: `} badgeColor='badge-warning' />
        <div className='flex flex-row space-x-10 p-3'>
          <Card.CardContainer cardColor={cardsColor} className='w-100'>
            <Card.CardHeader
              title='Total de memória'
              badge='MB'
              badgeColor='badge-info'
            />
            <Card.CardBody>{data.totalRam}</Card.CardBody>
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

          <Card.CardContainer cardColor={cardsColor} className='w-100'>
            <Card.CardHeader
              title='Memória usada'
              badge='MB'
              badgeColor='badge-danger'
            />
            <Card.CardBody>{data.ramUsed}</Card.CardBody>
          </Card.CardContainer>
        </div>
      </Card.CardContainer>
      {!appId || (
        <Card.CardContainer cardColor='card-info'>
          <Card.CardHeader
            title={`Aplicativo: ${appId}`}
            badgeColor='badge-warning'
          />
          <div className='flex flex-row space-x-10 p-3'>
            <Card.CardContainer cardColor={cardsColor} className='w-100'>
              <Card.CardHeader
                title='Memória SQL'
                badge='KB'
                badgeColor='badge-warning'
              />
              <Card.CardBody>{data.memoryAppUsed}</Card.CardBody>
            </Card.CardContainer>
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
                <span className='info-box-number'>{data.totalPSS} MB</span>
                <div className='progress'>
                  <div
                    className='progress-bar bg-info'
                    style={{ width: `${data.memAppPercentConsume}%` }}
                  ></div>
                </div>
                <span className='progress-description'>
                  {data.memAppPercentConsume}% da memória consumida pelo APP
                </span>
              </div>
            </div>
            <span className='absolute hidden'>
              O PSS é uma métrica que atribui a cada aplicativo sua "parte
              justa" da memória compartilhada, oferecendo uma boa estimativa do
              impacto real do aplicativo na memória total do sistema. Portanto,
              se várias aplicações estão compartilhando a mesma memória, o PSS
              dividirá essa memória entre os aplicativos proporcionalmente.
            </span>
            <Card.CardContainer cardColor={cardsColor} className='w-100'>
              <Card.CardHeader
                title={`Memória RSS`}
                badge='MB'
                badgeColor='badge-warning'
              />
              <Card.CardBody>{data.totalRSS}</Card.CardBody>
            </Card.CardContainer>
            <small className='absolute hidden'>
              O RSS representa a quantidade total de memória que o processo
              ocupa na RAM (memória física), não excluindo a memória
              compartilhada e podendo, portanto, ser uma superestimação do uso
              real de memória, pois conta a memória compartilhada como se fosse
              totalmente utilizada por cada processo que a compartilha.
            </small>
          </div>
        </Card.CardContainer>
      )}

      <div>{pros.children}</div>
    </div>
  )
}

export default DashboardComponent
