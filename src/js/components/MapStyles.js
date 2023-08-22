import { primaryColor, sirenColor, fireColor } from "./settings"

const blueDotStyles = {
  "circle-color": sirenColor,
  "circle-stroke-opacity": 0.3,
  "circle-stroke-width": 10,
  "circle-stroke-color": sirenColor,
  "circle-radius": 4,
}

const damaged = "#FFF"

export const hotspots = {
  id: "hotspots-layer",
  source: "hotspots",
  type: "circle",
  paint: {
    "circle-color": fireColor,
    "circle-stroke-opacity": 0.3,
    "circle-stroke-width": 5,
    "circle-stroke-color": fireColor,
    "circle-radius": 2,
  },
}

export const BoxLayer = {
  id: "box-layer",
  source: "bounding-box",
  type: "line",
  paint: {
    "line-width": 1,
    "line-dasharray": [2, 2],
    "line-color": "lightgrey",
  },
}

export const sirens = {
  id: "sirens-layer",
  source: "sirens-data",
  type: "circle",
  paint: blueDotStyles,
}

export const solarSiren = {
  id: "sirens-layer-solar",
  source: "sirens-data",
  type: "circle",
  paint: {
    "circle-color": "transparent",
    "circle-stroke-opacity": 1,
    "circle-stroke-width": 2,
    "circle-stroke-color": sirenColor,
    "circle-radius": 20,
  },
}

export const mask = {
  id: "mask",
  source: "masked-area",
  type: "fill",
  paint: {
    "fill-color": "black",
    "fill-opacity": 0.3,
  },
}

export const satelliteImage = {
  id: "satellite-image-layer",
  source: "satellite-image",
  type: "raster",
  paint: {
    "raster-fade-duration": 500,
    "raster-opacity": 0.7,
    "raster-saturation": -0.5,
    "raster-contrast": 0.2,
  },
}

export const satelliteTileLayer = {
  id: "satellite-tile-layer",
  source: "satellite-tiles",
  type: "raster",
  paint: {
    "raster-fade-duration": 500,
    "raster-opacity": 0.5,
    "raster-saturation": -0.9,
    "raster-contrast": 0.5,
  },
}

export const highlightedRoads = {
  id: "roads-highlight-layer",
  source: "roads-data",
  type: "line",
  paint: {
    "line-color": "lightgrey",
    "line-width": 6,
  },
}

export const roadLabels = {
  id: "roads-highlight-layer-labels",
  source: "roads-data",
  type: "symbol",
  layout: {
    "symbol-placement": "line",
    "text-field": ["get", "name"],
    "text-font": ["Arial Regular"],
    "text-size": 16,
    "text-anchor": "center",
  },
  paint: {
    "text-color": "#FFF",
    "text-halo-color": "black",
    "text-halo-width": 2,
  },
}

export const barricades = {
  id: "barricades-layer",
  source: "barricades-data",
  type: "circle",
  paint: {
    ...blueDotStyles,
    "circle-color": sirenColor,
    "circle-stroke-color": sirenColor,
  },
}

export const damageLayer = {
  id: "damage-layer",
  source: "damage-data",
  type: "fill",
  paint: {
    "fill-opacity": 0.8,
    "fill-color": [
      "match",
      ["get", "DAMAGE_LEV"],
      "FEMA 0 / Minor",
      damaged,
      "FEMA 1 / Moderate",
      damaged,
      "FEMA 2 / Moderate",
      damaged,
      "FEMA 3 / Moderate",
      damaged,
      "FEMA 4 / Major",
      damaged,
      "FEMA 5 / Major",
      damaged,
      "FEMA 6 / Destroyed",
      primaryColor,
      "transparent",
    ],
  },
}
