import { createGlobalStyle } from "styled-components";

export const ResetCSS = createGlobalStyle`
::before,
::after{
  box-sizing: border-box;
  border-style:solid;
  border-width:0;
}
`