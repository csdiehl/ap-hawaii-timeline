import React from "react"
import styled from "styled-components"
import { CardBackground, AbsolutePos } from "./mixins"
import { SubHeading, Title, Text } from "./settings"
import Pin from "./Pin"

const Container = styled.div`
  ${CardBackground}
  ${AbsolutePos}
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  text-wrap: balance;
`

const Button = styled.button`
  all: unset;
  cursor: pointer;
  color: lightgrey;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 5px;
`

const TitleBlock = ({ advanceEvent }) => {
  return (
    <Container>
      <Title>How the Lahania Fire Unfolded</Title>
      <SubHeading>An interactive Timeline</SubHeading>
      <Button onClick={() => advanceEvent()}>
        <Pin />
        <Text>Click to Start</Text>
      </Button>
    </Container>
  )
}

export default TitleBlock
