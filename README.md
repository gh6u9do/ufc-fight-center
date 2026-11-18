# UFC Fight Center

Современный mobile-first дашборд (`max-width: 480px`) для мониторинга ростера бойцов UFC, просмотра грядущих турниров и ведения персонального списка «Любимых бойцов» с отслеживанием их статистики.

## Возможности

### Главная страница (`/`)

- Интерактивный список ТОП-бойцов (ростер).
- Фильтрация по **весовым дивизионам** (Heavyweight, Lightweight, Welterweight и т.д.) и поиск по фамилии — состояние завязано строго на **URL Search Params** (фильтр можно шарить ссылкой).
- Анонс ближайшего номерного турнира (например, UFC 334 / 335) с таймером обратного отсчёта.

### Страница бойца (`/fighter/$fighterId`)

- Профиль бойца: аватар, рекорд (W-L-D), страна, статус (Чемпион / Топ-контендер).
- Радарная диаграмма или блоки характеристик (Striking, Grappling, Тейкдауны).
- Кнопка «Добавить в свой Кэмп» (Watchlist).

### Глобальное состояние

- **My Camp** — список избранных бойцов, за которыми пользователь следит особенно пристально. Сохраняется в `LocalStorage`.

## Технологии

| Слой | Стек |
| --- | --- |
| Сборка | [Vite](https://vite.dev) |
| UI | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Роутинг | [TanStack Router](https://tanstack.com/router) (type-safe, file-based routes, validateSearch для search params) |
| Серверное состояние | [TanStack Query](https://tanstack.com/query) |
| Клиентское состояние | [Zustand](https://zustand.docs.pmnd.rs) (+ persist middleware для LocalStorage) |
| Валидация данных | [Zod](https://zod.dev) |
| Стили | [Tailwind CSS 4](https://tailwindcss.com) |
| Иконки | [lucide-react](https://lucide.dev) |
| Качество кода | ESLint + typescript-eslint |

## Установка и запуск

```bash
# установка зависимостей
npm install

# dev-сервер с HMR
npm run dev

# продакшн-сборка (tsc + vite build)
npm run build

# предпросмотр сборки
npm run preview

# линт
npm run lint
```

## Структура проекта

```
src/
├── routes/           # file-based роуты TanStack Router
│   └── __root.tsx    # корневой лейаут
├── utils/            # вспомогательные утилиты (cn и др.)
├── main.tsx          # точка входа: создание роутера и монтирование React
├── index.css         # глобальные стили (Tailwind)
└── routeTree.gen.ts  # генерируется автоматически роутер-плагином
```

> `src/routeTree.gen.ts` генерируется плагином `@tanstack/router-plugin` — не редактируйте его вручную.

## Roadmap

- [ ] Главная страница: ростер, фильтры и поиск через URL Search Params
- [ ] Анонс турнира с таймером обратного отсчёта
- [ ] Страница бойца с профилем и характеристиками
- [ ] Watchlist «My Camp» с сохранением в LocalStorage
- [ ] Интеграция с реальным API данных UFC
