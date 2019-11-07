import styled from "styled-components";
import defaultImg from "../images/room-1.jpeg";

const StylesHero = styled.header`
  //   min-height: calc(100vh - 66px);
  min-height: 60vh;
  background: url(${props => props.img}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StylesHero;
