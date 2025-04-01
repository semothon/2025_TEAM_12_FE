import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
// import App from './App.jsx'
import Map from './components/Map.jsx'
import Building from './components/building.jsx'
import placeHolder from './assets/placeholder_small.jpg'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Map>
      <Building x={2000} y={1000} src={placeHolder} />
      <Building x={3000} y={1000} src={placeHolder} />
    </Map>
  </StrictMode>,
)
