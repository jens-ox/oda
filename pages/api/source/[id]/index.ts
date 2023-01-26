import { join, resolve } from 'path'
import { NextApiHandler } from 'next'
import { glob } from '../../../../utils/glob'

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query

  const basePath = join(resolve('./data'), id as string)
  const path = join(basePath, '**')
  const files = await glob(path)
  res.status(200).json(files.map((f) => f.replace(basePath, '').replace(/^\//, '')))
}

export default handler
