import { exec } from '@/utils/exec'
export const deleteSimulator = async (deleteDevice: string) => {
  await exec(`avdmanager delete avd -n ${deleteDevice} &`)
}
