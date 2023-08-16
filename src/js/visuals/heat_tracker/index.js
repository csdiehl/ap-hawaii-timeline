import React, { useRef, useState, useEffect } from "react"
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
  const [timelineData, setTimelineData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef()

  const event = timelineData && timelineData[currentIndex]
  const n = timelineData?.length

  useEffect(() => {
    async function getData() {
      const res = await fetch("./timeline-data.json")
      const json = await res.json()
      return json
    }

    getData.then((data) => setTimelineData(data))
  }, [])

  return (
    <Container ref={containerRef}>
      <InfoBox currentIndex={currentIndex} data={data} />
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
