import * as d3 from 'd3'

export function drawChart(height, width) {
  d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black')
    .append('text')
    .attr('fill', 'green')
    .attr('x', 50)
    .attr('y', 50)
    .text('Hello D3')
}
