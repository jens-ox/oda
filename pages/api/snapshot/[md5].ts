import { NextApiHandler } from 'next'
import { download } from '../../../lib/aws'

const handler: NextApiHandler = async (req, res) => {
  const md5 = req.query.md5 as string

  const url = await download(md5)

  if (url && url !== '') {
    res.redirect(url)
  } else {
    res.status(404).json({ msg: 'not found' })
  }
}

export default handler
