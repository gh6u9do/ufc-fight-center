// формирует валидный URL заглушки-аватарки ui-avatars по имени бойца
export function getAvatarFallbackUrl(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=27272a&color=fff&bold=true`;
}
