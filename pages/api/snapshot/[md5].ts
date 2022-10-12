import { NextApiHandler } from 'next'
import { download } from '../../../lib/aws'

const handler: NextApiHandler = async (req, res) => {
  const md5 = req.query.md5 as string

  // try to load from bucket with the given key
  const content = await download(md5)

  res.status(200).json(content)
}

export default handler

export const config = {
  api: {
    responseLimit: false
  }
}
