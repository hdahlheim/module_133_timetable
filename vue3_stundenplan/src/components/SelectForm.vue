<template>
  <label class="block">
    <span class="font-semibold">{{ $props.name }}</span>
    <select
      class="block w-full shadow form-select"
      @input="e => $emit('update', e.target.value)"
    >
      <option disabled :selected="$props.value === ''">
        {{ $props.name }} wählen.
      </option>
      <option
        v-for="value in $props.values"
        :selected="$props.value === value[`${$props.name.toLowerCase()}_id`]"
        :value="value[`${$props.name.toLowerCase()}_id`]"
        :key="value[`${$props.name.toLowerCase()}_id`]"
      >
        {{ value[`${$props.name.toLowerCase()}_name`] }}
      </option>
    </select>
  </label>
</template>
