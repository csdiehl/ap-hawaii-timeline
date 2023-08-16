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
import bboxPolygon from "@turf/bbox-polygon"

const Container = styled.div`
  height: 700px;
  width: 100%;
  position: relative;
`

const hotspotURL = "./hawaii_hotspots_8.15.json"
const eventsURL = "./visual-timeline_8.16.json"

function HeatTracker() {
  const [timelineData, setTimelineData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [mapLoaded, setMapLoaded] = useState(false)
  const containerRef = useRef()
  const mapRef = useRef()

  const event = timelineData && timelineData[currentIndex]
  const n = timelineData?.length
  const formattedDate = dateToUTC(event?.date)
  const boundingBox = event?.location && bboxPolygon(event.location)

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
    const { lat, lng, location, zoom } = timelineData[n]

    if (lat && lng) {
      map.flyTo({
        center: [lng, lat],
        zoom: zoom,
        essential: true,
      })
    } else if (location) {
      console.log(location)
      map.fitBounds(location, {
        padding: 40,
        essential: true,
      })
    }
  }

  useEffect(() => {
    async function getData() {
      const res = await fetch(eventsURL)
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
                {currentIndex >= 0 && (
                  <>
                    <Marker latitude={event?.lat} longitude={event?.lng}>
                      <Pin show={event?.visual === "Map point"} />
                    </Marker>

                    <Source id="bounding-box" type="geojson" data={boundingBox}>
                      <Layer {...BoxLayer} />
                    </Source>

                    <NavigationControl position="top-right" />
                  </>
                )}
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
