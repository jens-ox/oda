import { SchemaRenderer } from '@/components/SchemaRenderer'
import { schemas } from '@/schemas'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Callout } from '@radix-ui/themes'
import { JSONSchema7 } from 'json-schema'
import { zodToJsonSchema } from 'zod-to-json-schema'

export default ({ params: { id } }: { params: { id: string } }) => {
  const schema = schemas[id]

  if (!schema)
    return (
      <div>
        <Callout.Root color="red" role="alert" variant="surface">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>Schema nicht gefunden :(</Callout.Text>
        </Callout.Root>
      </div>
    )

  return (
    <SchemaRenderer
      schema={zodToJsonSchema(schema, { $refStrategy: 'none' }) as JSONSchema7}
      name={id}
    />
  )
}
