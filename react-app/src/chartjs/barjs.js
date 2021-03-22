import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import styles from "./style.css";
/*
1. current code to react     - синхрон !
2. сделать чарт с ивентами    - ссинхрон
  - оторбажение
  - дизайн - время на rect
  - добавить поолосочки duration
  - дизайн
3. 
*/

function BarChart({ width, height, data }) {
  const ref = useRef();
  // useEffect(() => {
  //   const svg = d3
  //     .select(ref.current)
  //     .attr("width", width)
  //     .attr("height", height)
  //     .style("border", "1px solid black");
  // }, []);
  let scaleColor = d3.scaleSequential(d3.interpolateViridis);
  // scaleColor = d3.scaleSequential(d3.interpolateViridis);
  let scaleHeight = d3.scaleLinear();
  let scaleWidth = d3.scaleBand().padding(0.8);

  scaleWidth = scaleWidth.domain(data.map((d) => d)).range([0, width]);
  scaleHeight = scaleHeight
    .domain(d3.extent(data, (d) => d.count))
    .range([height - 20, 0]);

  // useEffect(() => {
  //   draw();
  // }, [data]);

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height - 100]);
  const bars = data.map((d, i) => (
    <rect
      className={styles.bar}
      key={d.item}
      width={scaleWidth.bandwidth()}
      height={yScale(d)}
      x={i * 45}
      y={height - yScale(d)}
      fill={scaleColor(d)}
      rx="0"
      ry="0"
    />
  ));

  // const draw = () => {
  //   const svg = d3.select(ref.current);
  //   // todo
  //   var selection = svg.selectAll("rect").data(data);

  //   selection
  //     .transition()
  //     .duration(300)
  //     .attr("height", (d) => yScale(d))
  //     .attr("y", (d) => height - yScale(d));

  //   selection
  //     .enter()
  //     .append("rect")
  //     .attr("x", (d, i) => i * 45)
  //     .attr("y", (d) => height)
  //     .attr("width", 40)
  //     .attr("height", 0)
  //     .attr("fill", "orange")
  //     .transition()
  //     .duration(300)
  //     .attr("height", (d) => yScale(d))
  //     .attr("y", (d) => height - yScale(d));

  //   selection
  //     .exit()
  //     .transition()
  //     .duration(300)
  //     .attr("y", (d) => height)
  //     .attr("height", 0)
  //     .remove();
  // };

  return (
    <div className={styles.chart}>
      <svg width={700} height={1000}>
        {bars}
      </svg>
    </div>
  );
}

export default BarChart;
