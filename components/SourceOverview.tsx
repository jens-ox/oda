'use client'
import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import { SerializedSnapshot } from '../types'
import SnapshotsTable from './tables/Snapshots'

interface SourceOverviewProps {
  snapshots: Array<SerializedSnapshot> | null
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

const SourceOverview: React.FC<SourceOverviewProps> = ({ snapshots }) => (
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
)

export default SourceOverview
