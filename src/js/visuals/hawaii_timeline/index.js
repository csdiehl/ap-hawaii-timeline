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
  satelliteImage,
  sirens,
  solarSiren,
} from "../../components/MapStyles"
import Pin from "../../components/Pin"
import {
  initialViewState,
  styleEnum,
  hotspotURL,
  eventsURL,
  sirensURL,
  satelliteDamageURL,
} from "../../components/settings"
import { dateToUTC, getData } from "../../components/utils"
import bboxPolygon from "@turf/bbox-polygon"
import difference from "@turf/difference"
import TitleBlock from "../../components/TitleBlock"

const Container = styled.div`
  height: 700px;
  width: 100%;
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
`

const hawaiiArea = bboxPolygon([-163.419313, 15.774, -150.938845, 24.669716])

function HeatTracker() {
  const [timelineData, setTimelineData] = useState(null)
  const [sirensData, setSirensData] = useState(null)
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
  const timelineStarted = currentIndex >= 0

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

  const checkKey = (e) => {
    if (e.code == "ArrowLeft") {
      goBack()
    } else if (e.code == "ArrowRight") {
      advanceEvent()
    }
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
      map.fitBounds(location, {
        padding: 40,
        essential: true,
      })
    }
  }

  useEffect(() => {
    getData(eventsURL).then((data) => setTimelineData(data))
  }, [])

  //fetch sirens lazily
  useEffect(() => {
    if ((currentIndex === 2 || currentIndex === 4) && sirensData === null)
      getData(sirensURL).then((data) => setSirensData(data))
  }, [currentIndex, sirensData])

  return (
    <Container ref={containerRef} onKeyDown={(e) => checkKey(e)}>
      {currentIndex < 0 && <TitleBlock advanceEvent={advanceEvent} />}
      {timelineData && (
        <>
          <InfoBox currentIndex={currentIndex} data={timelineData} />

          <Map
            style={{ borderRadius: "5px" }}
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
                    <Source
                      id="satellite-image"
                      type="image"
                      url={satelliteDamageURL}
                      coordinates={[
                        [-156.678434814775, 20.8882317758389],
                        [-156.665923406183, 20.8882317758389],
                        [-156.665923406183, 20.8766726059343],
                        [-156.678434814775, 20.8766726059343],
                      ]}
                    >
                      <Layer
                        {...satelliteImage}
                        layout={{
                          visibility: currentIndex >= 5 ? "visible" : "none",
                        }}
                      />
                    </Source>

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

                    <Marker latitude={event?.lat} longitude={event?.lng}>
                      <Pin
                        show={
                          event?.visual === "Map point" ||
                          event?.category === "Eyewitness"
                        }
                      />
                    </Marker>
                  </>
                )}
              </>
            )}
            {window.innerWidth >= 425 && (
              <NavigationControl position="top-right" />
            )}
          </Map>
          <Buttons
            timelineStarted={timelineStarted}
            goForward={advanceEvent}
            goBack={goBack}
          />
          <Timeline index={currentIndex} nEvents={n} />
        </>
      )}
      <p>Zoom Level: {zoomLevel}</p>
    </Container>
  )
}

HeatTracker.visual = {
  chatter: "",
  footerProps: { credit: "AP Data Team" },
}

HeatTracker.propTypes = {}

HeatTracker.defaultProps = {}

export default HeatTracker
