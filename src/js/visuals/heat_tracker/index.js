import React, { useRef, useState } from "react"
import styled from "styled-components"
import Buttons from "../../components/Buttons"
import BaseMap from "../../components/Map"
import Timeline from "../../components/Timeline"
import data from "./timeline-data.json"
import InfoBox from "../../components/InfoBox"

const Container = styled.div`
  height: 700px;
  width: 100%;
  position: relative;
`

function HeatTracker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef()

  const event = data[currentIndex]
  const n = data.length
  const { date, lat, lng, zoom, what } = event
  const viewState = { latitude: lat, longitude: lng, zoom: zoom }

  console.log(event)

  return (
    <Container ref={containerRef}>
      <InfoBox currentIndex={currentIndex} date={date} text={what} />
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
