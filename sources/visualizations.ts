import { ReactNode } from 'react'

interface VisualizationSource {
  id: string
  visualization: ReactNode
}

const visualizationSources: Array<VisualizationSource> = []

export default visualizationSources
