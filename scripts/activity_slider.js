function setActivitySliderSizes() {
	let activity_wrapper = document.getElementsByClassName('activity_wrapper')[0];
	activity_margin = activity_wrapper.offsetWidth/50;
	image_width = (activity_wrapper.offsetWidth - (IMAGES_ON_SCREEN-1)*activity_margin)/IMAGES_ON_SCREEN;
	image_height = image_width*0.65;

	document.getElementsByClassName('activities')[0].style.height = image_height*1.66 + 'px';
	document.getElementsByClassName('activity_list')[0].style.width = 5*image_width + 4*activity_margin + 'px';
	activity_wrapper.style.paddingTop = image_height/3 + 'px';
	activity_wrapper.style.paddingBottom = image_height/3 + 'px';
	activity_wrapper.style.height = image_height + 'px';

	activity_nodes.forEach((img) => {
		img.style.width = image_width + 'px';
		img.style.height = image_height + 'px';
	});

	activity_offset = image_width + activity_margin;

	for (let node in visible) {
		let new_node = visible[node];
		new_node.style.left = (+node+hidden_left.length)*activity_offset + 'px';
	}

	setHiddenCoords();
}


function setOpacity() {
	visible.forEach((node) => {
		node.style.opacity = 1;
	})
	hidden_left.forEach((node) => {
		node.style.opacity = 0;
	})
	hidden_right.forEach((node) => {
		node.style.opacity = 0;
	})
}


function setHiddenCoords() {
	for (let node in hidden_left) {
		let new_node = hidden_left[node];
		new_node.style.left = (+node)*activity_offset + 'px';
	}
	
	for (let node in hidden_right) {
		let new_node = hidden_right[node];
		new_node.style.left = (+node + visible.length + hidden_left.length)*activity_offset + 'px';
	}
}


function setVisible() {
	if (IMAGES_ON_SCREEN !== visible.length) {
		visible = [];
		for (let node = 0; node < IMAGES_ON_SCREEN; node++) {
			activity_nodes[node].style.WebkitTransition = 'all 1s ease 0s';
			visible.push(activity_nodes[node]);
		}

		let hidden_count = activity_nodes.length - IMAGES_ON_SCREEN;

		hidden_left = [];
		for (let node = IMAGES_ON_SCREEN; node < IMAGES_ON_SCREEN + Math.floor(hidden_count/2); node++) {
			activity_nodes[node].style.WebkitTransition = 'all 1s ease 0s';
			hidden_left.push(activity_nodes[node]);
		}

		hidden_right = [];
		for (let node = IMAGES_ON_SCREEN + hidden_left.length; node < activity_nodes.length; node++) {
			activity_nodes[node].style.WebkitTransition = 'all 1s ease 0s';
			hidden_right.push(activity_nodes[node]);
		}

		while (activity_list.children[0]) {
			activity_list.children[0].remove();
		}

		setOpacity();

		for (let node in visible) {
			let new_node = visible[node];
			activity_list.append(new_node);
		}

		for (let node in hidden_left) {
			activity_list.prepend(hidden_left[hidden_left.length - node - 1]);
		}
		
		for (let node in hidden_right) {
			activity_list.append(hidden_right[node]);
		}
	}
}


let activity_list = document.querySelector('ul.activity_list');
let activity_nodes = Array.prototype.slice.call(document.querySelectorAll('ul.activity_list li'), 0);
let blockSlider = false;
let image_width,image_height;
let activity_margin;
let activity_offset;
let visible = [];
let hidden_left = [];
let hidden_right = [];

setVisible();
setActivitySliderSizes();

let left_btn = document.querySelector('.left_btn');
left_btn.onclick = function() {
	if (!blockSlider) {
		for (let node = 0; node < activity_list.children.length; node++) {
			let current_style = activity_list.children[node].style.left;
			current_style = +current_style.slice(0,current_style.indexOf('px',0));
			activity_list.children[node].style.left = current_style - activity_offset + 'px';
		}
		
		for (let node in hidden_left) {
			node = +node;
			if (node != hidden_left.length - 1) {
				let buffer = hidden_left[node];
				hidden_left[node] = hidden_left[node+1];
				hidden_left[node+1] = buffer;
			}
			else {
				hidden_right.push(hidden_left.pop());
			}
		}

		for (let node in visible) {
			node = +node;
			if (node != visible.length - 1) {
				let buffer = visible[node];
				visible[node] = visible[node+1];
				visible[node+1] = buffer;
			}
			else {
				hidden_left.push(visible.pop());
			}
		}

		for (let node in hidden_right) {
			node = +node;
			if (node != hidden_right.length - 1) {
				let buffer = hidden_right[node];
				hidden_right[node] = hidden_right[node+1];
				hidden_right[node+1] = buffer;
			}
			else {
				visible.push(hidden_right.pop());
			}
		}

		setOpacity();
		setHiddenCoords();

		blockSlider = true;

		let timer = setTimeout(() => {
			blockSlider = false;
		}, 1000);
	}
}

let right_btn = document.querySelector('.right_btn');
right_btn.onclick = function() {
	if (!blockSlider) {
		for (let node = 0; node < activity_list.children.length; node++) {
			let current_style = activity_list.children[node].style.left;
			current_style = +current_style.slice(0,current_style.indexOf('px',0));
			activity_list.children[node].style.left = current_style + activity_offset + 'px';
		}

		for (let node in hidden_right) {
			node = +node;
			if (node != hidden_right.length - 1) {
				let buffer = hidden_right[hidden_right.length - 1 - node];
				hidden_right[hidden_right.length - 1 - node] = hidden_right[hidden_right.length - node - 2];
				hidden_right[hidden_right.length - node - 2] = buffer;
			}
			else {
				hidden_left.unshift(hidden_right.shift());
			}
		}

		for (let node in visible) {
			node = +node;
			if (node != visible.length - 1) {
				let buffer = visible[visible.length - 1 - node];
				visible[visible.length - 1 - node] = visible[visible.length - node - 2];
				visible[visible.length - node - 2] = buffer;
			}
			else {
				hidden_right.unshift(visible.shift());
			}
		}

		for (let node in hidden_left) {
			node = +node;
			if (node != hidden_left.length - 1) {
				let buffer = hidden_left[hidden_left.length - 1 - node];
				hidden_left[hidden_left.length - 1 - node] = hidden_left[hidden_left.length - node - 2];
				hidden_left[hidden_left.length - node - 2] = buffer;
			}
			else {
				visible.unshift(hidden_left.shift());
			}
		}
		
		setOpacity();
		setHiddenCoords();

		blockSlider = true;

		let timer = setTimeout(() => {
			blockSlider = false;
		}, 1000);
	}
}