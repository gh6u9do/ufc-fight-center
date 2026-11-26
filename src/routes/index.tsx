import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchFighters } from '../api/fighterApi'
import { FighterCard } from '../features/roster/FigtherCard';

export const Route = createFileRoute('/')({
  component: HomePage,
})




function HomePage() {
  // используем useQuery для получения бойцов
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

  // если при получении ошибка показываем сообщение
  if (isError) {
    return (
      <span className='text-center text-ufc-red py-10'>{error.message}</span>
    )
  }

  // достаем только тех кто в рейтинге p4p, фильтруем их по возрастанию
  const filteredP4p = data.filter((fighter) => fighter.p4pRank !== undefined).sort((a, b) => a.p4pRank! - b.p4pRank!);

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex flex-col items-center gap-5'>
        <h2 className='uppercase italic font-black text-2xl tracking-wider text-ufc-text whitespace-nowrap'>pound for pound</h2>
        <ul className='flex flex-col gap-4'>
          {filteredP4p.map((fighter) => (
            <li key={fighter.id}>
              <FighterCard
                fighter={fighter}
                listType='p4p'
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
