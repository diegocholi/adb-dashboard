import { NextRequest, NextResponse } from 'next/server'
import util from 'util'
const exec = util.promisify(require('child_process').exec)

// Renomeie a função para `handler` e adicione `req` como argumento para capturar a requisição
export default async function GET(req: NextRequest) {
  // Método não suportado
  return new NextResponse(JSON.stringify({ version: '0.0.1' }), {
    status: 200, // HTTP status code para método não permitido
    headers: { 'Content-Type': 'application/json' },
  })
}
