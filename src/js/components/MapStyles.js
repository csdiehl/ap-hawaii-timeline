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
    "circle-color": "blue",
    "circle-stroke-opacity": 0.3,
    "circle-stroke-width": 10,
    "circle-stroke-color": "blue",
    "circle-radius": 4,
  },
}
