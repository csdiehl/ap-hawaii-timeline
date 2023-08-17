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
    "line-width": 2,
    "line-dasharray": [2, 2],
    "line-color": primaryColor,
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
    "circle-color": "#FFF",
    "circle-stroke-opacity": 0.3,
    "circle-stroke-width": 0,
    "circle-stroke-color": "#FFF",
    "circle-radius": 14,
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
