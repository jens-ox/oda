import { Snapshot } from '@prisma/client'

export type SerializedSnapshot = Omit<Snapshot, 'createdAt'> & { createdAt: string }
