import React, { Fragment } from 'react'
import Spacer from './components/Spacer'
import SelectForm from './components/SelectForm'
import {
  useJobs,
  useSchoolClass,
  useDateCalc,
  useSchdual,
  usePersistedState,
} from './hooks'
import { Transition } from './components/Transition'
import LectureTable from './components/LectureTable'
import Navigation from './components/Navigation'

function App() {
  // get presisted data
  let [selectedJob, setSelectedJob] = usePersistedState('jobId', true)
  let [selectedClass, setSelectedClass] = usePersistedState('classId')

  // get week
  let { getWeekString } = useDateCalc()

  // get data
  let { jobs: berufe, loading: loadingJobs } = useJobs()
  let { schoolClasses, loading: loadingClass } = useSchoolClass(selectedJob)
  let { schdual, loading: loadingSchdual } = useSchdual(
    selectedClass,
    getWeekString
  )

  // handel selects
  let handelSelect = event => {
    setSelectedClass('')
    setSelectedJob(event.target.value)
  }

  let handelClassSelect = event => {
    setSelectedClass(event.target.value)
  }

  return (
    <main className="h-screen bg-gray-200">
      <div className="container p-2 mx-auto md:p-10">
        <Transition
          enterFrom="opacity-0"
          enter="duration-300 ease-out"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leave="duration-200 ease-in"
          leaveTo="opacity-0"
          show={!loadingJobs}
        >
          <SelectForm
            value={selectedJob}
            name="Beruf"
            onChange={handelSelect}
            options={berufe}
          />
        </Transition>

        <Spacer />
        {selectedJob && (
          <Transition
            enterFrom="opacity-0"
            enter="duration-300 ease-out"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leave="duration-200 ease-in"
            leaveTo="opacity-0"
            show={!loadingClass}
          >
            <SelectForm
              value={selectedClass}
              key={selectedJob}
              name="Klasse"
              onChange={handelClassSelect}
              options={schoolClasses}
            />
          </Transition>
        )}

        {selectedClass && (
          <Fragment>
            <Spacer />
            <Transition
              enterFrom="opacity-0"
              enter="duration-300 ease-out"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leave="duration-200 ease-in"
              leaveTo="opacity-0"
              show={!!selectedClass}
            >
              <Navigation />
            </Transition>
            <Transition
              enterFrom="opacity-0"
              enter="duration-300 ease-out"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leave="duration-200 ease-in"
              leaveTo="opacity-0"
              show={!loadingSchdual}
            >
              <LectureTable schdual={schdual} />
            </Transition>
          </Fragment>
        )}
      </div>
    </main>
  )
}

export default App
