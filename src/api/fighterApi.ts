import { ALL_MOCK_FIGHTERS } from "../data/fighters.mock";
import type { IFighter } from "../types/fighter";


//  функция достает всех бойцов из бд (в данном случае моковые данные)
export async function fetchFighters(): Promise<IFighter[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ALL_MOCK_FIGHTERS);
        }, 600)
    })
}

// достаем конкретного бойца по id
export async function fetchFighterById(id: string): Promise<IFighter> {

    return new Promise((resolve, reject) => {

        // находим бойца
        const fighter = ALL_MOCK_FIGHTERS.find((fighter) => fighter.id === id);

        setTimeout(() => {
            // если боец не найден выбрасываем ошибку чтобы React Query смог перевести компонент в состояние isError
            if(!fighter) {
                reject(new Error(`fighter with id: ${id} is undefined`));
            } else {
                resolve(fighter);
            }
        }, 600)

    })

}