import { Snapshot, Source } from '@prisma/client'

export type SerializedSnapshot = Omit<Snapshot, 'createdAt'> & { createdAt: string }

export interface SourceWithSnapshot extends Source {
  snapshots: Array<SerializedSnapshot>
}
