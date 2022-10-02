import { useEffect, useState } from 'react'
import { healthCheck } from './api'

export function StatusCheck() {
  const [alive, setAlive] = useState(false)

  useEffect(() => {
    const i = setInterval(() => healthCheck().then(setAlive), 2000)
    return () => clearInterval(i)
  }, [])

  return (
    <div style={{ background: alive ? 'lightgreen' : 'red' }}>
      {alive ? 'rFactor 2 running' : 'Please, Launch rFactor 2'}
    </div>
  )
}
