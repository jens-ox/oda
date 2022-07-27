import dynamic from 'next/dynamic'
import Spec from '../public/openapi.json'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })

const Swagger = () => <SwaggerUI spec={Spec} />

export default Swagger
