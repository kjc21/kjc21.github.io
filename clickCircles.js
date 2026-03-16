import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;
let tooltip;

const width = 800;
const height = 600;

let circles = [];

async function prepareVis() {

  const container = d3.select("#viscontainer")
    .style("display", "flex")
    .style("flex-direction", "column")
    .style("align-items", "center")
    .style("gap", "1rem");

  svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#EEEEEE")
    .style("border-radius", "0.5rem")
    .style("border", "1px solid #E3E3E3");

  container
    .append("button")
    .attr("class", "clear-button")
    .text("Clear Circles")
    .on("click", clearCircles);

  tooltip = svg
    .append("text")
    .attr("font-size", "0.75rem")
    .attr("font-family", "PP Mori")
    .attr("fill", "#292323")
    .attr("font-weight", 500)
    .style("visibility", "hidden");

  svg.on("click", function(event) {

    if (circles.length >= 10) return;

    const [x, y] = d3.pointer(event);

    circles.push({ x, y });

    drawCircles();

  });

}

function drawCircles() {

  svg.selectAll("circle")
    .data(circles)
    .join("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 16)
    .attr("fill", "#92BE00")
    .attr("stroke", "#292323")
    .attr("stroke-width", 1)
    .style("cursor", "pointer")

    .on("mouseover", function(event, d) {

      d3.select(this)
        .attr("fill", "#6f9300");

      tooltip
        .attr("x", d.x + 12)
        .attr("y", d.y - 10)
        .text(`X: ${Math.round(d.x)}  Y: ${Math.round(d.y)}`)
        .style("visibility", "visible");

    })

    .on("mouseout", function() {

      d3.select(this)
        .attr("fill", "#92BE00");

      tooltip.style("visibility", "hidden");

    });

}

function clearCircles() {

  circles = [];

  svg.selectAll("circle").remove();

  tooltip.style("visibility", "hidden");

}

async function runApp() {
  await prepareVis();
}

runApp();