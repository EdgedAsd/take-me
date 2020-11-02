const show_nav_btn = document.getElementsByClassName('show_nav_btn')[0];
const navigation = document.getElementsByClassName('navigation')[0];
const row_back = document.getElementsByClassName('row_back')[0];
const navigation_list = navigation.querySelector('ul');

const MOBILE_NAV_STYLE = {
	position: 'fixed',
	height: '100vh',
	width: '100vw',
	right: '0',
	margin: '0',
	backgroundColor: 'rgba(0,0,0,.5)',
	display: 'block'
}

const PC_NAV_STYLE = {
	display: 'flex',
	margin: 'auto 8% auto 0',
	width: '57%',
	position: 'static',
	height: 'auto',
	backgroundColor: 'transparent'
}


function setStylesForPc() {
	for (let nav_style in PC_NAV_STYLE) {
		navigation.style[nav_style] = PC_NAV_STYLE[nav_style];
	}

	navigation.style.display = 'block';
	show_nav_btn.style.display = 'none';
}


function setStylesForMobile() {
	for (let nav_style in MOBILE_NAV_STYLE) {
		navigation.style[nav_style] = MOBILE_NAV_STYLE[nav_style];
	}

	navigation.style.display = 'none';
	show_nav_btn.style.display = 'block';
}


function hideList() {
	for (let nav_style in PC_NAV_STYLE) {
		navigation.style[nav_style] = PC_NAV_STYLE[nav_style];
	}

	row_back.style.display = 'none';

	let timer = setTimeout(() => {
		navigation_list.style.right = '-30%';
	}, 30);

	let timer2 = setTimeout(() => {
		show_nav_btn.style.display = 'block';
		navigation.style.display = 'none';
	}, 270);

	document.body.style.overflow = 'scroll';
}


function showList() {
	for (let nav_style in MOBILE_NAV_STYLE) {
		navigation.style[nav_style] = MOBILE_NAV_STYLE[nav_style];
	}

	show_nav_btn.style.display = 'none';

	let timer = setTimeout(() => {
		navigation_list.style.right = '0';
	}, 30);

	let timer2 = setTimeout(() => {
		row_back.style.display = 'block';
	}, 270);

	document.body.style.overflow = 'hidden';
}


show_nav_btn.onclick = showList;
row_back.onclick = hideList;

for (let node of navigation_list.children) {
	node.onclick = function() {
		row_back.style.display = 'none';
		navigation_list.style.right = '-30%';
		show_nav_btn.style.display = 'block';
		navigation.style.display = 'none';
		document.body.style.overflow = 'scroll';
	}
}