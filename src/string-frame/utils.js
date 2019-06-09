export const isString = value =>
  typeof value === "string" || value instanceof String

export const isFunction = value => typeof value === "function"

export const isArray = value => Array.isArray(value)

export const zipTemplate = (templateArr, inputs, valueGetter) =>
  templateArr.map((item, i) => item + valueGetter(inputs[i] || "")).join("")

export const deepClone = obj => JSON.parse(JSON.stringify(obj))

export const expandProps = (props, children, context, mappings = {}) => {
  // The style prop can be represented in many different ways so must
  // be expanded beofre it's strinfied.
  if (props.style) props.style = expandStyleProp(props, children, context)

  return Object.entries(props)
    .map(([key, value]) => `${mappings[key] || key}="${value}"`)
    .join(" ")
}

export const expandStyleProp = (props, children, context) => {
  if (!props.style) return ""

  if (isString(props.style)) return props.style

  // When `css` func is used, we have to call it
  if (isFunction(props.style)) return props.style(props, children, context)

  // When styles are combined, we have to expand each and merge them
  if (isArray(props.style))
    return props.style
      .map(style => expandStyleProp({ ...props, style }, children, context))
      .join(";")

  // When styles is an object, we have to merge each item
  return Object.entries(props.style)
    .map(([cssKey, cssValue]) => `${cssKey}:"${cssValue}"`)
    .join(";")
}

const tagsToReplace = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
}

export const escapeHtml = htmlStr =>
  htmlStr.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag)
