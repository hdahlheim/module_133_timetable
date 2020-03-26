import React from 'react'
import { useDateCalc } from '../hooks'

export default function Navigation() {
  let { subtractWeek, addWeek, getWeekString } = useDateCalc()

  return (
    <div className="transition-opacity">
      <div className="mb-2">
        <div className="flex justify-between bg-gray-100 rounded shadow">
          <button
            onClick={() => subtractWeek()}
            className="w-1/3 px-4 py-3 bg-gray-100 rounded-l hover:bg-blue-500 hover:text-gray-100"
          >
            &lt;
          </button>
          <div className="inline-block p-3 bg-gray-100 select-none">
            {getWeekString}
          </div>
          <button
            onClick={() => addWeek()}
            className="w-1/3 px-4 py-3 bg-gray-100 rounded-r hover:bg-blue-500 hover:text-gray-100"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}
