import React, { useState, useEffect, Fragment } from 'react'
import { getBerufe, getKlassen } from './api'
import Spacer from './components/Spacer'
import SelectForm from './components/SelectForm'
import PaginatedLectureTable from './components/PaginatedLectureTable'
import { useRestorFromUrl, useSaveInUrl } from './hooks'

function App() {
  let [savedJob, savedClass] = useRestorFromUrl()
  let [berufe, setBerufe] = useState([])
  let [schoolClasses, setSchoolClasses] = useState([])
  let [selectedJob, setSelectedJob] = useState(savedJob)
  let [selectedClass, setSelectedClass] = useState(savedClass)
  useSaveInUrl(selectedJob, selectedClass)

  useEffect(() => {
    getBerufe().then(berufe => setBerufe(berufe))
  }, [])

  useEffect(() => {
    if (selectedJob) {
      getKlassen(selectedJob).then(schoolClasses => {
        setSchoolClasses(schoolClasses)
      })
    }
  }, [selectedJob])

  let handelSelect = event => {
    setSelectedClass('')
    setSelectedJob(event.target.value)
  }

  let handelClassSelect = event => {
    setSelectedClass(event.target.value)
  }

  return (
    <main className="h-screen bg-gray-200">
      <div className="container p-10 mx-auto">
        <SelectForm
          value={selectedJob}
          name="Beruf"
          onChange={handelSelect}
          options={berufe}
        />

        {schoolClasses.length > 0 && (
          <Fragment>
            <Spacer />
            <SelectForm
              value={selectedClass}
              key={selectedJob}
              name="Klasse"
              onChange={handelClassSelect}
              options={schoolClasses}
            />
          </Fragment>
        )}

        {selectedClass && (
          <Fragment>
            <Spacer />
            <PaginatedLectureTable
              key={selectedClass}
              schoolClass={selectedClass}
            />
          </Fragment>
        )}
      </div>
    </main>
  )
}

export default App
