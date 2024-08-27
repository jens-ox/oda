'use client'

import { ChevronDownIcon, ChevronRightIcon, CopyIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { JSONSchema7 } from 'json-schema'
import Link from 'next/link'
import { useState } from 'react'

const FallbackRenderer = ({ schema }: { schema: unknown }) => (
  <pre className="text-1 font-mono">{JSON.stringify(schema, null, 2)}</pre>
)

interface PropRendererProps {
  schema: JSONSchema7
  name: string
  required?: boolean
  root?: boolean
}

const TypeDescriptor = ({ schema }: { schema: JSONSchema7 }) => {
  // render tuples
  if (schema.type === 'array' && Array.isArray(schema.items)) {
    return (
      <p className="font-mono text-1 tracking-9">
        {`[${schema.items.map((i) => (i as JSONSchema7).type).join(', ')}]`}
      </p>
    )
  }
  return (
    <p className="font-mono text-1 tracking-9">
      {schema.type === 'array' ? `array(${(schema.items as JSONSchema7).type})` : schema.type}
    </p>
  )
}

const PropRenderer = ({ schema, name, required, root = false }: PropRendererProps) => {
  const [isOpen, setIsOpen] = useState(true)

  // expandable: objects or array of objects
  const isExpandable =
    (schema.type === 'array' &&
      typeof schema.items === 'object' &&
      (schema.items as JSONSchema7).type === 'object') ||
    schema.type === 'object'
  return (
    <div className="flex gap-3">
      {!root && <div className="border-t-2 border-gray-7 w-2" style={{ marginTop: 11 }} />}

      <div className="flex flex-col gap-1 flex-1">
        <div className="group flex items-center gap-6">
          <div className="flex items-center gap-3">
            {isExpandable && (
              <Button size="1" variant="soft" onClick={() => setIsOpen((o) => !o)}>
                {isOpen ? (
                  <ChevronDownIcon className="size-3" />
                ) : (
                  <ChevronRightIcon className="size-3" />
                )}
              </Button>
            )}
            <p className="font-mono font-bold tracking-9">{name}</p>
            <TypeDescriptor schema={schema} />
          </div>
          <div className="flex-1 group-hover:bg-gray-5" style={{ height: 2 }}></div>
          {required && <p className="text-red-11">required</p>}
        </div>
        <div className="flex flex-col gap-1" style={{ paddingLeft: isExpandable ? 13 : 0 }}>
          {/* Description */}
          {!root && <p className="text-gray-11">{schema.description}</p>}

          {/* Allowed values */}
          {typeof schema.const !== 'undefined' && (
            <div className="flex items-center gap-2">
              <p className="text-gray-11">Allowed value:</p>
              <span className="border border-gray-7 rounded-2 bg-gray-2 text-1 font-mono px-1">
                {schema.const as string}
              </span>
            </div>
          )}
          {typeof schema.enum !== 'undefined' && (
            <div className="flex gap-2">
              <p className="text-gray-11 text-nowrap">Allowed values:</p>
              <div className="flex items-center gap-2 flex-wrap">
                {schema.enum.map((v) => (
                  <span
                    key={`enum-${v}`}
                    className="border border-gray-7 rounded-2 bg-gray-2 text-1 font-mono px-1"
                  >
                    {v as string}
                  </span>
                ))}
              </div>
            </div>
          )}
          {schema.type === 'object' && isOpen && <ObjectRenderer schema={schema} />}

          {schema.type === 'array' && isOpen && <ArrayRenderer schema={schema} />}
        </div>
      </div>
    </div>
  )
}

const ArrayRenderer = ({ schema }: { schema: JSONSchema7 }) => {
  // tuples are shown in the type descriptor
  // TODO this won't suffice for object tuples
  if (Array.isArray(schema.items)) return null

  // TODO these are not implemented yet
  if (!schema.items || schema.items === true) return <FallbackRenderer schema={schema} />

  if (schema.items.type === 'object') {
    if (schema.items.properties) return <ObjectRenderer schema={schema.items} />
  }

  // base object arrays don't need an array rendering
  return null
}

const ObjectRenderer = ({ schema }: { schema: JSONSchema7 }) => {
  if (schema.properties)
    return (
      <div className="border-l-2 border-gray-7 pt-2 flex flex-col gap-3">
        {Object.entries(schema.properties).map(([key, value]) => (
          <PropRenderer
            key={`prop-${key}`}
            schema={value as JSONSchema7}
            name={key}
            required={schema.required?.includes(key)}
          />
        ))}
      </div>
    )
}

interface SchemaRendererProps {
  schema: JSONSchema7
  name: string
}

export const SchemaRenderer = ({ schema, name }: SchemaRendererProps) => {
  return (
    <div className="flex flex-col gap-6" style={{ width: '65ch' }}>
      <div className="prose border-b border-gray-5 pb-6">
        <h1>{name}</h1>
        {schema.description && <p>{schema.description}</p>}
        <Link href={`/api/schema?id=${name}`}>
          <Button>
            <CopyIcon />
            API: Schema
          </Button>
        </Link>
      </div>
      <div className="text-2">
        <PropRenderer schema={schema} name={name} root />
      </div>
      {/* <FallbackRenderer schema={schema} /> */}
    </div>
  )
}
