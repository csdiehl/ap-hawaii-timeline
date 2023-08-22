import HeatTracker from "js/visuals/hawaii_timeline"
import React from "react"
import { Footer } from "ap-react-components"
import apLogo from "ap-interactive-assets/images/AP_LOGO_86x100.png"

function Index() {
  return (
    <>
      <HeatTracker />
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <Footer logo={apLogo} />
      </div>
    </>
  )
}

Index.propTypes = {}

Index.defaultProps = {}

export default Index
