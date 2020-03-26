import React from 'react'

function SelectForm({ name, value, onChange, options }) {
  return (
    <label className="block transition-opacity">
      <span className="font-semibold">{name}</span>
      <select
        className="block w-full shadow form-select"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
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

export default SelectForm
