import { glob as globCb } from 'glob'

export const glob = async (pattern: string): Promise<Array<string>> =>
  new Promise((resolve, reject) =>
    globCb(pattern, { nodir: true }, (error, matches) => {
      if (error) {
        reject(error)
      } else {
        resolve(matches)
      }
    })
  )
