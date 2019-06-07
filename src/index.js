import "./styles.css"
import { component, App, Box, Heading, Text, Link } from "./string-frame"
import { styled } from "./string-frame/style"
import { Info } from "./info-panel"

const BlueBox = styled(Box)`
  background-color: ${"error-color"};
  color: ${"warn-color"};
  padding: 20px 30px;
`

const Bold = styled(Text)`
  font-weight: bold;
`

const H1 = component((props, children) => {
  const style = `font-weight: bold;`
  return Heading({ level: 1, style, ...props })(["1. ", children])
})

const theme = {
  primaryColor: "#336699",
  "warn-color": "yellow",
  "error-color": "red",
  "info-color": "rgba(89, 186, 247, 1)",
  box: {
    padding: "20px 30px"
  }
}

App({ theme })([
  Heading({ level: 1 })("string-frame!"),
  BlueBox()(
    Text()([
      "We use Parcel to bundle this sandbox, you can find more info about Parcel ",
      Link({
        url: "https://parceljs.org",
        target: "_blank",
        rel: "noopener noreferrer",
        style: "color: inherit"
      })("here"),
      "."
    ])
  ),
  H1({ level: 2 })("Scott Kitchell"),
  Bold({ style: "color:red; font-size:20;" })("And more red text here."),
  Info({ title: "Info Panel" })("hi there")
])
