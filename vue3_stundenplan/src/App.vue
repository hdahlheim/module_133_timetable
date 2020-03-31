<template>
  <main id="app" class="h-screen bg-gray-200">
    <div class="container p-2 mx-auto sm:p-10">
      <div>
        <SelectForm
          :value="jobId"
          @update="handelJobSelect"
          name="Beruf"
          :values="jobs"
        />
      </div>
      <div v-show="jobId">
        <div class="hidden sm:block">
          <div class="py-5">
            <hr class="h-px text-gray-500" />
          </div>
        </div>
        <SelectForm
          name="Klasse"
          :value="classId"
          @update="handelClassSelect"
          :values="classes"
        />
      </div>
      <div v-show="classId">
        <div class="hidden sm:block">
          <div class="py-5">
            <hr class="h-px text-gray-500" />
          </div>
        </div>
        <Pagination />
        <transition
          mode="out-in"
          enter-from-class="opacity-0"
          enter-active-class="duration-500 ease-out"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-active-class="duration-300 ease-in"
          leave-to-class="opacity-0"
        >
          <LectureTable
            class="transition-all"
            :key="`${classId}-${weekString}`"
            :lectures="lectures"
          />
        </transition>
      </div>
    </div>

    <Portal target="#portalTarget">
      <div v-if="error" class="absolute inset-x-0 top-0 max-w-md m-4 mx-auto">
        <p
          class="px-4 py-2 text-red-800 bg-red-300 border border-red-700 rounded-sm"
        >
          Uh oh. Something went wrong! Please reload the page.<br />
          Error: {{ error }}
        </p>
      </div>
    </Portal>
  </main>
</template>

<script>
import { ref, onErrorCaptured } from 'vue'
import SelectForm from './components/SelectForm'
import LectureTable from './components/LectureTable'
import Pagination from './components/Pagination'
import { usePersistedState, useJobs, useLectures, useClasses } from './hooks'
import { useWeekCalculator } from './WeekCalculator'

export default {
  name: 'app',
  components: {
    LectureTable,
    SelectForm,
    Pagination,
  },
  setup() {
    // Get persisted state
    const jobId = usePersistedState('jobID', true)
    const classId = usePersistedState('classID')
    const { weekString } = useWeekCalculator()

    // get job list
    const jobs = useJobs()

    // get class list
    const classes = useClasses(jobId)

    // get lectures
    const lectures = useLectures(classId, weekString)

    const handelJobSelect = val => {
      classId.value = ''
      jobId.value = val
    }

    const handelClassSelect = val => {
      classId.value = val
    }

    const error = ref(null)

    onErrorCaptured(e => {
      error.value = e
      return true
    })

    return {
      jobId,
      jobs,
      classId,
      classes,
      lectures,
      weekString,
      handelJobSelect,
      handelClassSelect,
      error,
    }
  },
}
</script>

<style>
/* purgecss start ignore */
@tailwind base;
@tailwind components;
/* purgecss end ignore */
@tailwind utilities;
</style>
