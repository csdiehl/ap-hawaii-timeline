import { primaryColor } from "./settings"

export const hotspots = {
  id: "hotspots-layer",
  source: "hotspots",
  type: "circle",
  paint: {
    "circle-color": primaryColor,
    "circle-stroke-opacity": 0.3,
    "circle-stroke-width": 5,
    "circle-stroke-color": primaryColor,
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
    "line-color": "#FFF",
  },
}

export const sirens = {
  id: "sirens-layer",
  source: "sirens-data",
  type: "circle",
  paint: {
    "circle-color": "red",
    "circle-stroke-opacity": 0.3,
    "circle-stroke-width": 10,
    "circle-stroke-color": "red",
    "circle-radius": 4,
  },
}

export const solarSiren = {
  id: "sirens-layer-solar",
  source: "sirens-data",
  type: "circle",
  paint: {
    "circle-color": primaryColor,
    "circle-stroke-opacity": 0.3,
    "circle-stroke-width": 10,
    "circle-stroke-color": primaryColor,
    "circle-radius": 5,
  },
}

export const mask = {
  id: "mask",
  source: "masked-area",
  type: "fill",
  paint: {
    "fill-color": "black",
    "fill-opacity": 0.5,
  },
}

export const satelliteImage = {
  id: "satellite-image-layer",
  source: "satellite-image",
  type: "raster",
  paint: {
    "raster-fade-duration": 500,
    "raster-opacity": 0.7,
  },
}

export const highlightedRoads = {
  id: "roads-highlight-layer",
  source: "roads-data",
  type: "line",
  paint: {
    "line-color": primaryColor,
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
    "text-color": primaryColor,
    "text-halo-color": "black",
    "text-halo-width": 2,
  },
}
