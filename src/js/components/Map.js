import maplibre from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import React, { useRef, useEffect, useState } from "react"
import Map, { Layer, NavigationControl, Source, Marker } from "react-map-gl"
import { BoxLayer, hotspots } from "./MapStyles"
import { initialViewState, styleEnum } from "./settings"
import { dateToUTC } from "./utils"
import PropTypes from "prop-types"
import Pin from "./Pin"

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

const hotspotURL = "./hawaii_hotspots_8.15.json"
function BaseMap({ currentEvent }) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef()
  const formattedDate = dateToUTC(currentEvent.date)

  const [prevSlide, setPrevSlide] = useState(null)

  useEffect(() => {
    const { current: map } = mapRef
    if (map && currentEvent && mapLoaded) {
      console.log(currentEvent.slide, prevSlide)
      map.flyTo({
        center: [currentEvent.lng, currentEvent.lat],
        zoom: currentEvent.zoom,
        essential: true,
      })

      setPrevSlide(currentEvent.slide)
    }
  }, [currentEvent, mapLoaded, prevSlide])

  return (
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
          <Marker latitude={currentEvent.lat} longitude={currentEvent.lng}>
            <Pin show={currentEvent.visual === "Map point"} />
          </Marker>
          {currentEvent?.slide === 6 && (
            <Source id="bounding-box" type="geojson" data={Box}>
              <Layer {...BoxLayer} />
            </Source>
          )}
          <NavigationControl position="top-right" />
        </>
      )}
    </Map>
  )
}

BaseMap.propTypes = {
  currentEvent: PropTypes.object,
}

export default BaseMap
