import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { AbsolutePos, CardBackground } from "./mixins"
import { Text, Title, breakpoints, primaryColor } from "./settings"

const Container = styled.div`
  ${AbsolutePos}
  top: 16px;
  left: 16px;
  ${CardBackground}
  max-width: 400px;
  text-wrap: balance;
  opacity: ${(props) => (props.show ? 1 : 0)};
  pointer-events: ${(props) => (props.show ? "all" : "none")};
  transform: translateY(
    ${(props) => (props.before ? "-50%" : props.after ? "20%" : "0")}
  );
  transition: opacity 500ms ease-in-out
      ${(props) => (!props.show ? "" : "500ms")},
    transform 500ms ease-in-out ${(props) => (!props.show ? "" : "500ms")};

  @media (${breakpoints.mobile}) {
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
`

const Legend = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const Dot = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: ${primaryColor};
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
            <strong style={{ color: primaryColor }}>
              {d.approx_local_time}
            </strong>{" "}
            {formatDate(d.date)}
          </Text>
          <Text
            dangerouslySetInnerHTML={{ __html: d.what }}
            style={{ marginTop: "16px" }}
          ></Text>
          {[1, 5].includes(d.slide) && (
            <Legend>
              <Dot />
              <Text>
                {d.slide === 1
                  ? "Satellite-detected Hotspots"
                  : "Solar-powered sirens"}
              </Text>
            </Legend>
          )}
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
