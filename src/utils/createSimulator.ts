import { exec } from '@/utils/exec'

export const createSimulator = async (deviceCreateType: string) => {
  try {
    await exec(
      `echo no | avdmanager create avd -n ${deviceCreateType.replace(
        new RegExp(';', 'g'),
        '_'
      )} -k "${deviceCreateType}"`
    )
  } catch {}
}
