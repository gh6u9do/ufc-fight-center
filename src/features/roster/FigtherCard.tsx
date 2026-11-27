import { Link } from "@tanstack/react-router"
import type { IFighter } from "../../types/fighter"
import { getAvatarFallbackUrl } from "../../utils/avatar"

type IFighterCard = {
    fighter: IFighter,
    listType: "standard" | "p4p"
}


export const FighterCard = ({ fighter, listType }: IFighterCard) => {

    return (
        <Link
            to="/fighter/$fighterId" params={{ fighterId: fighter.id }}
            className="cursor-pointer flex items-center justify-between gap-3.5 p-3.5 bg-ufc-card rounded-md  hover:shadow-[0_0_10px_5px_rgba(255,255,255,0.2)] transition-colors active:scale-95"
        >
            <img src={fighter.imageUrl} alt="fighter image" className="w-14 h-14 rounded-full object-cover border border-ufc-border shrink-0" onError={(e) => {
                // обнуляем onError, чтобы битая заглушка не зациклила моргание
                e.currentTarget.onerror = null;
                e.currentTarget.src = getAvatarFallbackUrl(fighter.name);
            }} />

            <div className="flex flex-col justify-center text-center flex-1 min-w-0">
                {fighter.nickname && <span className="text-ufc-muted italic">"{fighter.nickname}"</span>}
                <p className="uppercase font-black text-base tracking-wide text-ufc-text truncate">{fighter.name}</p>
                <p className="text-ufc-muted">{fighter.record}</p>
            </div>

            <div className="flex gap-4 items-center justify-center">
                {
                    listType === 'p4p' && (
                        fighter.isChampion ? (
                            <span className="flex items-center justify-center w-8 h-8 rounded-[4px] bg-ufc-gold text-black text-sm font-black shadow-[0_0_8px_rgba(250,204,21,0.45)]">
                                #{fighter.p4pRank}
                            </span>
                        ) : (
                            <span className="text-xl font-mono font-bold text-ufc-muted">#{fighter.p4pRank}</span>
                        )
                    )
                }
                {
                    listType === 'standard' && (
                        fighter.isChampion ? (
                            <span className="flex items-center justify-center w-8 h-8 rounded-[4px] bg-ufc-gold text-black text-sm font-black shadow-[0_0_8px_rgba(250,204,21,0.45)]">
                                C
                            </span>
                        ) : (
                            <p className="text-xl font-mono font-bold text-ufc-muted">{fighter.rank ? `#${fighter.rank}` : 'NR'}</p>
                        )
                    )
                }
            </div>

        </Link>
    )


}