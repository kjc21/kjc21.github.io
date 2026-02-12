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
    .height(200)
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
    .height(200)
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
    .height(300)
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
    const pubMode = vl
    .markBar()
    .data(data)
    .config(
      { axis: {
        titleFont: "Helvetica",
        titleFontSize: 12,
        titleFontWeight: "bold",
        background: "#ffffff"
      }}
      )
    .transform(
      vl.aggregate([{ op: "count", as: "count" }]).groupby(["Publisher"]),
      vl.window([{ op: "rank", as: "rank" }]).sort([{ field: "count", order: "descending" }]),
      vl.filter("datum.rank <= 10")
    )
    .encode(
      vl.y().fieldN("Publisher").sort("-x").title("Publisher").axis({ labelFontSize: 8,labelLimit: 150 }),
      vl.x().fieldQ("count").title("Number of Games Released"),
      vl.color().value("#96003e"),
      vl.tooltip([{ field: "Publisher", type: "nominal", title: "Publisher" },{ field: "count", type: "quantitative", title: "Number of Games" }])
    )
    .width("container")
    .height(300)
    .title({
      text:"Top 10 Publishers by Number of Games", 
      anchor: "middle",


    })
    .toSpec();

    //PUBLISHER:Mean - comparing publishers general average sales - might omit this just for story telling (get rid of one hit wonders)
     const pubMean = vl
    .markBar()
    .data(data)
    .config(
      {axis: {
        labelFont: "Helvetica",
        labelFontSize: 10,
        titleFont: "Helvetica",
        titleFontSize: 14,
        titleFontWeight: "bold"}}
      )
    .transform(
      vl.aggregate([{ op: "mean", field: "Global_Sales", as: "meanSales" }]).groupby(["Publisher"]),

      vl.window([{ op: "rank", as: "rank" }]).sort([{ field: "meanSales", order: "descending" }]),

      vl.filter("datum.rank <= 10")
     )
    .encode(

      vl.y().fieldN("Publisher").sort("-x").title("Publisher"),
      vl.x().fieldQ("meanSales").title("Mean Global Sales (Millions of Untits)"),
      vl.tooltip([{ field: "Publisher", type: "nominal", title: "Publisher" },
      { field: "meanSales", type: "quantitative", title: "Mean Sales (Millions)" }
      ]),
      
      vl.color().value("gray")
    )
    .width("container")
    .height(300)
    .toSpec();
    
    //PUBLISHER:Median - comparing publishers median sales, more stable/ who is the most consistent
    const pubMedian = vl
    .markBar()
    .data(data)
    .config(
      {axis: {
        labelFont: "Helvetica",
        labelFontSize: 10,
        titleFont: "Helvetica",
        titleFontSize: 14,
        titleFontWeight: "bold"}}
      )
    .transform(
       // calculate median global sales per publisher
      vl.aggregate([{ op: "median", field: "Global_Sales", as: "medianSales" }]).groupby(["Publisher"]),

      // rank publishers by median sales
      vl.window([{ op: "rank", as: "rank" }]).sort([{ field: "medianSales", order: "descending" }]),

     // keep only top 10
      vl.filter("datum.rank <= 10")
     )
    .encode(
      vl.y().fieldN("Publisher").sort("-x"),
      vl.x().fieldQ("medianSales").title("Median Global Sales (Millions)"),
      vl.tooltip([{ field: "Publisher", type: "nominal", title: "Publisher" },
      { field: "medianSales", type: "quantitative", title: "Median Sales (Millions)" }]),
      vl.color().value("#FF5733")
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view", vlSpec);
  render("#view2", vlSpec2);
  render("#platformMode", platMode);
  render("#platformMean", platMean);
  render("#platformMedian", platMedian);
  render("#genreMode", genMode);
  render("#genreMean", genMean);
  render("#genreMedian", genMedian);
  render("#publisherMode", pubMode);
  render("#publisherMedian", pubMedian);
  render("#publisherMean", pubMean);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
