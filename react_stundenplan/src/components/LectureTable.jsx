import React from 'react'

export function LectureRow({ lecture }) {
  const toHumanReadableDate = date =>
    new Date(date).toLocaleDateString('de-CH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  const toShortTime = time => time.slice(0, 5)

  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200">
        {toHumanReadableDate(lecture.tafel_datum)}
      </td>
      <td className="px-6 py-4 text-sm font-medium leading-5 text-center text-gray-900 whitespace-no-wrap border-b border-gray-200">
        {toShortTime(lecture.tafel_von)}
      </td>
      <td className="px-6 py-4 text-sm font-medium leading-5 text-center text-gray-900 whitespace-no-wrap border-b border-gray-200">
        {toShortTime(lecture.tafel_bis)}
      </td>
      <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200">
        {lecture.tafel_longfach}
      </td>
      <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200">
        {lecture.tafel_lehrer}
      </td>
      <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200">
        {lecture.tafel_raum}
      </td>
      <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200">
        {lecture.tafel_kommentar}
      </td>
    </tr>
  )
}

function TableHeader(params) {
  return (
    <thead className="h-12 border-b-2 rounded-t">
      <tr>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
          Wochentag/Datum
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
          Von
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
          Bis
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
          Fach
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
          Lehrer
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
          Zimmer
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
          Bemerkung
        </th>
      </tr>
    </thead>
  )
}

export function LectureTable({ schdual }) {
  if (!schdual.length)
    return (
      <div className="w-full max-w-md mx-auto transition-opacity bg-gray-100 rounded shadow">
        <p className="p-8 font-semibold text-center">
          Keine Daten verfügbar! Wahrscheinlich findet in dieser Woche kein
          Unterricht statt.
        </p>
      </div>
    )

  return (
    <div className="flex flex-col">
      <div className="py-2 -my-2 overflow-x-auto rounded-lg sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 rounded-lg shadow">
          <table className="min-w-full">
            <TableHeader />
            <tbody className="bg-white">
              {schdual.map((lecture, index) => (
                <LectureRow lecture={lecture} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LectureTable
