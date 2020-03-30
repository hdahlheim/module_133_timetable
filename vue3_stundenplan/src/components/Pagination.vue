<template>
  <div class="flex items-center justify-center w-full p-4 mb-4">
    <div class="relative z-0 inline-flex shadow-sm">
      <button
        class="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700"
        @click="subtractWeek"
      >
        Prev
      </button>
      <div
        class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300"
      >
        {{ weekString }}
      </div>
      <button
        class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700"
        @click="addWeek"
      >
        Next
      </button>
    </div>
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
