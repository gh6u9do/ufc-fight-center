import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { fetchFighterById } from '../api/fighterApi';
import { FighterHero } from '../features/fighter/FighterHero';
import { FinishStats } from '../features/fighter/FinishStats';
import { FighterStatsChart } from '../features/fighter/FighterStatsChart';
import { DivisionDevider } from '../components/DivisionDevider';

export const Route = createFileRoute('/fighter/$fighterId')({
  component: RouteComponent,
})

function RouteComponent() {

  // достаем Id бойца из params
  const { fighterId } = Route.useParams();

  // запрашиваем данные о бойце через useQuery
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['fighter', fighterId],
    queryFn: () => fetchFighterById(fighterId)
  })

  // если данные пока загружаются показываем загрузку
  if (isPending) {
    return (
      <span className='text-center text-ufc-muted py-10 animate-pulse'>Fighter is loading...</span>
    )
  }

  // если при получении возникла ошибка - показываем сообщение
  if (isError) {
    return (
      <span className='text-center text-ufc-red py-10'>{error.message}</span>
    )
  }

  return (
    <section className='w-full flex flex-col gap-6'>
      <FighterHero fighter={data} />
      <DivisionDevider />
      <FinishStats fighter={data} />
      <FighterStatsChart fighter={data} />
    </section>
  )
}
