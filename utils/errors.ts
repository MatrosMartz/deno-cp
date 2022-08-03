export function getFileError(msg: string) {
  const init = msg.indexOf('\'')

  return msg.slice(init).replaceAll('\'', '')
}