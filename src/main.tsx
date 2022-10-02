import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CarsContextProvider } from './carsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CarsContextProvider>
      <App />
    </CarsContextProvider>
  </React.StrictMode>
)
