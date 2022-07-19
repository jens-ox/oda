import { NextApiHandler } from 'next'
import prisma from '../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const sources = await prisma.source.findMany()

  res.json(sources)
}

export default handler
