function setGreeceSliderSizes() {
	let slider_wrapper = document.querySelector('.slider');
	greeceMargin = slider_wrapper.offsetWidth/100;
	images.forEach((img) => {
		img.style.width = slider_wrapper.offsetWidth/IMAGES_ON_SCREEN + 'px';
		img.style.marginRight = greeceMargin + 'px';
	});
	
	if (document.body.clientWidth <= 440) {
		greece_slider.style.height = '220px';
	}
	else if (document.body.clientWidth <= 1024) {
		greece_slider.style.height = '250px';
	}
	else if (document.body.clientWidth < 1100) {
		greece_slider.style.height = '340px';
	}
	else if (document.body.clientWidth < 1200) {
		greece_slider.style.height = '380px';
	}
	else if (document.body.clientWidth < 1250) {
		greece_slider.style.height = '400px';
	}
	else {
		greece_slider.style.height = '420px';
	}
}


function greeceSlide() {
	if (slider_point>5) {
		slider_point = 0;
	}
	let pos = -slider_point*(greeceMargin + images[0].offsetWidth);
	greece_slider.style.marginLeft = pos+'px';
	points_classes = points_classes.map((pt) => {
		pt.classList.remove('active_point');
		return pt;
	})
	points.children[slider_point].classList.add('active_point');
	slider_point++;
}


let slider_point = 0;
let greece_slider = document.querySelector('.slider ul');
let images = Array.prototype.slice.call(greece_slider.children, 0);  // Collection to array
let greeceMargin;

setGreeceSliderSizes();

// Slider points 
let points = document.getElementsByClassName('points')[0];

for (let pt = 0; pt <= images.length-IMAGES_ON_SCREEN; pt++) {
	let new_point = document.createElement('button');
	new_point.classList.add('point');
	new_point.onclick = function() {
		slider_point = points_classes.indexOf(this);
		greeceSlide();
		clearInterval(sliderTimer);
		sliderTimer = setInterval(greeceSlide, 2000);
	}
	points.append(new_point);
}

let points_classes = Array.prototype.slice.call(points.children, 0);

let sliderTimer = setInterval(greeceSlide, 2000);