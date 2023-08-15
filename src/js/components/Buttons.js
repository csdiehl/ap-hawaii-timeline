import React from "react"
import styled from "styled-components"
import { AbsolutePos } from "./mixins"

const Container = styled.div`
  ${AbsolutePos};
  top: 50%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`

const Button = styled.button`
  all: unset;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;
  transition: background 200ms ease-in;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:hover > img {
    transform: scale(1.2);
  }
`

const Arrow = styled.img`
  height: 48px;
  width: 48px;
  transition: transform 200ms linear;
`

const Buttons = ({ nEvents, setCurrentIndex }) => {
  function advanceEvent() {
    setCurrentIndex((prev) => (prev === nEvents - 1 ? 0 : prev + 1))
  }

  function goBack() {
    setCurrentIndex((prev) => (prev === 0 ? nEvents - 1 : prev - 1))
  }

  return (
    <Container>
      <Button onClick={goBack}>
        <Arrow alt="backward" src="./arrow-left.svg" />
      </Button>
      <Button onClick={advanceEvent}>
        <Arrow alt="forward" src="./arrow-right.svg" />
      </Button>
    </Container>
  )
}

export default Buttons
