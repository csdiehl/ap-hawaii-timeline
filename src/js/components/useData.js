import { useState, useEffect } from "react"
import { getData } from "./utils"

const useData = (url, condition = true) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (condition && !data) {
      getData(url).then((data) => setData(data))
    }
  }, [url, condition, data])

  return data
}

export default useData
