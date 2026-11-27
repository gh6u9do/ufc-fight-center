import type { IFighter } from "../../types/fighter"
import { useState } from "react"
import { FighterCard } from "./FigtherCard"

type TDivisionSection = {
    title: string,
    weightLimit?: string,
    fighters: IFighter[],
    isP4P: boolean
}

export const DivisionSection = ({ title, weightLimit, fighters, isP4P = false }: TDivisionSection) => {

    // стейт отвечает за количество показываемых бойцов - по дефолту 16 (чемп + топ 15)
    const [visibleFightersCount, setVisibleFightersCount] = useState(16);

    // достаем всех отображаемых бойцов
    const visibleFighters = fighters.slice(0, visibleFightersCount);

    return (
        <section className="flex flex-col items-center gap-5">
            <header className="w-full flex items-center justify-between gap-3 border-l-4 border-ufc-red pl-4">
                <h2 className='uppercase italic font-black text-2xl tracking-wider text-ufc-text whitespace-nowrap'>{title}</h2>
                {weightLimit && (
                    <span className="px-2.5 py-1 rounded-full border border-ufc-border bg-ufc-bg
                 text-[11px] font-mono uppercase tracking-widest text-ufc-muted whitespace-nowrap">
                        {weightLimit}
                    </span>
                )}
            </header>

            <ul className='w-full flex flex-col gap-4'>
                {visibleFighters.map((fighter) => (
                    <li key={fighter.id}>
                        <FighterCard
                            fighter={fighter}
                            listType={isP4P ? 'p4p' : 'standard'}
                        />
                    </li>
                ))}
            </ul>

            {/* если кол-во отображаемых бойцов меньше их общего кол-ва показываем кнопку */}
            {visibleFightersCount < fighters.length && (
                <button
                    type="button"
                    onClick={() => setVisibleFightersCount((count) => count + 10)}
                    className="uppercase font-medium text-sm tracking-wider px-6 py-2.5 rounded-md border border-ufc-red text-blue-50 hover:text-ufc-red  transition-colors duration-300 active:scale-95 cursor-pointer"
                >
                    Show more
                </button>
            )}
        </section>
    )

}