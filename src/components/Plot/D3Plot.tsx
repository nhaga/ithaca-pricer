import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const optionsPayoff = []


const LineChart = () => {

    const width = 200;
  const height = 200;



  const [data, setData] = useState([-5, -5, -5, -5, -5, -5, 5, 15, 25, 35, 45, 55]);
  const svgRef = useRef();

  useEffect(() => {
    // Set up SVG element
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
    //   .style("margin", "100px")
      .style("display", "block")
      .attr("viewBox", [0, 0, width, height])
    //   .attr("style", "max-width: 100%; height: auto; -webkit-tap-highlight-color: transparent;");      

    // Define scales and line generator
    const xScale = d3.scaleLinear()
      .domain([0, 12])
      .range([500, 0]);


      svg.append("g")
      .call(d3.axisTop(xScale).tickSizeInner(3).tickSizeOuter(0));


    const yScale = d3.scaleLinear()
      .range([-10, 300])
      .domain([0, 100])
      

    //   svg.append("g")
    //   .call(d3.axisLeft(yScale));


    const lineGenerator = d3.line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d));



    // Draw line chart
    svg.selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .style("filter", "url(#glow)");      

      const defs = svg.append("defs");
      const filter = defs.append("filter")
        .attr("id", "glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
      
      filter.append("feGaussianBlur")
        .attr("stdDeviation", "5")
        .attr("result", "coloredBlur");
      
      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
      feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");      

    //  let area = d3.area()
    //     .x(function(d) { return x(d.x); })
    //     .y0(height)
    //     .y1(function(d) { return y(d.y); });


      // Add a label at the end of each line
    //   svg
    //   .selectAll("myLabels")
    //   .data(data)
    //   .enter()
    //     .append('g')
    //     .append("text")
    //       .attr("class", function(d){ return d.name })
    //       .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
    //       .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
    //       .attr("x", 12) // shift the text a bit more right
    //       .text(function(d) { return d.name; })
    //       .style("fill", function(d){ return myColor(d.name) })
    //       .style("font-size", 15)

    // Add a legend (interactive)
    // svg
    //   .selectAll("myLegend")
    //   .data(dataReady)
    //   .enter()
    //     .append('g')
    //     .append("text")
    //       .attr('x', function(d,i){ return 30 + i*60})
    //       .attr('y', 30)
    //       .text(function(d) { return d.name; })
    //       .style("fill", function(d){ return myColor(d.name) })
    //       .style("font-size", 15)
    //     .on("click", function(d){
    //       // is the element currently visible ?
    //       currentOpacity = d3.selectAll("." + d.name).style("opacity")
    //       // Change the opacity: from 0 to 1 or from 1 to 0
    //       d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)

    //     })          


  }, [data]);

  return (
      <svg ref={svgRef}></svg>
  );




};

export default LineChart;