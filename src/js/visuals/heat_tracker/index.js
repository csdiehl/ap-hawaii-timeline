import maplibre from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import React, { useEffect, useRef, useState } from "react"
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl"
import styled from "styled-components"
import Buttons from "../../components/Buttons"
import InfoBox from "../../components/InfoBox"
import Timeline from "../../components/Timeline"
import { BoxLayer, hotspots } from "../../components/MapStyles"
import Pin from "../../components/Pin"
import { initialViewState, styleEnum } from "../../components/settings"
import { dateToUTC } from "../../components/utils"

const Container = styled.div`
  height: 700px;
  width: 100%;
  position: relative;
`

const hotspotURL = "./hawaii_hotspots_8.15.json"

const Box = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [-156.66231252427346, 20.831433234532707],
        [-156.63863255928243, 20.831433234532707],
        [-156.63863255928243, 20.860437663285378],
        [-156.66231252427346, 20.860437663285378],
        [-156.66231252427346, 20.831433234532707],
      ],
    ],
  },
}

function HeatTracker() {
  const [timelineData, setTimelineData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mapLoaded, setMapLoaded] = useState(false)
  const containerRef = useRef()
  const mapRef = useRef()

  const event = timelineData && timelineData[currentIndex]
  const n = timelineData?.length
  const formattedDate = dateToUTC(event?.date)

  function advanceEvent() {
    setCurrentIndex((prev) => {
      const newIndex = prev === n - 1 ? 0 : prev + 1
      transitionMap(newIndex)
      return newIndex
    })
  }

  function goBack() {
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? n - 1 : prev - 1
      transitionMap(newIndex)
      return newIndex
    })
  }

  function transitionMap(n) {
    const { current: map } = mapRef
    if (!map || !timelineData) return
    const event = timelineData[n]

    map.flyTo({
      center: [event.lng, event.lat],
      zoom: event.zoom,
      essential: true,
    })
  }

  useEffect(() => {
    async function getData() {
      const res = await fetch("./timeline-data.json")
      const json = await res.json()
      return json
    }

    getData().then((data) => setTimelineData(data))
  }, [])

  return (
    <Container ref={containerRef}>
      {timelineData && (
        <>
          <InfoBox currentIndex={currentIndex} data={timelineData} />
          <Map
            attributionControl={false}
            onLoad={() => setMapLoaded(true)}
            mapLib={maplibre}
            ref={mapRef}
            initialViewState={initialViewState}
            mapStyle={`https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${styleEnum}?type=style&token=AAPK607d6ebb8ce04a1a9fc5e06c1b80cf4aoVSN2GntWaa8EnGF8MNnFz_3vax7S1HODpwDAlFvelNGDk8JIFYk_Db6OH9ccx-T`}
          >
            {mapLoaded && (
              <>
                <Source id="hotspots" type="geojson" data={hotspotURL}>
                  <Layer
                    {...hotspots}
                    filter={["<=", ["get", "acq_date"], formattedDate]}
                  ></Layer>
                </Source>
                <Marker latitude={event.lat} longitude={event.lng}>
                  <Pin show={event.visual === "Map point"} />
                </Marker>
                {event?.slide === 6 && (
                  <Source id="bounding-box" type="geojson" data={Box}>
                    <Layer {...BoxLayer} />
                  </Source>
                )}
                <NavigationControl position="top-right" />
              </>
            )}
          </Map>
          <Buttons goForward={advanceEvent} goBack={goBack} />
          <Timeline index={currentIndex} nEvents={n} />
        </>
      )}
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
