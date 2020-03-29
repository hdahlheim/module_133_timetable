<template>
  <div
    class="flex items-center justify-between w-full mb-4 overflow-hidden bg-white rounded shadow"
  >
    <button
      class="w-1/3 px-6 py-4 font-semibold hover:text-blue-100 hover:bg-blue-400"
      @click="subtractWeek"
    >
      Prev
    </button>
    <div>{{ weekString }}</div>
    <button
      class="w-1/3 px-6 py-4 font-semibold hover:text-blue-100 hover:bg-blue-400"
      @click="addWeek"
    >
      Next
    </button>
  </div>
</template>

<script>
import { useWeekCalculator } from '../WeekCalculator'

export default {
  setup() {
    const { subtractWeek, addWeek, weekString } = useWeekCalculator()

    return {
      addWeek,
      subtractWeek,
      weekString,
    }
  },
}
</script>
