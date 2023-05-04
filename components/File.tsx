import React from 'react'
import { GithubIcon, SettingsIcon, Workflow } from 'lucide-react'
import Link from 'next/link'

interface FileComponentProps {
  id: string
  file: string
  base: string
}

export const FileComponent: React.FC<FileComponentProps> = ({ id, file, base }) => {
  const fileName = file.split('/').pop()

  return (
    <div className="bg-white rounded-lg p-2 shadow border border-slate-200 flex flex-col gap-4">
      <span className="font-medium">{fileName}</span>
      <div className="flex items-center gap-2">
        <a
          href={`https://github.com/jens-ox/bundesdatenkrake/blob/main${file.replace(base, '')}`}
          target="_blank"
          rel="noreferrer noopener"
          className="button primary"
        >
          <GithubIcon className="h-4 w-4 shrink-0" />
          <span>GitHub</span>
        </a>
        <Link href={`/api/file?id=${id}&file=${fileName}`} className="button secondary">
          <SettingsIcon className="h-4 w-4 shrink-0" />
          <span>API: File</span>
        </Link>
        <Link href={`/api/schema?id=${id}&file=${fileName}`} className="button secondary">
          <Workflow className="h-4 w-4 shrink-0" />
          <span>API: Schema</span>
        </Link>
      </div>
    </div>
  )
}
