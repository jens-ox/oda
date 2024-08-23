import React from 'react'
import { Button, Card, Link as RadixLink } from '@radix-ui/themes'
import { CopyIcon, GearIcon, GitHubLogoIcon } from '@radix-ui/react-icons'

interface FileComponentProps {
  id: string
  file: string
  base: string
}

export const FileComponent: React.FC<FileComponentProps> = ({ id, file, base }) => {
  const fileName = file.split('/').pop()

  return (
    <Card className="flex flex-col gap-2">
      <span className="font-medium">{fileName}</span>
      <div className="flex items-center gap-4">
        <Button asChild>
          <RadixLink
            href={`https://github.com/jens-ox/oda/blob/main${file.replace(base, '')}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GitHubLogoIcon className="h-4 w-4 shrink-0" />
            <span>GitHub</span>
          </RadixLink>
        </Button>
        <Button asChild variant="soft">
          <RadixLink href={`/api/file?id=${id}&file=${fileName}`}>
            <GearIcon className="h-4 w-4 shrink-0" />
            <span>API: File</span>
          </RadixLink>
        </Button>
        <Button asChild variant="soft">
          <RadixLink href={`/api/schema?id=${id}&file=${fileName}`}>
            <CopyIcon className="h-4 w-4 shrink-0" />
            <span>API: Schema</span>
          </RadixLink>
        </Button>
      </div>
    </Card>
  )
}
