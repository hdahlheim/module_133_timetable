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
    <tr className="h-12 text-sm border-b border-gray-200">
      <td className="px-4">{toHumanReadableDate(lecture.tafel_datum)}</td>
      <td className="px-2 text-center">{toShortTime(lecture.tafel_von)}</td>
      <td className="px-2 text-center">{toShortTime(lecture.tafel_bis)}</td>
      <td className="px-4">{lecture.tafel_longfach}</td>
      <td className="px-4">{lecture.tafel_lehrer}</td>
      <td className="px-4">{lecture.tafel_raum}</td>
      <td className="px-4">{lecture.tafel_kommentar}</td>
    </tr>
  )
}

export function LectureTable({ schdual }) {
  return (
    <table className="w-full bg-gray-100 rounded shadow">
      <thead className="border-4 border-transparent rounded-t">
        <tr className="">
          <th className="px-4 text-left">Wochentag/Datum</th>
          <th className="px-2">Von</th>
          <th className="px-2">Bis</th>
          <th className="px-4 text-left">Fach</th>
          <th className="px-4 text-left">Lehrer</th>
          <th className="px-4 text-left">Zimmer</th>
          <th className="px-4 text-left">Bemerkung</th>
        </tr>
      </thead>
      <tbody>
        {schdual.map((lecture, index) => (
          <LectureRow lecture={lecture} key={index} />
        ))}
      </tbody>
    </table>
  )
}

export default LectureTable
