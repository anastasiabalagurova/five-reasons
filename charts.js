const margin = {
    top: 20,
    right: 25,
    bottom: 45,
    left: 0
  },
  width = 700 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

  function drawSvg(){
  for(i=1;i<6;i++){
    d3.select(`#chart${i}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewport", "0 0" + " " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin meet")
  }
}



  function drawChart1(){

    const svg = d3.select("#chart1")
    .select("svg")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  
// Parse the Data
d3.csv("data/chart1.csv").then(function (data) {
    

  // Add X axis
  const x = d3.scaleLinear()
  .domain([0,100])
  .range([0,width-100]);

// Y axis
const y = d3.scaleBand()
  .range([0,height])
  .domain(data.map(d => d.Country))
  .padding(0.1);
 






// Bars
svg.selectAll("myRect")
.data(data)
.join("rect")
.attr("class","myRect")
.attr("x", x(0)+100)
.attr("y", d => y(d.Country))
.attr("width", d => x(0))
.attr("height", y.bandwidth())
.attr("fill", "#E6E9EF")
.attr("id", (d, i) => {
  return "barCountry" + i
})
  .transition()
  .duration(800)
  .attr("width", d => x(d.Value)) // always equal to 0
  .attr("x", d => x(0)+100)
  .delay((d, i) => {
    return i * 100
  })



//   //labels
svg.selectAll(".labelCountry")
.data(data)
.join("text")
.text(function (d) {
 return (d.Value) +"%";
})
.attr("x", function (d) {
 return x(parseFloat(d.Value)) + 120;

})
.attr("y", function (d) {
  return y(d.Country) + y.bandwidth() / 2 +3;
})
.attr("font-family", "Montserrat")
.style("opacity", 0)
.attr("font-size", "10px")
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
var yAxis  = svg.append("g")
.attr("class","yaxis")
.attr("transform", "translate(100 0)")
.call(d3.axisLeft(y).tickSize(0))
.style("font-family","Montserrat")


d3.select("#chart1")
.selectAll(".tick")
.selectAll("text")
.attr("transform","translate(-3 0)")




d3.select("#labelCountryRed7")
    .attr("fill", "#E30613")
    .style("font-weight","600")


    d3.select("#barCountry7")
    .attr("fill", "#E30613");

    d3.selectAll(".tag").style("color","var(--grey2)")
    d3.select("#tag1").style("color","var(--red)")


    
    






})
}
  
function updateChart1() {
 d3.csv("data/chart1.csv").then(function (data) {

d3.select("#chartTitle1")
.html("Доля топ-5 ритейлеров, 2021, % <span class='tooltip'><img src='images/iconI.svg'><span class='tooltiptext source'>Источник: Euromonitor, Infoline, анализ Компании, 2021</span></span>")

  const xSorted = d3.scaleLinear()
  .domain([0,100])
  .range([0,width-100]);

  const ySorted = d3.scaleBand()
  .range([0,height])
  .domain((data.sort((a,b) => d3.descending(a.Value2, b.Value2)).map(d => d.Country))) 
  .padding(0.1);

 const svg = d3.select("#chart1")
    .selectAll(".myRect")
    .transition()
    .duration(800)
    .attr("width", d => xSorted(d.Value2)) 
    .attr("y", (d) => ySorted(d.Country))


    d3.selectAll(".labelCountry")
    .text(function (d) {
      return (d.Value2) +"%";
     })
    .transition()
    .duration(800)
    .attr("x", function (d) {
      return xSorted(parseFloat(d.Value2)) + 120;
     })
    .attr("y", (d,i) => ySorted(d.Country) + ySorted.bandwidth() / 2 +3)
    
    

  d3.select(".yaxis")
    .transition()
    .duration(800)
    .call(d3.axisLeft(ySorted).tickSize(0))    
 })
     }

 function returnChart1() {
      d3.csv("data/chart1.csv").then(function (data) {
     
     d3.select("#chartTitle1")
     .html("Доля современного ритейла, 2021, % <span class='tooltip'><img src='images/iconI.svg'><span class='tooltiptext source'>Источник: Euromonitor, 2021</span></span>")
     
         // Add X axis
  const x = d3.scaleLinear()
  .domain([0,100])
  .range([0,width-100]);

// Y axis
const y = d3.scaleBand()
  .range([0,height])
  .domain(data.map(d => d.Country))
  .padding(0.1);
 
     
      const svg = d3.select("#chart1")
         .selectAll(".myRect")
         .transition()
         .duration(800)
         .attr("width", d => x(d.Value)) // always equal to 0
         .attr("y", (d) => y(d.Country))
     
     
         d3.selectAll(".labelCountry")
         .text(function (d) {
           return (d.Value) +"%";
          })
         .transition()
         .duration(800)
         .attr("x", function (d) {
           return x(parseFloat(d.Value)) + 120;
          })
         .attr("y", (d) => y(d.Country) + y.bandwidth() / 2 +3)
         
         
     
       d3.select(".yaxis")
         .transition()
         .duration(800)
         .call(d3.axisLeft(y).tickSize(0))    
      })
          }

  function drawChart2(){

    const svg = d3.select("#chart2")
    .select("svg")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
// Parse the Data
d3.csv("data/chart2.csv").then(function (data) {
    
  // Add Y axis
  const y = d3.scaleLinear()
  .domain([0, 20])
  .range([height, 0]);
// svg.append("g")
//   .call(d3.axisLeft(y));

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
    return (d.Value2 + "%");
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
  return (d.Value + "%");
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
.attr("id", (d,i) => {return "axisXlabel" + i})
.style("text-anchor", "end")
.style('font-family', 'Montserrat');


d3.select("#labelRed2")
    .attr("transform", "translate(-13 0)");

    d3.select("#labelGrey2")
    .attr("transform", "translate(-2 -7)");

    d3.selectAll(".tag").style("color","var(--grey2)")
    d3.select("#tag2").style("color","var(--red)")

})
}

  
  function drawChart3(){

    const svg = d3.select("#chart3")
    .select("svg")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  
  // Parse the Data
    d3.csv("data/chart3.csv").then(function (data) {
    

        // Add Y axis
        const y = d3.scaleLinear()
        .domain([0,26077])
        .range([height, 0]);

    
      // X axis
      const x = d3.scaleBand()
        .range([0, width/2])
        .domain(data.map(d => d.Year))
        .padding(0.2)
    

// tooltip


  // const tooltip = d3.select("#chart3")
    // .append("div")
    // .html("hello")
    // .style("opacity", 0)
    // .attr("class", "chartTooltip")

  // // Three function that change the tooltip when user hover / move / leave a cell
  // const mouseover = function(event, d) {
  //   // const subgroupName = d3.select(this.parentNode).datum().key;
  //   const gross = d.Value2;
  //   tooltip
  //       .html("Количество открытых магазинов (gross)" + "<span class = 'toopltipNumber'>" + gross + "</span")
  //       .style("opacity", 1)

  // }
  // const mousemove = function(event, d) {
  //   tooltip.style("transform","translateY(-55%)")
  //          .style("left",(event.x)/2+"px")
  //          .style("top",(event.y)/2- height +"px")
  // }
  // const mouseleave = function(event, d) {
  //   tooltip
  //     .style("opacity", 0)
  // }


  const tip = d3
  .select("body")
  .append("div")
  .attr("class", "tip")
  .style("position", "fixed")
  .style("z-index", "10")
  .style("opacity", "0")

      // Bars
      svg.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.Year))
        .attr("width", x.bandwidth())
        .attr("fill", "#E6E9EF")
        .attr("y", d => y(0))
        .attr("height", d => height - y(0))
        .on("mouseover", function (event, d) {
          d3.select(".tip")
            .html("Количество открытых магазинов (gross)" +  "<span class = 'toopltipNumber'>" + d.Value4 + "</span>")
            .style("left", `${event.clientX}px`)
            .style("top", `${event.clientY}px`)
            .style("opacity", 1);
        })
        .on("mouseout", function () {
          tip.style("opacity", 0);
        })
        

        // .transition()
        // .duration(500)
        // .style("opacity", 1)
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
        .html("<img src='images/iconInt.svg'><span class='intLabelText'>Наведите на график</span>")
        .classed("interactivitylabel",true)

     

        //labels
     svg.selectAll(".label")
     .data(data)
     .join("text")
     .text(function (d) {
       return (d.Value3);
     })
     .attr("x", function (d) {
       return x(d.Year) + x.bandwidth() / 2;
     })
     .attr("y", function (d) {
       return y(parseFloat(d.Value)) - 10;
     })
     .attr("font-family", "Montserrat")
     .style("opacity", 0)
     .attr("font-size", "10px")
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
   .attr("id", (d,i) => {return "axisXlabel" + i})
   .style("text-anchor", "end")
   .style('font-family', 'Montserrat');


   //change color of the active tag
   d3.selectAll(".tag").style("color","var(--grey2)")
   d3.select("#tag3").style("color","var(--red)")

    })
  }


function drawChart4(){

  const svg = d3.select("#chart4")
  .select("svg")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);


// Parse the Data
  d3.csv("data/chart4.csv").then(function (data) {

     // Add Y axis
     const y = d3.scaleLinear()
     .domain([0, 17])
     .range([height, 0]);
   // svg.append("g")
   //   .call(d3.axisLeft(y));
 
   // X axis
   const x = d3.scaleBand()
     .range([0, width/2])
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
    return (d.Value) + "%";
  })
  .attr("x", function (d) {
    return x(d.Year) + x.bandwidth() / 2;
  })
  .attr("y", function (d) {
    return y(parseFloat(d.Value)) - 10;
  })
  .attr("font-family", "Montserrat")
  .style("opacity", 0)
  .attr("font-size", "10px")
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
.attr("id", (d,i) => {return "axisXlabel" + i})
.style("text-anchor", "end")
.style('font-family', 'Montserrat');
  

d3.selectAll(".tag").style("color","var(--grey2)")
d3.select("#tag4").style("color","var(--red)")

  })
}




function drawChart5(){

  const svg = d3.select("#chart5")
  .select("svg")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top+20})`);

// Parse the Data
  d3.csv("data/chart5.csv").then(function (data) {
    
    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 50])
    .range([height, 100]);

  // X axis
  const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.Year))
    .padding(0.2)


  const y2 = d3.scaleLinear()
    .domain([0, 15])
    .range([height, 0]);

  // Bars
  svg.selectAll("#mybar5")
    .data(data)
    .join("rect")
    .attr("x", d => x(d.Year))
    .attr("width", x.bandwidth())
    .attr("id","mybar5")
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
      return y2(parseFloat(d.Value2)) - 180;
    });


  //Red line
  svg.append("path")
    .datum(data)
    .attr("class", "Redline")
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "#E30613")
    .attr("stroke-width", 1)
    .classed("lineAnimation",true)
    

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
    .attr("cy", d => y2(parseFloat(d.Value2)) - 180) // center y through your yScale
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
      return (d.Value);
    })
    .attr("x", function (d) {
      return x(d.Year) + x.bandwidth() / 2;
    })
    .attr("y", function (d) {
      return y(parseFloat(d.Value)) - 10;
    })
    .attr("font-family", "Montserrat")
    .style("opacity", 0)
    .attr("font-size", "10px")
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
      return (d.Value2 + "%");
    })
    .attr("x", function (d) {
      return x(d.Year) + x.bandwidth() / 2;
    })
    .attr("y", function (d) {
      return y2(parseFloat(d.Value2)) - 190;
    })
    .attr("font-family", "Montserrat")
    .attr("font-size", "10px")
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
.attr("id", (d,i) => {return "axisXlabel" + i})
.style("text-anchor", "end")
.style('font-family', 'Montserrat');


d3.select("#axisXlabel13")
    .attr("transform", "translate(20 5)")


  d3.selectAll(".tag").style("color","var(--grey2)")
  d3.select("#tag5").style("color","var(--red)")
  
  })
}





drawSvg()




  



