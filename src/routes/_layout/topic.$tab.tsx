import { createFileRoute } from '@tanstack/react-router'
import TopSectionTopic from '../../screen/topic/top-section'
import Analysis from '../../screen/topic/analysis'

export const Route = createFileRoute('/_layout/topic/$tab')({
  component: RouteComponent,
})

function RouteComponent() {
  const { tab } = Route.useParams({})

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <TopSectionTopic />
      {tab === 'analysis' ? <Analysis /> : <>custom analisis</>}
    </div>
  )
}
