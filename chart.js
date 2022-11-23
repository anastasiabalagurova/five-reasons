// set the dimensions and margins of the graph
const margin = {top: 200, right: 30, bottom: 90, left: 0},
    width = 900 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#chart5")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // .attr("preserveAspectRatio", "xMinYMax meet")
    // .attr("viewBox", "0 0" + " " + width + " " + height)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("data/chart5.csv").then( function(data) {

  d3.select("#chart5")
  .append("h1")
  .html("Динамика <span class='redText'>дивидендной доходности</span> на конец периода")
  .classed("chartTitle", true);



// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 50])
  .range([ height, 0]);
// svg.append("g")
//   .call(d3.axisLeft(y));

    // X axis
    const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(d => d.Year))
    .padding(0.2)

    const y2 = d3.scaleLinear()
    .domain([0, 15])
    .range([ height, 0]);


// Bars
svg.selectAll("mybar")
  .data(data)
  .join("rect")
    .attr("x", d => x(d.Year))
    .attr("width", x.bandwidth())
    .attr("fill", "#E6E9EF")
    // no bar at the beginning thus:
    .attr("height", d => height - y(0)) // always equal to 0
    .attr("y", d => y(0))


//dots
var lineGenerator = d3.line()
.x(function (d) {
    return x(d.Year)+ x.bandwidth()/2;
})
.y(function (d) {
    return y2(parseFloat(d.Value2)) -200;
});


//Red line
svg.append("path")
    .datum(data)
    .attr("class","line")
    .attr("d",lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "#E30613")
    .style("opacity",0)
    .attr("stroke-width", 1)

    svg.selectAll(".circles")
    .data(data)
    .join("circle") // enter append
      .attr("class", "circles")
      .attr("r", "0") // radius
      .attr("fill", "#E30613")
      .attr("cx", d=> x(d.Year) + x.bandwidth()/2)   // center x passing through your xScale
      .attr("cy", d=> y2(parseFloat(d.Value2)) - 200)   // center y through your yScale

 

//labels
svg.selectAll(".label") 
.data(data)
.join("text")
    .text(function(d) { 
        return (d.Value);
    })
    .attr("x", function(d){
        return x(d.Year) + x.bandwidth()/2;
    })
    .attr("y", function(d){
        return y(parseFloat(d.Value)) - 10;
    })
    .attr("font-family" , "Montserrat")
    .style("opacity",0)
    .attr("font-size" , "12px")
    .attr("fill" , "black")
    .attr("text-anchor", "middle")
    .classed("label",true)


    //labels Red dots
    svg.selectAll(".labelRed") 
    .data(data)
    .join("text")
        .text(function(d) { 
            return (d.Value2 + "%");
        })
        .attr("x", function(d){
            return x(d.Year) + x.bandwidth()/2;
        })
        .attr("y", function(d){
            return y2(parseFloat(d.Value2)) - 210;
        })
        .attr("font-family" , "Montserrat")
        .attr("font-size" , "12px")
        .attr("fill" , "#E30613")
        .attr("text-anchor", "middle")
        .style("opacity",0)
        .classed("labelRed",true)
    


    //title


//draw x axis
svg.append("g")
.attr("transform", `translate(0,${height})`)
.call(d3.axisBottom(x).tickSize(0))
.selectAll("text")
  .attr("transform", "translate(10,5)")
  .style("text-anchor", "end")
  .style('font-family','Montserrat');



  /////

          // using d3 for convenience
          var body = document.querySelector("body");
          var scrolly = body.querySelector("#scrolly");
          var sticky = scrolly.querySelector(".sticky-thing");
          var article = scrolly.querySelector("article");
          var steps = article.querySelectorAll(".step");
    
          // initialize the scrollama
          var scroller = scrollama();
    
          // scrollama event handlers
          
    
            // update graphic based on step
            // steps.classed("is-active", function (d, i) {
            //     return i === response.index;
            // });
            // document.getElementById("chart5").src=`images/image${el.dataset.step}.svg`;
        
    
          function init() {
            scroller
              .setup({
                step: "#scrolly article .step",
                offset: 0.5,
                // debug: true
              })
              .onStepEnter(handleStepEnter);
    
            // setup resize event
            window.addEventListener("resize", scroller.resize);
          }
    
          // kick things off
          init();
    
    
    
          
    

    function handleStepEnter(response) {

        console.log(response);
        // response = { element, direction, index }
        let currentIndex = response.index;
        let currentDirection = response.direction;
        // response = { element, direction, index }
 



        // remove is-active from all steps
        // then add is-active to this step
        
        // steps.forEach(el => el.classList.remove('is-active'));
        // el.classList.add('is-active');

        if(currentIndex === 0){
        //    document.getElementById("chart5").style.color="red";
           

            d3.select("#chart5")
            .select("svg")
            .selectAll("path")
            // .classed("lineAnimation",true)
            .transition()
            .duration(1000)
            .style("opacity",1)
            .delay((d,i) => {console.log(i); return i*100})

            d3.select("#chart5")
            .select("svg")
            .selectAll(".labelRed")
            .transition()
            .duration(1000)
            .style("opacity",1)
            .delay((d,i) => {console.log(i); return i*130})

            svg.selectAll(".circles")
            .transition()
            .duration(1000)
            .attr("r","3")
            .delay((d,i) => {console.log(i); return i*130})

            d3.select("#chart5")
            .select("h1")
            .html("Динамика <span class='redText'>дивидендной доходности</span> на конец периода")
            .classed("chartTitle", true);  

            d3.select("#chart5")
            .select("h1")
            .html("Динамика <span class='redText'>дивидендной доходности</span> на конец периода")
            .classed("chartTitle", true);  


            d3.select(".chartNote").remove()
            }


                     


        if(currentIndex === 2){

 
          d3.select("#chart5")
          .append("div")
          .html("Выплаченные дивиденды указаны в млрд руб.")
          .classed("chartNote", true);


          d3.select("#chart5")
            .select("svg")
            .selectAll(".label")
            .transition()
            .duration(1000)
            .style("opacity",1)
            .delay((d,i) => {console.log(i); return i*130})


          d3.select("#chart5")
            .select("svg")
            .selectAll("rect")
            .transition()
            .duration(800)
            .attr("y", d => y(parseFloat(d.Value)))
            .attr("height", d => height - y(parseFloat(d.Value)))
            .delay((d,i) => {console.log(i); return i*100})


  
            d3.select("#chart5")
            .select("h1")
            .html("Динамика <span class='redText'>дивидендной доходности</span> и <span class='greyText'>выплаченных дивидендов</span> на конец периода")
            .classed("chartTitle", true);


            svg.select("path")
            .transition()
            .duration(1000)
            .attr("transform","translate(0,-130)")




            svg.selectAll(".labelRed")
            .transition()
            .duration(1000)
            .attr("y", function(d){
              return y2(parseFloat(d.Value2)) - 340;
          })


            svg.selectAll(".circles")
            .transition()
            .duration(1000)
            .attr("cy", d=> y2(parseFloat(d.Value2)) - 330) 
                
                }
        
}
    
    

    


})
