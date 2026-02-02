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
const svg = document.getElementById("barChart");
const width = svg.clientWidth;
const height = svg.clientHeight;
const padding = 40;
const barWidth = (width - 2 * padding) / data.length;
const maxValue = Math.max(...data.map(d => d.value));

// Tooltip
const tooltip = document.getElementById("tooltip");

// Draw bars and labels
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
        tooltip.textContent = `Value: ${d.value}`;
    });

    rect.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.pageX + 10 + "px";  // horizontal offset
        tooltip.style.top = e.pageY - 25 + "px";   // vertical offset
    });

    rect.addEventListener("mouseout", () => {
        tooltip.style.opacity = 0;           // hide tooltip
    });

    svg.appendChild(rect);

    // X-axis label
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", padding + i * barWidth + barWidth / 2);
    text.setAttribute("y", height - padding + 15);
    text.textContent = d.label;
    text.classList.add("label");

    svg.appendChild(text);
});


// X-axis title
const xAxisTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
xAxisTitle.setAttribute("x", width / 2);
xAxisTitle.setAttribute("y", height - 5);
xAxisTitle.textContent = "Days of Week";
xAxisTitle.classList.add("x-axis-title");
svg.appendChild(xAxisTitle);

// Y-axis title
const yAxisTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
yAxisTitle.setAttribute("x", -height / 2);
yAxisTitle.setAttribute("y", 15);
yAxisTitle.setAttribute("transform", "rotate(-90)");
yAxisTitle.textContent = "Hours of Sleep";
yAxisTitle.classList.add("y-axis-title");
svg.appendChild(yAxisTitle);