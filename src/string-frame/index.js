/** string-frame */

import { forceString } from "./utils"

export const component = render => (props = {}) => children => {
  const childrenString = forceString(children)
  const rendered = render(props, childrenString)
  return forceString(rendered)
}

const expandProps = (props, mappings = {}) => {
  props.style = forceString(props.style, ";")
  return Object.entries(props)
    .map(([key, value]) => `${mappings[key] || key}="${value}"`)
    .join(" ")
}

// Primative components
export const App = component((props, children) => {
  window.theme = props.theme
  document.getElementById(props.id || "app").innerHTML = children
})

export const Box = component((props, children) => {
  return `<div ${expandProps(props)}>${children}</div>`
})

export const Text = component((props, children) => {
  return `<span ${expandProps(props)}>${children}</span>`
})

export const Heading = component((props, children) => {
  const h = `h${props.level}`
  return `<${h} ${expandProps(props)}>${children}</${h}>`
})

export const Link = component((props, children) => {
  const propsMapping = { url: "href" }
  return `<a ${expandProps(props, propsMapping)}>${children}</a>`
})
