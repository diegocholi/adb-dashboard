import { exec } from '@/utils/exec'

export const openSimulator = async (simulator: string) => {
  await exec(`emulator @${simulator} &`)
}
