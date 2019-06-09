import { component, Box, Text } from "./string-frame"
import { styled, css } from "./string-frame/style"

const baseStyle = css`
  border-radius: 6px;
  border: 2px solid rgba(89, 186, 247, 1);
  background-color: rgba(89, 186, 247, 0.3);
  color: #333;
  padding: 18px 20px;
  margin: 10px 0px;
`

const InfoBox = styled(Box, (props, children, context) => ({
  style: [
    baseStyle,
    {
      // border: `2px solid ${context.theme["info-color"]}`,
      border: `2px solid rgba(89, 186, 247, 1)`,
      "background-color": "rgba(89, 186, 247, 0.3)",
      padding: "18px 20px",
      margin: "10px 0px"
    }
  ]
}))

const testStyle = css`
    ${baseStyle}
    border: 2px solid ${"info-color"};
    background-color: rgba(89, 186, 247, 0.3);
    padding: 18px 20px;
    margin: 10px 0px;
  `

const TestBox = styled(Box, props => ({ style: testStyle }))

const InfoTitle = styled(Text, props => ({
  inline: true,
  style: css`
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
    color: rgba(89, 186, 247, 1);
  `
}))

export const Info = component(({ title, ...props }, children) => {
  return InfoBox()(InfoTitle(props)(title), children)
})
