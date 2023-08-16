import maplibre from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import React, { useRef, useEffect, useState } from "react"
import Map, { Layer, NavigationControl, Source, Marker } from "react-map-gl"
import { hotspots } from "./MapStyles"
import { initialViewState, styleEnum } from "./settings"
import { dateToUTC } from "./utils"
import PropTypes from "prop-types"
import Pin from "./Pin"

const hotspotURL = "./hawaii_hotspots_8.15.json"
function BaseMap({ currentEvent }) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef()
  const formattedDate = dateToUTC(currentEvent.date)

  const [prevSlide, setPrevSlide] = useState(null)

  useEffect(() => {
    const { current: map } = mapRef
    if (map && currentEvent && mapLoaded) {
      map.flyTo({
        center: [currentEvent.lng, currentEvent.lat],
        zoom: currentEvent.zoom,
        essential: true,
      })

      setPrevSlide(currentEvent.slide)
    }
  }, [currentEvent, mapLoaded, prevSlide])

  return (
    <>
      <Map
        onLoad={() => setMapLoaded(true)}
        mapLib={maplibre}
        attributionControl={false}
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle={`https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${styleEnum}?type=style&token=AAPK607d6ebb8ce04a1a9fc5e06c1b80cf4aoVSN2GntWaa8EnGF8MNnFz_3vax7S1HODpwDAlFvelNGDk8JIFYk_Db6OH9ccx-T`}
      >
        <Source id="hotspots" type="geojson" data={hotspotURL}>
          <Layer
            {...hotspots}
            filter={["<=", ["get", "acq_date"], formattedDate]}
          ></Layer>
        </Source>
        <Marker latitude={currentEvent.lat} longitude={currentEvent.lng}>
          <Pin show={currentEvent.visual === "Map point"} />
        </Marker>
        <NavigationControl position="top-right" />
      </Map>
    </>
  )
}

BaseMap.propTypes = {
  currentEvent: PropTypes.object,
}

export default BaseMap
