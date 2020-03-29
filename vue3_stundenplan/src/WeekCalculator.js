import { inject, provide, reactive, computed, toRefs } from 'vue'

const WEEK = 604800000
const DAY = 86400000

/**
 * Private Function for calculating the Week
 * @param {Date} date
 */
function _getWeekAndYearString(date) {
  // Temporary date to prevent mutation
  const tempDate = new Date(date.valueOf())
  tempDate.setHours(0, 0, 0, 0)
  // Set to the nearest Thursday (current date + 4 - current day number)
  tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7))
  // Get first day of year
  const yearStart = new Date(tempDate.getFullYear(), 0, 1)
  // Calculate full weeks to nearest Thursday
  const weekNumber = Math.ceil(((tempDate - yearStart) / DAY + 1) / 7)
  // Return ISO week number and Year
  return `${weekNumber}-${yearStart.getFullYear()}`
}

export function createWeekCalculator(initialDate = null) {
  const date = initialDate ? new Date(initialDate) : new Date()
  const time = date.getTime()

  const state = reactive({
    date: time,
    weekString: computed(() => {
      return _getWeekAndYearString(new Date(state.date))
    }),
    subtractWeek() {
      const previousWeek = state.date - WEEK
      state.date = previousWeek
    },
    addWeek() {
      const nextWeek = state.date + WEEK
      state.date = nextWeek
    },
    reset() {
      state.date = new Date().getTime()
    },
  })

  return {
    ...toRefs(state),
  }
}

export const WeekCalculatorProvider = Symbol('WeekCalculatorProvider')

export function provideWeekCalculator() {
  const date = createWeekCalculator()
  provide(WeekCalculatorProvider, date)
}

export function useWeekCalculator() {
  return inject(WeekCalculatorProvider)
}
