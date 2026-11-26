import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/fighter/$fighterId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/fighter/$fighterId"!</div>
}
