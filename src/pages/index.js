import HeatTracker from "js/visuals/hawaii_timeline"
import React from "react"
import { Graphic } from "tailor"

function Index() {
  return (
    <Graphic wide>
      <HeatTracker />
    </Graphic>
  )
}

Index.propTypes = {}

Index.defaultProps = {}

export default Index
