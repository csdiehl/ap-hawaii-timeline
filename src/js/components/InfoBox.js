import PropTypes from "prop-types"
import React from "react"
import styled, { keyframes, css } from "styled-components"
import { AbsolutePos, CardBackground } from "./mixins"
import {
  Text,
  Title,
  breakpoints,
  fireColor,
  primaryColor,
  sirenColor,
} from "./settings"

const Container = styled.div`
  ${AbsolutePos}
  top: 16px;
  left: 16px;
  ${CardBackground}
  max-width: 425px;
  text-wrap: balance;
  opacity: ${(props) => (props.show ? 1 : 0)};
  pointer-events: ${(props) => (props.show ? "all" : "none")};
  transform: translateY(
    ${(props) => (props.before ? "-50%" : props.after ? "20%" : "0")}
  );
  transition: opacity 500ms ease-in-out
      ${(props) => (!props.show ? "" : "500ms")},
    transform 500ms ease-in-out ${(props) => (!props.show ? "" : "500ms")};
  backdrop-filter: blur(5px);

  @media (${breakpoints.tablet}) {
    top: 8px;
    left: 8px;
  }

  @media (${breakpoints.mobile}) {
    top: 0px;
    left: 0px;
    width: 100%;
  }
`

const Legend = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const circleStyles = `
 height: 12px;
  width: 12px;
  border-radius: 50%;
`

const pulse = keyframes`
0% {
  transform: scale(1);
}

50% {
  transform: scale(1.1);
}

100% {
  transform: scale(1);
}
`

const TimeBox = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  display: inline-block;
  border-radius: 5px;
  background: rgba(255, 21, 93, 0.1);
  padding: 4px;
  color: ${primaryColor};
  animation: ${(props) =>
    props.show &&
    css`
      ${pulse} 500ms ease-in-out 700ms
    `};

  @media (${breakpoints.mobile}) {
    font-size: 1rem;
  }
`

const Dot = styled.div`
  ${circleStyles}
  background-color: ${(props) => props.color ?? primaryColor};
`

const HollowDot = styled.div`
  ${circleStyles}
  border: 1px solid ${sirenColor};
`

const formatDate = (dateString) => {
  return new Date(`${dateString}T01:00:00.000`).toLocaleDateString("en-US", {
    weekday: "long",
    year: undefined,
    month: "short",
    day: "numeric",
  })
}

const InfoBox = ({ data, currentIndex }) => {
  return (
    <>
      {data.map((d, i) => (
        <Container
          id="current-message"
          before={i < currentIndex}
          after={i > currentIndex}
          show={currentIndex === i}
          key={i}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title>{d.title}</Title>
          </div>
          <Text style={{ color: "lightgrey" }}>
            {d.approx_local_time && (
              <TimeBox show={currentIndex === i}>{d.approx_local_time}</TimeBox>
            )}{" "}
            {formatDate(d.date)}
          </Text>
          <Text
            dangerouslySetInnerHTML={{ __html: d.what }}
            style={{ marginTop: "16px" }}
          ></Text>
        </Container>
      ))}
    </>
  )
}

InfoBox.propTypes = {
  data: PropTypes.array,
  currentIndex: PropTypes.number,
}

export default React.memo(InfoBox)
