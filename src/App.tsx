import { useCallback, useState } from 'react'
import { addToRace, selectOpponents, setAiDriversToZero, startRace } from './api'
import styles from './App.module.scss'
import { List } from './CarRow'
import { useCarsContext } from './carsContext'
import { Cell, Grid } from './Grid'
import { IndexStatus } from './IndexStatus'
import { SelectSkinList } from './SelectSkinList'
import { useGameState } from './stateContext'
import { StatusCheck } from './StatusCheck'
import { useLocalStorage } from './useLocalStorage'

function App() {
  const { index } = useCarsContext()
  const state = useGameState()

  const [filter, setFilter] = useLocalStorage<{ id: any; carId: string; skinName: string }[]>(
    'race_skins',
    []
  )

  const [startingRace, setStartingRace] = useState(false)

  const onStartRace = useCallback(async () => {
    setStartingRace(true)
    const filtersToRace = Array.from(
      new Set(filter.map(skin => index![skin.skinName]!).filter(x => x !== undefined))
    )

    await selectOpponents(filtersToRace)
    await setAiDriversToZero()

    await startRace()

    for (const f of filter) {
      await addToRace(f.skinName)
    }
    setStartingRace(false)
  }, [filter])

  return (
    <Grid rows="auto auto 1fr" cols="1fr 1fr" className={styles.app}>
      <Cell row={1} col="1 / end">
        <StatusCheck />
        <IndexStatus />
      </Cell>
      <Cell row="2 / end" col={1} style={{ overflow: 'auto' }}>
        <SelectSkinList
          onSelectSkin={(carId, skinName) =>
            console.log(carId, skinName, filter)! ||
            setFilter([...filter, { id: filter.length, carId, skinName }])
          }
        />
      </Cell>
      <Cell row={2} col={2}>
        <button disabled={!filter.length || state !== 'menu'} onClick={() => setFilter([])}>
          Clear all
        </button>
        <button
          disabled={
            !filter.length ||
            !index ||
            !Object.keys(index).length ||
            startingRace ||
            state !== 'menu'
          }
          onClick={onStartRace}
        >
          {startingRace ? 'Starting...' : 'Start'}
        </button>
      </Cell>
      <Cell row="3 / end-1" col={2} style={{ overflow: 'auto' }}>
        <List
          items={filter}
          render={f => `${f.carId} - ${f.skinName}`}
          onClick={(_, i) => setFilter(removeElement(filter, i))}
        />
      </Cell>
    </Grid>
  )
}

export default App

function removeElement<T>(arr: T[], i: number): T[] {
  return arr.slice(0, i).concat(arr.slice(i + 1))
}
