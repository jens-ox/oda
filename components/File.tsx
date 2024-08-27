import React from 'react'
import { Button, Card, Link as RadixLink } from '@radix-ui/themes'
import { CopyIcon, GearIcon, GitHubLogoIcon } from '@radix-ui/react-icons'

interface FileComponentProps {
  sourceId: string
  fileName: string
  schemaId: string
}

export const FileComponent: React.FC<FileComponentProps> = ({ sourceId, fileName, schemaId }) => {
  return (
    <Card className="flex flex-col gap-2">
      <span className="font-medium">{fileName}</span>
      <div className="flex items-center gap-4">
        <Button asChild>
          <RadixLink
            href={`https://github.com/jens-ox/oda/blob/main/data/${sourceId}/${fileName}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GitHubLogoIcon className="h-4 w-4 shrink-0" />
            <span>GitHub</span>
          </RadixLink>
        </Button>
        <Button asChild variant="soft">
          <RadixLink href={`/api/file?id=${sourceId}&file=${fileName}`}>
            <GearIcon className="h-4 w-4 shrink-0" />
            <span>API: File</span>
          </RadixLink>
        </Button>
        <Button asChild variant="soft">
          <RadixLink href={`/schema/${schemaId}`}>
            <CopyIcon className="h-4 w-4 shrink-0" />
            <span>Schema</span>
          </RadixLink>
        </Button>
      </div>
    </Card>
  )
}
