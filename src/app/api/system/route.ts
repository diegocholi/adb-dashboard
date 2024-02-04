import { IDashboardComponent } from '@/app/components/dashboard/DashboardComponent'
import { exec } from '@/app/utils/exec'
import {
  getValueIntInString,
  getValueFloatInString,
} from '@/app/utils/getValueInString'
import { kbToMb } from '@/app/utils/kbToMb'
import { response } from '@/app/utils/response'
import { NextRequest } from 'next/server'

// Renomeie a função para `handler` e adicione `req` como argumento para capturar a requisição
export async function GET(req: NextRequest) {
  // Verifique o método da requisição
  try {
    const appId = req.nextUrl.searchParams.get('app-id')
    const device = req.nextUrl.searchParams.get('device')
    // Device Informations
    const { stdout: deviceMemInfo } = await exec(
      `adb -s ${device} shell dumpsys meminfo`
    )
    const totalRam = getValueFloatInString(deviceMemInfo, 'Total RAM: ')
    const freeRam = getValueFloatInString(deviceMemInfo, 'Free RAM: ')
    const ramUsed = getValueFloatInString(deviceMemInfo, 'Used RAM: ')

    // Application Informations
    const { stdout: appMemInfo } = await exec(
      `adb -s ${device} shell dumpsys meminfo ${appId}`
    )
    const memoryAppUsed = getValueIntInString(appMemInfo, 'MEMORY_USED:      ')
    const totalPSS = kbToMb(
      Number(getValueIntInString(appMemInfo, 'TOTAL PSS:   '))
    ).toFixed(2)
    const totalRSS = kbToMb(
      Number(getValueIntInString(appMemInfo, 'TOTAL RSS:   '))
    ).toFixed(2)

    const memAppPercentConsume = Number(
      (Number(totalPSS) * 100) / Number(totalRam)
    ).toFixed(2)

    return response<IDashboardComponent>({
      totalRam,
      freeRam,
      ramUsed,
      memoryAppUsed,
      totalPSS,
      totalRSS,
      memAppPercentConsume,
    })
  } catch (error) {
    return response({ error: 'Failed to fetch memory information' })
  }
}
