import React, { useContext } from 'react'
import { Car, FilterIndex, getCars } from './api'
import { useLoader } from './useLoader'
import { useLocalStorage } from './useLocalStorage'

type CarsContextValue = {
  cars: [boolean, Car[]?]
  index: FilterIndex | null
  setIndex: React.Dispatch<FilterIndex | null>
}

const CarsContext = React.createContext<CarsContextValue>({
  cars: [false, []],
  index: {},
  setIndex: () => {},
})

export function CarsContextProvider({ children }: { children: JSX.Element }) {
  const [index, setIndex] = useLocalStorage<FilterIndex | null>('filter_index', {})
  const cars = useLoader(getCars, [])

  return <CarsContext.Provider value={{ index, setIndex, cars }}>{children}</CarsContext.Provider>
}

export function useCarsContext() {
  return useContext(CarsContext)
}
