<template>
  <SelectForm name="Klasse" :values="klassen" />
</template>

<script>
import SelectForm from './SelectForm'
import { getKlassen } from '../api'
import { ref } from 'vue'

export default {
  components: {
    SelectForm,
  },
  props: {
    job: String,
  },
  async setup(props) {
    let klassen = ref([])

    klassen.value = await getKlassen(props.job)

    return {
      klassen,
    }
  },
}
</script>
