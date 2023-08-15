import React from "react"

const Timeline = ({ nEvents, setCurrentIndex }) => {
  function advanceEvent() {
    setCurrentIndex((prev) => (prev === nEvents - 1 ? 0 : prev + 1))
  }

  function goBack() {
    setCurrentIndex((prev) => (prev === 0 ? nEvents - 1 : prev - 1))
  }

  return (
    <div>
      <button onClick={goBack}>Back</button>
      <button onClick={advanceEvent}>Forward</button>
    </div>
  )
}

export default Timeline
