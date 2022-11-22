// set the dimensions and margins of the graph
const margin = {top: 90, right: 30, bottom: 90, left: 0},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#chart5")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("/data/chart5.csv").then( function(data) {



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
                offset: 0.2,
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

        if(currentIndex === 12){
        //    document.getElementById("chart5").style.color="red";
            d3.select("#chart5")
            .select("svg")
            .selectAll("rect")
            .transition()
            .duration(1000)
            .attr("y", d => y(d.Value))
            .attr("height", d => height - y(d.Value))
            .delay((d,i) => {console.log(i); return i*100})
            }


        if(currentIndex === 13){
            //    document.getElementById("chart5").style.color="red";
                d3.select("#chart5")
                .select("svg")
                .selectAll("rect")
                .transition()
                .duration(800)
                .attr("y", d => y(d.Value))
                .attr("height", d => height - y(d.Value))
                .delay((d,i) => {console.log(i); return i*100})
                }
        
}
    
    

    


})
