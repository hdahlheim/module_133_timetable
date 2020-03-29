<template>
  <label class="block">
    <span class="font-semibold">{{ $props.name }}</span>
    <select
      class="block w-full shadow form-select"
      :value="$props.modelValue"
      @input="e => $emit('update:modelValue', e.target.value)"
    >
      <option disabled :selected="$props.modelValue === ''">
        {{ $props.name }} wählen.
      </option>
      <option
        v-for="value in $props.values"
        :selected="
          $props.modelValue === value[`${$props.name.toLowerCase()}_id`]
        "
        :value="value[`${$props.name.toLowerCase()}_id`]"
        :key="value[`${$props.name.toLowerCase()}_id`]"
      >
        {{ value[`${$props.name.toLowerCase()}_name`] }}
      </option>
    </select>
  </label>
</template>
