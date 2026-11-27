import { useEffect, useState } from "react"
import type { IFighter } from "../../types/fighter"

type TFighterStatsChart = {
    fighter: IFighter
}

export const FighterStatsChart = ({ fighter }: TFighterStatsChart) => {

    // флаг для анимации - нужен чтобы бары анимированно заполнились от 0 до нужного значения, а не появились сразу полными
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // просим браузер вызывать коллбэк перед следующей перерисовкой кадра (сразу после монтирования)
        const frame = requestAnimationFrame(() => setMounted(true));
        // функция очистки, отменяем запрос при размонтировании до срабатывания кадра
        return () => cancelAnimationFrame(frame);
    }, []);

    // конфиг для процентный баров
    const bars = [
        { label: 'Striking accuracy', value: fighter.stats.strikingAccuracy, fillClass: 'bg-ufc-red' },
        { label: 'Takedown defense', value: fighter.stats.takedownDefense, fillClass: 'bg-ufc-gold' },
    ];

    // раскладываем победы по методам: KO + сабмишены, остаток - решением судей
    const totalWins = Number(fighter.record.split('-')[0]) || 0;
    const { koWins, subWins } = fighter.stats;
    const decisionWins = Math.max(0, totalWins - koWins - subWins);

    const methodSegments = [
        { label: 'KO/TKO', value: koWins, fillClass: 'bg-ufc-red' },
        { label: 'Submission', value: subWins, fillClass: 'bg-ufc-gold' },
        { label: 'Decision', value: decisionWins, fillClass: 'bg-ufc-border' },
    ];

    return (
        <div className="w-full flex flex-col gap-6 p-5 bg-ufc-card border border-ufc-border rounded-xl">

            {/* процентные показатели - анимированные прогресс-бары */}
            <div className="flex flex-col gap-4">
                {bars.map(({ label, value, fillClass }) => (
                    <div key={label} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono uppercase tracking-widest text-ufc-muted">{label}</span>
                            <span className="font-mono font-bold text-sm text-ufc-text">{value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-ufc-border overflow-hidden">
                            <div
                                className={`h-full rounded-full ${fillClass} transition-[width] duration-700 ease-out`}
                                style={{ width: mounted ? `${value}%` : '0%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* стек-бар методов побед */}
            <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-ufc-muted">Win methods</span>
                <div className="h-3 rounded-full bg-ufc-border overflow-hidden flex">
                    {methodSegments.map(({ label, value, fillClass }) => (
                        <div
                            key={label}
                            className={`h-full ${fillClass} transition-[width] duration-700 ease-out`}
                            style={{ width: mounted && totalWins > 0 ? `${(value / totalWins) * 100}%` : '0%' }}
                        />
                    ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    {methodSegments.map(({ label, value, fillClass }) => (
                        <span key={label} className="flex items-center gap-1.5 text-[11px] font-mono text-ufc-muted">
                            <span className={`w-2 h-2 rounded-full ${fillClass}`} />
                            {label} · {value}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
