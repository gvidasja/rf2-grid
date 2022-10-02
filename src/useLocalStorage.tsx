import React, { useEffect, useState } from 'react'

export function useLocalStorage<T>(itemName: string, defaultValue: T): [T, React.Dispatch<T>] {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(itemName)
    if (!item) {
      return defaultValue
    }

    return JSON.parse(item)
  })

  useEffect(() => {
    localStorage.setItem(itemName, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}
