import styled from "styled-components"

export const initialViewState = {
  latitude: 20,
  longitude: -157,
  zoom: 7,
  bearing: 0,
  pitch: 0,
}

export const colors = [
  "#006788",
  "#00ABE2",
  "#CCEEF9",
  "#FCD6D9",
  "#EF3340",
  "#992129",
]

export const citySizes = [2, 5, 10, 15]

export const styleEnum = "ef0fe5a4221944c090fb642fa80c83e7"

//  "42410a35dc9445eeb65d10da1a5f62f0"

export const citiesLink =
  "https://s3.amazonaws.com/data.ap.org/projects/2023/cfs/data/processed/cities_stations.json"

export const tempsLink =
  "https://s3.amazonaws.com/data.ap.org/projects/2023/cfs/data/processed/latest_station_temps.json"

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
`

export const thisMonth = new Date().toLocaleString("default", { month: "long" })

export const breakpoints = {
  mobile: "max-width: 425px",
  tablet: "max-width: 768px",
  desktop: "max-width: 1024px",
}
