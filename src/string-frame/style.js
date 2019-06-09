import { component } from "./index"
import { zipTemplate, isString, isFunction, expandStyleProp } from "./utils"

window.theme = {}

export const styled = (Component, getStyledProps) => {
  return component((props, children, context) => {
    const styledProps = isFunction(getStyledProps)
      ? getStyledProps(props, children, context)
      : getStyledProps

    const styleProp = expandStyleProp(styledProps, children, context)
    return Component({
      ...styledProps,
      style: [styleProp, props.style]
    })(children)
  })
}

export const zipCssTemplate = (cssArr, inputs, props, context) =>
  zipTemplate(cssArr, inputs, input => {
    let value = input
    if (isString(value) && window.theme[value]) value = window.theme[value]
    else if (isFunction(value)) value = value(props, context)
    return value
  })

export const css = (cssArr, ...inputs) => {
  return (props, children, context) => zipCssTemplate(cssArr, inputs, {}, {})
}
