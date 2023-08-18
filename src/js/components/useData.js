import { useState, useEffect } from "react"
import { getData } from "./utils"

const useData = (url) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    getData(url).then((data) => setData(data))
  }, [url])

  return data
}

export default useData
