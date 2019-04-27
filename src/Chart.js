import React from 'react';
import * as d3 from 'd3';

class Chart extends React.Component {
  componentDidUpdate() {
    this.drawChart()
  }

  drawChart() {
  let width = this.props.width
  let height = this.props.height
  let margin = ({top: 20, right: 30, bottom: 30, left: 40})
  const tooltip = { width: 100, height: 100, x: 10, y: -30 };
  const data = this.props.data



  const xAxisValue = this.props.xAxisTitle
  const yAxisValue = this.props.yAxisTitle
  data.sort((a, b) => a[yAxisValue] - b[yAxisValue])
  //Formats date to just the year to parse for chart
  const parser = d3.timeParse("%Y")
  //Bisects date to allow for tooltip to show correct dates
  const bisectDate = d3.bisector(function(d) {
    return d[yAxisValue]
  }).left
  //format date for display
  const dateFormatter = d3.timeParse("%Y")





  let x = d3.scaleTime()
    .domain(d3.extent(data, d => parser(d[xAxisValue])))
    .range([margin.left, width - margin.right])

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[yAxisValue])]).nice()
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
    .defined(d => !isNaN(d[yAxisValue]))
    .x(d => x(parser(d[xAxisValue])))
    .y(d => y(d[yAxisValue]))

    // const callout = (g, yAxisValue) => {
    //   if (!yAxisValue) return g.style("display", "none");

    // g
    //   .style("display", null)
    //   .style("pointer-events", "none")
    //   .style("font", "10px sans-serif");

  //   const path = g.selectAll("path")
  //     .data([null])
  //     .join("path")
  //     .attr("fill", "white")
  //     .attr("stroke", "black");

  //   const text = g.selectAll("text")
  //     .data([null])
  //     .join("text")
  //     .call(text => text
  //       .selectAll("tspan")
  //       .data(([yAxisValue] + "").split(/\n/))
  //       .join("tspan")
  //       .attr("x", 0)
  //       .attr("y", (d, i) => `${i * 1.1}em`)
  //       .style("font-weight", (_, i) => i ? null : "bold")
  //       .text(d => d));

  //   const { x, y, width: w, height: h } = text.node().getBBox();

  //   text.attr("transform", `translate(${-w / 2},${15 - y})`);
  //   path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
  // }

  // const bisect = () => {
  //   const bisect = d3.bisector(d => parser(d[xAxisValue])).left;
  //   return mx => {
  //     const date = x.invert(mx);
  //     const index = bisect(data, [xAxisValue], 1);
  //     const a = data[index - 1];
  //     const b = data[index];
  //     return date - a.date > b.date - date ? a : b;
  //     };
  // }

  const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("margin-left", 100);

    svg.append("g")
      .call(xAxis);


    svg.append("g")
      .call(yAxis)
      //adding lable?
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Energy Use");

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
    //Might need this to actually display the tool tip
    //const tooltip = svg.append("g");
    const focus = svg.append("g")
      //.attr("class", "focus")
      .style("display", "none");

    focus.append("circle")
      .attr("r", 5);

    focus.append("rect")
      .style("fill", "none")
      .style('border', 'black')
      .attr("width", 100)
      .attr("height", 50)
      .attr("x", 10)
      .attr("y", -22)
      .attr("rx", 4)
      .attr("ry", 4);

    // focus.append("text")
    //   //.attr("class", "tooltip-date")
    //   .attr("x", 18)
    //   .attr("y", -2);



    // focus.append("text")
    //   .attr("class", "tooltip-name")
    //   .attr("x", 60)
    //   .attr("y", 18);

    svg.on("mouseover", function () { focus.style("display", null); })
      .on("mouseout", function () { focus.style("display", "none"); })
      .on("mousemove", mousemove);

    focus.append("text")
      .attr("x", 18)
      .attr("y", 18)
      .style('font-size', "10px")
      .text("Property name:")


    function mousemove() {
      let y0 = y.invert(d3.mouse(this)[1])
      let i = bisectDate(data, y0)
      let d0 = data[i - 1]
      let d1 = data[i]
      let d = y0 - d0[yAxisValue] > d1[yAxisValue] - y0 ? d1 : d0;
      console.log("D", d)
      focus.attr("transform", "translate(" + x(parser(d[xAxisValue])) + "," + y(d[yAxisValue]) + ")");
      focus.select('text')
        .text(`Property Name: ${d.name} Energy Use: ${d[yAxisValue]}`);

    // svg.on("touchmove mousemove", function () {
    //   const { xAxisValue, yAxisValue } = bisect(d3.mouse(this)[0]);

    //   tooltip
    //     .attr("transform", `translate(${x([xAxisValue])},${y([yAxisValue])})`)
    //     .call(callout, `${[yAxisValue].toLocaleString(undefined, { style: "currency", currency: "USD" })}
    //     ${[xAxisValue].toLocaleString(undefined, { year: "numeric" })}`);
    //   });

    // svg.on("touchend mouseleave", () => tooltip.call(callout, null));

    }
  }
  render() {
    return <div id={"#" + this.props.id}></div>
  }


}


export default Chart;
