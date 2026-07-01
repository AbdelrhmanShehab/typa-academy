// Tailwind class merging utility (lightweight alternative to clsx+twMerge)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
