export const forceString = (items, joinChar = "") =>
  Array.isArray(items) ? items.join(joinChar) : items

export const isString = value =>
  typeof value === "string" || value instanceof String

export const isFunction = value => typeof value === "function"

export const zipTemplate = (templateArr, inputs, valueGetter) =>
  templateArr.map((item, i) => item + valueGetter(inputs[i] || "")).join("")
