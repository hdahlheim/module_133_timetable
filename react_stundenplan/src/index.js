import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import { DateCalcProvider } from './hooks'

ReactDOM.render(
  <DateCalcProvider>
    <App />
  </DateCalcProvider>,
  document.getElementById('root')
)
