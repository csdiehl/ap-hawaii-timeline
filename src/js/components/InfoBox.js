import React from "react"
import styled, { keyframes } from "styled-components"
import { AbsolutePos, CardBackground } from "./mixins"
import { Text, Title, breakpoints } from "./settings"

const slideUp = keyframes`
0% {
    opacity: 0;
    transform: translateY(10%);
}

100% {
    opacity: 1;
    transform: translateY(0%);
}
`

const Container = styled.div`
  ${AbsolutePos}
  top: 16px;
  left: 16px;
  ${CardBackground}
  max-width: 300px;
  text-wrap: balance;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: translateY(${(props) => (props.show ? "0%" : "10%")});
  transition: opacity 500ms ease-in-out
      ${(props) => (props.show ? "500ms" : "")},
    transform 500ms ease-in-out 500ms;

  @media (${breakpoints.mobile}) {
    top: 0;
    left: 0;
    width: 100%;
  }
`

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

const InfoBox = ({ data, currentIndex }) => {
  return (
    <>
      {data.map((d, i) => (
        <Container id="current-message" show={currentIndex === i} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title>A thing happened</Title>
          </div>
          <Text style={{ color: "lightgrey" }}>{formatDate(d.date)}</Text>
          <Text style={{ marginTop: "16px" }}>{d.what}</Text>
        </Container>
      ))}
    </>
  )
}

export default InfoBox
