<template>
  <main id="app" class="h-screen bg-gray-200">
    <div class="container p-10 mx-auto">
      <div>
        <SelectForm v-model="job" :name="'Beruf'" :values="berufe" />
      </div>

      <div v-if="job">
        <div class="hidden sm:block">
          <div class="py-5">
            <hr class="h-px text-gray-500" />
          </div>
        </div>
        <Suspense>
          <template #default>
            <AsyncClassSelect v-model="klasse" :job="job" :key="job" />
          </template>
          <template #fallback>
            ...loading
          </template>
        </Suspense>
      </div>

      <div v-if="klasse">
        <div class="hidden sm:block">
          <div class="py-5">
            <hr class="h-px text-gray-500" />
          </div>
        </div>
        <Suspense>
          <template #default>
            <LectureTable :key="klasse" :klasse="klasse" />
          </template>
          <template #fallback>
            <LectureTableLoading />
          </template>
        </Suspense>
      </div>
    </div>

    <Portal target="#portalTaget">
      <div v-if="error" class="absolute inset-x-0 top-0 max-w-md m-4 mx-auto">
        <p
          class="px-4 py-2 text-red-800 bg-red-300 border border-red-700 rounded-sm"
        >
          {{ error }}
        </p>
      </div>
    </Portal>
  </main>
</template>

<script>
import { ref, onMounted, computed, watch, onErrorCaptured } from 'vue'
import SelectForm from './components/SelectForm'
import AsyncClassSelect from './components/AsyncClassSelect'
import LectureTable from './components/LectureTable'
import LectureTableLoading from './components/LectureTableLoading'
import { getBerufe } from './api'
import { useRestoreFromUrl, useSaveInUrl } from './hooks'

export default {
  name: 'app',
  components: {
    AsyncClassSelect,
    LectureTable,
    LectureTableLoading,
    SelectForm,
  },
  setup() {
    let job = ref('')
    let klasse = ref('')
    let error = ref(null)
    let allberufe = ref([])

    useRestoreFromUrl(job, klasse)

    useSaveInUrl(job, klasse)

    onErrorCaptured(() => {
      error.value = 'Uh oh. Something went wrong!'
      return true
    })

    onMounted(async () => {
      allberufe.value = await getBerufe()
    })

    watch(
      () => job.value,
      () => {
        klasse.value = ''
      },
      { lazy: true }
    )

    let berufe = computed(
      () => allberufe.value.filter(b => b.beruf_id !== '25') || []
    )

    return {
      job,
      klasse,
      berufe,
      error,
    }
  },
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
