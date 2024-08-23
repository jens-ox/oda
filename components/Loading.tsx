import { Spinner } from '@radix-ui/themes'

const Loading: React.FC = () => (
  <div className="flex items-center gap-2">
    <Spinner />
    <p>Lädt...</p>
  </div>
)

export default Loading
