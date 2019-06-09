import "./styles.css"
import {
  start,
  component,
  App,
  Box,
  Heading,
  Text,
  Image,
  Link,
  run
} from "./string-frame"
import { styled } from "./string-frame/style"
import { Info } from "./info-panel"

const TREES_IMAGE =
  "https://i.pinimg.com/originals/be/28/16/be2816908ad816411ab84c2ccecf9ec6.jpg"

const BlueBox = styled(Box, {
  style: `
    background-color: #336699;
    color: white;
    padding: 20px 30px;
  `
})

const TreesImage = styled(Image, { source: TREES_IMAGE, width: "300" })

const Bold = styled(Text, { style: `font-weight: bold;` })

// const Bold = component((props, children) => {
//   console.log("Bold children:", children)
//   return Text({ style: [`font-weight: bold;`, props.style], name: "Text" })(
//     children
//   )
// })

const H1 = styled(Heading, {
  level: 1,
  style: `
    font-weight: bold;
    color: #ff33ff;
  `
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

const app = App({ theme })(
  Heading({ level: 1 })("string-frame!"),
  BlueBox()(
    Text()(
      "We use Parcel to bundle this sandbox, you can find more info about Parcel ",
      Link({
        url: "https://parceljs.org",
        target: "_blank",
        rel: "noopener noreferrer",
        style: "color: inherit"
      })("here"),
      "."
    )
  ),
  H1({ level: 2 })("Scott Kitchell"),
  TreesImage()(),
  Bold({ style: "color:red; font-size:20;" })("And more red text here."),
  Info({ title: "Info Panel" })("hi there")
)

start(app)
