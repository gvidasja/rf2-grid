import { useCallback, useEffect, useState } from 'react'
import { getFilterIndex } from './api'
import { useCarsContext } from './carsContext'
import styles from './IndexStatus.module.css'
import { useGameState } from './stateContext'

export function IndexStatus() {
  const {
    index,
    setIndex,
    cars: [loading, cars = []],
  } = useCarsContext()
  const [progress, setProgress] = useState([0, 0])
  const [totalSkins, setTotalSkins] = useState(0)

  const state = useGameState()

  const onResetIndex = useCallback(() => setIndex({}), [])

  const onRebuildIndex = useCallback(() => {
    setIndex(null)
    return getFilterIndex(setProgress).then(setIndex)
  }, [])

  useEffect(() => {
    if (!loading && cars.length && index) {
      setTotalSkins(
        cars.reduce((total, car) => total + car.skins.filter(skin => !!index[skin.name]).length, 0)
      )
    }
  }, [loading, cars, index])

  return (
    <>
      {!!index
        ? `Index (${Object.keys(index).length} / ${totalSkins} skins indexed)`
        : `Rebuilding (Analyzing car ${progress[0]} out of ${progress[1]})...`}
      <div className={styles.Info}>
        ?
        <div className={styles.Tooltip}>
          Index maps skins to filters. It needs to be rebuilt when new cars are added
        </div>
      </div>
      <button disabled={!index || state !== 'menu'} onClick={onRebuildIndex}>
        Rebuild
      </button>
      <button disabled={progress[0] !== progress[1] || state !== 'menu'} onClick={onResetIndex}>
        Reset
      </button>
    </>
  )
}
