import { Zap, Hand } from "lucide-react"
import type { IFighter } from "../../types/fighter"

type TFinishStats = {
    fighter: IFighter
}

export const FinishStats = ({ fighter }: TFinishStats) => {

    // делаем конфиг с инфой для плиток достижений
    const tiles = [
        {
            icon: Zap,
            value: fighter.stats.koWins,
            label: 'KO wins',
            accentClass: 'text-ufc-red',
        },
        {
            icon: Hand,
            value: fighter.stats.subWins,
            label: 'Submissions',
            accentClass: 'text-ufc-gold',
        },
    ];

    return (
        <div className="w-full grid grid-cols-2 gap-4">
            {tiles.map(({ icon: Icon, value, label, accentClass }) => (
                <div
                    key={label}
                    className="flex flex-col items-center gap-2 p-5 bg-ufc-card border border-ufc-border rounded-xl"
                >
                    <Icon className={`w-6 h-6 ${accentClass}`} />
                    <span className={`font-mono font-bold text-4xl ${accentClass}`}>{value}</span>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-ufc-muted">{label}</span>
                </div>
            ))}
        </div>
    )
}
