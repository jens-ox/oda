'use client'
import SwaggerUI from 'swagger-ui-react'
import spec from '@/public/openapi.json'
import 'swagger-ui-react/swagger-ui.css'

const Swagger: React.FC = () => <SwaggerUI spec={spec} />

export default Swagger
