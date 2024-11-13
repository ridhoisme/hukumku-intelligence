import { createFileRoute } from '@tanstack/react-router'
import Analysis from '../../screen/judge/analysis'
import TopSectionJudge from '../../screen/judge/top-section'

export const Route = createFileRoute('/_layout/judge/$tab')({
  component: RouteComponent,
})

function RouteComponent() {
  const { tab } = Route.useParams({})

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <TopSectionJudge />
      {tab === 'analysis' ? <Analysis /> : <>custom analisis</>}
    </div>
  )
}
