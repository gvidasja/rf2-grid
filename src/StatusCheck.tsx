import { CSSProperties } from 'react'
import { State } from './api'
import { useGameState } from './stateContext'

const STATE_COLOR: Record<State, CSSProperties['background']> = {
  off: 'red',
  menu: 'lightgreen',
  loading: 'yellow',
  race: 'green',
}

const STATE_MESSAGE: Record<State, string> = {
  off: 'Please, launch rFactor 2',
  menu: 'rFactor 2 running - menu',
  loading: 'rFactor 2 running - loading race',
  race: 'rFactor 2 running - race',
}

export function StatusCheck() {
  const state = useGameState()

  return <div style={{ background: STATE_COLOR[state] }}>{STATE_MESSAGE[state]}</div>
}
