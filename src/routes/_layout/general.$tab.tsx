import { createFileRoute } from '@tanstack/react-router'
import TopSectionGeneral from '../../screen/general/top-section'
import Analysis from '../../screen/general/analysis'

export const Route = createFileRoute('/_layout/general/$tab')({
  component: RouteComponent,
})

function RouteComponent() {
  const { tab } = Route.useParams({})

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <TopSectionGeneral />
      {tab === 'analysis' ? <Analysis /> : <>custom analisis</>}
    </div>
  )
}
