import { useCallback, useState } from 'react'
import { addToRace, selectOpponents, setAiDriversToZero } from './api'
import styles from './App.module.scss'
import { CarRow } from './CarRow'
import { useCarsContext } from './carsContext'
import { Cell, Grid } from './Grid'
import { IndexStatus } from './IndexStatus'
import { StatusCheck } from './StatusCheck'
import { useLocalStorage } from './useLocalStorage'

function App() {
  const {
    cars: [loading, cars = []],
    index,
  } = useCarsContext()

  const [search, setSearch] = useLocalStorage<string>('search', '')
  const [filter, setFilter] = useLocalStorage<{ carId: string; skinName: string }[]>(
    'race_skins',
    []
  )
  const [applyingFilters, setApplyingFilters] = useState(false)

  const onApplyFilters = useCallback(async () => {
    setApplyingFilters(true)
    const filtersToRace = Array.from(
      new Set(filter.map(skin => index![skin.skinName]!).filter(x => x !== undefined))
    )

    await selectOpponents(filtersToRace)
    await setAiDriversToZero()
    setApplyingFilters(false)
  }, [filter])

  const onAddToRace = useCallback(async () => {
    for (const f of filter) {
      await addToRace(f.skinName)
    }
  }, [filter])

  return (
    <Grid rows="auto auto 1fr" cols="1fr 1fr" className={styles.app}>
      <Cell row={1} col="1 / end">
        <StatusCheck />
        <IndexStatus />
      </Cell>
      <Cell row={2} col={1}>
        <input onChange={e => setSearch(e.target.value)} value={search} />
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
                onAddSkin={(carId, skinName) => setFilter([...filter, { carId, skinName }])}
              />
            ))
        )}
      </Cell>
      <Cell row={2} col={2}>
        <button disabled={!filter.length} onClick={() => setFilter([])}>
          Clear all
        </button>
        <button
          disabled={!filter.length || !index || !Object.keys(index).length || applyingFilters}
          onClick={onApplyFilters}
        >
          {applyingFilters ? 'Applying filters...' : 'Apply filters'}
        </button>
        <button onClick={onAddToRace}>Add AI to the race (even distribution)</button>
      </Cell>
      <Cell row="3 / end-1" col={2} style={{ overflow: 'auto' }}>
        {filter.map((f, i) => (
          <div onClick={() => setFilter(removeElement(filter, i))}>
            {f.carId} - {f.skinName}
          </div>
        ))}
      </Cell>
    </Grid>
  )
}

export default App

function removeElement<T>(arr: T[], i: number): T[] {
  console.log(arr, arr.slice(0, i), arr.slice(i + 1), arr.slice(0, i).concat(arr.slice(i + 1)))
  return arr.slice(0, i).concat(arr.slice(i + 1))
}
