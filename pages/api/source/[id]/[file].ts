import { join, resolve } from 'path'
import { readFile } from 'fs/promises'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const { id, file } = req.query
  let content
  try {
    content = await readFile(join(resolve('./data'), id as string, file as string), { encoding: 'utf-8' })
  } catch (error) {
    res.status(500).json(error)
  }
  res.status(200).json(JSON.parse(content))
}

export default handler
