let triggerStatus = {
  "chart1": false,
  "chart2": false,
  "chart3": false,
  "chart4": false,
  "chart5": false
};

// using d3 for convenience
var body = document.querySelector("body");
var scrolly = body.querySelector(".scrolly");
var sticky = scrolly.querySelector(".sticky-thing");
var article = scrolly.querySelector("article");
var steps = article.querySelectorAll(".step");


let elemH = 450;
let elemW = 700;

let docLang = document.documentElement.lang;

let margin = {},
  width = 0,
  height = 0;
let xOffsetChart = 0;
const setOptions = () => {
  if (window.innerWidth < 767) {
    margin = {
      top: 30,
      right: 0,
      bottom: 20,
      left: 0
    };
    elemH = 352;
    elemW = 335;
    xOffsetChart = 0;
  } else {
    margin = {
      top: 20,
      right: 0,
      bottom: 65,
      left: 0
    };
    elemH = 450;
    elemW = 700;
    xOffsetChart = 20;
  }
  width = elemW - margin.left - margin.right,
  height = elemH - margin.top - margin.bottom;
}
setOptions();
window.addEventListener('resize', setOptions);

//Draw SVG
function drawSvg() {
  for (i = 1; i < 6; i++) {
    d3.select(`#chart${i}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", "0 0" + " " + elemW + " " + height)
  }
}

// Number format

const formatEn = d3.format(",.5r")
const format2En = d3.format(",.4r")


function drawChart1() {
  const svg = d3.select("#chart1")
    .select("svg")
    .append("g");

  // Parse the Data
  d3.csv("data/chart1.csv").then(function (data) {

    // Add X axis
    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width - 115]);

    // Y axis

    const y = d3.scaleBand()
      .range([0, height])
      .domain(data.map(d => d.Country))
      .padding(0.1);


    const yEn = d3.scaleBand()
      .range([0, height])
      .domain(data.map(d => d.CountryEn))
      .padding(0.1);



    // Bars
    svg.selectAll("myRect")
      .data(data)
      .join("rect")
      .attr("class", "myRect")
      .attr("x", x(0) + 100 + xOffsetChart)
      .attr("y", function (d) {
        if (docLang == "ru") return y(d.Country)
        if (docLang == "en") return yEn(d.CountryEn)
      })
      .attr("width", d => x(0))
      .attr("height", function (d) {
        if (docLang == "ru") return y.bandwidth()
        if (docLang == "en") return yEn.bandwidth()
      })

      .attr("fill", "#E6E9EF")
      .attr("id", (d, i) => {
        return "barCountry" + i
      })
      .transition()
      .duration(800)
      .attr("width", d => x(d.Value)) // always equal to 0
      .attr("x", d => x(0) + 100 + xOffsetChart)
      .delay((d, i) => {
        return i * (100 + xOffsetChart)
      })

    //labels
    svg.selectAll(".labelCountry")
      .data(data)
      .join("text")
      .text(function (d) {
        return (d.Value) + "%";
      })
      .attr("x", function (d) {
        return x(parseFloat(d.Value)) + 120 + xOffsetChart;

      })
      .attr("y", function (d) {
        if (docLang == "ru") return y(d.Country) + y.bandwidth() / 2 + 3;
        if (docLang == "en") return yEn(d.CountryEn) + yEn.bandwidth() / 2 + 3;
      })
      .attr("font-family", "Montserrat")
      .style("opacity", 0)
      .attr("font-size", "12px")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .classed("labelCountry", true)
      .attr("id", (d, i) => {
        return "labelCountryRed" + i
      })

      .transition()
      .duration(1200)
      .style("opacity", 1)
      .delay((d, i) => {
        return i * 130
      })



    // //draw Y axis
    var yAxis = svg.append("g")
      .attr("class", "yaxis")
      .attr("transform", `translate(${100 + xOffsetChart} 0)`)

      .style("font-family", "Montserrat")

    if (docLang == "ru") yAxis.call(d3.axisLeft(y).tickSize(0))
    if (docLang == "en") yAxis.call(d3.axisLeft(yEn).tickSize(0))

    d3.select("#chart1")
      .selectAll(".tick")
      .selectAll("text")
      .attr("transform", "translate(-3 0)")

    d3.select("#labelCountryRed7")
      .attr("fill", "#E30613")
      .style("font-weight", "600")

    d3.select("#barCountry7")
      .attr("fill", "#E30613");
  })
}

function updateChart1() {
  d3.csv("data/chart1.csv").then(function (data) {



    const chartDesc = document.querySelector('#chartTitle1 .chartDesc');
    const chartSource = document.querySelector('#chartTitle1 .source');


    if (docLang == "ru") {
      chartDesc.textContent = 'Доля топ-5 ритейлеров, 2021, % ';
      chartSource.textContent = 'Источник: Euromonitor, Infoline, анализ Компании, 2021';

    }
    if (docLang == "en") {
      chartDesc.textContent = 'Share of top-5 players in grocery retail, 2021, %';
      chartSource.textContent = 'Source: Euromonitor, Infoline, Magnit analysis, 2021';
    }

    const xSorted = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width - 115]);


    const ySorted = d3.scaleBand()
      .range([0, height])
      .domain((data.sort((a, b) => d3.descending(a.Value2, b.Value2)).map(d => d.Country)))
      .padding(0.1);

    const ySortedEn = d3.scaleBand()
      .range([0, height])
      .domain((data.sort((a, b) => d3.descending(a.Value2, b.Value2)).map(d => d.CountryEn)))
      .padding(0.1);

    const svg = d3.select("#chart1")
      .selectAll(".myRect")
      .transition()
      .duration(800)
      .style("opacity", 1)
      .attr("width", d => xSorted(d.Value2))
      .attr("y", function (d) {
        if (docLang == "ru") {
          return ySorted(d.Country)
        }
        if (docLang == "en") {
          return ySortedEn(d.CountryEn)
        }
      })


    d3.selectAll(".labelCountry")
      .text(function (d) {
        return (d.Value2) + "%";
      })
      .transition()
      .duration(800)
      .attr("x", function (d) {
        return xSorted(parseFloat(d.Value2)) + 120 + xOffsetChart;
      })
      .attr("y", function (d, i) {
        if (docLang == "ru") {
          return ySorted(d.Country) + ySorted.bandwidth() / 2 + 3
        }
        if (docLang == "en") {
          return ySortedEn(d.CountryEn) + ySortedEn.bandwidth() / 2 + 3
        }
      })

    d3.select(".yaxis")
      .transition()
      .duration(800)

    if (docLang == "ru") d3.select(".yaxis").call(d3.axisLeft(ySorted).tickSize(0))
    if (docLang == "en") d3.select(".yaxis").call(d3.axisLeft(ySortedEn).tickSize(0))


  })
}

function returnChart1() {
  d3.csv("data/chart1.csv").then(function (data) {
    const chartDesc = document.querySelector('#chartTitle1 .chartDesc');
    const chartSource = document.querySelector('#chartTitle1 .source');


    if (docLang == "ru") {
      chartDesc.textContent = 'Доля современного ритейла, 2021, % ';
      chartSource.textContent = 'Источник: Euromonitor, 2021';

    }
    if (docLang == "en") {
      chartDesc.textContent = 'Modern retail share in grocery retail, 2021, %';
      chartSource.textContent = 'Source: Euromonitor, 2021';
    }



    // Add X axis
    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width - 115]);

    // Y axis
    const y = d3.scaleBand()
      .range([0, height])
      .domain(data.map(d => d.Country))
      .padding(0.1);

    const yEn = d3.scaleBand()
      .range([0, height])
      .domain(data.map(d => d.CountryEn))
      .padding(0.1);


    const svg = d3.select("#chart1")
      .selectAll(".myRect")
      .transition()
      .duration(800)
      .attr("width", d => x(d.Value)) // always equal to 0
      .attr("y", function (d, i) {
        if (docLang == "ru") {
          return y(d.Country)
        }
        if (docLang == "en") {
          return yEn(d.CountryEn)
        }
      })


    d3.selectAll(".labelCountry")
      .text(function (d) {
        return (d.Value) + "%";
      })
      .transition()
      .duration(800)
      .style("opacity", 1)
      .attr("x", function (d) {
        return x(parseFloat(d.Value)) + 120 + xOffsetChart;
      })
      .attr("y", function (d, i) {
        if (docLang == "ru") {
          return y(d.Country) + y.bandwidth() / 2 + 3
        }
        if (docLang == "en") {
          return yEn(d.CountryEn) + y.bandwidth() / 2 + 3
        }
      })



    d3.select(".yaxis")
      .transition()
      .duration(800)

    if (docLang == "ru") d3.select(".yaxis").call(d3.axisLeft(y).tickSize(0))
    if (docLang == "en") d3.select(".yaxis").call(d3.axisLeft(yEn).tickSize(0))
  })
}

async function drawChart2() {

  const locale = await d3.json("https://cdn.jsdelivr.net/npm/d3-format@3/locale/ru-RU.json");
  d3.formatDefaultLocale(locale);
  const f = d3.format(",")

  const svg = d3.select("#chart2")
    .select("svg")
    .append("g");

  // Parse the Data
  d3.csv("data/chart2.csv").then(function (data) {

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 20])
      .range([height, 0]);

    // X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.Year))
      .padding(0.2)


    //Red line
    var lineGeneratorRed = d3.line()
      .x(function (d) {
        return x(d.Year) + x.bandwidth() / 2;
      })
      .y(function (d) {
        return y(parseFloat(d.Value2));
      });


    //Grey line
    var lineGeneratorGrey = d3.line()
      .x(function (d) {
        return x(d.Year) + x.bandwidth() / 2;
      })
      .y(function (d) {
        return y(parseFloat(d.Value));
      });


    //Red line
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", lineGeneratorRed)
      .attr("fill", "none")
      .attr("stroke", "#E30613")
      .style("opacity", 0)
      .attr("stroke-width", 1)
      .classed("lineAnimation", true)
      .transition()
      .duration(800)
      .style("opacity", 1)

    svg.selectAll(".circlesRed")
      .data(data)
      .join("circle") // enter append
      .attr("class", "circlesRed")
      .attr("r", "0") // radius
      .style("opacity", 0)
      .attr("fill", "#E30613")
      .style("stroke-width", 1)
      .attr("stroke", "#fff")
      .attr("cx", d => x(d.Year) + x.bandwidth() / 2) // center x passing through your xScale
      .attr("cy", d => y(parseFloat(d.Value2))) // center y through your yScale
      .transition()
      .duration(1600)
      .style("opacity", 1)
      .attr("r", "3")
      .delay((d, i) => {
        return i * 130
      })

    //Grey line
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", lineGeneratorGrey)
      .attr("fill", "none")
      .attr("stroke", "#a4a9b4")
      .style("opacity", 0)
      .attr("stroke-width", 1)
      .classed("lineAnimation", true)
      .transition()
      .duration(800)
      .style("opacity", 1)

    svg.selectAll(".circlesGrey")
      .data(data)
      .join("circle") // enter append
      .attr("class", "circlesGrey")
      .attr("r", "0") // radius
      .style("opacity", 0)
      .attr("fill", "#a4a9b4")
      .style("stroke-width", 1)
      .attr("stroke", "#fff")
      .attr("cx", d => x(d.Year) + x.bandwidth() / 2) // center x passing through your xScale
      .attr("cy", d => y(parseFloat(d.Value))) // center y through your yScale
      .transition()
      .duration(1600)
      .style("opacity", 1)
      .attr("r", "3")
      .delay((d, i) => {
        return i * 130
      })


    //labels Red dots
    svg.selectAll(".labelRed")
      .data(data)
      .join("text")
      .text(function (d) {
        if (docLang == "ru") return f(d.Value2) + "%";
        if (docLang == "en") return d.Value2 + "%";
      })
      .attr("x", function (d) {
        return x(d.Year) + x.bandwidth() / 2;
      })
      .attr("y", function (d) {
        return y(parseFloat(d.Value2)) - 10;
      })
      .style("opacity", 0)
      .classed("labelRed", true)
      .attr("id", (d, i) => {
        return "labelRed" + i
      })
      .transition()
      .duration(1200)
      .style("opacity", 1)
      .delay((d, i) => {
        return i * 200
      })


    //labels Grey dots
    svg.selectAll(".labelGrey")
      .data(data)
      .join("text")
      .text(function (d) {
        if (docLang == "ru") return f(d.Value) + "%";
        if (docLang == "en") return d.Value + "%";
      })
      .attr("x", function (d) {
        return x(d.Year) + x.bandwidth() / 2;
      })
      .attr("y", function (d) {
        return y(parseFloat(d.Value)) - 10;
      })
      .style("opacity", 0)
      .classed("labelGrey", true)
      .attr("id", (d, i) => {
        return "labelGrey" + i
      })
      .transition()
      .duration(1200)
      .style("opacity", 1)
      .delay((d, i) => {
        return i * 200
      })



    //draw x axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .attr("transform", "translate(10 5)")
      .attr("id", (d, i) => {
        return "axisXlabel" + i
      })
      .style("text-anchor", "end")
      .style('font-family', 'Montserrat');


    d3.select("#labelRed2")
      .attr("transform", "translate(-13 0)");

    d3.select("#labelGrey2")
      .attr("transform", "translate(-2 -7)");

  })
}

async function drawChart3() {

  const locale = await d3.json("https://cdn.jsdelivr.net/npm/d3-format@3/locale/ru-RU.json");
  d3.formatDefaultLocale(locale);
  const f = d3.format(",.5r");
  const f2 = d3.format(",");

  const svg = d3.select("#chart3")
    .select("svg")
    .append("g");

  // Parse the Data
  d3.csv("data/chart3.csv").then(function (data) {


    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 26077])
      .range([height, 0]);


    // X axis
    let range = width / 2;
    if (window.innerWidth < 767) {
      range = width;
    }
    const x = d3.scaleBand()
      .range([0, range])
      .domain(data.map(d => d.Year))
      .padding(0.2)


    const tip = d3
      .select("body")
      .append("div")
      .attr("class", "tip")
      .style("position", "fixed")
      .style("z-index", "100")
      .style("opacity", "0")

    let eventName = "mouseover";
    let intLabelText;
    if (docLang == "ru") intLabelText = "Наведите на график";
    if (docLang == "en") intLabelText = "Hover over the chart";

    if (window.innerWidth < 767) {
      eventName = "click";
      document.addEventListener('scroll', () => {
        tip.style("opacity", 0);
      });

      if (docLang == "ru") intLabelText = "Нажмите на график";
      if (docLang == "en") intLabelText = "Hover over the chart";


    }
    // Bars
    svg.selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.Year))
      .attr("width", x.bandwidth())
      .attr("fill", "#E6E9EF")
      .attr("y", d => y(0))
      .attr("height", d => height - y(0))
      .on(eventName, function (event, d) {
        let left = document.querySelector('.tip').offsetWidth + event.clientX;
        let xValue = `${event.clientX}px`;
        if (left > window.innerWidth) {
          xValue = `${event.clientX - document.querySelector('.tip').offsetWidth}px`;
        }
        d3.select(".tip")
          .style("left", xValue)
          .style("top", `${event.clientY}px`)
          .style("opacity", 1);

        if (docLang == "ru") d3.select(".tip").html("Количество открытых магазинов (gross)" + "<span class = 'toopltipNumber'>" + f2(d.Value2) + "</span>")
        if (docLang == "en") d3.select(".tip").html("Number of opened stores (gross)" + "<span class = 'toopltipNumber'>" + format2En(d.Value2) + "</span>")

      })
      .on("mouseout", function () {
        tip.style("opacity", 0);
      })

      .transition()
      .duration(800)
      .attr("height", d => height - y(parseFloat(d.Value))) // always equal to 0
      .attr("y", d => y(parseFloat(d.Value)))
      .delay((d, i) => {
        return i * 100
      })

    //interactivity icon
    d3.select("#chart3")
      .append("div")
      .html("<img src='images/iconInt.svg'><span class='intLabelText'>" + intLabelText + "</span>")
      .classed("interactivitylabel", true)


    //labels
    svg.selectAll(".label")
      .data(data)
      .join("text")
      .text(function (d) {

        if (docLang == "ru") return f(d.Value);
        if (docLang == "en") return formatEn(d.Value);

      })
      .attr("x", function (d) {
        return x(d.Year) + x.bandwidth() / 2;
      })
      .attr("y", function (d) {
        return y(parseFloat(d.Value)) - 10;
      })
      .attr("font-family", "Montserrat")
      .style("opacity", 0)
      .attr("font-size", "12px")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .classed("label", true)
      .transition()
      .duration(1200)
      .style("opacity", 1)
      .delay((d, i) => {
        return i * 130
      })

    //draw x axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .attr("transform", "translate(10 5)")
      .attr("id", (d, i) => {
        return "axisXlabel" + i
      })
      .style("text-anchor", "end")
      .style('font-family', 'Montserrat');




  })
}

async function drawChart4() {
  const locale = await d3.json("https://cdn.jsdelivr.net/npm/d3-format@3/locale/ru-RU.json");
  d3.formatDefaultLocale(locale);
  const f = d3.format(",")

  const svg = d3.select("#chart4")
    .select("svg")
    .append("g");

  // Parse the Data
  d3.csv("data/chart4.csv").then(function (data) {

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 17])
      .range([height, 0]);

    // X axis
    let range = width / 2;
    if (window.innerWidth < 767) {
      range = width;
    }
    const x = d3.scaleBand()
      .range([0, range])
      .domain(data.map(d => d.Year))
      .padding(0.2)


    // Bars
    svg.selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.Year))
      .attr("width", x.bandwidth())
      .attr("fill", "#E6E9EF")
      .attr("y", d => y(0))
      .attr("height", d => height - y(0))
      .transition()
      .duration(800)
      .attr("height", d => height - y(parseFloat(d.Value))) // always equal to 0
      .attr("y", d => y(parseFloat(d.Value)))
      .delay((d, i) => {
        return i * 100
      })

    //labels
    svg.selectAll(".label")
      .data(data)
      .join("text")
      .text(function (d) {
        if (docLang == "ru") return f(d.Value) + "%";
        if (docLang == "en") return d.Value + "%";
      })
      .attr("x", function (d) {
        return x(d.Year) + x.bandwidth() / 2;
      })
      .attr("y", function (d) {
        return y(parseFloat(d.Value)) - 10;
      })
      .attr("font-family", "Montserrat")
      .style("opacity", 0)
      .attr("font-size", "12px")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .classed("label", true)
      .transition()
      .duration(1200)
      .style("opacity", 1)
      .delay((d, i) => {
        return i * 130
      })

    //draw x axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .attr("transform", "translate(10 5)")
      .attr("id", (d, i) => {
        return "axisXlabel" + i
      })
      .style("text-anchor", "end")
      .style('font-family', 'Montserrat');


  })
}

async function drawChart5() {

  const locale = await d3.json("https://cdn.jsdelivr.net/npm/d3-format@3/locale/ru-RU.json");
  d3.formatDefaultLocale(locale);
  const f = d3.format(",")
  const f2 = d3.format(".1f")


  const svg = d3.select("#chart5")
    .select("svg")
    .append("g");

  // Parse the Data
  d3.csv("data/chart5.csv").then(function (data) {

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 50])
      .range([height, 100]);

    const y2 = d3.scaleLinear()
      .domain([0, 9])
      .range([height, 150]);

    // X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.Year))
      .padding(0.2)


    // Bars
    svg.selectAll("#mybar5")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.Year))
      .attr("width", x.bandwidth())
      .attr("id", "mybar5")
      .attr("fill", "#E6E9EF")
      .attr("y", d => y(0))
      .attr("height", d => height - y(0))
      .transition()
      .duration(800)
      .attr("height", d => height - y(parseFloat(d.Value))) // always equal to 0
      .attr("y", d => y(parseFloat(d.Value)))
      .delay((d, i) => {
        return i * 100
      })


    //dots
    var lineGenerator = d3.line()
      .x(function (d) {
        return x(d.Year) + x.bandwidth() / 2;
      })
      .y(function (d) {
        return y2(parseFloat(d.Value2)) - 160
      });


    //Red line
    svg.append("path")
      .datum(data)
      .attr("class", "Redline")
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#E30613")
      .attr("stroke-width", 1)
      .classed("lineAnimation", true)


    svg.selectAll(".circles")
      .data(data)
      .join("circle") // enter append
      .attr("class", "circles")
      .attr("r", "0") // radius
      .style("opacity", 0)
      .attr("fill", "#E30613")
      .style("stroke-width", 1)
      .attr("stroke", "#fff")
      .attr("cx", d => x(d.Year) + x.bandwidth() / 2) // center x passing through your xScale
      .attr("cy", d => y2(parseFloat(d.Value2)) - 160) // center y through your yScale
      .transition()
      .duration(1600)
      .style("opacity", 1)
      .attr("r", "3")
      .delay((d, i) => {
        return i * 130
      })

    //labels
    svg.selectAll(".label")
      .data(data)
      .join("text")
      .text(function (d) {
        if (docLang == "ru") return f2(d.Value);
        if (docLang == "en") return d.Value;
      })
      .attr("x", function (d) {
        return x(d.Year) + x.bandwidth() / 2;
      })
      .attr("y", function (d) {
        return y(parseFloat(d.Value)) - 10;
      })
      .attr("font-family", "Montserrat")
      .style("opacity", 0)
      .attr("font-size", "12px")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .classed("label", true)
      .transition()
      .duration(1200)
      .style("opacity", 1)
      .delay((d, i) => {
        return i * 130
      })

    //labels Red dots
    svg.selectAll(".labelRed")
      .data(data)
      .join("text")
      .text(function (d) {
        if (docLang == "ru") return f(d.Value2) + "%";
        if (docLang == "en") return d.Value2 + "%";
      })
      .attr("x", function (d) {
        return x(d.Year) + x.bandwidth() / 2;
      })
      .attr("y", function (d) {
        return y2(parseFloat(d.Value2)) - 170;
      })
      .attr("font-family", "Montserrat")
      .attr("font-size", "12px")
      .attr("fill", "#E30613")
      .attr("text-anchor", "middle")
      .style("opacity", 0)
      .classed("labelRed", true)
      .attr("id", (d, i) => {
        return "labelRed" + i
      })
      .transition()
      .duration(1200)
      .style("opacity", 1)
      .delay((d, i) => {
        return i * 200
      })


    d3.select("#labelRed9")
      .attr("transform", "translate(-20 15)");

    d3.select("#labelRed5")
      .attr("transform", "translate(-5 0)");

    d3.select("#labelRed7")
      .attr("transform", "translate(3 0)");

    d3.select("#labelRed8")
      .attr("transform", "translate(-3 0)");

    d3.select("#labelRed13")
      .attr("transform", "translate(15 3)");


    //draw x axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .attr("transform", "translate(10 5)")
      .attr("id", (d, i) => {
        return "axisXlabel" + i
      })
      .style("text-anchor", "end")
      .style('font-family', 'Montserrat');
  })
}

// initialize the scrollama

const scrollamaRework = (element) => {
  let options = {
    threshold: 0,
  }
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateChart1()
      } else {
        if (entry.target.getBoundingClientRect().y > 0) {
          returnChart1()
        }
      }
    })
  }, options);
  observer.observe(element);
}
const stepTrigger = document.querySelector('#changeChart1');
scrollamaRework(stepTrigger);

function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggerStatus[element.id]) {
        triggerStatus[element.id] = true;
        callback(element);
      }
    });
  }).observe(element);
}
drawSvg();
const setVisible = () => {
  onVisible(document.querySelector("#chart1"), () => drawChart1());
  onVisible(document.querySelector("#chart2"), () => drawChart2());
  onVisible(document.querySelector("#chart3"), () => drawChart3());
  onVisible(document.querySelector("#chart4"), () => drawChart4());
  onVisible(document.querySelector("#chart5"), () => drawChart5());
}
setVisible();

const cleanCharts = () => {
  document.querySelector("#chart1").innerHTML = '';
  document.querySelector("#chart2").innerHTML = '';
  document.querySelector("#chart3").innerHTML = '';
  document.querySelector("#chart4").innerHTML = '';
  document.querySelector("#chart5").innerHTML = '';
  triggerStatus = {
    "chart1": false,
    "chart2": false,
    "chart3": false,
    "chart4": false,
    "chart5": false
  };
}

let isMobile = false;
const redrawCharts = () => {
  if (window.innerWidth < 767 && !isMobile) {
    isMobile = true;
    cleanCharts();
    drawSvg();
    setVisible();
  }
  if (window.innerWidth > 767 && isMobile) {
    isMobile = false;
    cleanCharts();
    drawSvg();
    setVisible();
  }
}
redrawCharts();
window.addEventListener('resize', redrawCharts);


const menuTags = document.querySelectorAll('.tag');
menuTags.forEach(tag => {
  tag.addEventListener('click', (e)=>{
    e.preventDefault();
    document.getElementById(`${tag.getAttribute('href').substring(1)}`).scrollIntoView({behavior: "smooth"});
  });
});
let lastIndex = -1;

function scrollSpy(selector) {
  let els = document.querySelectorAll(selector);
  els = Array.from(els);
  els.forEach((el, index) => {
    const options = {
      rootMargin: '0% 0% -50% 0%',
      threshold: 0,
    };
    const callback = (entries, observer) => {
      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          lastIndex = index;
        } else {
          if (entry.target.getBoundingClientRect().y > 0) {
            if (index - lastIndex <= 1) {
              lastIndex = index - 1;
            }
          }
        }
        menuTags.forEach(tag => {
          tag.style.color = 'var(--grey2)';
        });
        if (lastIndex >= 0) {
          menuTags[lastIndex].style.color = 'var(--red)';
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  });
}

scrollSpy('.chapter');



//fade-in animation

const svgsAnimate = document.querySelectorAll('.svgAnimate');
const sourceUrls = [];
let mobileLoaded = false;
let descLoaded = false;
svgsAnimate.forEach((element, index) => {
  let end = element.data.length - 4;
  let start = element.data.indexOf('/images/');
  let urlSource = element.data.substring(start, end)
  sourceUrls[index] = urlSource;
});

const resizeHandlerSvgs = () => {
  svgsAnimate.forEach((element, index) => {
    if (window.innerWidth < 767) {
      if (!mobileLoaded) {
        element.setAttribute("data", `.${sourceUrls[index]}-mob.svg`);
      }
    } else {
      if (!descLoaded) {
        element.setAttribute("data", `.${sourceUrls[index]}.svg`);
      }
    }

  });
  if (window.innerWidth < 767) {
    mobileLoaded = true;
    descLoaded = false;
  } else {
    mobileLoaded = false;
    descLoaded = true;
  }
}
resizeHandlerSvgs();
window.addEventListener('resize', resizeHandlerSvgs);

svgsAnimate.forEach(object => {
  object.addEventListener('load', function () {
    let svg = this.contentDocument.querySelector('svg');
    let svgIcons = svg.querySelectorAll('.svgIcon');
    const options = {
      threshold: 0.4
    }
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          svgIcons.forEach((element, index) => {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0rem)';
          });
          observer.unobserve(object);
        }
      })
    }, options);
    observer.observe(object);
  });
});


// rework fixed elements

const fixedObserver = (element, container, opt) => {
  let options = {
    threshold: 0
  }
  if (opt !== undefined) {
    options = opt;
  }
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        element.classList.add('fixed');
      } else {
        element.classList.remove('fixed');
      }
    })
  }, options);
  observer.observe(container);
}
// const contentContainer = document.querySelector('.content .tabContent');
// const backBtn = document.querySelector('.backWrapper');
// fixedObserver(backBtn, contentContainer, {
//   rootMargin: '-100% 0% 0% 0%',
//   threshold: 0
// });
const containerProject = document.querySelector('.containerProject');
const tagWrapper = document.querySelector('.tagWrapper');
fixedObserver(tagWrapper, containerProject, {
  rootMargin: '0% 0% -100% 0%',
  threshold: 0
});

const stickys = document.querySelectorAll('.sticky-thing-wrapper');

stickys.forEach((element, index) => {
  const wrapper = element.closest('.scrolly');

  
  document.addEventListener('scroll', stickyProgress);
  stickyProgress();
  function stickyProgress(){
    if(wrapper.getBoundingClientRect().top < 0 && wrapper.getBoundingClientRect().bottom - element.offsetHeight >= 0){
      element.classList.add('fixed');
      element.classList.remove('fixed-bottom');
    } else if(wrapper.getBoundingClientRect().top >= 0){
      element.classList.remove('fixed');
      element.classList.remove('fixed-bottom');
    }else {
      element.classList.add('fixed-bottom');
      element.classList.remove('fixed');
    }
  }
});


// burger menu

const tagBurger = document.querySelector('.tagBurger');
const tagList = document.querySelector('.tagList');
tagBurger.addEventListener('click', () => {
  tagBurger.classList.toggle('show');
  tagList.classList.toggle('show');
});

//tooltip popup

function setHeightDynamic() {
  var vh = window.innerHeight * 0.01;
  document.querySelector('html').style.setProperty('--vh', `${vh}px`);
}
setHeightDynamic();
const tooltipPopupInit = () => {
  const tooltips = document.querySelectorAll('.tooltip');
  const tooltipPopup = document.querySelector('.tooltipPopup');
  const tooltipPopupText = document.querySelector('.tooltipPopup .tooltipText');
  const tooltipClose = document.querySelector('.tooltipClose');
  const openPopup = (e) => {
    if (window.innerWidth < 767){
    tooltipPopupText.textContent = e.target.querySelector('.tooltiptext').textContent;
    tooltipPopup.classList.add('show');
    }
  }
  const closePopup = () => {
    tooltipPopup.classList.remove('show');
  }
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('click', openPopup);
  });
  tooltipClose.addEventListener('click', closePopup);
  // if (window.innerWidth < 767) {

  //   tooltips.forEach(tooltip => {
  //     tooltip.addEventListener('click', openPopup);
  //   });
  //   tooltipClose.addEventListener('click', closePopup);
  // } else {
  //   tooltips.forEach(tooltip => {
  //     tooltip.removeEventListener('click', openPopup);
  //   });
  //   tooltipClose.removeEventListener('click', closePopup);
  // }
}
tooltipPopupInit();
// window.addEventListener('resize', resizeHandler);