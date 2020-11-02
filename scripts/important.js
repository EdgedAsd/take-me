let IMAGES_ON_SCREEN = (document.body.clientWidth <= 767) ? 2 : 3

window.onresize = function() {
	IMAGES_ON_SCREEN = (document.body.clientWidth <= 767) ? 2 : 3

	setGreeceSliderSizes();
	
	setVisible();
	setActivitySliderSizes();

	if (document.body.clientWidth >= 768) {
		setStylesForPc();
	}
	else {
		setStylesForMobile();
	}
}