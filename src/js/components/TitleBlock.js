import React from "react"
import styled from "styled-components"
import { CardBackground, AbsolutePos } from "./mixins"
import { SubHeading, Title, MainTitle, primaryColor } from "./settings"
import Pin from "./Pin"

const Container = styled.div`
  ${CardBackground}
  ${AbsolutePos}
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  text-wrap: balance;
  backdrop-filter: blur(2px);
`

const Button = styled.button`
  all: unset;
  cursor: pointer;
  color: ${primaryColor};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: rgba(255, 21, 93, 0.1);
  padding: 16px;
  border-radius: 5px;
`

const TitleBlock = ({ advanceEvent }) => {
  return (
    <Container>
      <MainTitle>How the Lahania Fire Unfolded</MainTitle>
      <Title>An interactive Timeline</Title>
      <Button onClick={() => advanceEvent()}>
        <Pin />
        <SubHeading style={{ color: primaryColor, fontWeight: "bold" }}>
          Click to Start
        </SubHeading>
      </Button>
    </Container>
  )
}

export default TitleBlock
