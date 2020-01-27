import { watch } from 'vue'

export function useSaveInUrl(job, klasse) {
  watch([job, klasse], () => {
    if (job.value !== '' && klasse.value !== '') {
      let savedSelect = btoa(`${job.value}-${klasse.value}`)
      window.location.hash = savedSelect
      localStorage.setItem('savedSelect', savedSelect)
    } else {
      window.location.hash = ''
      localStorage.removeItem('savedSelect')
    }
  })
}

export function useRestoreFromUrl(job, klasse) {
  let savedSelect =
    localStorage.getItem('savedSelect') || window.location.hash.slice(1)
  let [urlJob, urlklasse] = atob(savedSelect).split('-')
  if (urlJob && urlklasse) {
    job.value = urlJob
    klasse.value = urlklasse
  }
}
