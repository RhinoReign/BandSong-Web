import { useEffect, useState } from 'react'

export type ThemeMode = 'dark' | 'light-studio' | 'light-paper'

const STORAGE_KEY = 'bs_theme'

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'dark' || value === 'light-studio' || value === 'light-paper'
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>('dark')

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    if (isThemeMode(storedTheme)) {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      delete root.dataset.theme
    } else {
      root.dataset.theme = theme
    }

    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return { theme, setTheme }
}
