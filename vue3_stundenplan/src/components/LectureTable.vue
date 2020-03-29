<template>
  <table v-if="lectures.length" class="w-full bg-gray-100 rounded shadow ">
    <thead class="h-12 border-b-2 rounded-t">
      <tr>
        <th class="px-4 text-left">Wochentag/Datum</th>
        <th class="px-2">Von</th>
        <th class="px-2">Bis</th>
        <th class="px-4 text-left">Fach</th>
        <th class="px-4 text-left">Lehrer</th>
        <th class="px-4 text-left">Zimmer</th>
        <th class="px-4 text-left">Bemerkung</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="h-12 text-sm border-b border-gray-200"
        v-for="lecture in lectures"
        :key="lecture.tafel_id"
      >
        <td class="px-4">
          {{ toHumanReadableDate(lecture.tafel_datum) }}
        </td>
        <td class="px-2 text-center">
          {{ toShortTime(lecture.tafel_von) }}
        </td>
        <td class="px-2 text-center">
          {{ toShortTime(lecture.tafel_bis) }}
        </td>
        <td class="px-4">
          {{ lecture.tafel_longfach }}
        </td>
        <td class="px-4">
          {{ lecture.tafel_lehrer }}
        </td>
        <td class="px-4">
          {{ lecture.tafel_raum }}
        </td>
        <td class="px-4">
          {{ lecture.tafel_kommentar }}
        </td>
      </tr>
    </tbody>
  </table>
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
    const toHumanReadableDate = date =>
      new Date(date).toLocaleDateString('de-CH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

    const toShortTime = time => time.slice(0, 5)

    return {
      lectures: props.lectures,
      toHumanReadableDate,
      toShortTime,
    }
  },
}
</script>
