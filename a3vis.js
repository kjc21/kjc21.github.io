// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("./a3dataset/videogames_wide.csv");
  return data;
}



fetchData().then(async (data) => {

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

//Sales Over Time by Platform and Genre
// Vis 2.1 - How has global game sales changed over time across major platforms (major platforms = top 5 based on count/ number of games released)
  const platSalesTime = vl
  .markLine({point:false})
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
    vl.filter("datum.Platform === 'DS' || datum.Platform === 'PS2'|| datum.Platform === 'PS3'|| datum.Platform === 'Wii'|| datum.Platform === 'X360'")
  )
  .encode(
    vl.x().fieldT("Year").title("Release Year"),
    vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in Millions)"),
    vl.color().fieldN("Platform").title("Platform"),
    vl.tooltip([
      { field: "Year", type: "temporal", title: "Year" }, 
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
  .title("Global Game Sales Over Time by Platform")
  .toSpec();

// Vis 2.2 - How have global sales trends changed across genres over time?
const genSalesTime = vl
  .markArea({ interpolate: "monotone" })
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
    vl.filter("datum.Genre === 'Action' || datum.Genre === 'Sports' || datum.Genre === 'Misc' || datum.Genre === 'Role-Playing'|| datum.Genre === 'Shooter'")
  )
  .encode(
    vl.x().fieldT("Year").title("Release Year"),
    vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in Millions)"),
    vl.color().fieldN("Genre").title("Genre"),
    vl.tooltip([
      { field: "Year", type: "temporal", title: "Year" }, 
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
  .title("Global Game Sales Over Time by Genre")
  .toSpec();

//Regional Sales vs. Platform
  //Viz 3.1 - Which platforms perform best in different regions (NA, EU, JP, Other)
  const regSalesPlatform = vl
  .markBar({tooltip: true})
  .data(data)
  .transform(
    vl.fold(["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"]).as("Region", "Sales"),
    vl.aggregate([{ op: "sum", field: "Sales", as: "Total_Sales" }]).groupby(["Platform", "Region"])
  )

  .encode(
     vl.x().fieldN("Platform").title("Platform"),
    vl.y().fieldN("Region").title("Region"),
    vl.color().fieldQ("Total_Sales").title("Total Sales (Millions)").scale({ scheme: "greens" }),
    vl.tooltip([
      { field: "Platform", type: "nominal", title: "Platform" },
      { field: "Region", type: "nominal", title: "Region" },
      { field: "Total_Sales", type: "quantitative", title: "Total Sales (Millions)", format: ".2f" }
    ])
  )
  .width("container")
  .height(550)
  .title("Regional Sales by Platform")
  .toSpec();

  //Viz 3.2 - Which genres perform best in different regions (NA, EU, JP, Other)
   const regSalesGenre = vl
  .markBar({tooltip: true})
  .data(data)
  .transform(
    vl.fold(["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"]).as("Region", "Sales"),
    vl.aggregate([{ op: "sum", field: "Sales", as: "Total_Sales" }]).groupby(["Genre", "Region"])
  )

  .encode(
     vl.x().fieldN("Genre").title("Genre"),
    vl.y().fieldN("Region").title("Region"),
    vl.color().fieldQ("Total_Sales").title("Total Sales (Millions)").scale({ scheme: "greens" }),
    vl.tooltip([
      { field: "Genre", type: "nominal", title: "Genre" },
      { field: "Region", type: "nominal", title: "Region" },
      { field: "Total_Sales", type: "quantitative", title: "Total Sales (Millions)", format: ".2f" }
    ])
  )
  .width("container")
  .height(550)
  .title("Regional Sales by Genre")
  .toSpec();

  //My Narrative - Looking deeper into Japan Region and its trends
  //Viz 4.1 - How do Nintendo-published games perform by genre in Japan?
  const ninJPGenres = vl
  .markBar()
  .data(data)
  .transform(
    vl.filter("datum.Publisher === 'Nintendo'"),
    vl.filter("datum.JP_Sales > 0")
  )

  .encode(
    vl.x().fieldN("Genre").sort("-y").title("Genre"),
    vl.y().fieldQ("JP_Sales").aggregate("sum").title("Total Sales in Japan (Millions)"),
    vl.color().fieldN("Genre").legend(null),
    vl.tooltip([
      { field: "Genre", type: "nominal", title: "Genre" },
      { field: "JP_Sales", aggregate: "sum" ,type: "quantitative", title: "Total JP Sales (Millions)", format: ".2f"}
    ])
  )

  .width("container")
  .height(350)
  .title("Nintendo Games Sales by Genre in Japan")
  .toSpec();

  //Viz 4.2 - How do Nintendoplatforms perform by in Japan?
  const ninJPPlatform = vl
  .markBar()
  .data(data)
  .transform(
    vl.filter("datum.Publisher === 'Nintendo'"),
    vl.filter("datum.JP_Sales > 0")
  )

  .encode(
    vl.x().fieldN("Platform").sort("-y").title("Platform"),
    vl.y().fieldQ("JP_Sales").aggregate("sum").title("Total Sales in Japan (Millions)"),
    vl.color().value("#E60012"),
    vl.tooltip([
      { field: "Platform", type: "nominal", title: "Platform" },
      { field: "JP_Sales", aggregate: "sum" ,type: "quantitative", title: "Total JP Sales (Millions)", format: ".2f"}
    ])
   )
  .width("container")
  .height(380)
  .title("Nintendo Game Sales by Platform in Japan")
  .toSpec();


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
  render("#platformSalesTime", platSalesTime);
  render("#genreSalesTime", genSalesTime);
  render("#regionalSalesPlatform", regSalesPlatform);
  render("#regionalSalesGenre", regSalesGenre);
  render("#nintendoJPSales", ninJPGenres);
  render("#nintendoJPPlatform", ninJPPlatform);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
