/** string-frame */

import {
  isFunction,
  isArray,
  isString,
  deepClone,
  expandProps,
  escapeHtml
} from "./utils"

export const start = app => app()

const childrenToString = (children, context) => {
  if (!children) return ""
  if (isString(children)) return children
  if (isFunction(children)) {
    return childrenToString(children(context))
  }
  if (isArray(children)) {
    return children.map(child => childrenToString(child, context)).join("")
  }
  return children
}

/**
 * component takes props, and then children and returns a string, a component,
 * or an array of string/components/arrays.
 * @param {*} render
 */
export const component = render => (props = {}) => (...children) => context => {
  return render(props, children, context)
}

export const Info = component(({ title, ...props }, children) => {
  return Box()(Text(props)(title), children)
})

const primativeComponentFactory = (htmlTag, propsMapping) =>
  component(htmlAsChildren(htmlTag, propsMapping))

const htmlAsChildren = (htmlTag, propsMapping) => (
  props,
  children,
  context
) => [
  `<${htmlTag} ${expandProps(props, children, context, propsMapping)}>`,
  children,
  `</${htmlTag}>`
]

// Primative components
export const App = component((props, children) => {
  const context = { theme: props.theme }
  let _children = childrenToString(children, context)
  _children = `<div style="padding:5px;background-color:#ddd"><code>${escapeHtml(
    _children
  )}</code></div>
  ${_children}
  `
  document.getElementById(props.id || "app").innerHTML = _children
})

export const Box = primativeComponentFactory("div")

export const Text = component(({ inline, ...props }, children, context) => {
  const htmlTag = inline ? "span" : "p"
  return htmlAsChildren(htmlTag)(props, children, context)
})

export const Heading = component((props, children, context) => {
  const htmlTag = `h${props.level}`
  return htmlAsChildren(htmlTag)(props, children, context)
})

const linkPropsMapping = { url: "href" }
export const Link = primativeComponentFactory("a", linkPropsMapping)

const imagePropsMapping = { source: "src" }
export const Image = primativeComponentFactory("img", imagePropsMapping)
