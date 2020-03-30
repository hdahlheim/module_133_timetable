<template>
  <div class="flex flex-col" v-if="lectures.length">
    <div
      class="py-2 -my-2 overflow-x-auto rounded-lg sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div
        class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 rounded-lg shadow"
      >
        <table class="min-w-full">
          <thead class="">
            <tr>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
              >
                Wochentag/Datum
              </th>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
              >
                Von
              </th>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
              >
                Bis
              </th>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
              >
                Fach
              </th>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
              >
                Lehrer
              </th>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
              >
                Zimmer
              </th>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
              >
                Bemerkung
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              class="h-12 text-sm border-b border-gray-200"
              v-for="lecture in lectures"
              :key="lecture.tafel_id"
            >
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200"
              >
                {{ toHumanReadableDate(lecture.tafel_datum) }}
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-center text-gray-900 whitespace-no-wrap border-b border-gray-200"
              >
                {{ toShortTime(lecture.tafel_von) }}
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-center text-gray-900 whitespace-no-wrap border-b border-gray-200"
              >
                {{ toShortTime(lecture.tafel_bis) }}
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200"
              >
                {{ lecture.tafel_longfach }}
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200"
              >
                {{ lecture.tafel_lehrer }}
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200"
              >
                {{ lecture.tafel_raum }}
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap border-b border-gray-200"
              >
                {{ lecture.tafel_kommentar }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div v-else class="p-6 text-center bg-white rounded shadow">
    <p class="font-semibold font">
      No data for this week, there might be no school!
    </p>
  </div>
</template>

<script>
export default {
  props: {
    lectures: Array,
  },
  setup(props) {
    // generate nicer time string
    const toHumanReadableDate = date =>
      new Date(date).toLocaleDateString('de-CH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

    // trim trailing 00
    const toShortTime = time => time.slice(0, 5)

    return {
      lectures: props.lectures,
      toHumanReadableDate,
      toShortTime,
    }
  },
}
</script>
