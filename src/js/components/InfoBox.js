import React from "react"
import styled, { keyframes } from "styled-components"
import { AbsolutePos, CardBackground } from "./mixins"
import { Text, Title, breakpoints, primaryColor } from "./settings"
import PropTypes from "prop-types"

const slideUp = keyframes`
0% {
    opacity: 0;
    transform: translateY(20%);
}

100% {
    opacity: 1;
    transform: translateY(0%);
}
`

const slideOut = keyframes`
0% {
    opacity: 1;
    transform: translateY(0%);
}

100% {
    opacity: 0;
    transform: translateY(-50%);
}
`

const Container = styled.div`
  ${AbsolutePos}
  top: 16px;
  left: 16px;
  ${CardBackground}
  max-width: 300px;
  text-wrap: balance;
  opacity: ${(props) => (props.show ? 1 : 0)};
  animation: ${(props) => (props.show ? slideUp : slideOut)} 500ms backwards
    ${(props) => (props.show ? "500ms" : "")};

  @media (${breakpoints.mobile}) {
    top: 0;
    left: 0;
    width: 100%;
  }
`

const formatDate = (dateString) => {
  return new Date(`${dateString}T01:00:00.000`).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const InfoBox = ({ data, currentIndex }) => {
  return (
    <>
      {data.map((d, i) => (
        <Container id="current-message" show={currentIndex === i} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title>{d.title}</Title>
          </div>
          <Text style={{ color: "lightgrey" }}>
            <strong style={{ color: primaryColor }}>
              {d.approx_local_time}
            </strong>
            , {formatDate(d.date)}
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

export default InfoBox
