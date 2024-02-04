import { NextResponse } from 'next/server'

export const response = <T>(data: any, status: number = 200): NextResponse => {
  return new NextResponse<T>(JSON.stringify(data), {
    status: status, // HTTP status code
    headers: { 'Content-Type': 'application/json' }, // Definindo o cabeçalho da resposta
  })
}
