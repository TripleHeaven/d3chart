import React, { useRef, useEffect, useState } from 'react'
import {
  select,
  svg,
  min,
  max,
  scaleTime,
  axisBottom,
  zoom,
  zoomTransform,
  schemeBrBG,
} from 'd3'

// resize observer hook

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null)
  useEffect(() => {
    const observeTarget = ref.current
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect)
      })
    })
    resizeObserver.observe(observeTarget)
    return () => {
      resizeObserver.unobserve(observeTarget)
    }
  }, [ref])

  return dimensions
}

export default function TimelineC() {
  const data = ['2021-03-05T15:42:53+00:00']
  const dataT = [
    '2021-03-05T15:41:31+00:00',
    '2021-03-05T15:41:51+00:00',
    '2021-03-05T15:42:25+00:00',
    '2021-03-05T15:42:25+00:00',
    '2021-03-05T15:42:25+00:00',
    '2021-03-05T15:42:59+00:00',
  ].map((timeEl) => new Date(timeEl))
  const getDate = (dateString) => {
    return new Date(dateString)
  }
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  const [currentZoomState, setCurrentZoomState] = useState()
  const [widthTick, setWidthTick] = useState()
  useEffect(() => {
    const svg = select(svgRef.current)
    if (!dimensions) return
    const minDate = min(dataT)
    const maxDate = max(dataT)
    const xScale = scaleTime()
      .domain([minDate, maxDate])
      .range([0, dimensions.width])
    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale)
      xScale.domain(newXScale.domain())
      setWidthTick(xScale(new Date(dataT[1])) - xScale(new Date(dataT[0])))
    }
    const xAxis = axisBottom(xScale)

    svg
      .selectAll('.timetick')
      .data(data)
      .join('line')
      .attr('class', 'timetick')
      .attr('stroke', 'black')
      .attr('x1', (datatick) => xScale(new Date(datatick)))
      .attr('y1', dimensions.height)
      .attr('x2', (datatick) => xScale(new Date(datatick)))
      .attr('y2', 0)
    svg
      .select('.x-axis')
      .style('transform', `translateY(${dimensions.height / 2}px)`)
      .call(xAxis)
    const zoomBehaviour = zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([
        [0, 0.8],
        [dimensions.width, dimensions.height],
      ])
      .on('zoom', () => {
        const zoomState = zoomTransform(svg.node())
        setCurrentZoomState(zoomState)
      })
    svg.call(zoomBehaviour)

    /* Rects 
    try to connect it to ticks!!!
    */
    // svg.selectAll('rect').remove()
    // svg
    //   .selectAll('.nechet')
    //   .remove()
    //   .data(dataT)
    //   .join('rect')
    //   .attr('class', '.nechet')
    //   .attr('fill', (datatick, index) => (index % 2 === 0 ? 'black' : 'gray'))
    //   .attr('x', (datatick, index) => index * widthTick)
    //   .attr('y', 0)
    //   .attr('width', widthTick)
    //   .attr('height', 100)
  }, [currentZoomState, dimensions])
  return (
    <div ref={wrapperRef} className="tlcont">
      <svg ref={svgRef}>
        <g className="x-axis"></g>
      </svg>
    </div>
  )
}
