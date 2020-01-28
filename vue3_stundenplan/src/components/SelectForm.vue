<template>
  <label class="block">
    <span class="font-semibold">{{ name }}</span>
    <select
      class="block w-full shadow form-select"
      :value="$props.modelValue"
      @input="e => $emit('update:modelValue', e.target.value)"
    >
      <option disabled :selected="$props.modelValue === ''">
        {{ name }} wählen.
      </option>
      <option
        v-for="value in values"
        :selected="$props.modelValue === value[`${name.toLowerCase()}_id`]"
        :value="value[`${name.toLowerCase()}_id`]"
        :key="value[`${name.toLowerCase()}_id`]"
      >
        {{ value[`${name.toLowerCase()}_name`] }}
      </option>
    </select>
  </label>
</template>
