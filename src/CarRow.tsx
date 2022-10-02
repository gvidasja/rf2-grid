import { useState } from 'react'
import { Car } from './api'
import styles from './App.module.scss'
import { Modal } from './Modal'

export function CarRow({ car, onSelectSkin }: CarRowProps): JSX.Element {
  const [showModal, setShowModal] = useState(false)

  return (
    <div key={car.id} className={styles.carRow} onClick={() => setShowModal(true)}>
      <div>{car.id}</div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div
          style={{
            background: 'white',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {car.skins.map((skin, i) => (
            <div
              key={i}
              className={styles.carThumbnail}
              onClick={e => {
                e.stopPropagation()
                onSelectSkin(car.id, skin.name)
              }}
            >
              <img
                src={`/rest/race/car/${skin.id}/image?type=IMAGE_SMALL`}
                style={{ objectFit: 'contain', display: 'block', maxWidth: '100%' }}
              />
              <div style={{ position: 'absolute', bottom: 0 }}>{skin.name}</div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
type CarRowProps = {
  car: Car
  onSelectSkin: (carId: string, skindName: string) => void
}
