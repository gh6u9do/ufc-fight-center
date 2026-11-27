import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchFighters } from '../api/fighterApi'
import { DivisionSection } from '../features/roster/DivisionSection';
import { DivisionDevider } from '../components/DivisionDevider';

export const Route = createFileRoute('/')({
  component: HomePage,
})



function HomePage() {
  // используем useQuery для получения бойцов через API
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['fighters'],
    queryFn: fetchFighters
  });

  // если данные пока загружаются показываем загрузку
  if (isPending) {
    return (
      <span className='text-center text-ufc-muted py-10 animate-pulse'>Roster is loading...</span>
    )
  }

  // если при получении возникла ошибка -  показываем сообщение
  if (isError) {
    return (
      <span className='text-center text-ufc-red py-10'>{error.message}</span>
    )
  }

  // достаем только тех кто в рейтинге p4p, фильтруем их по возрастанию
  const filteredP4p = data.filter((fighter) => fighter.p4pRank !== undefined).sort((a, b) => a.p4pRank! - b.p4pRank!);

  // достаем бойцов категории FLYWEIGHT
  const filteredFlyweight = data.filter((fighter) => fighter.division === 'Flyweight');

  return (
    <section className='flex flex-col gap-6'>
      <DivisionSection
        title='pound for pound'
        fighters={filteredP4p}
        isP4P
      />
      <DivisionDevider />
      <DivisionSection
        title='flyweight'
        weightLimit='125lbs'
        fighters={filteredFlyweight}
        isP4P={false}
      />
    </section>
  )
}
