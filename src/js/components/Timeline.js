import React from "react"
import styled from "styled-components"
import { AbsolutePos } from "./mixins"

const dotStyles = `
 background: #fff;
border-radius: 50%;
`

const Container = styled.div`
  ${AbsolutePos};
  bottom: 0;
  left: 50%;
  width: 90%;
  margin: 16px auto;
  transform: translateX(-50%);
`

const Bar = styled.div`
  height: 2px;
  background: #fff;
  width: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Dot = styled.div`
  ${dotStyles}
  height: 8px;
  width: 8px;
`

const MainDot = styled.div`
  z-index: 2;
  height: 16px;
  width: 16px;
  position: absolute;
  left: ${(props) => props.translateBy}%;
  transform: translateX(-50%);
  transition: left 500ms ease-in-out;
  ${dotStyles};
`

const Timeline = ({ nEvents, index }) => {
  const translateBy = (100 / (nEvents - 1)) * index
  console.log(translateBy, index)
  return (
    <Container>
      <Bar>
        {[...Array(nEvents).keys()].map((d, i) => (
          <Dot key={i} />
        ))}
        <MainDot translateBy={translateBy} />
      </Bar>
    </Container>
  )
}

export default Timeline
