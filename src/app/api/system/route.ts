import { IDashboardComponent } from '@/components/dashboard/DashboardComponent'
import { exec } from '@/utils/exec'
import {
  getCpuAppUsedInString,
  getMemIntInString,
  getMenFloatInString,
} from '@/utils/getValueInString'
import { kbToMb } from '@/utils/kbToMb'
import { response } from '@/utils/response'
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
    const totalRam = getMenFloatInString(deviceMemInfo, 'Total RAM: ')
    const freeRam = getMenFloatInString(deviceMemInfo, 'Free RAM: ')
    const ramUsed = getMenFloatInString(deviceMemInfo, 'Used RAM: ')

    // Application Informations Memory RAM
    const { stdout: appMemInfo } = await exec(
      `adb -s ${device} shell dumpsys meminfo ${appId}`
    )
    const memoryAppUsed = getMemIntInString(appMemInfo, 'MEMORY_USED:      ')
    const totalPSS = kbToMb(
      Number(getMemIntInString(appMemInfo, 'TOTAL PSS:   '))
    ).toFixed(2)
    const totalRSS = kbToMb(
      Number(getMemIntInString(appMemInfo, 'TOTAL RSS:   '))
    ).toFixed(2)

    const memAppPercentPSSUsed = Number(
      (Number(totalPSS) * 100) / Number(totalRam)
    ).toFixed(2)
    const memAppPercentRSSUsed = Number(
      (Number(totalRSS) * 100) / Number(totalRam)
    ).toFixed(2)

    // Application information CPU
    // adb -s emulator-5554 shell dumpsys cpuinfo io.app.meusebrae
    const { stdout: appCPUInfo } = await exec(
      `adb -s ${device} shell dumpsys cpuinfo ${appId}`
    )

    const appCpuUsed = getCpuAppUsedInString(appCPUInfo, appId)
    return response<IDashboardComponent>({
      totalRam,
      freeRam,
      ramUsed,
      memoryAppUsed,
      totalPSS,
      totalRSS,
      memAppPercentPSSUsed,
      memAppPercentRSSUsed,
      appCpuUsed,
    })
  } catch (error) {
    return response({ error: 'Failed to fetch memory information' })
  }
}
