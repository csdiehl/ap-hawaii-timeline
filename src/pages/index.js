import HeatTracker from "js/visuals/hawaii_timeline"
import React from "react"
import { Graphic } from "tailor"

function Index() {
  return (
    <Graphic style={{ padding: 0 }} wide>
      <HeatTracker />
    </Graphic>
  )
}

Index.propTypes = {}

Index.defaultProps = {}

export default Index
