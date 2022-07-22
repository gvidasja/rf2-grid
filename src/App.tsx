import { useState } from 'react'
import { getCars } from './api'
import { useLoader } from './useLoader'

function App() {
  const [loading, cars = []] = useLoader(getCars, [])
  const [search, setSearch] = useState('')

  return (
    <div>
      <input onChange={e => setSearch(e.target.value)} value={search} />
      {loading ? (
        <div>Loading</div>
      ) : (
        cars
          .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
          .map(x => <div key={x.id}>{x.name}</div>)
      )}
    </div>
  )
}

export default App
