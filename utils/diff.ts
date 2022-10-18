type ChangeEntry<T> = {
  full: T
  changedNew: Partial<T>
  changedOld: Partial<T>
}

export type DiffResult<T> = {
  added: Array<T>
  removed: Array<T>
  changed: Array<ChangeEntry<T>>
}

const identity = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)

export const diff = <T extends object>(
  oldList: Array<T>,
  newList: Array<T>,
  keyFunction: (entry: T) => string
): DiffResult<T> => {
  if (oldList.length === 0 && newList.length === 0) return { added: [], removed: [], changed: [] }
  if (oldList.length === 0) return { added: newList, removed: [], changed: [] }
  if (newList.length === 0) return { added: [], removed: oldList, changed: [] }

  // by now, both lists are non-empty - we assume homogenous keys, so we can take the first object of the first list as reference
  const keys = Object.keys(oldList[0]) as Array<keyof T>

  const added = newList.filter(
    (newEntry) => !oldList.some((oldEntry) => keyFunction(oldEntry) === keyFunction(newEntry))
  )
  const removed = oldList.filter(
    (oldEntry) => !newList.some((newEntry) => keyFunction(oldEntry) === keyFunction(newEntry))
  )

  const changed = newList.reduce(function (acc, newEntry) {
    const oldEntry = oldList.find(
      (oldEntry) =>
        keyFunction(oldEntry) === keyFunction(newEntry) &&
        keys.some((otherKey) => !identity(oldEntry[otherKey], newEntry[otherKey]))
    )

    if (!oldEntry) return acc

    const changedNew = Object.entries(newEntry)
      .filter(([k, v]) => !identity(oldEntry[k as keyof typeof oldEntry], v))
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})

    const changedOld = Object.entries(oldEntry)
      .filter(([k, v]) => !identity(newEntry[k as keyof typeof newEntry], v))
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})

    const result = {
      full: newEntry,
      changedNew,
      changedOld
    }
    return [result, ...acc]
  }, [] as Array<ChangeEntry<T>>)

  return { added, removed, changed }
}
