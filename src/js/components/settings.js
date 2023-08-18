import styled from "styled-components"

const s3Bucket =
  "https://s3.amazonaws.com/data.ap.org/west-maui-wildfires-timeline/"

export const hotspotURL = `${s3Bucket}hawaii_hotspots_8.15.json`
export const eventsURL = `${s3Bucket}visual-timeline.json`
export const sirensURL = `${s3Bucket}all-lahaina-outdoor-sirens.geojson`
export const satelliteDamageURL = `${s3Bucket}neighborhood-damage-fits-boundary-box.png`
export const finalImageURL = `${s3Bucket}overview-damage-zoomed-out.png`
export const roadsURL = `${s3Bucket}lahaina_roads.json`

export const slideTransitions = {
  orangeMarkers: [1, 2],
  loadSirenData: [2, 4],
  shiftBBox: [2, 3, 8],
  showSatellite: 5,
  showFinalImage: 14,
  showBypassRoad: [2, 5, 9],
  showFrontSt: [8, 9, 10],
}

export const initialViewState = {
  latitude: 20.880485,
  longitude: -156.776641,
  zoom: 8,
  bearing: 0,
  pitch: 0,
}

export const primaryColor = "#F9C16D"

export const styleEnum = "ef0fe5a4221944c090fb642fa80c83e7"

// design system styles
export const Title = styled.h1`
  color: #000;
  font-family: AP Var;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem; /* 133.333% */
  color: #fff;
  margin: 0;
`

export const SubHeading = styled.h3`
  color: #fff;
  font-family: AP Var;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  margin: 0px 0px 5px;
`

export const Text = styled.h4`
  color: #fff;
  font-family: AP Var;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  margin: 5px 0px 0px;

  a {
    color: orange;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`

export const thisMonth = new Date().toLocaleString("default", { month: "long" })

export const breakpoints = {
  mobile: "max-width: 425px",
  tablet: "max-width: 768px",
  desktop: "max-width: 1024px",
}
