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
            if (window.innerWidth < 768) {
                if (!mobileLoaded) {
                    element.setAttribute("data", `.${sourceUrls[index]}-mob.svg`);
                }
            } else {
                if (!descLoaded) {
                    element.setAttribute("data", `.${sourceUrls[index]}.svg`);
                }
            }
        
    });
	if (window.innerWidth < 768) {
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