import React, { useEffect, useContext, useState } from 'react'
import { useWeekCalculator } from './dateCalc'
import { getKlassen, getBerufe, getZeitTafel } from './api'

/**
 * Persist date throughout page reloads. Data is saved in the url and in localstorage
 *
 * @param {String} key
 * @param {Boolean} destructive
 */
export function usePersistedState(key, destructive = false) {
  // get saved state
  const [state, setState] = useState(() => {
    let urlKey = new URLSearchParams(window.location.search).get(key)
    return urlKey || localStorage.getItem(key) || ''
  })

  // watch state for changes
  useEffect(() => {
    if (key && state) {
      let url
      if (destructive) {
        localStorage.clear()
        url = new URLSearchParams('')
      } else {
        url = new URLSearchParams(window.location.search)
      }
      localStorage.setItem(key, state)
      url.set(key, state)
      window.history.replaceState(null, 'search', `?${url.toString()}`)
    }
  }, [key, state, destructive])

  return [state, setState]
}

// Wrapper for react reactivity
export function useJobs() {
  let [jobs, setJobs] = useState([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)

  // run sideeffect
  useEffect(() => {
    // variable for cleanup tracking
    let isCurrent = true

    const jobs = async () => {
      setError(null)
      setLoading(true)
      const entries = await getBerufe().catch(e => setError(e))
      if (isCurrent) {
        setJobs(entries)
      }
      setLoading(false)
    }

    jobs()

    return () => {
      // if component gets unmounted this prevents state changes from pending promises
      isCurrent = false
    }
  }, [])

  return { jobs, loading, error }
}

// Wrapper for react reactivity
export function useSchoolClass(jobId) {
  let [schoolClasses, setSchoolClasses] = useState([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(true)

  useEffect(() => {
    let isCurrent = true

    const classes = async () => {
      setError(null)
      setLoading(true)
      const entries = await getKlassen(jobId).catch(e => setError(e))
      if (isCurrent) {
        setSchoolClasses(entries)
      }
      setLoading(false)
    }

    if (jobId) {
      classes()
    }

    return () => {
      isCurrent = false
    }
  }, [jobId])

  return { schoolClasses, loading, error }
}

// Wrapper for react reactivity
export function useSchedule(classId, week) {
  let [schedule, setSchedule] = useState([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)

  useEffect(() => {
    let isCurrent = true

    const getJobs = async () => {
      setError(null)
      setLoading(true)
      const entries = await getZeitTafel(classId, week).catch(e => setError(e))
      if (isCurrent) {
        setSchedule(entries)
      }
      setLoading(false)
    }

    if (classId && week) {
      getJobs()
    }

    return () => {
      isCurrent = false
    }
  }, [classId, week])

  return { schedule, loading, error }
}

const DateCalcContext = React.createContext(null)

// provides weekcalc for all childcomponents
export function DateCalcProvider({ children }) {
  const weekCalc = useWeekCalculator()
  return (
    <DateCalcContext.Provider value={weekCalc}>
      {children}
    </DateCalcContext.Provider>
  )
}

// injection helper
export function useDateCalc() {
  return useContext(DateCalcContext)
}
