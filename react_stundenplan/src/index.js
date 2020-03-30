import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import { DateCalcProvider } from './hooks'
import ErrorBoundary from 'react-error-boundary'
import Fallback from './components/Fallback'

ReactDOM.render(
  <DateCalcProvider>
    <ErrorBoundary FallbackComponent={Fallback}>
      <App />
    </ErrorBoundary>
  </DateCalcProvider>,
  document.getElementById('root')
)
