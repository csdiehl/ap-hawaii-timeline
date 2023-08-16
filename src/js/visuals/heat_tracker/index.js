import maplibre from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import React, { useEffect, useRef, useState } from "react"
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl"
import styled from "styled-components"
import Buttons from "../../components/Buttons"
import InfoBox from "../../components/InfoBox"
import Timeline from "../../components/Timeline"
import {
  BoxLayer,
  hotspots,
  mask,
  sirens,
  solarSiren,
} from "../../components/MapStyles"
import Pin from "../../components/Pin"
import {
  initialViewState,
  styleEnum,
  hotspotURL,
  eventsURL,
} from "../../components/settings"
import { dateToUTC } from "../../components/utils"
import bboxPolygon from "@turf/bbox-polygon"
import difference from "@turf/difference"
import sirensData from "./sirens.json"
import TitleBlock from "../../components/TitleBlock"

const Container = styled.div`
  height: 700px;
  width: 100%;
  position: relative;
`

const hawaiiArea = bboxPolygon([-163.419313, 15.774, -150.938845, 24.669716])

function HeatTracker() {
  const [timelineData, setTimelineData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [mapLoaded, setMapLoaded] = useState(false)

  const [zoomLevel, setZoomLevel] = useState(null)

  const containerRef = useRef()
  const mapRef = useRef()

  const event = timelineData && timelineData[currentIndex]
  const n = timelineData?.length
  const formattedDate = dateToUTC(event?.date)
  const boundingBox = event?.location && bboxPolygon(event.location)
  const maskedArea = boundingBox && difference(hawaiiArea, boundingBox)
  const showSirens = event && event.title.includes("siren")

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
    async function getData(url) {
      const res = await fetch(url)
      const json = await res.json()
      return json
    }

    getData(eventsURL).then((data) => setTimelineData(data))
  }, [])

  console.log("location", event?.location)

  return (
    <Container ref={containerRef}>
      {currentIndex < 0 && <TitleBlock advanceEvent={advanceEvent} />}
      {timelineData && (
        <>
          <InfoBox currentIndex={currentIndex} data={timelineData} />
          <Map
            onZoomEnd={(evt) => setZoomLevel(evt.viewState.zoom)}
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
                <Source id="sirens-data" type="geojson" data={sirensData}>
                  <Layer
                    {...sirens}
                    layout={{ visibility: showSirens ? "visible" : "none" }}
                  />
                  <Layer
                    {...solarSiren}
                    layout={{
                      visibility: event?.slide === 5 ? "visible" : "none",
                    }}
                    filter={["==", ["get", "Solar"], "YES"]}
                  />
                </Source>
                {currentIndex >= 0 && (
                  <>
                    <Marker latitude={event?.lat} longitude={event?.lng}>
                      <Pin show={event?.visual === "Map point"} />
                    </Marker>

                    <Source id="masked-area" type="geojson" data={maskedArea}>
                      <Layer
                        {...mask}
                        layout={{
                          visibility: event?.location ? "visible" : "none",
                        }}
                      />
                    </Source>

                    <Source id="bounding-box" type="geojson" data={boundingBox}>
                      <Layer
                        {...BoxLayer}
                        layout={{
                          visibility: event?.location ? "visible" : "none",
                        }}
                      />
                    </Source>
                  </>
                )}
              </>
            )}
            {window.innerWidth >= 425 && (
              <NavigationControl position="top-right" />
            )}
          </Map>
          <Buttons goForward={advanceEvent} goBack={goBack} />
          <Timeline index={currentIndex} nEvents={n} />
        </>
      )}
      <p>Zoom Level: {zoomLevel}</p>
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
