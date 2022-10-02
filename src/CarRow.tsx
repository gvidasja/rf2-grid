import { useState } from 'react'
import { Car } from './api'
import styles from './CarRow.module.scss'

export function List<T extends { id: any }>({ items, onClick, render }: ListProps<T>) {
  return (
    <>
      {items.map((item, i) => (
        <div className={styles.CarRow} key={item.id} onClick={() => onClick(item, i)}>
          {render(item)}
        </div>
      ))}
    </>
  )
}

type ListProps<T extends { id: any }> = {
  items: T[]
  onClick: (item: T, i: number) => void
  render: (item: T) => JSX.Element | string
}

export function CarRow({ car, onSelectSkin }: CarRowProps): JSX.Element {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={styles.carRow} onClick={() => setShowModal(true)}>
      <div>{car.id}</div>
    </div>
  )
}
type CarRowProps = {
  car: Car
  onSelectSkin: (carId: string, skindName: string) => void
}
