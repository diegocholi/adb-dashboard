import { exec } from '@/app/utils/exec'
import { NextRequest, NextResponse } from 'next/server'

// Renomeie a função para `handler` e adicione `req` como argumento para capturar a requisição
export async function GET(req: NextRequest) {
  // Verifique o método da requisição
  try {
    const appId = req.nextUrl.searchParams.get('app-id')
    console.log(appId)
    const { stdout: memInfo } = await exec(`adb shell dumpsys meminfo ${appId}`)
    const memoryUsedRegex = /MEMORY_USED:      (\d+)/
    const match = memInfo.match(memoryUsedRegex)
    const memoryUsed = match ? match[1] : '0'

    return new NextResponse(JSON.stringify({ memory: memoryUsed }), {
      status: 200, // HTTP status code
      headers: { 'Content-Type': 'application/json' }, // Definindo o cabeçalho da resposta
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch memory information' }),
      {
        status: 500, // HTTP status code para indicar erro no servidor
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
