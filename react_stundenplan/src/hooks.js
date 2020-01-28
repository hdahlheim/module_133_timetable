import { useEffect } from 'react'

export function useRestorFromUrl(setJob, setClass) {
  let savedSelect =
    window.location.hash.slice(1) || localStorage.getItem('savedSelect')

  let [urlJob, urlklasse] = atob(savedSelect).split('-')

  if (urlJob && urlklasse) {
    return [urlJob, urlklasse]
  }
  return ['', '']
}

export function useSaveInUrl(job, klasse) {
  useEffect(() => {
    if (job !== '' && klasse !== '') {
      let savedSelect = btoa(`${job}-${klasse}`)
      window.location.hash = savedSelect
      localStorage.setItem('savedSelect', savedSelect)
    } else {
      window.location.hash = ''
      localStorage.removeItem('savedSelect')
    }
  }, [job, klasse])
}
