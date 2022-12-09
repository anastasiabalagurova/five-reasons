let switcher1 = false, 
    switcher2 = false,
    switcher3 = false,
    switcher4 = false,
    switcher5 = false;

    let state = 0;


// Parse the Data
d3.csv("data/chart5.csv").then(function (data) {

  // using d3 for convenience
  var body = document.querySelector("body");
  var scrolly = body.querySelector(".scrolly");
  var sticky = scrolly.querySelector(".sticky-thing");
  var article = scrolly.querySelector("article");
  var steps = article.querySelectorAll(".step");

  // initialize the scrollama
  var scroller = scrollama();

  function init() {
    scroller
      .setup({
        step: ".scrolly article .step",
        offset: 0.5,
      })
      .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener("resize", scroller.resize);
  }
  // kick things off
  init();




  function handleStepEnter(response) {
    let currentIndex = response.index;
    let currentDirection = response.direction;

    console.log(currentIndex)

    if(currentIndex == 0 && currentDirection == "up"){
      returnChart1()
    }


    if(currentIndex == 1){
      updateChart1()
      
    }


}


})



function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    if(entry.intersectionRatio > 0) {
      callback(element);
      observer.disconnect();
    }

    });
  }).observe(element);
  }

onVisible(document.querySelector("#chart1"), () =>  drawChart1());
onVisible(document.querySelector("#chart2"), () =>  drawChart2());
onVisible(document.querySelector("#chart3"), () =>  drawChart3());	  
onVisible(document.querySelector("#chart4"), () =>  drawChart4());
onVisible(document.querySelector("#chart5"), () =>  drawChart5());

function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    if(entry.intersectionRatio > 0) {
      callback(element);
      observer.disconnect();
    }

    });
  }).observe(element);
  }


const menuTags = document.querySelectorAll('.tag');
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
				}else{
          if(entry.target.getBoundingClientRect().y > 0){
            if(index-lastIndex <= 1){
              lastIndex = index - 1;
            }
          } 
        }   
        menuTags.forEach(tag => {
          tag.style.color = 'var(--grey2)';
        });
        if(lastIndex >= 0){
          menuTags[lastIndex].style.color = 'var(--red)';
        }
			});
		};
		const observer = new IntersectionObserver(callback, options);
		observer.observe(el);
	});
}

scrollSpy('.chapter');
