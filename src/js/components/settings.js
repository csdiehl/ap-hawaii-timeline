import styled from "styled-components"

export const breakpoints = {
  mobile: "max-width: 425px",
  tablet: "max-width: 768px",
  desktop: "max-width: 1024px",
}

const s3Bucket =
  "https://s3.amazonaws.com/data.ap.org/west-maui-wildfires-timeline/"

export const hotspotURL = `${s3Bucket}hawaii_hotspots_8.15.json`
export const eventsURL = `${s3Bucket}visual-timeline.json`
export const sirensURL = `${s3Bucket}all-lahaina-outdoor-sirens.geojson`
export const satelliteDamageURL = `${s3Bucket}neighborhood-damage-fits-boundary-box.png`
export const finalImageURL = `${s3Bucket}overview-damage-zoomed-out.png`
export const roadsURL = `${s3Bucket}lahaina_roads.json`
export const barricadesURL = `${s3Bucket}blocks-and-barricades.geojson`
export const damageURL = `${s3Bucket}lahiana-damage-assessment.json`

export const slideTransitions = {
  orangeMarkers: [1],
  loadSirenData: [2, 4],
  shiftBBox: [2, 3, 8, 12],
  showSatellite: 5,
  showFinalImage: [-1, 14],
  showRoads: [1, 2, 5, 8, 9, 10, 14],
  showBarricades: 9,
}

export const initialViewState = {
  latitude: 20.880485,
  longitude: -156.676641,
  zoom: 14,
  bearing: 0,
  pitch: 0,
}

export const primaryColor = "#FF155D"
export const sirenColor = "#00AAE2"
export const fireColor = "#F9C16D"

const styleEnum = "c11ce4f7801740b2905eb03ddc963ac8"
//  "ef0fe5a4221944c090fb642fa80c83e7"

export const styleLink = `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${styleEnum}?type=style&token=AAPK607d6ebb8ce04a1a9fc5e06c1b80cf4aoVSN2GntWaa8EnGF8MNnFz_3vax7S1HODpwDAlFvelNGDk8JIFYk_Db6OH9ccx-T`
export const satelliteTileSource =
  "https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}.png"

//basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer

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

  @media (${breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  @media (${breakpoints.tablet}) {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
`

export const SubHeading = styled.h3`
  color: #fff;
  font-family: AP Var;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  margin: 0px 0px 5px;

  @media (${breakpoints.mobile}) {
    font-size: 0.875rem;
  }
`

export const Text = styled.h4`
  color: #fff;
  font-family: AP Var;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2rem;
  margin: 5px 0px 0px;
  text-shadow: 0 0 4px black;

  a {
    color: #fff;
    text-decoration: underline;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`

export const thisMonth = new Date().toLocaleString("default", { month: "long" })
