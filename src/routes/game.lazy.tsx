import GameView from '@/pages/GameView'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/game')({
  component: RouteComponent,
})

function RouteComponent() {
  return <GameView />
}
