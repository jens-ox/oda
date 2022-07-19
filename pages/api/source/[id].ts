import { NextApiHandler } from 'next'
import prisma from '../../../lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string
  const sourceData = await prisma.source.findFirst({
    where: {
      id
    },
    include: {
      snapshots: {
        orderBy: [{ createdAt: 'desc' }]
      }
    }
  })

  res.status(200).json(sourceData)
}

export default handler
