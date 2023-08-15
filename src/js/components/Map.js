import maplibre from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import React, { useRef } from "react"
import Map, { Layer, NavigationControl, Source } from "react-map-gl"
import { hotspots } from "./MapStyles"
import { initialViewState, styleEnum } from "./settings"
import { dateToUTC } from "./utils"

const hotspotURL = "./hawaii_hotspots_8.15.json"

function BaseMap({ currentEvent }) {
  const mapRef = useRef()
  // const latestTemp = stations && stations[stations.length - 1]

  function handleMapClick(event) {
    if (!event?.features || event.features.length === 0) return
    const data = event?.features[0]?.properties ?? null
    const coords = event?.features[0]?.geometry?.coordinates ?? []
    setPopupInfo({ ...data, lon: coords[0], lat: coords[1] })
  }

  const formattedDate = dateToUTC(currentEvent.date)

  return (
    <>
      <Map
        mapLib={maplibre}
        attributionControl={false}
        ref={mapRef}
        initialViewState={initialViewState}
        onClick={handleMapClick}
        interactiveLayerIds={["cities"]}
        mapStyle={`https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${styleEnum}?type=style&token=AAPK607d6ebb8ce04a1a9fc5e06c1b80cf4aoVSN2GntWaa8EnGF8MNnFz_3vax7S1HODpwDAlFvelNGDk8JIFYk_Db6OH9ccx-T`}
      >
        <Source id="hotspots" type="geojson" data={hotspotURL}>
          <Layer
            {...hotspots}
            filter={["<=", ["get", "acq_date"], formattedDate]}
          ></Layer>
        </Source>
        <NavigationControl position="bottom-right" />
      </Map>
    </>
  )
}

export default BaseMap
