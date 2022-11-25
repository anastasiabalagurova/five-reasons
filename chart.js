const margin = {top: 50, right: 25, bottom: 45, left: 0},
      width = 700 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;




// append the svg object to the body of the page
const svg = d3.select("#chart5")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("viewport", "0 0" + " " + width + " " + height)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("data/chart5.csv").then( function(data) {




// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 50])
  .range([ height, 100]);
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
    .attr("y", d => y(0))
    .attr("height", d => height - y(0)) 
    .transition()
    .duration(800)
    .attr("height", d => height - y(parseFloat(d.Value))) // always equal to 0
    .attr("y", d => y(parseFloat(d.Value)))
    .delay((d,i) => {console.log(i); return i*100})
    



//dots
var lineGenerator = d3.line()
.x(function (d) {
    return x(d.Year)+ x.bandwidth()/2;
})
.y(function (d) {
    return y2(parseFloat(d.Value2)) - 180;
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
    .classed("lineAnimation", true)
    .transition()
    .duration(800)
    .style("opacity",1)




    svg.selectAll(".circles")
    .data(data)
    .join("circle") // enter append
      .attr("class", "circles")
      .attr("r", "3") // radius
      .attr("fill", "#E30613")
      .style("stroke-width", 1)
      .attr("stroke","#fff")
      .attr("cx", d=> x(d.Year) + x.bandwidth()/2)   // center x passing through your xScale
      .attr("cy", d=> y2(parseFloat(d.Value2)) - 180)   // center y through your yScale

 

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
    .transition()
    .duration(1200)
    .style("opacity",1)
    .delay((d,i) => {console.log(i); return i*130})


   //think about rects under red labels
    // svg.selectAll(".labelRedRect") 
    // .data(data)
    // .join("rect")
    //     .attr("x", function(d){
    //         return x(d.Year) +10;
    //     })
    //     .attr("y", function(d){
    //         return y2(parseFloat(d.Value2)) - 220;
    //     })
        
    //     .attr("fill" , "white")
    //     .attr("width", x.bandwidth()/2)
    //     .attr("height", 16)
    //     .classed("labelRedRect",true)



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
            return y2(parseFloat(d.Value2)) - 190;
        })
        .attr("font-family" , "Montserrat")
        .attr("font-size" , "10px")
        .attr("fill" , "#E30613")
        .attr("text-anchor", "middle")
        .style("opacity",0)
        .classed("labelRed",true)
        .attr("id",(d,i) => {return "labelRed" + i})
        .transition()
    .duration(1200)
    .style("opacity",1)
    .delay((d,i) => {console.log(i); return i*200})



       d3.select("#labelRed9")
       .attr("transform","translate(-20 15)");



       d3.select("#labelRed5")
       .attr("transform","translate(-5 0)");

       d3.select("#labelRed7")
       .attr("transform","translate(3 0)");

       d3.select("#labelRed8")
       .attr("transform","translate(-3 0)");


       d3.select("#labelRed13")
       .attr("transform","translate(15 3)");
    
    


    //title
 
    // d3.select("#chartNote5")
    // .html("Выплаченные дивиденды указаны в млрд руб.")



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
 





    //     if(currentIndex === 0){
       
        
    // }
    
    
    }
    


})
