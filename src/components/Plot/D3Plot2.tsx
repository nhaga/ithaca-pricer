import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

var optionsData = [{ "x": 1300, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1310, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1320, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1330, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1340, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1350, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1360, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1370, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1380, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1390, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1400, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1410, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1420, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1430, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1440, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1450, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1460, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1470, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1480, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1490, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1500, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1510, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1520, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1530, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1540, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1550, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1560, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1570, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1580, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1590, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1600, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1610, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1620, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1630, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1640, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1650, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1660, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1670, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1680, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1690, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1700, "total": -210, "leg1": -10, "leg2": -200 }, { "x": 1710, "total": 0, "leg1": 0, "leg2": 0 }, { "x": 1720, "total": 10, "leg1": 10, "leg2": 0 }, { "x": 1730, "total": 20, "leg1": 20, "leg2": 0 }, { "x": 1740, "total": 30, "leg1": 30, "leg2": 0 }, { "x": 1750, "total": 40, "leg1": 40, "leg2": 0 }, { "x": 1760, "total": 50, "leg1": 50, "leg2": 0 }, { "x": 1770, "total": 60, "leg1": 60, "leg2": 0 }, { "x": 1780, "total": 70, "leg1": 70, "leg2": 0 }, { "x": 1790, "total": 80, "leg1": 80, "leg2": 0 }, { "x": 1800, "total": 90, "leg1": 90, "leg2": 0 }, { "x": 1810, "total": 100, "leg1": 100, "leg2": 0 }, { "x": 1820, "total": 110, "leg1": 110, "leg2": 0 }, { "x": 1830, "total": 120, "leg1": 120, "leg2": 0 }, { "x": 1840, "total": 130, "leg1": 130, "leg2": 0 }, { "x": 1850, "total": 140, "leg1": 140, "leg2": 0 }, { "x": 1860, "total": 150, "leg1": 150, "leg2": 0 }, { "x": 1870, "total": 160, "leg1": 160, "leg2": 0 }, { "x": 1880, "total": 170, "leg1": 170, "leg2": 0 }, { "x": 1890, "total": 180, "leg1": 180, "leg2": 0 }, { "x": 1900, "total": 190, "leg1": 190, "leg2": 0 }, { "x": 1910, "total": 200, "leg1": 200, "leg2": 0 }, { "x": 1920, "total": 210, "leg1": 210, "leg2": 0 }, { "x": 1930, "total": 220, "leg1": 220, "leg2": 0 }, { "x": 1940, "total": 230, "leg1": 230, "leg2": 0 }, { "x": 1950, "total": 240, "leg1": 240, "leg2": 0 }, { "x": 1960, "total": 250, "leg1": 250, "leg2": 0 }, { "x": 1970, "total": 260, "leg1": 260, "leg2": 0 }, { "x": 1980, "total": 270, "leg1": 270, "leg2": 0 }, { "x": 1990, "total": 280, "leg1": 280, "leg2": 0 }]



const LineChart = () => {

    const margin = {
        top: 10, 
        right: 30, 
        bottom: 30, 
        left: 60
    }
    const width = 600 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom


  const [data, setData] = useState(optionsData);
  const svgRef = useRef();

  useEffect(() => {

    const svg = d3.select("body")

    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        // .attr("transform",
        //     "translate(" + margin.left + "," + margin.top + ")");     

    // X scale and axis
    let x = d3.scaleLinear()
    .domain([1300, 1990])  // Use the x values of the data
    .range([0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // Y scale and axis
    let y = d3.scaleLinear()
    .domain([-250, 300])  // Use the total, leg1, and leg2 values of the data
    .range([height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));


// Add the lines
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(d.x) })
    .y(function(d) { return y(d.total) })
  );
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "red")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(d.x) })
    .y(function(d) { return y(d.leg1) })
  );
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "green")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(d.x) })
    .y(function(d) { return y(d.leg2) })
  );       


  }, [data]);

  return (
      <svg ref={svgRef}></svg>
  );




};

export default LineChart;