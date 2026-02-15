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
    .config(
      {axis: {
        labelFont: "Helvetica",
        labelFontSize: 10,
        titleFont: "Helvetica",
        titleFontSize: 14,
        titleFontWeight: "bold",
        background: "#ffffff"
      }})
    .encode(
     vl.y().fieldN("Platform").sort({ op: "count", order: "descending" }),
     vl.x().aggregate("count").type("quantitative").title("Number of Games Released"),
     vl.color().value("#FF5733"),
     vl.tooltip([
        { field: "Platform", type: "nominal", title: "Platform" },
        { aggregate: "count", title: "Games Released" }
      ])
    )
    .width("container")
    .height(300)
    .toSpec();

    //PLATFORM: Mean - averaged overall sales per platform
    const platMean = vl
    .markBar()
    .data(data)
    .config(
      {axis: {
        labelFont: "Helvetica",
        labelFontSize: 10,
        titleFont: "Helvetica",
        titleFontSize: 14,
        titleFontWeight: "bold",
        background: "#ffffff"
      }})
    .encode(
        vl.y().fieldN("Platform").sort({ field: "Global_Sales", op: "mean", order: "descending" }),
        vl.x().fieldQ("Global_Sales").aggregate("mean").title("Mean Global Sales (Millions)"),
        vl.tooltip([{ field: "Platform", type: "nominal", title: "Platform" },
      { aggregate:"mean", field:"Global_Sales" ,type: "quantitative", format: ".2f",title: "Mean Sales (Millions)" }]),
      vl.color().value("#b83011")
    )
    .width("container")
    .height(300)
    .toSpec();

    //PLATFORM: Median - comparing median of each platforms sales
    const platMedian = vl
    .markBar()
    .data(data)
    .config(
      {axis: {
        labelFont: "Helvetica",
        labelFontSize: 10,
        titleFont: "Helvetica",
        titleFontSize: 14,
        titleFontWeight: "bold",
        background: "#ffffff"
      }})
    .encode(
        vl.y().fieldN("Platform").sort({ field: "Global_Sales", op: "median", order: "descending" }),
        vl.x().fieldQ("Global_Sales").aggregate("median").title("Median Global Sales (Millions)"), 
        vl.tooltip([{ field: "Platform", type: "nominal", title: "Platform" },
      { aggregate:"median", field:"Global_Sales" ,type: "quantitative", format: ".2f",title: "Median Sales (Millions)" }]),
        vl.color().value("#721a06")
    )
    .width("container")
    .height(300)
    .toSpec();

    //GENRE:Mode - counting which genre, which has the most/ is most common
     const genMode = vl
    .markBar()
    .data(data)
    .config(
      {axis: {
        labelFont: "Helvetica",
        labelFontSize: 10,
        titleFont: "Helvetica",
        titleFontSize: 14,
        titleFontWeight: "bold",
        background: "#ffffff"
      }})
    .encode(
     vl.y().fieldN("Genre").sort({ op: "count", order: "descending" }),
     vl.x().aggregate("count").type("quantitative").title("Number of Games"),
      vl.tooltip([
        { field: "Genre", type: "nominal", title: "Genre" },
        { aggregate: "count", title: "Games Released" }
      ]),
     vl.color().value("#7524f8")
    )
    .width("container")
    .height(300)
    .toSpec();

    //GENRE:Mean - comparing genres overall averaged sales, which genre is most popular 
    const genMean = vl
    .markBar()
    .data(data)
    .config(
      {axis: {
        labelFont: "Helvetica",
        labelFontSize: 10,
        titleFont: "Helvetica",
        titleFontSize: 11,
        titleFontWeight: "bold",
        background: "#ffffff"
      }})
    .encode(
        vl.y().fieldN("Genre").sort({ field: "Global_Sales", op: "mean", order: "descending" }),
        vl.x().fieldQ("Global_Sales").aggregate("mean").title("Mean Global Sales (Millions)"),
        vl.tooltip([{ field: "Genre", type: "nominal", title: "Genre" },
      { aggregate:"mean", field:"Global_Sales" ,type: "quantitative", format: ".2f",title: "Mean Sales (Millions)" }]),
      
        vl.color().value("#4d0cb4")
    )
    .width("container")
    .height(300)
    .toSpec();

    //GENRE:Median - order genres by median global sales, compare
    const genMedian = vl
    .markBar()
    .data(data)
    .config(
      {axis: {
        labelFont: "Helvetica",
        labelFontSize: 10,
        titleFont: "Helvetica",
        titleFontSize: 11,
        titleFontWeight: "bold",
        background: "#ffffff"
      }})
    .encode(
        vl.y().fieldN("Genre").sort({ field: "Global_Sales", op: "median", order: "descending" }),
        vl.x().fieldQ("Global_Sales").aggregate("median").title("Median Global Sales (Millions)"), 
        vl.tooltip([{ field: "Genre", type: "nominal", title: "Genre" },
      { aggregate:"median", field:"Global_Sales" ,type: "quantitative", format: ".2f",title: "Median Sales (Millions)" }]),
        vl.color().value("#270461")
    )
    .width("container")
    .height(300)
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
      vl.color().value("#e9ff21"),
      vl.tooltip([{ field: "Publisher", type: "nominal", title: "Publisher" },{ field: "count", type: "quantitative", title: "Number of Games" }])
    )
    .width("container")
    .height(200)
    .title({
      text:"Top 10 Publishers by Number of Games", 
      anchor: "middle"


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
        titleFontWeight: "bold",
        background: "#ffffff"
      }})
    .transform(
      vl.aggregate([{ op: "mean", field: "Global_Sales", as: "meanSales" }]).groupby(["Publisher"]),
      vl.window([{ op: "rank", as: "rank" }]).sort([{ field: "meanSales", order: "descending" }]),
      vl.filter("datum.rank <= 10")
     )
    .encode(
      vl.y().fieldN("Publisher").sort("-x").title("Publisher"),
      vl.x().fieldQ("meanSales").title("Mean Global Sales"),
      vl.tooltip([{ field: "Publisher", type: "nominal", title: "Publisher" },
      { field: "meanSales", type: "quantitative", title: "Mean Sales (Millions)" }]),
      vl.color().value("#afc206")
    )
    .width("container")
    .height(200)
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
        titleFontWeight: "bold",
        background: "#ffffff"
      }})
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
      vl.color().value("#646e02")
    )
    .width("container")
    .height(200)
    .toSpec()

    //YEAR: mode - which year had the most game releases 
    const yrMode = vl
    .markLine({ point: true })
    .data(data)
    .encode(
      vl.x().fieldT("Year").title("Year"),
      vl.y().aggregate("count").title("Number of Games Released"),
      vl.tooltip([
        { field: "Year", type: "temporal", title: "Year" },
        { aggregate: "count", title: "Games Released" }
      ]),
      vl.color().value("#e204ff")
    )
    .width("container")
    .height(300)
    .toSpec();

    //SALES: 


    //Global Sales by Genre and Platform
    // Vis 1.1 - Which genre of Nintendo DS games is the most globally successful?
   const DSGenre = vl
  .markBar()
  .data(data)
  .config(
      {axis: {
        labelFont: "Helvetica",
        labelFontSize: 10,
        titleFont: "Helvetica",
        titleFontSize: 14,
        titleFontWeight: "bold",
        background: "#ffffff"
      }})
  .transform(
    vl.filter("datum.Platform === 'DS'")
  )
  .encode(
    vl.x()
      .fieldN("Genre")
      .title("Game Genre")
      .sort("-y"),

    vl.y()
      .aggregate("sum")
      .fieldQ("Global_Sales")
      .title("Total Global Sales (in Millions)"),

    vl.color()
      .value("#00d358"),

    vl.tooltip([
  { field: "Genre", type: "nominal", title: "Genre" },
  {
    field: "Global_Sales",
    type: "quantitative",
    aggregate: "sum",
    title: "Total Global Sales (in Millions)",
    format: ".2f"
  }
])
   
  )
  .width("container")
  .height(300)
  .title("Nintendo DS Global Sales by Genre")
  .toSpec();
   
  // Vis 1.2 - Which platforms sold the most Platform genre games globally?
  const platGlobal = vl
  .markBar()
  .data(data)
  .config(
      {axis: {
        labelFont: "Helvetica",
        labelFontSize: 10,
        titleFont: "Helvetica",
        titleFontSize: 14,
        titleFontWeight: "bold",
        background: "#ffffff"
      }})
  .transform(
    vl.filter("datum.Genre === 'Platform'")
  )

  .encode(
    vl.x()
      .fieldN("Platform")
      .title("Gaming Platform")
      .sort("-y"),

    vl.y()
      .aggregate("sum")
      .fieldQ("Global_Sales")
      .title("Total Global Sales (in Millions)"),

    vl.color()
      .value("#00d358"),

    vl.tooltip([
  { field: "Platform", type: "nominal", title: "Platform" },
  {
    field: "Global_Sales",
    type: "quantitative",
    aggregate: "sum",
    title: "Total Global Sales (in Millions)",
    format: ".2f"
  }
])
   
  )
  .width("container")
  .height(300)
  .title("Nintendo DS Global Sales by Genre")
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
  render("#yearMode", yrMode);
  render("#dsGenre", DSGenre);
  render("#platformGlobal", platGlobal);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
