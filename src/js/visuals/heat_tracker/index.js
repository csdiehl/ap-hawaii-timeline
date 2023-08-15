import React, { useRef, useState } from "react"
import styled from "styled-components"
import BaseMap from "../../components/Map"
import { AbsolutePos, CardBackground } from "../../components/mixins"
import { Text, Title, breakpoints } from "../../components/settings"
import { mockData } from "./mock_data"
import Buttons from "../../components/Buttons"
import Timeline from "../../components/Timeline"

const Container = styled.div`
  height: 700px;
  width: 100%;
  position: relative;
`

const InfoBox = styled.div`
  ${AbsolutePos}
  top: 16px;
  left: 16px;
  ${CardBackground}

  @media(${breakpoints.mobile}) {
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

function HeatTracker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef()

  const event = mockData[currentIndex]
  const n = mockData.length

  return (
    <Container ref={containerRef}>
      <InfoBox>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title>Hawaii Fire Timeline</Title>
        </div>
        <Text>{formatDate(event.date)}</Text>
      </InfoBox>
      <BaseMap currentEvent={event} />
      <Buttons setCurrentIndex={setCurrentIndex} nEvents={n} />
      <Timeline index={currentIndex} nEvents={n} />
    </Container>
  )
}

HeatTracker.visual = {
  headline: "Heat Tracker",
  chatter: "",
  footerProps: { credit: "AP Data Team" },
}

HeatTracker.propTypes = {}

HeatTracker.defaultProps = {}

export default HeatTracker
