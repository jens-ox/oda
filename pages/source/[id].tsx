import { Source } from '@prisma/client'
import { GetServerSideProps, NextPage } from 'next'
import classNames from 'classnames'
import { Tab } from '@headlessui/react'
import { PropsWithChildren } from 'react'
import SnapshotsTable from '../../components/tables/Snapshots'
import prisma from '../../lib/prisma'
import { SerializedSnapshot } from '../../types'
import { ebGaramond } from '../../utils/fonts'

interface SourcePageProps {
  source: Source | null
  snapshots: Array<SerializedSnapshot> | null
}

export const getServerSideProps: GetServerSideProps<SourcePageProps> = async ({ params }) => {
  const id = params?.id ?? 'unknown'

  const data = await prisma.source.findFirst({
    where: {
      id: `${id}`
    },
    include: {
      snapshots: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (data === null)
    return {
      props: {
        source: null,
        snapshots: null
      }
    }

  const { snapshots, ...source } = data

  return {
    props: {
      source,
      snapshots: snapshots.map((s) => ({ ...s, createdAt: s.createdAt.toString() }))
    }
  }
}

interface TabHeaderProps {
  tabKey: string
  label: string
}
const TabHeader: React.FC<TabHeaderProps> = ({ tabKey, label }) => (
  <Tab
    key={tabKey}
    className={({ selected }) =>
      classNames(
        selected
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm outline-none'
      )
    }
  >
    {label}
  </Tab>
)

interface TabPanelProps {
  tabKey: string
}

const TabPanel: React.FC<PropsWithChildren<TabPanelProps>> = ({ tabKey, children }) => (
  <Tab.Panel key={tabKey}>{children}</Tab.Panel>
)

const SourcePage: NextPage<SourcePageProps> = ({ source, snapshots }) => {
  return (
    <div>
      {source === null ? (
        <p>Quelle nicht gefunden</p>
      ) : (
        <div className="flex flex-col gap-12">
          <div className="flex flex-col">
            <h1 className={classNames(ebGaramond.className, 'font-medium text-5xl mb-4')}>{source.name}</h1>
            <small className="text-stone-500">{source.description}</small>
            <small className="text-stone-500">
              —{' '}
              <a href={source.url} className="underline" target="_blank">
                {source.office}
              </a>
            </small>
          </div>

          <div className="flex flex-col gap-6">
            <Tab.Group>
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  <TabHeader tabKey="snapshots" label="Snapshots" />
                  <TabHeader tabKey="schema" label="Schema" />
                </Tab.List>
              </div>
              <Tab.Panels>
                <TabPanel tabKey="snapshots">
                  {snapshots === null ? <p>Keine Snapshots gefunden</p> : <SnapshotsTable snapshots={snapshots} />}
                </TabPanel>
                <TabPanel tabKey="schema">
                  <p>Schema</p>
                </TabPanel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      )}
    </div>
  )
}

export default SourcePage
