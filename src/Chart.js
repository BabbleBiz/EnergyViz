import React from 'react';
import * as d3 from 'd3';

class Chart extends React.Component {
  componentDidMount() {
    this.drawChart()
  }

  drawChart() {
  let width = this.props.width
  let height = this.props.height
  const data = this.props.data
  const parser = d3.timeParse("%Y")


  let margin = ({top: 20, right: 30, bottom: 30, left: 40})
  let x = d3.scaleTime()
    .domain(d3.extent(data, d => parser(d.date)))
    .range([margin.left, width - margin.right])

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])

  let xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(3))

  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

  let line = d3.line()
      .defined(d => !isNaN(d.value))
    .x(d => x(parser(d.date)))
      .y(d => y(d.value))

  const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("margin-left", 100);

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);


    // let w = this.props.width
    // let h = this.props.height
    // const data = this.props.data

    // const svg = d3.select("body")
    //   .append("svg")
    //   .attr("width", w)
    //   .attr("height", h)
    //   .style("margin-left", 100);

    // svg.selectAll("rect")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d, i) => i * 70)
    //   .attr("y", (d, i) => h - 10 * d)
    //   .attr("width", 25)
    //   .attr("height", (d, i) => d * 10)
    //   .attr("fill", "green");

    // svg.selectAll("text")
    //   .data(data)
    //   .enter()
    //   .append("text")
    //   .text((d) => d)
    //   .attr("x", (d, i) => i * 70)
    //   .attr("y", (d, i) => h - (10 * d) - 3)
  }
  render() {
    return <div id={"#" + this.props.id}></div>
  }


}


export default Chart;
