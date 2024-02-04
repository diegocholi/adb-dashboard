'use client'

import { useState, useEffect, PropsWithChildren } from 'react'
import { useSearchParams } from 'next/navigation'

export interface IHomeStates {
  memory: string
}

const DashboardComponent = (pros: PropsWithChildren) => {
  const searchParams = useSearchParams()
  const appId = searchParams.get('app-id')

  const [data, setData] = useState<IHomeStates>({ memory: '' })

  useEffect(() => {
    const fetchMemory = async () => {
      const response = await fetch(`/api/system?app-id=${appId}`)
      const data = await response.json()
      setData({ memory: data.memory })
    }
    fetchMemory()
    const intervalId = setInterval(fetchMemory, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <div>Consumo de memória: {data.memory}M</div>
      <div>{pros.children}</div>
    </div>
  )
}

export default DashboardComponent
