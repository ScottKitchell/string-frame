import { component } from "./index"
import { zipTemplate, isString, isFunction } from "./utils"

window.theme = {}

export const styled = Component => (cssArr, ...inputs) => {
  const css = zipCssTemplate(cssArr, inputs)

  return component((props, children) =>
    Component({ style: [css, props.style] })(children)
  )
}

export const zipCssTemplate = (cssArr, inputs) =>
  zipTemplate(cssArr, inputs, input => {
    let value = input
    if (isString(value) && window.theme[value]) value = window.theme[value]
    else if (isFunction(value)) value = value(window.theme)
    return value
  })

export const css = (cssArr, ...inputs) => zipCssTemplate(cssArr, inputs)
