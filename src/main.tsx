import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CarsContextProvider } from './carsContext'
import './index.css'
import { StateContextProvider } from './stateContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StateContextProvider>
      <CarsContextProvider>
        <App />
      </CarsContextProvider>
    </StateContextProvider>
  </React.StrictMode>
)
