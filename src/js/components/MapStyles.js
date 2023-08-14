import { colors, citySizes } from "./settings"

const colorScale = [
  "step",
  ["get", "diff"],
  colors[0],
  -10,
  colors[1],
  -5,
  colors[2],
  0,
  colors[3],
  5,
  colors[4],
  10,
  colors[5],
]

export const cities = {
  id: "cities",
  source: "city-data",
  type: "circle",
  paint: {
    "circle-color": colorScale,
    "circle-opacity": 0.3,
    "circle-stroke-width": 1,
    "circle-stroke-color": colorScale,
    "circle-radius": [
      "step",
      ["get", "pop"],
      citySizes[0],
      10_000,
      citySizes[1],
      100_000,
      citySizes[2],
      1_000_000,
      citySizes[3],
    ],
  },
}

export const clusteredCities = {
  id: "clusters",
  type: "circle",
  source: "cities",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["/", ["get", "avg_diff"], ["get", "point_count"]],
      colors[0],
      -10,
      colors[1],
      -5,
      colors[2],
      0,
      colors[3],
      5,
      colors[4],
      10,
      colors[5],
    ],
    "circle-radius": ["step", ["get", "point_count"], 10, 100, 15, 750, 20],
  },
}

export const clusterCounts = {
  id: "cluster-count",
  type: "symbol",
  source: "cities",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["Arial Regular"],
    "text-size": 12,
  },
  paint: {
    "text-color": "#000",
  },
}
