import { NextApiHandler } from 'next'
import { download } from '../../../lib/aws'

const handler: NextApiHandler = async (req, res) => {
  const md5 = req.query.md5 as string
  const asFile = req.query.asFile ?? false

  // try to load from bucket with the given key
  const content = await download(md5)

  if (asFile) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Length', content.length)
    res.setHeader('Content-Disposition', `attachment; filename=${md5}.json`)

    res.send(content)
  } else {
    res.send(content)
  }
}

export default handler

export const config = {
  api: {
    responseLimit: false
  }
}
