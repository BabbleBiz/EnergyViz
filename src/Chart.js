import React from 'react';
import * as d3 from 'd3';

class Chart extends React.Component {
  componentDidMount() {
    this.drawChat()
  }

  drawChat() {
    let w = this.props.width
    let h = this.props.height
    const data = this.props.data

    const svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("margin-left", 100);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 25)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - (10 * d) - 3)
  }
  render() {
    return <div id={"#" + this.props.id}></div>
  }


}


export default Chart;
