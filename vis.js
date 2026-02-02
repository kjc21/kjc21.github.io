// Data: X[Day of the week], Y[number of hours of sleep]
const data = [
    { label: "Monday", value: 6},
    { label: "Tuesday", value: 4},
    { label: "Wednesday", value: 5},
    { label: "Thursday", value: 4},
    { label: "Friday", value: 5},
    { label: "Saturday", value: 9},
    { label: "Sunday", value: 8}
];

// SVG setup
const chartSvg = document.getElementById("barChart")

const vb = chartSvg.viewBox.baseVal;
const width = vb.width;
const height = vb.height;

const padding = 40;
const barWidth = (width - 2 * padding) / data.length;
const maxValue = Math.max(...data.map(d => d.value));

// Tooltip
const tooltip = document.getElementById("tooltip");


data.forEach((d, i) => {
    const barHeight = (d.value / maxValue) * (height - 2 * padding);

    // Create bar
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", padding + i * barWidth + 5);
    rect.setAttribute("y", height - padding - barHeight);
    rect.setAttribute("width", barWidth - 10);
    rect.setAttribute("height", barHeight);
    rect.classList.add("bar");

    rect.addEventListener("mouseover", () => {
        tooltip.style.opacity = 1;           // show tooltip
        tooltip.textContent = `Hours: ${d.value}`;
    });

    rect.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.pageX + 10 + "px";
        tooltip.style.top = e.pageY - 25 + "px";
    });

    rect.addEventListener("mouseout", () => {
        tooltip.style.opacity = 0;           // hide tooltip
    });

    chartSvg.appendChild(rect);

    // X-axis label
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", padding + i * barWidth + barWidth / 2);
    text.setAttribute("y", height - padding + 15);
    text.textContent = d.label;
    text.classList.add("label");

    chartSvg.appendChild(text);
});


// X-axis title
const xAxisTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
xAxisTitle.setAttribute("x", width / 2);
xAxisTitle.setAttribute("y", height - 5);
xAxisTitle.textContent = "Days of Week";
xAxisTitle.classList.add("x-axis-title");
chartSvg.appendChild(xAxisTitle);

// Y-axis title
const yAxisTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
yAxisTitle.setAttribute("x", -height / 2);
yAxisTitle.setAttribute("y", 15);
yAxisTitle.setAttribute("transform", "rotate(-90)");
yAxisTitle.textContent = "Hours of Sleep";
yAxisTitle.classList.add("y-axis-title");
chartSvg.appendChild(yAxisTitle);



//Art Svg
const artSvg = document.getElementById("art");

if (artSvg) {
  const parts = [
    { cx: 100.5, cy: 100.5, r:40},
    { cx: 110, cy: 150, r:40},
    {cx: 155, cy: 125, r:40},
    { cx: 200, cy: 150, r: 40 },
    { cx: 150, cy: 150, r: 40 },
    { cx: 70, cy: 150, r: 40 }
  ];

  parts.forEach(p => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", p.cx);
    circle.setAttribute("cy", p.cy);
    circle.setAttribute("r", p.r);
    circle.setAttribute("class", "art-shape");

    artSvg.appendChild(circle);
  });
}
