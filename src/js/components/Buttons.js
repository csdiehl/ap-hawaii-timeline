import React from "react"
import styled from "styled-components"
import { AbsolutePos } from "./mixins"
import PropTypes from "prop-types"
import { breakpoints } from "./settings"

const Container = styled.div`
  ${AbsolutePos};
  top: 50%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;

  @media (${breakpoints.mobile}) {
    top: 80%;
  }
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

const Buttons = ({ goForward, goBack, timelineStarted }) => {
  return (
    <Container>
      {
        <Button
          style={{ visibility: timelineStarted ? "visible" : "hidden" }}
          disabled={!timelineStarted}
          onClick={goBack}
        >
          <Arrow alt="backward" src="./arrow-left.svg" />
        </Button>
      }
      <Button onClick={goForward}>
        <Arrow alt="forward" src="./arrow-right.svg" />
      </Button>
    </Container>
  )
}

Buttons.propTypes = {
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  timelineStarted: PropTypes.bool,
}

export default Buttons
