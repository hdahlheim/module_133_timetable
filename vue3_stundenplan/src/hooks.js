import { watch, ref, onMounted, computed } from 'vue'
import { getBerufe, getZeitTafel, getKlassen } from './api'

/**
 * Use persisten state. Besides saveing the state only in localstorage the item
 * is also persisted in the URL as query param.
 *
 * @param {String} key Key of the url param or localstorage item
 * @param {Boolean} destructive should changes to the item delete the rest of the saved items
 */
export function usePersistedState(key, destructive = false) {
  // restore saved state
  const urlKey = new URLSearchParams(window.location.search).get(key)
  const initialStat = urlKey || window.localStorage.getItem(key) || ''
  const state = ref(initialStat)

  // watch state changes
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

/**
 * Wraps api function for integration with Vue reactivity system.
 */
export function useJobs() {
  let state = ref([])

  // Only gets called when the component first mounts
  onMounted(async () => {
    state.value = await getBerufe()
  })

  // readonly reactive variable
  let jobs = computed(() => state.value.filter(b => b.beruf_id !== '25') || [])

  return jobs
}

/**
 * Wraps api function for integration with Vue reactivity system.
 * @param {import('vue').Ref<String>} classId Id of the selected class
 * @param {import('vue').Ref<String>} weekString Selected ISO week String
 */
export function useLectures(classId, weekString) {
  let state = ref([])

  // Watches changes to classId an weekString and refetches the data
  watch([classId, weekString], async () => {
    if (classId.value !== '') {
      state.value = await getZeitTafel(classId.value, weekString.value)
    }
  })

  return state
}

/**
 * Wraps api function for integration with Vue reactivity system.
 * @param {import('vue').Ref<String>} jobId Id of the selected job
 */
export function useClasses(jobId) {
  let classes = ref([])

  // Watches changes to jobId and refetches the data
  watch([jobId], async () => {
    classes.value = await getKlassen(jobId.value)
  })

  return classes
}
