import logo from './logo.svg'
import './App.css'
import React, { useRef, useEffect, useState } from 'react'
import { brush, select } from 'd3'
import TimelineC from './TimelineC'
function App() {
  const [data, setData] = useState([10, 20, 40, 50])
  const svgRef = useRef()
  useEffect(() => {
    console.log(svgRef)
    const svg = select(svgRef.current)
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', (value) => value)
      .attr('cx', (value) => value * 2)
      .attr('cy', (value) => value * 2)
  }, [data])
  return (
    <>
      <TimelineC width={400} height={200}></TimelineC>
    </>
  )
}

export default App
