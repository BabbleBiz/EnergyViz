import React from 'react';
import * as d3 from 'd3';

class BarChart extends React.Component {
  componentDidUpdate(){
    this.drawBarChart()
  }

  drawBarChart () {
    let width = this.props.width
    let height = this.props.height
    const data = this.props.data
    const parser = d3.timeParse("%Y")
    const xAxisValue = this.props.yAxisTitle
    const yAxisValue = this.props.xAxisTitle

    let margin = ({ top: 20, right: 0, bottom: 30, left: 40 })

    let y = d3.scaleTime()
      .domain([0, d3.max(data, d => parser(d[yAxisValue]))]).nice()
      .range([height - margin.bottom, margin.top])

    let x = d3.scaleBand()
      .domain(data.map(d => d[xAxisValue]))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    let xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))

    let yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())

    function zoom(svg) {
      const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

      svg.call(d3.zoom()
        .scaleExtent([1, 8])
        .translateExtent(extent)
        .extent(extent)
        .on("zoom", zoomed));

      function zoomed() {
        x.range([margin.left, width - margin.right].map(d => d3.event.transform.applyX(d)));
        svg.selectAll(".bars rect").attr("x", d => x(d[xAxisValue])).attr("width", x.bandwidth());
        svg.selectAll(".x-axis").call(xAxis);
      }
    }

    //Probs do not want to be selecting the DOM
    //const svg = d3.select(DOM.svg(width, height))
    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(zoom);

    svg.append("g")
      .attr("class", "bars")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d[xAxisValue]))
      .attr("y", d => y(parser(d[yAxisValue])))
      .attr("height", d => y(0) - y(parser(d[yAxisValue])))
      .attr("width", x.bandwidth());

    svg.append("g")
      .attr("class", "x-axis")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);

    return svg.node();


  }

  render() {
    return <div id={"#" + this.props.id}></div>
  }
}

export default BarChart;
