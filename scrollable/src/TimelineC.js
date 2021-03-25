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
} from 'd3'

export default function TimelineC({ width, height }) {
  const data = ['2021-03-05T15:41:55+00:00']
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
  console.log(data)
  const svgRef = useRef()
  const wrapperRef = useRef()
  const [currentZoomState, setCurrentZoomState] = useState()
  useEffect(() => {
    const svg = select(svgRef.current)
    const minDate = min(dataT)
    const maxDate = max(dataT)
    const xScale = scaleTime().domain([minDate, maxDate]).range([0, width])
    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale)
      xScale.domain(newXScale.domain())
    }
    const xAxis = axisBottom(xScale)
    svg
      .selectAll('.timetick')
      .data(data)
      .join('line')
      .attr('class', 'timetick')
      .attr('stroke', 'black')
      .attr('x1', (datatick) => xScale(new Date(datatick)))
      .attr('y1', height)
      .attr('x2', (datatick) => xScale(new Date(datatick)))
      .attr('y2', 0)

    svg
      .select('.x-axis')
      .style('transform', `translateY(${height / 2}px)`)
      .call(xAxis)
    const zoomBehaviour = zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', () => {
        const zoomState = zoomTransform(svg.node())
        setCurrentZoomState(zoomState)
      })
    svg.call(zoomBehaviour)
  }, [currentZoomState])
  return (
    <svg ref={svgRef} width={width} height={height}>
      <g className="x-axis"></g>
    </svg>
  )
}
