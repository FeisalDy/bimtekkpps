'use client'
import React, { useEffect } from 'react'

const Test = () => {
  useEffect(() => {
    // Simulate a click on the anchor link to trigger the download
    const anchorLink = document.getElementById('downloadLink')
    if (anchorLink) {
      anchorLink.click()
    }
  }, [])

  return (
    <a
      id='downloadLink'
      style={{ display: 'none' }}
      download
      href='loaderio-1aba91b6fe4b957b733701aad5fdb1b2.txt'
    >
      Loading...
    </a>
  )
}

export default Test
