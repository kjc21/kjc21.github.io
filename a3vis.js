// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("./a3dataset/videogames_wide.csv");
  return data;
}



fetchData().then(async (data) => {
  const vlSpec = vl
    .markBar()
    .data(data)
    .config({
        font: "Inter",
        axis: {
            labelFontSize: 11,
            titleFontSize: 13
        }
        })
    .encode(
      vl.y().fieldN("Platform").sort("-x"),
      vl.x().fieldQ("Global_Sales").aggregate("sum")
    )
    .width("container")
    .height(400)
    .toSpec();

  const vlSpec2 = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldN("Genre").sort("-x"),
      vl.x().fieldQ("Global_Sales").aggregate("sum"),
      vl.color().value("teal")
    )
    .width("container")
    .height(400)
    .toSpec();

    //PLATFORM: Mode - counting which platform has the most releases 
    const platMode = vl
    .markBar()
    .data(data)
    .encode(
     vl.y().fieldN("Platform").sort({ op: "count", order: "descending" }),
     vl.x().aggregate("count").type("quantitative").title("Number of Games Released"),
     vl.color().value("orange")
    )
    .width("container")
    .height(400)
    .toSpec();

    //PLATFORM: Mean - averaged overall sales per platform
    const platMean = vl
    .markBar()
    .data(data)
    .encode(
        vl.y().fieldN("Platform").sort({ field: "Global_Sales", op: "mean", order: "descending" }),
        vl.x().fieldQ("Global_Sales").aggregate("mean").title("Mean Global Sales (Millions)"),
        vl.color().value("purple")
    )
    .width("container")
    .height(400)
    .toSpec();

    //PLATFORM: Median - comparing median of each platforms sales
    const platMedian = vl
    .markBar()
    .data(data)
    .encode(
        vl.y().fieldN("Platform").sort({ field: "Global_Sales", op: "median", order: "descending" }),
        vl.x().fieldQ("Global_Sales").aggregate("median").title("Median Global Sales (Millions)"), 
        vl.color().value("gray")
    )
    .width("container")
    .height(400)
    .toSpec();

    //GENRE:Mode - counting which genre, which has the most/ is most common
     const genMode = vl
    .markBar()
    .data(data)
    .encode(
     vl.y().fieldN("Genre").sort({ op: "count", order: "descending" }),
     vl.x().aggregate("count").type("quantitative").title("Number of Games"),
     vl.color().value("orange")
    )
    .width("container")
    .height(400)
    .toSpec();

    //GENRE:Mean - comparing genres overall averaged sales, which genre is most popular 
    const genMean = vl
    .markBar()
    .data(data)
    .encode(
        vl.y().fieldN("Genre").sort({ field: "Global_Sales", op: "mean", order: "descending" }),
        vl.x().fieldQ("Global_Sales").aggregate("mean").title("Mean Global Sales (Millions)"),
        vl.color().value("purple")
    )
    .width("container")
    .height(400)
    .toSpec();

    //GENRE:Median - order genres by median global sales, compare
    const genMedian = vl
    .markBar()
    .data(data)
    .encode(
        vl.y().fieldN("Genre").sort({ field: "Global_Sales", op: "median", order: "descending" }),
        vl.x().fieldQ("Global_Sales").aggregate("median").title("Median Global Sales (Millions)"), 
        vl.color().value("gray")
    )
    .width("container")
    .height(400)
    .toSpec();

    //PUBLISHER:Mode - counting publishers, which releases the most games

  render("#view", vlSpec);
  render("#view2", vlSpec2);
  render("#platformMode", platMode);
  render("#platformMean", platMean);
  render("#platformMedian", platMedian);
  render("#genreMode", genMode);
  render("#genreMean", genMean);
  render("#genreMedian", genMedian);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
