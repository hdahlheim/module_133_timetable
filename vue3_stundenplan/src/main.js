import { createApp } from 'vue'
import AppView from './App.vue'
import { WeekCalculatorProvider, createWeekCalculator } from './WeekCalculator'

const weekCalc = createWeekCalculator()

const app = createApp()
app.provide(WeekCalculatorProvider, weekCalc)
app.mount(AppView, '#app')
