import React from 'react'

export function SelectForm({ name, value, onChange, options }) {
  return (
    <label className="block">
      <span className="font-semibold">{name}</span>
      <select
        className="block w-full shadow form-select"
        value={value}
        onChange={onChange}
      >
        <option value="" hidden disabled>
          {name} wählen
        </option>
        {options.map((value, index) => (
          <option key={index} value={value[`${name.toLowerCase()}_id`]}>
            {value[`${name.toLowerCase()}_name`]}
          </option>
        ))}
      </select>
    </label>
  )
}
export default { SelectForm }
