import { NextApiHandler } from 'next'

import { sources } from '../../sources'

const handler: NextApiHandler = (req, res) => {
  res.status(200).json(sources)
}

export default handler
