import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Утилита для удобного составления className из нескольких источников
 * Типичное применение — объединять базовые стили компонента
 * со стилями, переданными извне:
 *   <div className={cn('btn', className)} />
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
