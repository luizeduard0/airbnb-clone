'use client'

import { Toaster } from "react-hot-toast"

// External import need wrapper method to be used in client
const ToasterProvider = () => {
  return (
    <Toaster />
  )
}

export default ToasterProvider