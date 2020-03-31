import React from 'react'

export default function Fallback({ error }) {
  window.history.replaceState(null, 'reset', '/')
  localStorage.clear()
  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 pb-6 sm:p-0">
      <div className="absolute inset-0 bg-gray-500 opacity-75" />
      <div className="z-20 px-4 pt-5 pb-4 overflow-hidden bg-white rounded-lg shadow-xl sm:max-w-md sm:w-full sm:p-6">
        <div>
          <p className="mb-4 text-lg text-red-600">
            <strong>Oops! Ein fehler ist aufgetreten.</strong>
          </p>
          <p className="mb-4">
            <strong>Bitte laden Sie die Seite neu.</strong>
          </p>
          <p>
            <strong>Error:</strong> {error.toString()}
          </p>
        </div>
      </div>
    </div>
  )
}
