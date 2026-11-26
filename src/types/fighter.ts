export type TDivision =
    | 'Flyweight'
    | 'Bantamweight'
    | 'Featherweight'
    | 'Lightweight'
    | 'Welterweight'
    | 'Middleweight'
    | 'Light Heavyweight'
    | 'Heavyweight';

export interface IFighter {
    id: string;
    name: string;
    nickname: string | null;
    division: TDivision;
    // формат "W-L-D-NC"
    record: string;
    // код страны EN, RU. US ...
    country: string;
    isChampion: boolean;
    // если не чемп то место в рейтинге
    rank?: number;
    p4pRank?: number;
    imageUrl: string;
    stats: {
        strikingAccuracy: number;
        takedownDefense: number;
        koWins: number;
        subWins: number;
    }
}