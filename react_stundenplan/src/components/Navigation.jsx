import React from 'react'
import { useDateCalc } from '../hooks'

export default function Navigation() {
  let { subtractWeek, addWeek, getWeekString } = useDateCalc()

  return (
    <div className="transition-opacity">
      <div className="flex items-center justify-center w-full p-4 mb-4">
        <div className="relative z-0 inline-flex shadow-sm">
          <button
            onClick={subtractWeek}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700"
          >
            &lt;
          </button>
          <div className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300">
            {getWeekString}
          </div>
          <button
            onClick={addWeek}
            className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}
