import * as React from "react"
import styled, { keyframes } from "styled-components"

const pulse1 = keyframes`
0% {
		opacity: .1;
		transform: scale(0);
	}

	30% {
		opacity: 1;
		transform: scale(1.5);
	}

	60% {
		opacity: 1;
		transform: scale(2);
	}

	100% {
		opacity: .1;
		transform: scale(2);
	}
`

const pulse2 = keyframes`
0% {
		transform: scale(1, 1);
		opacity: .1;
	}

	50% {
	    opacity: .5;
	}

	100% {
	    transform: scale(4, 4);
	    opacity: .1;
		}
`

const pinStyle = {
  cursor: "pointer",
  fill: "#FFF",
  stroke: "none",
}

const Marker = styled.circle`
  animation: ${pulse2} 5s infinite;
  transform-origin: center;
`

const CenterMarker = styled.circle`
  animation: ${pulse1} 5s infinite;
  transform-origin: center;
`

function Pin({ size = 40, show }) {
  return (
    <svg height={size} viewBox="0 0 40 40" style={pinStyle}>
      <g style={{ visibility: show ? "visible" : "hidden" }}>
        <Marker cx={20} cy={20} r={5} fill="#FFF" />
        <CenterMarker cx={20} cy={20} r={5} fill="#FFF" />
      </g>
    </svg>
  )
}

export default React.memo(Pin)
