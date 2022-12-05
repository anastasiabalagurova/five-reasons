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
    function setHeightDynamic() {
        var vh = window.innerHeight * 0.01;
        document.querySelector('.tagWrapper').style.setProperty('--vhd', `${vh}px`);
      }
    if(window.innerWidth < 768){
        setHeightDynamic();
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('click', openPopup);
        });
        tooltipClose.addEventListener('click', closePopup);
        window.addEventListener('resize', setHeightDynamic);
    } else{
        tooltips.forEach(tooltip => {
            tooltip.removeEventListener('click', openPopup);
        });
        tooltipClose.removeEventListener('click', closePopup);
        window.removeEventListener('resize', setHeightDynamic);
    }
    
}
resizeHandler();
window.addEventListener('resize', resizeHandler);