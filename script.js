let switcher1 = false, 
    switcher2 = false,
    switcher3 = false,
    switcher4 = false,
    switcher5 = false;

    let state = 0;

let triggerStatus = {
  "chart1": false,
  "chart2": false,
  "chart3": false,
  "chart4": false,
  "chart5": false
};
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

    if(currentIndex == 0 && currentDirection == "up" && triggerStatus["chart1"]){
      returnChart1()
    }


    if(currentIndex == 1 && triggerStatus["chart1"]){
      updateChart1()
      
    }


}


})




function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    if(entry.isIntersecting && !triggerStatus[element.id]) {
      triggerStatus[element.id] = true;
      callback(element);
      console.log(element);
      // observer.disconnect();
    }

    });
  }).observe(element);
}
drawSvg();
const setVisible = () =>{
  onVisible(document.querySelector("#chart1"), () =>  drawChart1());
  onVisible(document.querySelector("#chart2"), () =>  drawChart2());
  onVisible(document.querySelector("#chart3"), () =>  drawChart3());	  
  onVisible(document.querySelector("#chart4"), () =>  drawChart4());
  onVisible(document.querySelector("#chart5"), () =>  drawChart5());
}
setVisible();

const cleanCharts = () =>{
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
const redrawCharts = () =>{
  if(window.innerWidth < 767 && !isMobile){
    isMobile = true;
    cleanCharts();
    drawSvg();
    setVisible();
  }
  if(window.innerWidth > 767 && isMobile){
    isMobile = false;
    cleanCharts();
    drawSvg();
    setVisible();
  }
}
redrawCharts();
window.addEventListener('resize', redrawCharts);


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
    object.addEventListener('load', function() {
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
const contentContainer = document.querySelector('.content .container');
const backBtn = document.querySelector('.backWrapper');
fixedObserver(backBtn, contentContainer, {
  rootMargin: '-100% 0% 0% 0%',
  threshold: 0
});
const containerProject = document.querySelector('.containerProject');
const tagWrapper = document.querySelector('.tagWrapper');
fixedObserver(tagWrapper, containerProject, {
  rootMargin: '0% 0% -100% 0%',
  threshold: 0
});

// burger menu

const tagBurger = document.querySelector('.tagBurger');
const tagList = document.querySelector('.tagList');
tagBurger.addEventListener('click', ()=>{
  tagBurger.classList.toggle('show');
  tagList.classList.toggle('show');
});

//tooltip popup

function setHeightDynamic() {
  var vh = window.innerHeight * 0.01;
  document.querySelector('html').style.setProperty('--vh', `${vh}px`);
}
setHeightDynamic();
const resizeHandler = () =>{
  const tooltips = document.querySelectorAll('.tooltip');
  const tooltipPopup = document.querySelector('.tooltipPopup');
  const tooltipPopupText = document.querySelector('.tooltipPopup .tooltipText');
  const tooltipClose = document.querySelector('.tooltipClose');
  const openPopup = (e) =>{
      tooltipPopupText.textContent = e.target.querySelector('.tooltiptext').textContent;
      tooltipPopup.classList.add('show');
  }
  const closePopup = () =>{
      tooltipPopup.classList.remove('show');
  }
  if(window.innerWidth < 767){
      
      tooltips.forEach(tooltip => {
          tooltip.addEventListener('click', openPopup);
      });
      tooltipClose.addEventListener('click', closePopup);
  } else{
      tooltips.forEach(tooltip => {
          tooltip.removeEventListener('click', openPopup);
      });
      tooltipClose.removeEventListener('click', closePopup);
  }
}
resizeHandler();
window.addEventListener('resize', resizeHandler);
