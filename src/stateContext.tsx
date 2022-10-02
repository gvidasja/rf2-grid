import { createContext, useContext, useEffect, useState } from 'react'
import { healthCheck, State } from './api'

const StateContext = createContext<State>('off')

export function StateContextProvider({ children }: { children: JSX.Element }) {
  const [state, setState] = useState<State>('off')

  useEffect(() => {
    const i = setInterval(() => healthCheck().then(setState), 2000)
    return () => clearInterval(i)
  }, [])

  return <StateContext.Provider value={state}>{children}</StateContext.Provider>
}

export function useGameState() {
  return useContext(StateContext)
}
