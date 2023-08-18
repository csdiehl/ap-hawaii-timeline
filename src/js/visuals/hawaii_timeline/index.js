import maplibre from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import React, { useRef, useState } from "react"
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl"
import styled from "styled-components"
import Buttons from "../../components/Buttons"
import InfoBox from "../../components/InfoBox"
import Timeline from "../../components/Timeline"
import {
  BoxLayer,
  barricades,
  damageLayer,
  highlightedRoads,
  hotspots,
  mask,
  roadLabels,
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
  slideTransitions,
  primaryColor,
  Text,
  finalImageURL,
  roadsURL,
  breakpoints,
  barricadesURL,
  sirenColor,
  damageURL,
} from "../../components/settings"
import { dateToUTC, getData } from "../../components/utils"
import bboxPolygon from "@turf/bbox-polygon"
import difference from "@turf/difference"
import TitleBlock from "../../components/TitleBlock"
import { AbsolutePos } from "../../components/mixins"
import useData from "../../components/useData"

const Container = styled.div`
  height: 720px;
  width: 100%;
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
  overflow: hidden;
`

const Credit = styled(Text)`
  ${AbsolutePos};
  left: 16px;
  bottom: 8px;
  font-size: 0.75rem;
  color: lightgrey;

  @media (${breakpoints.mobile}) {
    bottom: 4px;
  }
`

const hawaiiArea = bboxPolygon([-163.419313, 15.774, -150.938845, 24.669716])

function HeatTracker() {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const timelineStarted = currentIndex >= 0

  const timelineData = useData(eventsURL)
  const roads = useData(roadsURL, timelineStarted)

  //fetch sirens lazily
  const sirensData = useData(
    sirensURL,
    slideTransitions.loadSirenData.includes(currentIndex)
  )

  const [zoomLevel, setZoomLevel] = useState(null)

  const containerRef = useRef()
  const mapRef = useRef()

  const event = timelineData && timelineData[currentIndex]
  const n = timelineData?.length
  const formattedDate = dateToUTC(event?.date)
  const boundingBox = event?.location && bboxPolygon(event.location)
  const maskedArea = boundingBox && difference(hawaiiArea, boundingBox)
  const showSirens = event && event.what.includes("siren")

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
        speed: 0.5,
      })
    } else if (location) {
      const shiftPadding = slideTransitions.shiftBBox.includes(currentIndex),
        padLeft = window.innerWidth >= 600

      map.fitBounds(location, {
        padding: shiftPadding
          ? {
              left: padLeft ? 300 : 20,
              top: padLeft ? 20 : 200,
              right: 20,
              bottom: 20,
            }
          : 40,
        essential: true,
      })
    }
  }

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
            mapLib={maplibre}
            ref={mapRef}
            initialViewState={initialViewState}
            mapStyle={`https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${styleEnum}?type=style&token=AAPK607d6ebb8ce04a1a9fc5e06c1b80cf4aoVSN2GntWaa8EnGF8MNnFz_3vax7S1HODpwDAlFvelNGDk8JIFYk_Db6OH9ccx-T`}
          >
            <>
              {timelineStarted && (
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
                        visibility:
                          currentIndex >= slideTransitions.showSatellite &&
                          currentIndex < slideTransitions.showFinalImage
                            ? "visible"
                            : "none",
                      }}
                    />
                  </Source>

                  <Source
                    id="satellite-image-2"
                    type="image"
                    url={finalImageURL}
                    coordinates={[
                      [-156.691296337004, 20.9027787949499],
                      [-156.655481805856, 20.9027787949499],
                      [-156.655481805856, 20.8528030433481],
                      [-156.691296337004, 20.8528030433481],
                    ]}
                  >
                    <Layer
                      {...{
                        ...satelliteImage,
                        id: "satellite-image-layer-2",
                      }}
                      layout={{
                        visibility:
                          currentIndex >= slideTransitions.showFinalImage
                            ? "visible"
                            : "none",
                      }}
                    />
                  </Source>

                  <Source id="damage-data" type="geojson" data={damageURL}>
                    <Layer
                      {...damageLayer}
                      layout={{
                        visibility: currentIndex === 14 ? "visible" : "none",
                      }}
                    />
                  </Source>

                  <Source id="roads-data" type="geojson" data={roads}>
                    <Layer {...highlightedRoads} />
                    <Layer {...roadLabels} />
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

                  <Source id="hotspots" type="geojson" data={hotspotURL}>
                    <Layer
                      {...hotspots}
                      filter={["<=", ["get", "acq_date"], formattedDate]}
                      layout={{
                        visibility: currentIndex <= 13 ? "visible" : "none",
                      }}
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

                  <Source
                    id="barricades-data"
                    data={barricadesURL}
                    type="geojson"
                  >
                    <Layer
                      {...barricades}
                      layout={{
                        visibility:
                          currentIndex === slideTransitions.showBarricades
                            ? "visible"
                            : "none",
                      }}
                    />
                  </Source>

                  <Marker latitude={event?.lat} longitude={event?.lng}>
                    <Pin
                      color={
                        slideTransitions.orangeMarkers.includes(currentIndex)
                          ? primaryColor
                          : "#FFF"
                      }
                      show={
                        event?.visual === "Map point" ||
                        event?.category === "Eyewitness"
                      }
                    />
                  </Marker>

                  {event?.secondaryPoint && (
                    <Marker
                      latitude={event.secondaryPoint[0]}
                      longitude={event.secondaryPoint[1]}
                    >
                      <Pin
                        color={sirenColor}
                        show={
                          event?.visual === "Map point" ||
                          event?.category === "Eyewitness"
                        }
                      />
                    </Marker>
                  )}
                </>
              )}
            </>

            {window.innerWidth >= 425 && (
              <NavigationControl
                style={{ backgroundColor: "darkgrey" }}
                position="top-right"
              />
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
      <Credit>
        Graphic: Caleb Diehl, Chris Keller, Story: Rebecca Boone, Data: Maxar,
        ESRI, Vexcel Imaging US, Inc, built with Maplibre
      </Credit>
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
