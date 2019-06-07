import { component, Box, Text } from "./string-frame"
import { styled, css } from "./string-frame/style"

const baseStyle = css`
  border-radius: 4px;
  border: 2px solid rgba(89, 186, 247, 1);
  background-color: rgba(89, 186, 247, 0.3);
  color: #333;
  padding: 18px 20px;
  margin: 10px 0px;
`

const InfoBox = styled(Box)`
  ${baseStyle}
  border: 2px solid ${"info-color"};
  background-color: rgba(89, 186, 247, 0.3);
  color: ${"error-color"};
  padding: 18px 20px;
  margin: 10px 0px;
`

const InfoTitle = styled(Text)`
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  color: rgba(89, 186, 247, 1);
`

export const Info = component(({ title, ...props }, children) => {
  return InfoBox()([InfoTitle(props)(title), children])
})
