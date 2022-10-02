import { useCallback, useEffect, useRef, useState } from 'react'
import { Car } from './api'
import { List } from './CarRow'
import { useCarsContext } from './carsContext'
import { Modal } from './Modal'
import styles from './SelectSkinList.module.scss'
import { useLocalStorage } from './useLocalStorage'

export function SelectSkinList({
  onSelectSkin,
}: {
  onSelectSkin: (id: string, name: string) => void
}) {
  const focusSearch = useCallback((e: KeyboardEvent) => {
    if (/^\w$/i.test(e.key)) {
      searchRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  const searchRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useLocalStorage<string>('search', '')
  const [openCar, setOpenCar] = useState<Car>()

  const {
    cars: [loading, cars = []],
  } = useCarsContext()

  return (
    <>
      <input ref={searchRef} onChange={e => setSearch(e.target.value)} value={search} />
      {loading ? (
        <div>Loading</div>
      ) : (
        <List
          items={cars.filter(x => x.id.toLowerCase().includes(search.toLowerCase()))}
          render={car => car.id}
          onClick={car => setOpenCar(car)}
        />
      )}
      <Modal show={!!openCar} onClose={() => setOpenCar(undefined)}>
        <div className={styles.SelectSkinModal}>
          {openCar?.skins.map((skin, i) => (
            <div
              key={i}
              className={styles.SkinThumbnail}
              onClick={e => {
                e.stopPropagation()
                onSelectSkin(openCar.id, skin.name)
              }}
            >
              <img
                src={`/rest/race/car/${skin.id}/image?type=IMAGE_SMALL`}
                className={styles.SkinThumbnailImage}
              />
              <div className={styles.SkinName}>{skin.name}</div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
