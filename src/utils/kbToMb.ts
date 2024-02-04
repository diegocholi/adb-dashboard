export function kbToMb(kilobytes: number) {
  if (!Number(kilobytes)) return kilobytes
  return kilobytes / 1024
}
