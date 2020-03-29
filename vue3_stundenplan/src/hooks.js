import { watch, ref, onMounted, computed } from 'vue'
import { getBerufe, getZeitTafel, getKlassen } from './api'

export function usePersistedState(key, destructive = false) {
  const urlKey = new URLSearchParams(window.location.search).get(key)
  const initialStat = urlKey || window.localStorage.getItem(key) || ''
  const state = ref(initialStat)

  watch([state], () => {
    if (key && state.value) {
      let url
      if (destructive) {
        localStorage.clear()
        url = new URLSearchParams('')
      } else {
        url = new URLSearchParams(window.location.search)
      }
      localStorage.setItem(key, state.value)
      url.set(key, state.value)
      window.history.replaceState(null, 'search', `?${url.toString()}`)
    }
  })

  return state
}

export function useJobs() {
  let state = ref([])

  onMounted(async () => {
    state.value = await getBerufe()
  })

  let berufe = computed(
    () => state.value.filter(b => b.beruf_id !== '25') || []
  )

  return berufe
}

export function useLectures(classId, weekString) {
  let state = ref([])

  watch([classId, weekString], async () => {
    state.value = await getZeitTafel(classId.value, weekString.value)
  })

  return state
}

export function useClasses(jobId) {
  let classes = ref([])

  watch([jobId], async () => {
    classes.value = await getKlassen(jobId.value)
  })

  return classes
}
