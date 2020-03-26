import React, { useEffect, useContext, useState } from 'react'
import { useWeekCalculator } from './dateCalc'
import { getKlassen, getBerufe, getZeitTafel } from './api'

export function usePersistedState(key, destructive = false) {
  const [state, setState] = useState(() => {
    let urlKey = new URLSearchParams(window.location.search).get(key)
    return urlKey || localStorage.getItem(key) || ''
  })

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
  }, [key, state])

  return [state, setState]
}

export function useJobs() {
  let [jobs, setJobs] = useState([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)

  useEffect(() => {
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
      isCurrent = false
    }
  }, [])

  return { jobs, loading, error }
}

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

export function useSchdual(classId, week) {
  let [schdual, setSchdual] = useState([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)

  useEffect(() => {
    let isCurrent = true

    const getJobs = async () => {
      setError(null)
      setLoading(true)
      const entries = await getZeitTafel(classId, week).catch(e => setError(e))
      if (isCurrent) {
        setSchdual(entries)
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

  return { schdual, loading, error }
}

const DateCalcContext = React.createContext(null)

export function DateCalcProvider({ children }) {
  const weekCalc = useWeekCalculator()
  return (
    <DateCalcContext.Provider value={weekCalc}>
      {children}
    </DateCalcContext.Provider>
  )
}

export function useDateCalc() {
  return useContext(DateCalcContext)
}
