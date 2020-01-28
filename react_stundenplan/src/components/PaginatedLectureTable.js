import React, { useEffect, useState } from 'react'
import LectureTable from './LectureTable'
import { getZeitTafel } from '../api'

function PaginatedLectureTable({ schoolClass }) {
  let [schdual, setSchdual] = useState(null)

  useEffect(() => {
    if (schoolClass) {
      getZeitTafel(schoolClass).then(entries => setSchdual(entries))
    } else {
      setSchdual(null)
    }
  }, [schoolClass])

  return schdual ? <LectureTable schdual={schdual} /> : <div>Loading...</div>
}

export default PaginatedLectureTable
