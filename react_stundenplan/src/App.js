import React, { useState, useEffect, Fragment } from 'react'
import { getBerufe, getKlassen, getZeitTafel } from './api'
import LectureTable from './LectureTable'
import { SelectForm } from './SelectForm'

function Spacer() {
  return (
    <div className="hidden sm:block">
      <div className="py-5">
        <hr className="h-px text-gray-500" />
      </div>
    </div>
  )
}

function useRestorFromUrl(setJob, setClass) {
  let savedSelect =
    localStorage.getItem('savedSelect') || window.location.hash.slice(1)
  let [urlJob, urlklasse] = atob(savedSelect).split('-')
  if (urlJob && urlklasse) {
    return [urlJob, urlklasse]
  }
  return ['', '']
}

function useSaveInUrl(job, klasse) {
  useEffect(() => {
    if (job !== '' && klasse !== '') {
      let savedSelect = btoa(`${job}-${klasse}`)
      window.location.hash = savedSelect
      localStorage.setItem('savedSelect', savedSelect)
    } else {
      window.location.hash = ''
      localStorage.removeItem('savedSelect')
    }
  }, [job, klasse])
}

function App() {
  let [savedJob, savedClass] = useRestorFromUrl()
  let [berufe, setBerufe] = useState([])
  let [schoolClasses, setSchoolClasses] = useState([])
  let [selectedJob, setSelectedJob] = useState(savedJob)
  let [selectedClass, setSelectedClass] = useState(savedClass)
  let [schdual, setSchdual] = useState(null)

  useEffect(() => {
    getBerufe().then(berufe => setBerufe(berufe))
  }, [])

  useSaveInUrl(selectedJob, selectedClass)

  useEffect(() => {
    if (selectedJob) {
      getKlassen(selectedJob).then(schoolClasses => {
        setSchoolClasses(schoolClasses)
      })
    }
  }, [selectedJob])

  useEffect(() => {
    if (selectedClass) {
      getZeitTafel(selectedClass).then(entries => setSchdual(entries))
    } else {
      setSchdual(null)
    }
  }, [selectedClass])

  /**
   * @param {{ target: { value: React.SetStateAction<string>; }; }} event
   */
  let handelSelect = event => {
    setSelectedJob(event.target.value)
  }

  /**
   * @param {{ target: { value: React.SetStateAction<string>; }; }} event
   */
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
        {schdual && (
          <Fragment>
            <Spacer />
            <LectureTable key={selectedClass} schdual={schdual} />
          </Fragment>
        )}
      </div>
    </main>
  )
}

export default App
