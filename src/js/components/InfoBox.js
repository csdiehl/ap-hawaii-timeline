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
  animation: ${slideUp} 500ms ease-in;

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

const InfoBox = ({ date, text, currentIndex }) => {
  return (
    <Container key={currentIndex}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title>A thing happened</Title>
      </div>
      <Text style={{ color: "lightgrey" }}>{formatDate(date)}</Text>
      <Text style={{ marginTop: "16px" }}>{text}</Text>
    </Container>
  )
}

export default InfoBox
