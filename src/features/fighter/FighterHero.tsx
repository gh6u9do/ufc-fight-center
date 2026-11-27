import type { IFighter } from "../../types/fighter"
import { getAvatarFallbackUrl } from "../../utils/avatar"

type TFighterHero = {
    fighter: IFighter
}

export const FighterHero = ({ fighter }: TFighterHero) => {

    // рекорд хранится строкой "W-L-D(-NC)", раскладываем по частям
    const [wins, losses, draws] = fighter.record.split('-');

    // конфиг для отрисовки, указываем кол-во побед/поражений/ничьих, название значения и tailwind класс
    const recordParts = [
        { value: wins, label: 'wins', valueClass: 'text-ufc-text' },
        { value: losses, label: 'losses', valueClass: 'text-ufc-red' },
        { value: draws, label: 'draws', valueClass: 'text-ufc-muted' },
    ];

    return (
        <section className="flex flex-col items-center gap-4">
            {/* блок с фотографией бойца */}
            <div className="relative">
                <img
                    src={fighter.imageUrl}
                    alt={fighter.name}
                    className={`w-32 h-32 rounded-full object-cover border-2 ${fighter.isChampion
                        ? 'border-ufc-gold shadow-[0_0_20px_rgba(234,179,8,0.35)]'
                        : 'border-ufc-border'}`}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getAvatarFallbackUrl(fighter.name);
                    }}
                />
                {fighter.isChampion && (
                    <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-8 h-8 rounded-[4px] bg-ufc-gold text-black text-sm font-black shadow-[0_0_8px_rgba(250,204,21,0.45)]">
                        C
                    </span>
                )}
            </div>
            
            {/* блок с именем, прозвищем и регалиями */}
            <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="uppercase italic font-black text-3xl tracking-wider text-ufc-text">
                    {fighter.name}
                </h1>
                {fighter.nickname && (
                    <span className="text-ufc-muted italic">"{fighter.nickname}"</span>
                )}

                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {/* если чимп то пишем что чемп + в каком весе */}
                    {fighter.isChampion ? (
                        <span className="px-2.5 py-1 rounded-full border border-ufc-gold/50 bg-ufc-gold/10 text-[11px] font-mono uppercase tracking-widest text-ufc-gold whitespace-nowrap">
                            Champion · {fighter.division}
                        </span>
                    ) : fighter.rank !== undefined && (
                        <span className="px-2.5 py-1 rounded-full border border-ufc-border bg-ufc-bg text-[11px] font-mono uppercase tracking-widest text-ufc-muted whitespace-nowrap">
                            #{fighter.rank} {fighter.division}
                        </span>
                    )}
                    {/* есть есть в рейтинге p4p так же показываем его */}
                    {fighter.p4pRank !== undefined && (
                        <span className="px-2.5 py-1 rounded-full border border-ufc-border bg-ufc-bg text-[11px] font-mono uppercase tracking-widest text-ufc-muted whitespace-nowrap">
                            P4P #{fighter.p4pRank}
                        </span>
                    )}
                </div>
            </div>

            {/* рекорд: победы / поражения / ничьи */}
            <div className="flex items-start gap-8">
                {recordParts.map(({ value, label, valueClass }) => (
                    <div key={label} className="flex flex-col items-center">
                        <span className={`font-mono font-bold text-3xl ${valueClass}`}>{value}</span>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-ufc-muted">{label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
