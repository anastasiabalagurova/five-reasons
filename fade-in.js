
document.querySelector('.chapterSvg').addEventListener('load', function(){ 
	let svg = this.contentDocument.querySelector('svg');
	let svgIcons = svg.querySelectorAll('.svgIcon');
	const options = {
		threshold: 0.5
	}
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				svgIcons.forEach((element, index) => {
					element.style.opacity = 1;
					element.style.transform = 'translateY(0rem)';
				});
				observer.unobserve(document.querySelector('.chapterSvg'));
			}
		})
	}, options);
	observer.observe(document.querySelector('.chapterSvg'));
  });

  