'use client'
import { useState, useEffect, PropsWithChildren, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import Card from '@/components/card'
import PieChart from '../charts/PieChart'
import ProgressBarComponent from '../progressBar/ProgressBarComponent'

export interface IDashboardComponent {
  totalRam: number
  freeRam: number
  ramUsed: number
  memoryAppUsed: number
  totalAppPSS: number
  totalAppRSS: number
  memAppPercentPSSUsed: number
  memAppPercentRSSUsed: number
  cpuAppUsed: number
}

const DashboardComponent = () => {
  const searchParams = useSearchParams()
  const appId = searchParams.get('app-id')
  const device = searchParams.get('device')

  const [data, setData] = useState<IDashboardComponent>({
    freeRam: 0,
    memoryAppUsed: 0,
    ramUsed: 0,
    totalRam: 0,
    totalAppPSS: 0,
    totalAppRSS: 0,
    memAppPercentPSSUsed: 0,
    memAppPercentRSSUsed: 0,
    cpuAppUsed: 0,
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
        totalAppPSS: data.totalAppPSS,
        totalAppRSS: data.totalAppRSS,
        memAppPercentPSSUsed: data.memAppPercentPSSUsed,
        memAppPercentRSSUsed: data.memAppPercentRSSUsed,
        cpuAppUsed: data.cpuAppUsed,
      })
    }
    fetchMemory()
    const intervalId = setInterval(fetchMemory, 2000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <div className='grid grid-cols-2 p-2 space-x-2'>
        <Card.Container>
          <Card.Header>Device</Card.Header>
          <Card.Body>{device}</Card.Body>
        </Card.Container>
        <Card.Container>
          <Card.Header>Consumo de memória</Card.Header>
          <Card.Body>
            <div className='grid grid-cols-2'>
              <div>
                <p className='text-[#00A45B]'>
                  Total de memória: {data.totalRam} MB
                </p>
                <p className='text-[#FF5B5B]'>
                  Memória Usada: {data.ramUsed} MB
                </p>
                <p className='text-[#B6B6FF]'>
                  Memória Livre: {data.freeRam} MB
                </p>
              </div>
              <div>
                <PieChart
                  backgroundColor={['#00A45B', '#FF5B5B']}
                  borderColor={['#00A45B', '#FF5B5B']}
                  labels={['Total', 'Usado']}
                  data={[data.totalRam, data.ramUsed]}
                />
              </div>
            </div>
          </Card.Body>
        </Card.Container>
      </div>
      {!appId || (
        <div className='grid grid-cols-1 pb-2 pl-2 pr-2 space-x-2'>
          <Card.Container>
            <Card.Header>{appId}</Card.Header>
            <Card.Body className='space-y-2'>
              <div>
                <span>Consumo de Memória PSS: {data.totalAppPSS} MB</span>
                <div className='w-full'>
                  <ProgressBarComponent percent={data.memAppPercentPSSUsed} />
                </div>
              </div>

              <div>
                <span>Consumo de Memória RSS: {data.totalAppRSS} MB</span>
                <div className='w-full'>
                  <ProgressBarComponent percent={data.memAppPercentRSSUsed} />
                </div>
              </div>

              <div>
                <span>Consumo de CPU</span>
                <div className='w-full'>
                  <ProgressBarComponent percent={data.cpuAppUsed} />
                </div>
              </div>
            </Card.Body>
          </Card.Container>
        </div>
      )}
    </div>
  )
}

export default DashboardComponent
