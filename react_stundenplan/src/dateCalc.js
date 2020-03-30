import { useReducer } from 'react'

// react wrapper for week calc
export function useWeekCalculator(initialDate = null) {
  const date = initialDate ? new Date(initialDate) : new Date()
  const WEEK = 604800000
  const DAY = 86400000

  /**
   * Private Function for calculating the Week
   * @param {Date} date
   */
  const _getWeekAndYearString = date => {
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

  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        const nextWeek = new Date()
        nextWeek.setTime(state.date.getTime() + WEEK)
        return {
          date: nextWeek,
          weekString: _getWeekAndYearString(nextWeek),
        }
      case 'subtract':
        const previousWeek = new Date()
        previousWeek.setTime(state.date.getTime() - WEEK)
        return {
          date: previousWeek,
          weekString: _getWeekAndYearString(previousWeek),
        }
      default:
        break
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    date,
    weekString: _getWeekAndYearString(date),
  })

  return {
    getWeekString: state.weekString,
    addWeek() {
      dispatch({ type: 'add' })
    },
    subtractWeek() {
      dispatch({ type: 'subtract' })
    },
  }
}
