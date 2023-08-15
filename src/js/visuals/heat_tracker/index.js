import React, { useRef, useState } from "react"
import styled from "styled-components"
import BaseMap from "../../components/Map"
import { AbsolutePos, CardBackground } from "../../components/mixins"
import { Text, Title, breakpoints } from "../../components/settings"
import data from "./timeline-data.json"
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

  const event = data[currentIndex]
  const n = data.length
  const { date, lat, lng, zoom } = event
  const viewState = { latitude: lat, longitude: lng, zoom: zoom }

  console.log(event)

  return (
    <Container ref={containerRef}>
      <InfoBox>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title>Hawaii Fire Timeline</Title>
        </div>
        <Text>{formatDate(date)}</Text>
      </InfoBox>
      <BaseMap viewState={viewState} currentEvent={event} />
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
