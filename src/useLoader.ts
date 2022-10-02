import { useEffect, useState } from 'react'

export function useLoader<T>(fn: () => Promise<T>, deps: any[]): [boolean, T?] {
  const [value, setValue] = useState<T>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fn().then(x => {
      setValue(x)
      setLoading(false)
    })
  }, deps)

  return [loading, value]
}
