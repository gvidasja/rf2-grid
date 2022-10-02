import { useCallback, useState } from 'react'
import { getFilterIndex } from './api'
import { useCarsContext } from './carsContext'
import { useGameState } from './stateContext'

export function IndexStatus() {
  const { index, setIndex } = useCarsContext()
  const [progress, setProgress] = useState([0, 0])

  const state = useGameState()

  const onResetIndex = useCallback(() => setIndex({}), [])

  const onRebuildIndex = useCallback(() => {
    setIndex(null)
    return getFilterIndex(setProgress).then(setIndex)
  }, [])

  return (
    <>
      <>
        {!!index
          ? `Filter index has ${Object.keys(index).length} items`
          : `Rebuilding (${progress[0]} out of ${progress[1]})...`}
      </>
      <>Index is used for setting up grids. It has to be built once</>
      <button disabled={!index || state !== 'menu'} onClick={onRebuildIndex}>
        Rebuild
      </button>
      <button disabled={progress[0] !== progress[1] || state !== 'menu'} onClick={onResetIndex}>
        Reset
      </button>
    </>
  )
}
