import { useCallback, useEffect, useRef, useState } from 'react'
import { addToRace, selectOpponents, setAiDriversToZero, startRace } from './api'
import styles from './App.module.scss'
import { CarRow } from './CarRow'
import { useCarsContext } from './carsContext'
import { Cell, Grid } from './Grid'
import { IndexStatus } from './IndexStatus'
import { useGameState } from './stateContext'
import { StatusCheck } from './StatusCheck'
import { useLocalStorage } from './useLocalStorage'

function App() {
  const {
    cars: [loading, cars = []],
    index,
  } = useCarsContext()

  const state = useGameState()

  const searchRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useLocalStorage<string>('search', '')
  const [filter, setFilter] = useLocalStorage<{ carId: string; skinName: string }[]>(
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

  const focusSearch = useCallback(() => searchRef.current?.focus(), [])

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (/^\w$/i.test(e.key)) {
        focusSearch()
      }
    })
  }, [])

  return (
    <Grid rows="auto auto 1fr" cols="1fr 1fr" className={styles.app}>
      <Cell row={1} col="1 / end">
        <StatusCheck />
        <IndexStatus />
      </Cell>
      <Cell row={2} col={1}>
        <input ref={searchRef} onChange={e => setSearch(e.target.value)} value={search} />
      </Cell>
      <Cell row={3} col={1} style={{ overflow: 'auto' }}>
        {loading ? (
          <div>Loading</div>
        ) : (
          cars
            .filter(x => x.id.toLowerCase().includes(search.toLowerCase()))
            .map(car => (
              <CarRow
                key={car.id}
                car={car}
                onSelectSkin={(carId, skinName) => setFilter([...filter, { carId, skinName }])}
              />
            ))
        )}
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
        {filter.map((f, i) => (
          <div key={i} onClick={() => setFilter(removeElement(filter, i))}>
            {f.carId} - {f.skinName}
          </div>
        ))}
      </Cell>
    </Grid>
  )
}

export default App

function removeElement<T>(arr: T[], i: number): T[] {
  return arr.slice(0, i).concat(arr.slice(i + 1))
}
